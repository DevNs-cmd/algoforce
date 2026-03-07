import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String }, // optional for OAuth users
    googleId: { type: String, unique: true, sparse: true },
    avatar: { type: String },
    plan: { type: String, default: 'free', enum: ['free', 'pro', 'enterprise'] },
    createdAt: { type: Date, default: Date.now },
    lastLogin: { type: Date }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || !this.password) return next()
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false
    return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.toJSON = function () {
    const obj = this.toObject()
    delete obj.password
    return obj
}

export default mongoose.model('User', userSchema)
