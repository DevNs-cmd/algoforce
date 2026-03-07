import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
    path: { type: String, required: true },
    code: { type: String, default: '' },
    language: { type: String, default: 'javascript' }
})

const messageSchema = new mongoose.Schema({
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
})

const projectSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    sessionId: { type: String }, // for anonymous users
    name: { type: String, default: 'Untitled Project' },
    description: { type: String },
    files: [fileSchema],
    messages: [messageSchema],
    model: { type: String, default: 'openai/gpt-4o-mini' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

projectSchema.pre('save', function (next) {
    this.updatedAt = new Date()
    next()
})

export default mongoose.model('Project', projectSchema)
