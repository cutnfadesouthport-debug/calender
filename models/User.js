import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);