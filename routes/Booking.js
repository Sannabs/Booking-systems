const express = require('express');
const Booking = require('../models/Booking');
const booking = require('../controllers/Booking');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAdmin, isAllowed } = require('../middlewares/authMiddlewares');
const {checkPermission} = require('../middlewares/rbca')

const router = express.Router();



// ROUTES FOR THE BOOKINGS
// Public Routes
router.route('/')
    .get(catchAsync(booking.index))
    .post(catchAsync(booking.addBooking));


// RBCA
router.route('/user/:id/access')
    .post(isLoggedIn, isAdmin, catchAsync(booking.assignPermissions));

router.route('/user/:id/permissions')
    .get(isLoggedIn, isAdmin, catchAsync(booking.getUserPermissions));
// router.get('/user/:id/edit', booking.edit)


router.get('/pending', checkPermission('canSeePendings'), catchAsync(booking.getPendingBookings));
router.get('/approved', checkPermission('canSeeApproved'), catchAsync(booking.approved));
router.get('/completed', checkPermission('canSeeCompleted'), catchAsync(booking.completed));
router.get('/search', catchAsync(booking.search));
router.get('/book', booking.bookForm);
router.route('/pending/:id')
    .get(checkPermission('canViewDetails'), catchAsync(booking.details));

router.get('/allBookings', isLoggedIn, checkPermission('canSeeAllBookings'), catchAsync(booking.allBookings));
router.get('/analytics', isLoggedIn, checkPermission('canViewAnalytics'), catchAsync(booking.analytics));
router.get('/users/searchUser', isLoggedIn, catchAsync(booking.searchUser));
router.get('/userDetail', isLoggedIn, checkPermission('canSeeUserDetails'), catchAsync(booking.userDetails));

router.get('/allUsers', isLoggedIn, checkPermission('canSeeAllUsers'), booking.showUsers);
router.route('/pending/:id/approve')
    .post(isLoggedIn, checkPermission('canApproveBooking'), catchAsync(booking.approveBooking));
router.route('/pending/:id/unapprove')
    .post(isLoggedIn, checkPermission('canUnApproveBooking'), catchAsync(booking.unApprovedBooking));

module.exports = router;
