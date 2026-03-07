import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { syncUser, getProfile } from '../controllers/userController.js';

const router = express.Router();

// Sync Clerk user to MongoDB (requires auth)
router.post('/sync', requireAuth, syncUser);

// Get user profile (requires auth)
router.get('/profile', requireAuth, getProfile);

export default router;
