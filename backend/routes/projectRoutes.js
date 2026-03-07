import express from 'express'
import archiver from 'archiver'
import jwt from 'jsonwebtoken'
import Project from '../models/Project.js'
import rateLimit from 'express-rate-limit'

const router = express.Router()

const optionalAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (authHeader?.startsWith('Bearer ')) {
            const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET || 'algoforce-dev-secret')
            req.userId = decoded.userId
        }
    } catch (_) { }
    next()
}

const downloadLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: { success: false, message: 'Too many download requests.' }
})

// GET /api/projects — list projects for current user/session
router.get('/', optionalAuth, async (req, res) => {
    try {
        const { sessionId } = req.query
        const query = {}
        if (req.userId) query.userId = req.userId
        else if (sessionId) query.sessionId = sessionId
        else return res.json({ success: true, projects: [] })

        const projects = await Project.find(query)
            .select('name description createdAt updatedAt model files')
            .sort({ updatedAt: -1 })
            .limit(50)

        res.json({ success: true, projects })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch projects' })
    }
})

// GET /api/projects/:id — get a single project with full messages
router.get('/:id', optionalAuth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
        res.json({ success: true, project })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch project' })
    }
})

// DELETE /api/projects/:id
router.delete('/:id', optionalAuth, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id)
        res.json({ success: true, message: 'Project deleted' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete project' })
    }
})

// POST /api/projects/download — bundle files into ZIP
router.post('/download', downloadLimiter, async (req, res) => {
    const { files, projectName = 'algoforce-project' } = req.body

    if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ success: false, message: 'No files provided' })
    }

    const safeName = projectName.replace(/[^a-z0-9-_]/gi, '-').toLowerCase()

    res.setHeader('Content-Type', 'application/zip')
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}.zip"`)

    const archive = archiver('zip', { zlib: { level: 9 } })
    archive.on('error', (err) => {
        console.error('Archive error:', err)
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: 'Archive failed' })
        }
    })

    archive.pipe(res)

    for (const file of files) {
        if (file.path && typeof file.code === 'string') {
            archive.append(file.code, { name: `${safeName}/${file.path}` })
        }
    }

    await archive.finalize()
})

export default router
