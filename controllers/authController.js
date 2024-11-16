const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600 * 1000 
        });

        res.redirect('/bookings');
    } catch (err) {
        console.error(err);
        res.status(500).render('errorPage', { message: "Something went wrong during registration!!" });
    }
};

const renderRegisterPage = (req, res) => {
    res.render('auths/register');
}


const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).render('loginFailure', { message: `User with username ${username} not found` });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).render('loginFailure', { message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id, role: user.role },
            process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.redirect('/bookings');
    } catch (err) {
        console.error(err);
        res.status(500).render('errorPage', { message: "Something went wrong during login!!" });
    }
};

const renderLoginPage = (req, res) => {
    res.render('auths/login');
}

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 0 
    });
    res.redirect('/bookings');
};



module.exports = {
    register,
    login,
    logout,
    renderRegisterPage,
    renderLoginPage
};
