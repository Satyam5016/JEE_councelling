import axios from 'axios';

const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    
    // Smart fallback for production
    if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
        console.warn('⚠️ [API] VITE_API_URL is missing in production! API calls will likely fail.');
        // If the backend is on the same Vercel project (monorepo), we might use current origin
        // But for this project, they are separate. We keep the fallback to help debugging.
    }
    
    return 'http://localhost:5001';
};

const API_BASE_URL = getBaseUrl();
console.log(`[API] Initialized with Base URL: ${API_BASE_URL}`);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Attach Clerk session token to every request.
 * Call this once after getting the Clerk session.
 */
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

// ─── User APIs ───────────────────────────────────────
export const syncUser = (userData) => api.post('/api/user/sync', userData);
export const getProfile = () => api.get('/api/user/profile');

// ─── Contact API ─────────────────────────────────────
export const submitContact = (contactData) => api.post('/api/contact', contactData);

// ─── Booking API ─────────────────────────────────────
export const bookCounselling = (bookingData) => api.post('/api/book-counselling', bookingData);

// ─── Payment APIs ────────────────────────────────────
export const createOrder = (plan) => api.post('/api/payment/create-order', { plan });
export const verifyPayment = (paymentData) => api.post('/api/payment/verify', paymentData);

// ─── Video APIs ──────────────────────────────────────
export const getVideos = (params) => api.get('/api/videos', { params });
export const getVideoById = (id) => api.get(`/api/videos/${id}`);

export default api;
