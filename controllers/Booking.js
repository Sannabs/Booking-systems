const express = require('express');
const Booking = require('../models/Booking')
const User = require('../models/userModel')



module.exports.index = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/index', { bookings })
}

module.exports.addBooking = async (req, res) => {
    const booking = new Booking(req.body.booking)
    await booking.save();
    res.redirect('https://www.codersclutch.com')
}

module.exports.bookForm = (req, res) => {
    res.render('pages/form')
}

module.exports.showUsers = async (req, res) => {
    const { id } = req.params
    const users = await User.findById(id)
    res.render('pages/showUsers', { users })    
}

