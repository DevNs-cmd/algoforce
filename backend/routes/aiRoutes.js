import express from 'express'
import rateLimit from 'express-rate-limit'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import Project from '../models/Project.js'

const router = express.Router()

// Auth middleware (optional - allows anonymous too)
const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'algoforce-dev-secret')
            req.userId = decoded.userId
        }
    } catch (_) { }
    next()
}

const aiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30,
    message: { success: false, message: 'Rate limit exceeded. Please wait.' }
})

// ─── PROVIDER ROUTING ─────────────────────────────────────────────────────────
async function callAI(model, messages, onChunk, res) {
    const [provider] = model.split('/')

    // OpenAI-compatible endpoint (OpenAI, OpenRouter, Ollama)
    const openAICompatible = async (baseURL, apiKey, modelName) => {
        const { default: axios } = await import('axios')
        const response = await axios.post(
            `${baseURL}/chat/completions`,
            { model: modelName, messages, stream: true, temperature: 0.7, max_tokens: 4096 },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://www.algoforceaii.com',
                    'X-Title': 'AlgoForce AI Builder'
                },
                responseType: 'stream'
            }
        )

        let buffer = ''
        for await (const chunk of response.data) {
            buffer += chunk.toString()
            const lines = buffer.split('\n')
            buffer = lines.pop()
            for (const line of lines) {
                const trimmed = line.replace(/^data: /, '').trim()
                if (!trimmed || trimmed === '[DONE]') continue
                try {
                    const parsed = JSON.parse(trimmed)
                    const content = parsed.choices?.[0]?.delta?.content
                    if (content) onChunk(content)
                } catch (_) { }
            }
        }
    }

    if (model.startsWith('openai/') || model === 'gpt-4o' || model === 'gpt-4o-mini') {
        const modelName = model.replace('openai/', '')
        await openAICompatible('https://api.openai.com/v1', process.env.OPENAI_API_KEY, modelName)
    } else if (model.startsWith('anthropic/') || model.startsWith('claude')) {
        // Anthropic native streaming
        const { default: axios } = await import('axios')
        const response = await axios.post(
            'https://api.anthropic.com/v1/messages',
            {
                model: model.replace('anthropic/', ''),
                max_tokens: 4096,
                messages: messages.filter(m => m.role !== 'system'),
                system: messages.find(m => m.role === 'system')?.content || ''
            },
            {
                headers: {
                    'x-api-key': process.env.ANTHROPIC_API_KEY,
                    'anthropic-version': '2023-06-01',
                    'Content-Type': 'application/json',
                    'anthropic-beta': 'messages-2023-12-15'
                },
                responseType: 'stream'
            }
        )
        let buffer = ''
        for await (const chunk of response.data) {
            buffer += chunk.toString()
            const lines = buffer.split('\n')
            buffer = lines.pop()
            for (const line of lines) {
                if (!line.startsWith('data: ')) continue
                try {
                    const parsed = JSON.parse(line.slice(6))
                    if (parsed.type === 'content_block_delta') {
                        onChunk(parsed.delta?.text || '')
                    }
                } catch (_) { }
            }
        }
    } else if (model.startsWith('ollama/') || model.startsWith('llama') || model.startsWith('mistral')) {
        const ollamaModel = model.replace('ollama/', '')
        await openAICompatible(
            process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1',
            'ollama',
            ollamaModel
        )
    } else {
        // Default: OpenRouter gateway (handles many models)
        await openAICompatible('https://openrouter.ai/api/v1', process.env.OPENROUTER_API_KEY || '', model)
    }
}

// ─── SYSTEM PROMPT ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are AlgoForce AI Builder, an expert full-stack developer AI.

When the user asks you to build something, always respond with a JSON object ONLY (no markdown, no explanation outside it) in this exact format:
{
  "project_name": "project-name",
  "description": "One line description",
  "files": [
    { "path": "src/App.jsx", "code": "..." },
    { "path": "package.json", "code": "..." }
  ]
}

Rules:
- Always include package.json with all needed dependencies
- Always include index.html for web projects
- Write complete, working, production-ready code
- Use modern best practices
- For React projects, always include a vite.config.js or similar
- Never truncate code - always write complete implementations
- For simple explanations or conversations (no build request), respond with normal text

If the user is asking a question or having a conversation (not asking to build/create/generate code), just respond normally as a helpful AI assistant.`

// POST /api/ai/chat
router.post('/chat', aiLimiter, optionalAuth, async (req, res) => {
    const { messages, model = 'openrouter/openai/gpt-4o-mini', projectId, sessionId } = req.body

    if (!messages?.length) {
        return res.status(400).json({ success: false, message: 'Messages are required' })
    }

    // Set up SSE
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')
    res.flushHeaders()

    const send = (data) => res.write(`data: ${JSON.stringify(data)}\n\n`)

    let fullResponse = ''

    try {
        const systemMessages = [{ role: 'system', content: SYSTEM_PROMPT }, ...messages]

        await callAI(model, systemMessages, (chunk) => {
            fullResponse += chunk
            send({ type: 'chunk', content: chunk })
        }, res)

        // Try to parse as JSON project
        let project = null
        try {
            const jsonMatch = fullResponse.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0])
                if (parsed.files && Array.isArray(parsed.files)) {
                    project = parsed
                }
            }
        } catch (_) { }

        // Save to DB if we have a project or user
        let savedProjectId = projectId
        if (project || req.userId || sessionId) {
            try {
                const userMessage = messages[messages.length - 1]
                if (projectId) {
                    const proj = await Project.findById(projectId)
                    if (proj) {
                        proj.messages.push({ role: 'user', content: userMessage.content })
                        proj.messages.push({ role: 'assistant', content: fullResponse })
                        if (project) {
                            proj.files = project.files
                            proj.name = project.project_name || proj.name
                        }
                        await proj.save()
                    }
                } else {
                    const newProject = new Project({
                        userId: req.userId || undefined,
                        sessionId: sessionId || undefined,
                        name: project?.project_name || 'New Chat',
                        description: project?.description || '',
                        files: project?.files || [],
                        messages: [
                            { role: 'user', content: userMessage.content },
                            { role: 'assistant', content: fullResponse }
                        ],
                        model
                    })
                    await newProject.save()
                    savedProjectId = newProject._id
                }
            } catch (dbErr) {
                console.error('DB save error:', dbErr.message)
            }
        }

        send({ type: 'done', project, projectId: savedProjectId })
        res.write('data: [DONE]\n\n')
        res.end()
    } catch (err) {
        console.error('AI chat error:', err.message)
        send({ type: 'error', message: err.message || 'AI request failed' })
        res.write('data: [DONE]\n\n')
        res.end()
    }
})

export default router
