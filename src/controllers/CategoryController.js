const Category = require("../models/categoryModel");

async function createCategory(req, res) {
  try {
    const { name, parentId } = req.body;

    // Create a new category document
    const category = new Category({ name });

    // If parentId is provided, find the parent category and add the new category as its child
    if (parentId) {
      const parentCategory = await Category.findById(parentId);
      if (!parentCategory) {
        return res.status(404).json({ message: 'Parent category not found' });
      }
      parentCategory.children.push(category._id);
      await parentCategory.save();
    }

    // Save the new category document
    await category.save();

    res.status(201).json({ category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function deleteCategory(req, res) {
  try {
    // Find and delete the category via ID
    const category = Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }
    else {
      res.status(200).json({ message: "Deleted category successfully" });
    }
  }
  catch (error) {
    console.log("Error while deleting Category" + error.message);
    res.status(500).json({ message: "Server error" })
  }
}
async function updateCategory(req, res) {
  try {
    // Handle name passed from param response
    const { name } = req.body
    // Find and update the category via ID
    const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    }
    else {
      res.status(201).json({ category });
    }
  }
  catch (error) {
    console.log("Error while updating category" + error.message);
    res.status(500).json({ message: "Server error" });
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await Category.find().populate("children");
    res.status(200).json({ categories });
  } catch (error) {
    console.log("Error while getting all categories");
    res.status(500).json({ message: "Server error" });
  }
}

async function getCategoryById(req, res) {
  try {
    const category = await Category.findById(req.params.categoryId).populate();
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json({ category })
    }
  }
  catch (error) {
    console.log("Error while getting category" + error.message);
    res.status(500).json({ message: "Server error" });
  }
}


module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
}