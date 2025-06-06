import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['Accepted', 'Rejected', 'Pending'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Add other fields from your job creation form
});

export default mongoose.models.Job || mongoose.model('Job', JobSchema);