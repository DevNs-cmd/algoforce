import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from 'express-validator'

// Path to JSON file
const dataPath = path.join(process.cwd(), 'data', 'contacts.json')

// Read contacts from file
const readContacts = () => {
  try {
    if (!fs.existsSync(dataPath)) return []
    const data = fs.readFileSync(dataPath, 'utf-8')
    return JSON.parse(data || '[]')
  } catch (error) {
    console.error('Read file error:', error)
    return []
  }
}

// Write contacts to file
const writeContacts = (contacts) => {
  fs.writeFileSync(dataPath, JSON.stringify(contacts, null, 2))
}

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = (req, res) => {
  try {
    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const { name, company, email, role, problem, inquiryType } = req.body

    const contacts = readContacts()

    // Check recent submission (24 hours)
    const last24Hours = Date.now() - 24 * 60 * 60 * 1000
    const recentSubmission = contacts.find(
      c => c.email === email && new Date(c.submittedAt).getTime() >= last24Hours
    )

    if (recentSubmission) {
      return res.status(429).json({
        success: false,
        message: 'You have already submitted a request recently. We will get back to you soon.'
      })
    }

    const newContact = {
      id: uuidv4(),
      name,
      company,
      email,
      role,
      problem,
      inquiryType: inquiryType || 'demo',
      status: 'new',
      submittedAt: new Date().toISOString()
    }

    contacts.push(newContact)
    writeContacts(contacts)

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        id: newContact.id,
        name: newContact.name,
        email: newContact.email
      }
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
}

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Admin (future)
export const getAllContacts = (req, res) => {
  try {
    const contacts = readContacts().sort(
      (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    )

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts
    })
  } catch (error) {
    console.error('Get contacts error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
}

// @desc    Get contact by ID
// @route   GET /api/contact/:id
// @access  Admin (future)
export const getContactById = (req, res) => {
  try {
    const contacts = readContacts()
    const contact = contacts.find(c => c.id === req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    res.status(200).json({
      success: true,
      data: contact
    })
  } catch (error) {
    console.error('Get contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
}

// @desc    Update contact status
// @route   PUT /api/contact/:id
// @access  Admin (future)
export const updateContactStatus = (req, res) => {
  try {
    const { status } = req.body
    const contacts = readContacts()

    const index = contacts.findIndex(c => c.id === req.params.id)

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      })
    }

    contacts[index].status = status || contacts[index].status
    writeContacts(contacts)

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully'
    })
  } catch (error) {
    console.error('Update contact error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    })
  }
}
