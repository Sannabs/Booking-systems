const  ExpressError =require('../utils/ExpressError')
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

// function isAdmin(req, res, next) {
//     if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
//         return next();
//     }
//     req.flash('error', 'You do not have permission to perform this action.');
//     res.redirect('/dashboard');
// }
  



// // REVIEW SERVER SIDE VALIDATOIN WITH JOI
// module.exports.validateReview = (req, res, next) => {
//     const { error } = reviewSchema.validate(req.body)
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next()
//     }

// }