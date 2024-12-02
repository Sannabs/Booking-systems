const ExpressError = require('../utils/ExpressError')
const Booking = require("../models/Booking")

module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}



// module.exports.validateBooking = (req, res, next) => {
//     const { error } = .validate(req.body)
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next()
//     }
// }


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'you must be signed in first!')
        return res.redirect('/login')
    }
    next();
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
        return next();
    }
    req.flash('error', 'You do not have permission for that.');
    res.redirect('/bookings');
}


module.exports.isAllowed = (req, res, next) => {
    if(req.isAuthenticated() && req.user && (req.user.role === 'admin' || req.user.role === 'generalManager')) {
        return next()
    }
    req.flash('error', 'You are not authorized to do that.')
    res.redirect('/bookings')
}
