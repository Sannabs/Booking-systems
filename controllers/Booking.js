const express = require('express');
const Booking = require('../models/Booking')

module.exports.index = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/index', { bookings })
}