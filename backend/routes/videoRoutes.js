import express from 'express';
import { getVideos, getVideoById, createVideo } from '../controllers/videoController.js';

const router = express.Router();

router.get('/', getVideos);
router.get('/:id', getVideoById);
router.post('/', createVideo); // Add middleware for admin check if needed later

export default router;
