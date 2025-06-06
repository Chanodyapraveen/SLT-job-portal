const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
    unique: true
  },
  jobField: {
    type: String,
    required: true
  },
  jobPosition: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  companyEmail: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  companyLocation: {
    type: String,
    required: true
  },
  workType: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);