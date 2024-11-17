const express = require('express');
const Booking = require('../models/Booking')
const booking = require('../controllers/Booking')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const {isLoggedIn, isAdmin} = require('../middlewares/authMiddlewares')

const router = express.Router();

router.route('/')
    .get(catchAsync(booking.index))

    .post(catchAsync(booking.addBooking))


router.get(('/pending'),catchAsync(booking.pending))
router.get(('/approved'), catchAsync(booking.approved))
router.get(('/completed'), catchAsync(booking.completed))
router.get(('/cancelled'), catchAsync(booking.cancelled))


router.get('/book', booking.bookForm)
router.get('/allUsers', isLoggedIn, booking.showUsers)

router.route('/:id')
    .get(catchAsync(booking.details))
    .put(isLoggedIn, catchAsync(booking.approveBooking))


module.exports = router;