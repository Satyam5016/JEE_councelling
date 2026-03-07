import User from '../models/User.js';

/**
 * Sync Clerk user to MongoDB.
 * Creates a new user if one doesn't exist, otherwise updates the existing one.
 * 
 * POST /api/user/sync
 * Body: { clerkId, name, email }
 */
export const syncUser = async (req, res) => {
    try {
        const { clerkId, name, email } = req.body;

        if (!clerkId || !name || !email) {
            return res.status(400).json({
                success: false,
                message: 'clerkId, name, and email are required.',
            });
        }

        let user = await User.findOne({ clerkId });

        if (user) {
            // Update existing user
            user.name = name;
            user.email = email;
            await user.save();
        } else {
            // Create new user
            user = await User.create({
                clerkId,
                name,
                email,
                plan: 'free',
            });
        }

        res.status(200).json({
            success: true,
            message: user ? 'User synced successfully.' : 'User created successfully.',
            data: user,
        });
    } catch (error) {
        console.error('Sync user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to sync user.',
        });
    }
};

/**
 * Get authenticated user's profile from MongoDB.
 * 
 * GET /api/user/profile
 */
export const getProfile = async (req, res) => {
    try {
        if (!req.dbUser) {
            return res.status(403).json({
                success: false,
                message: 'User profile not found. Please sync your account first.',
            });
        }

        res.status(200).json({
            success: true,
            data: req.dbUser,
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch profile.',
        });
    }
};
