import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    default: 'admin123'
  }
}, {
  timestamps: true
});

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);