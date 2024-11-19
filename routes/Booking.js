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
router.get(('/allBookings'), catchAsync(booking.allBookings))

router.get('/book', booking.bookForm)
router.get('/allUsers', booking.showUsers)


router.route('/pending/:id')
    .get(catchAsync(booking.details))
    .put(isLoggedIn, catchAsync(booking.approveBooking))
    .put(isLoggedIn, catchAsync(booking.unApprovedBooking))


module.exports = router;