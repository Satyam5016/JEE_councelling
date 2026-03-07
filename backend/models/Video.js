import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    youtubeId: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['Rank & Prediction', 'College Reviews', 'Counselling Strategy', 'Branch Guidance', 'Premium Strategy'],
    },
    duration: {
        type: String,
        required: true,
    },
    accessLevel: {
        type: String,
        enum: ['basic', 'elite', 'premium'],
        default: 'basic',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
