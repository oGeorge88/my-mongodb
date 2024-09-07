import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensures all categories have a unique name
    trim: true    // Removes whitespace from both ends of a string
  },
  description: {
    type: String,
    trim: true // Optional, but helps remove any extra white space
  },
  isActive: {
    type: Boolean,
    default: true // Useful if you want to disable categories without deleting them
  }
});

// Check if the model exists using mongoose.models to avoid overwriting
export default mongoose.models.Category || mongoose.model('Category', categorySchema);
