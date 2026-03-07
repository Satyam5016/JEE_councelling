import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Video from './models/Video.js';

dotenv.config();

const videos = [
    {
        title: "JoSAA Counselling 2024: Step-by-Step Guide",
        description: "Everything you need to know about the JoSAA counselling process, registration, and choice filling.",
        youtubeId: "dQw4w9WgXcQ",
        category: "Counselling Strategy",
        duration: "15:45",
        accessLevel: "basic"
    },
    {
        title: "Top 10 NITs: Placement & Campus Review",
        description: "Detailed analysis of top NITs in India including NIRF rankings and placement stats.",
        youtubeId: "l482T0yNkeo",
        category: "College Reviews",
        duration: "12:10",
        accessLevel: "basic"
    },
    {
        title: "Elite: Choice Filling Masterclass",
        description: "Advanced strategies for choice filling to get the best possible college at your rank.",
        youtubeId: "C0DPdy98e4c",
        category: "Premium Strategy",
        duration: "25:30",
        accessLevel: "elite"
    },
    {
        title: "Premium: 1-on-1 Strategy Secret Session",
        description: "Exclusive guidance on handling common counselling pitfalls and branch vs college dilemmas.",
        youtubeId: "jNQXAC9IVRw",
        category: "Premium Strategy",
        duration: "45:00",
        accessLevel: "premium"
    },
    {
        title: "IIT Bombay Campus Tour & Life",
        description: "Vlog showing the life of an IITian at the prestigious IIT Bombay campus.",
        youtubeId: "YE7VzlLtp-4",
        category: "College Reviews",
        duration: "08:50",
        accessLevel: "basic"
    },
    {
        title: "Branch Probability: How to Predict Your Branch",
        description: "Learn how to use mathematical probability to find your chances of getting a specific branch.",
        youtubeId: "QH2-TGUlwu4",
        category: "Rank & Prediction",
        duration: "18:20",
        accessLevel: "elite"
    }
];

const seedVideos = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing videos
        await Video.deleteMany({});
        console.log('Cleared existing videos.');

        // Insert new videos
        await Video.insertMany(videos);
        console.log('Seeded videos successfully!');

        process.exit();
    } catch (error) {
        console.error('Error seeding videos:', error);
        process.exit(1);
    }
};

seedVideos();
