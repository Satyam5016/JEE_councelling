import express from 'express';
import { createContact } from '../controllers/contactController.js';

const router = express.Router();

router.use((req, res, next) => {
    console.log('Contact Route Activity:', req.method, req.url);
    next();
});

// @route   POST /api/contact
// @access  Public
router.post('/', createContact);

export default router;
