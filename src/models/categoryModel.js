const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  isChild: { type: Boolean, required: true },
  imagePreview: { type: String },
})

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;