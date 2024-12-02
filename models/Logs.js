const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Ensure to link to the User model
    },
    ipAddress: {
        type: String,
        required: true,
    },
    deviceName: {
        type: String,
        required: true,
    },
    browser: {
        name: { type: String, required: true },
        version: { type: String, required: true },
    },
    device: {
        model: { type: String, required: true },
        type: { type: String, required: true }, // e.g., mobile, tablet, desktop
    },
    os: {
        name: { type: String, required: true },
        version: { type: String, required: true },
    },
    cpu: {
        architecture: { type: String, required: true }, // e.g., x86_64, arm
    },
    location: {
        city: { type: String, required: false },
        country: { type: String, required: false },
        coordinates: {
            latitude: { type: Number, required: false },
            longitude: { type: Number, required: false },
        },
    },
    loginTime: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

module.exports = mongoose.model('Log', logSchema);
