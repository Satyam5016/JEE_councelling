import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    paymentId: {
        type: String,
        default: null,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['created', 'paid', 'failed'],
        default: 'created',
    },
    plan: {
        type: String,
        enum: ['basic', 'elite', 'premium', 'doc_verif', 'admission', 'branch', 'hostel'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
