import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Routes for order creation and verification
router.post('/create-order', requireAuth, createOrder);
router.post('/verify', requireAuth, verifyPayment);

export default router;
