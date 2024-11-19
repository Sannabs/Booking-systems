const express = require('express');
const Booking = require('../models/Booking')
const User = require('../models/userModel')



module.exports.index = async (req, res) => {
    const bookings = await Booking.find({})
    const totalPending = await Booking.countDocuments({approved:false, unApproved:false});
    const totalApproved = await Booking.countDocuments({approved:true, unApproved:false});

    res.render('pages/index', { bookings, totalApproved, totalPending })
}

module.exports.analytics = async(req, res) => {
    res.render('pages/analytics')
}

module.exports.approved = async (req, res) => {
    const bookings = await Booking.find({approved: true, unApproved: false})
    res.render('pages/approved', { bookings })
}

module.exports.completed = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/completed', { bookings })
}

module.exports.allBookings = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/allBookings', { bookings })
}



module.exports.addBooking = async (req, res) => {
    const booking = new Booking(req.body)
    await booking.save();
    req.flash('success', 'Booked Successfully!')
    res.render('success')
}

module.exports.details = async (req, res) => {
    const { id } = req.params
    const booking = await Booking.findById(id)
    res.render('pages/details', { booking })
}


module.exports.approveBooking = async (req, res) => {
    const { id } = req.params;
    await Booking.findByIdAndUpdate(id, { approved: true, unApproved: false }, { new: true });
    req.flash('success', 'Booking approved!');
    res.redirect('/bookings/pending'); 
};

module.exports.unApprovedBooking = async (req, res) => {
    const { id } = req.params;
    await Booking.findByIdAndUpdate(id, { unApproved: true, approved: false }, { new: true });
    req.flash('success', 'Booking unapproved!');
    res.redirect('/bookings/pending'); 
};

module.exports.getPendingBookings = async (req, res) => {
    const pendingBookings = await Booking.find({
        approved: false,
        unApproved: false,
    });
    res.render('pages/pending', { pendingBookings });
};




module.exports.bookForm = (req, res) => {
    res.render('pages/form')
}

module.exports.showUsers = async (req, res) => {
    const users = await User.find({})
    res.render('pages/showUsers', { users })
}

