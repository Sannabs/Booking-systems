
const ExpressError = require('../utils/ExpressError')
const Booking = require("../models/Booking")
const User = require("../models/userModel")


module.exports.checkPermission = (permission) => {
    return async (req, res, next) => {
        if (!req.isAuthenticated() || !req.user) {
            req.flash('error', 'You must be signed in first!');
            return res.redirect('/login');
        }

        const hasPermission = req.user.customPermissions.includes(permission);

        if (hasPermission) {
            return next();
        }

        req.flash('error', 'You do not have the required permission.');
        return res.redirect('/bookings');
    };
};
