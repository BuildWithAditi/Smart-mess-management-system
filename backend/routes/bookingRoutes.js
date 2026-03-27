const express = require('express');
const { createBooking, getUserBookings, getAllBookings, deleteBooking } = require('../controllers/bookingController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/', authMiddleware, getUserBookings);
router.get('/all', authMiddleware, adminMiddleware, getAllBookings);
router.delete('/:id', authMiddleware, deleteBooking);

module.exports = router;