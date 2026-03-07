import { API_URL } from './api'

// Use relative URL in dev so Vite proxy handles it; full URL in production
const getStreamUrl = () => {
    const isDev = import.meta.env.DEV
    if (isDev) return '/api/ai/chat'
    return `${API_URL}/api/ai/chat`
}

/**
 * Stream a chat message from the AI backend.
 * @param {object} opts
 * @param {Array}   opts.messages      - conversation history
 * @param {string}  opts.model         - model identifier
 * @param {string}  [opts.projectId]   - existing project ID to update
 * @param {string}  [opts.sessionId]   - anonymous session ID
 * @param {string}  [opts.token]       - JWT bearer token
 * @param {(chunk: string) => void} opts.onChunk  - called per streamed text chunk
 * @param {(project: object|null, projectId: string|null) => void} opts.onDone
 * @param {(err: string) => void} opts.onError
 */
export async function streamChat({ messages, model, projectId, sessionId, token, onChunk, onDone, onError }) {
    try {
        const headers = { 'Content-Type': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        const response = await fetch(getStreamUrl(), {
            method: 'POST',
            headers,
            body: JSON.stringify({ messages, model, projectId, sessionId })
        })

        if (!response.ok) {
            const text = await response.text()
            throw new Error(`HTTP ${response.status}: ${text}`)
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
            const { done, value } = await reader.read()
            if (done) break

            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split('\n')
            buffer = lines.pop()

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue
                const data = line.slice(6).trim()
                if (!data || data === '[DONE]') continue

                try {
                    const parsed = JSON.parse(data)
                    if (parsed.type === 'chunk') {
                        onChunk?.(parsed.content)
                    } else if (parsed.type === 'done') {
                        onDone?.(parsed.project, parsed.projectId)
                    } else if (parsed.type === 'error') {
                        onError?.(parsed.message)
                    }
                } catch (_) { }
            }
        }
    } catch (err) {
        onError?.(err.message || 'Stream failed')
    }
}

export const AI_MODELS = [
    { id: 'openrouter/openai/gpt-4o-mini', label: 'GPT-4o Mini', provider: 'OpenAI', icon: '🟢' },
    { id: 'openrouter/openai/gpt-4o', label: 'GPT-4o', provider: 'OpenAI', icon: '🟢' },
    { id: 'anthropic/claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet', provider: 'Anthropic', icon: '🟠' },
    { id: 'anthropic/claude-3-haiku-20240307', label: 'Claude 3 Haiku', provider: 'Anthropic', icon: '🟠' },
    { id: 'openrouter/meta-llama/llama-3.1-8b-instruct:free', label: 'Llama 3.1 8B (Free)', provider: 'OpenRouter', icon: '🟣' },
    { id: 'openrouter/google/gemini-flash-1.5', label: 'Gemini Flash 1.5', provider: 'OpenRouter', icon: '🔵' },
    { id: 'ollama/llama3.2', label: 'Llama 3.2 (Local)', provider: 'Ollama', icon: '⚪' },
    { id: 'ollama/codellama', label: 'CodeLlama (Local)', provider: 'Ollama', icon: '⚪' }
]
