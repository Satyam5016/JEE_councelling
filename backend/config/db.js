import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (mongoose.connection.readyState === 1) {
        console.log('✅ Using existing MongoDB connection');
        return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not defined!');
    }

    // Diagnostic: Log a redacted version of the URI to verify it's loaded
    const redactedUri = process.env.MONGODB_URI.replace(/:([^@]+)@/, ':****@');
    console.log(`Establishing new MongoDB connection with URI: ${redactedUri.substring(0, 30)}...`);

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`✅ MongoDB Connected: ${db.connection.host}`);
        return db.connection;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        throw error;
    }
};

export default connectDB;
