const express = require('express');
const Booking = require('../models/Booking')

module.exports.index = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/index', { bookings })
}

module.exports.addBooking = async (req, res) => {
    const booking = new Booking(req.body.booking)
    await booking.save();
    res.redirect('https://www.codersclutch.com')
}

module.exports.bookForm = async (req, res) => {
    res.render('pages/form')
}