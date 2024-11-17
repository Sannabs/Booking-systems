const express = require('express');
const Booking = require('../models/Booking')
const User = require('../models/userModel')



module.exports.index = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/index', { bookings })
}


module.exports.pending = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/pending', { bookings })
}

module.exports.approved = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/approved', { bookings })
}

module.exports.completed = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/completed', { bookings })
}

module.exports.cancelled = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/cancelled', { bookings })
}



module.exports.addBooking = async (req, res) => {
    const booking = new Booking(req.body.booking)
    await booking.save();
    req.flash('success', 'Booked Successfully!')
    res.redirect('success')
}

module.exports.approveBooking = async (req, res) => {
    const {id} = req.body
    const booking = await Booking.findOneAndUpdate(id)
    req.flash('success', 'Booked Successfully!')
}

module.exports.bookForm = (req, res) => {
    res.render('pages/form')
}

module.exports.showUsers = async (req, res) => {
    const users = await User.find({})
    res.render('pages/showUsers', { users })    
}

