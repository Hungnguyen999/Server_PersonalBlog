const express = require('express');
const router = express.Router();
const { createCategory, deleteCategory, updateCategory, getAllCategories, getCategoryById } = require("../controllers/CategoryController");

// Defining Router API end points
router.post('/get-all-category', getAllCategories);
router.post('/get-category-id/:categoryId', getCategoryById);
router.post('/admin/create-category', createCategory);
router.post('/admin/update-category/:categoryId', updateCategory);
router.post('/admin/delete-category/:categoryId', deleteCategory);

module.exports = router;