import express from 'express'
import archiver from 'archiver'
import jwt from 'jsonwebtoken'
import rateLimit from 'express-rate-limit'
import { deleteProject, getProjectById, listProjects } from '../services/projectService.js'

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

router.get('/', optionalAuth, async (req, res) => {
    try {
        const { sessionId } = req.query
        const projects = await listProjects({ userId: req.userId, sessionId })
        res.json({ success: true, projects })
    } catch (err) {
        console.error('Project list error:', err.message)
        res.status(500).json({ success: false, message: 'Failed to fetch projects' })
    }
})

router.get('/:id', optionalAuth, async (req, res) => {
    try {
        const project = await getProjectById(req.params.id)
        if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
        res.json({ success: true, project })
    } catch (err) {
        console.error('Project fetch error:', err.message)
        res.status(500).json({ success: false, message: 'Failed to fetch project' })
    }
})

router.delete('/:id', optionalAuth, async (req, res) => {
    try {
        await deleteProject(req.params.id)
        res.json({ success: true, message: 'Project deleted' })
    } catch (err) {
        console.error('Project delete error:', err.message)
        res.status(500).json({ success: false, message: 'Failed to delete project' })
    }
})

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
