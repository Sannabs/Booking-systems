const express = require('express');
const Booking = require('../models/Booking')
const booking = require('../controllers/Booking')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const router = express.Router();

router.route('/')
    .get(catchAsync(booking.index))
    .post(catchAsync(booking.addBooking))

router.get('/book', booking.bookForm)
router.get('/allUsers', booking.showUsers)

router.route('/:id')
    .get(catchAsync(booking.details))
    .put(catchAsync(booking.update))
    .delete(catchAsync(booking.delete)); 


module.exports = router;