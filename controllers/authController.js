const User = require('../models/userModel')

module.exports.renderRegister = (req, res) => {
    res.render('auths/register')
}

module.exports.register = async (req, res) => {
    try {
        const { email, username, password, role = 'admin' } = req.body; // default role if not provided
        const user = new User({ email, username, role });
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', `Welcome ${req.user.username}`)
            res.redirect('/bookings')
        });
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('auths/login')
}

module.exports.login = (req, res) => {
    req.flash('success', `Welcome back ${req.user.username}!`);
    const redirectUrl = res.locals.returnTo || '/bookings';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'GoodBye!')
        res.redirect('/bookings')
    })
}