import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, 'Please provide a job title']
  },
  nameWithInitials: {
    type: String,
    required: [true, 'Please provide name with initials']
  },
  fullName: {
    type: String,
    required: [true, 'Please provide full name']
  },
  gender: {
    type: String,
    required: [true, 'Please provide gender']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide date of birth']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  contactNumber: {
    type: String,
    required: [true, 'Please provide contact number']
  },
  field: {
    type: String,
    required: [true, 'Please provide field of interest']
  },
  resumeUrl: {
    type: String,
    required: [true, 'Please provide resume URL']
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'accepted', 'rejected'],
    default: 'pending'
  },
  applicationId: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);