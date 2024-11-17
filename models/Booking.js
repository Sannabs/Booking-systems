const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
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
    enum: ['Digital Solutions', 'Information Technology', 'Blockchain & Engineering'],
    required: true,
  },
  digitalService: {
    type: String,
    enum: [
      'webDevelopment',
      'eCommerce',
      'mobileApplications',
      'digitalMarketing',
      'contentManagement',
      'selfServiceSystems',
    ],
  },
  itService: {
    type: String,
    enum: [
      'aiBigData',
      'customSoftware',
      'cloudCybersecurity',
      'businessAutomation',
      'databaseNetwork',
      'digitalForensics',
    ],
  },
  engineeringService: {
    type: String,
    enum: [
      'bitcoinMining',
      'roboticsCommunication',
      'biomedicalEngineering',
      'agroTechnologies',
    ],
  },
  appointmentType: {
    type: String,
    enum: ['Virtual', 'In-person'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
