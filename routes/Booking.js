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



router.get(('/pending'),catchAsync(booking.getPendingBookings))
router.get(('/approved'), catchAsync(booking.approved))
router.get(('/completed'), catchAsync(booking.completed))
router.get(('/allBookings'), catchAsync(booking.allBookings))
router.get(('/analytics'), catchAsync(booking.analytics))
router.get('/trends', catchAsync(booking.getBookingTrends));



router.get('/book', booking.bookForm)
router.get('/allUsers', booking.showUsers)


router.route('/pending/:id')
    .get(catchAsync(booking.details))


router.route('/pending/:id/approve')
    .post(isLoggedIn, catchAsync(booking.approveBooking));
router.route('/pending/:id/unapprove')
    .post(isLoggedIn, catchAsync(booking.unApprovedBooking));


module.exports = router;