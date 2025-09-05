const { Schema, model, Types } = require('mongoose');

const ProductSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: 'text' },
    price: { type: Number, required: true, index: true },
    category: { type: Types.ObjectId, ref: 'Category', required: true, index: true },
    thumbnail: String,
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Index hữu ích cho sort/loc
ProductSchema.index({ category: 1, createdAt: -1 });
ProductSchema.index({ name: 'text' });
module.exports = model('Product', ProductSchema);