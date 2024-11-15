const express = require('express');
const { register, login, logout, renderLoginPage, renderRegisterPage } = require('../controllers/authController');
const router = express.Router();


router.route('/register')
    .get(renderRegisterPage)
    .post(register);


router.route('/login')
    .get(renderLoginPage)
    .post(login);

router.get('/logout', logout)






module.exports = router;