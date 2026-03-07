import express from 'express';
import { bookCounselling } from '../controllers/bookingController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/book-counselling
// @access  Private
router.post('/', requireAuth, bookCounselling);

export default router;
