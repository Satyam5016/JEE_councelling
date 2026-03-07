import Video from '../models/Video.js';

/**
 * @desc    Get all videos
 * @route   GET /api/videos
 * @access  Public
 */
export const getVideos = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        if (category && category !== 'All') {
            query.category = category;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const videos = await Video.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: videos.length,
            data: videos,
        });
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching videos',
        });
    }
};

/**
 * @desc    Get single video
 * @route   GET /api/videos/:id
 * @access  Public
 */
export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);

        if (!video) {
            return res.status(404).json({
                success: false,
                message: 'Video not found',
            });
        }

        res.status(200).json({
            success: true,
            data: video,
        });
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching video',
        });
    }
};

/**
 * @desc    Create a new video (Admin)
 * @route   POST /api/videos
 * @access  Private/Admin
 */
export const createVideo = async (req, res) => {
    try {
        const video = await Video.create(req.body);

        res.status(201).json({
            success: true,
            data: video,
        });
    } catch (error) {
        console.error('Error creating video:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Error creating video',
        });
    }
};
