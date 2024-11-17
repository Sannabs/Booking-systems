const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
        enum: [
            "Digital Solutions",
            "Information Technology",
            "Blockchain & Engineering",
        ],
    },
    digitalService: {
        type: String,
        enum: [
            "webDevelopment",
            "eCommerce",
            "mobileApplications",
            "digitalMarketing",
            "contentManagement",
            "selfServiceSystems",
        ],
        required: function () {
            return this.service === "Digital Solutions";
        },
    },
    itService: {
        type: String,
        enum: [
            "aiBigData",
            "customSoftware",
            "cloudCybersecurity",
            "businessAutomation",
            "databaseNetwork",
            "digitalForensics",
        ],
        required: function () {
            return this.service === "Information Technology";
        },
    },
    engineeringService: {
        type: String,
        enum: [
            "bitcoinMining",
            "roboticsCommunication",
            "biomedicalEngineering",
            "agroTechnologies",
        ],
        required: function () {
            return this.service === "Blockchain & Engineering";
        },
    },
    appointmentType: {
        type: String,
        required: true,
        enum: ["Virtual", "In-person"],
    },
    description: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Booking', BookingSchema);
