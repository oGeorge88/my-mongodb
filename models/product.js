import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true, // Ensures all products have a unique code
    trim: true    // Removes whitespace from both ends of a string
  },
  name: {
    type: String,
    required: true,
    trim: true // Removes whitespace from both ends of a string
  },
  description: {
    type: String,
    trim: true // Optional, but helps remove any extra white space
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Ensures price cannot be negative
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // This references the Category model
    default: null    // Allows products to be created without a category
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets the date when a product is created
  }
});

// Check if the model exists using mongoose.models to avoid overwriting
export default mongoose.models.Product || mongoose.model('Product', productSchema);
