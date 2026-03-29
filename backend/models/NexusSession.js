import mongoose from 'mongoose';

const NexusSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Optional for guest sessions
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  projectName: {
    type: String,
    default: 'Untitled Project'
  },
  files: {
    type: Map,
    of: {
      content: String,
      language: String,
      aiGenerated: Boolean,
      unsaved: Boolean
    }
  },
  messages: [{
    role: String,
    content: String,
    timestamp: Date,
    filesModified: Number
  }],
  activeFilePath: String,
  model: String,
  agentMode: Boolean,
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('NexusSession', NexusSessionSchema);
