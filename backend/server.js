import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import { clerkAuth } from './middleware/auth.js';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

// Set PORT from .env or default to 5001
const PORT = process.env.PORT || 5001;

// CORS configuration
const allowedOrigins = process.env.FRONTEND_URL
    ? process.env.FRONTEND_URL.split(',').map(origin => origin.trim())
    : ['http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        const isAllowed = allowedOrigins.includes(origin) ||
            origin.endsWith('.vercel.app') ||
            origin.includes('localhost');

        if (isAllowed) {
            return callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            return callback(new Error('Not allowed by CORS'), false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Clerk Authentication Middlewares
app.use(clerkAuth);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/book-counselling', bookingRoutes);

// Database connection
connectDB().catch(err => console.error('Initial DB connection failed:', err));

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('--- Global Error Handler ---');
    console.error('Time:', new Date().toISOString());
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    console.error('Stack Trace:', err.stack);
    console.error('Request Method:', req.method);
    console.error('Request URL:', req.originalUrl);
    console.error('---------------------------');

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'An internal server error occurred.',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
