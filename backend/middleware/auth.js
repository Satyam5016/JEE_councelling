import { clerkMiddleware, getAuth } from '@clerk/express';
import User from '../models/User.js';

/**
 * Clerk middleware — attaches auth info to every request.
 * Mount this globally on the Express app.
 */
export const clerkAuth = clerkMiddleware();

/**
 * Require authenticated user — returns 401 if not signed in.
 * Attaches the MongoDB user document to req.dbUser.
 */
export const requireAuth = async (req, res, next) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please sign in.',
            });
        }

        // Attach Clerk userId to request
        req.clerkUserId = userId;

        // Optionally fetch the DB user
        const dbUser = await User.findOne({ clerkId: userId });
        if (dbUser) {
            req.dbUser = dbUser;
        }

        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
        });
    }
};

/**
 * Require Elite or Premium plan — returns 403 if user is on Basic plan.
 * Must be used AFTER requireAuth middleware.
 */
export const requirePremium = async (req, res, next) => {
    try {
        if (!req.dbUser) {
            return res.status(403).json({
                success: false,
                message: 'User profile not found. Please sync your account first.',
            });
        }

        if (req.dbUser.plan === 'basic') {
            return res.status(403).json({
                success: false,
                message: 'This feature requires an Elite or Premium plan. Please upgrade.',
            });
        }

        next();
    } catch (error) {
        console.error('Premium middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while checking plan.',
        });
    }
};
