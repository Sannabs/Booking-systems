const User = require('../models/userModel')
const axios = require('axios')
const UAParser = require('ua-parser-js');
const Log = require('../models/Logs')

module.exports.renderRegister = (req, res) => {
    res.render('auths/register')
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password, position, role = "user" } = req.body;
        const user = new User({ email, username, position, role });
        const registeredUser = await User.register(user, password);
        req.flash('success', `User ${username} has been successfully created by admin.`);
        res.redirect('/bookings/allUsers'); 
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('auths/login')
}

async function fetchIpInfo(ip) {
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_TOKEN}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching IP info:', error.message);
        return { city: 'Unknown', country: 'Unknown', loc: '0.0000,0.0000' };
    }
}

module.exports.login = async (req, res) => {
    try {
        const user = req.user; // Passport sets this on successful login
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress; // Get the correct IP
        const userAgent = req.headers['user-agent'];

        const ipInfo = await fetchIpInfo(ip);
        if (ip === '::1' || ip === '127.0.0.1') {
            ipInfo.city = 'Localhost';
            ipInfo.country = 'Local';
            ipInfo.loc = '0.0000,0.0000'; // Default location for localhost
        }

        const [latitude, longitude] = ipInfo.loc ? ipInfo.loc.split(',') : [null, null];

        const parser = new UAParser(userAgent);
        const deviceInfo = parser.getResult();

        // Create the log
        const log = new Log({
            userId: user._id,
            ipAddress: ip,
            deviceName: deviceInfo.device.model || 'Hp EliteBook',
            browser: {
                name: deviceInfo.browser.name || 'Unknown Browser',
                version: deviceInfo.browser.version || 'Unknown Version',
            },
            device: {
                model: deviceInfo.device.model || 'Unknown Model',
                type: deviceInfo.device.type || 'Unknown Type',
            },
            os: {
                name: deviceInfo.os.name || 'Unknown OS',
                version: deviceInfo.os.version || 'Unknown Version',
            },
            cpu: {
                architecture: deviceInfo.cpu.architecture || 'Unknown Architecture',
            },
            location: {
                city: ipInfo.city,
                country: ipInfo.country,
                coordinates: {
                    latitude: latitude ? parseFloat(latitude) : null,
                    longitude: longitude ? parseFloat(longitude) : null,
                },
            },
        });

        await log.save();

        // Flash message and redirect
        req.flash('success', `Welcome back ${user.username}!`);
        const redirectUrl = res.locals.returnTo || '/bookings';
        delete req.session.returnTo;
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error logging in:', error.message);
        req.flash('error', 'An error occurred during login.');
        res.redirect('/auths/login');
    }
};



module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'GoodBye!');
        res.redirect('/bookings');
    })
}
