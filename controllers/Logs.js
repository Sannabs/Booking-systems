const User = require('../models/userModel');
const Log = require('../models/Logs');

module.exports.Log = async (req, res) => {
    const logs = await Log.find().populate('userId', 'username email').sort({ createdAt: -1 });
    res.render('logs/log', { logs })
}