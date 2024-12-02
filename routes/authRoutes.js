const express = require('express');
const catchAsync = require('../utils/catchAsync');
const { storeReturnTo, isLoggedIn, isAdmin } = require('../middlewares/authMiddlewares');
const user = require('../controllers/authController')
const passport = require('passport');
const router = express.Router();


router.route('/register')
    .get(isLoggedIn, isAdmin, (user.renderRegister))
    .post(catchAsync(user.register))


// LOGIN THINGY

router.route('/login')
    .get(user.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
    }), user.login);

// LOGOUT
router.get('/logout', user.logout)


module.exports = router;