const express = require('express');
const { getMeals, createMeal, updateMeal } = require('../controllers/mealController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getMeals);
router.post('/', authMiddleware, adminMiddleware, createMeal);
router.put('/:id', authMiddleware, adminMiddleware, updateMeal);

module.exports = router;