const mongoose = require('mongoose')
const { type } = require('os')

const  BookingSchema = new mongoose.Schema ( {
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true,
        enum: ['Option 1', 'Option 2', 'Option 3']
    },
    description: {
        type: String,
        required: true
    },
    appointmentType: {
        type: String,
        required: true,
        enum: ['Option 1', 'Option 2']
    },
    approved: {
        type: Boolean,
        default: false
    }
})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking