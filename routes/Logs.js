const express = require('express');
const catchAsync = require('../utils/catchAsync');
const log = require('../controllers/Logs')
const { isLoggedIn, isAdmin, isAllowed } = require('../middlewares/authMiddlewares');
const {checkPermission} = require('../middlewares/rbca')


const router = express.Router();

router.get('/logs', isLoggedIn, catchAsync(log.Log))


module.exports = router