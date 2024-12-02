const express = require('express');
const Booking = require('../models/Booking')
const User = require('../models/userModel')


// RBAC(ROLE BASE ACCESS CONTROL)
module.exports.getUserPermissions = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ permissions: user.customPermissions || [] });
};

module.exports.assignPermissions = async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    const currentPermissions = user.customPermissions || [];

    const permissionsToAdd = permissions.filter(permission => !currentPermissions.includes(permission));
    if (permissionsToAdd.length > 0) {
        await User.findByIdAndUpdate(id, {
            $addToSet: { customPermissions: { $each: permissionsToAdd } }
        });
    }
    const permissionsToRemove = currentPermissions.filter(permission => !permissions.includes(permission));
    if (permissionsToRemove.length > 0) {
        await User.findByIdAndUpdate(id, {
            $pull: { customPermissions: { $in: permissionsToRemove } }
        });
    }
    return res.status(200).json({ message: 'Permissions updated successfully!' });
};



module.exports.edit = async (req, res) => {
    const users = User.find({})
    res.render('pages/edit')
}


// OTHER CONTROLLERS 

module.exports.index = async (req, res) => {
    const bookings = await Booking.find({})
    const totalPending = await Booking.countDocuments({approved:false, unApproved:false});
    const totalApproved = await Booking.countDocuments({approved:true, unApproved:false});
    const totalbookings = await Booking.countDocuments();
    res.render('pages/index', { bookings, totalApproved, totalPending, totalbookings })
}

module.exports.search = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.json([]);
    }
    try {
        const bookings = await Booking.find({
            $or: [
                { company: { $regex: query, $options: 'i' } },
                { service: { $regex: query, $options: 'i' } }
            ]
        }).select('_id company service').limit(10);
        res.json(bookings);
    } catch (e) {
        res.status(500).send('SERVER ERROR');
        console.error(e)
    }
}

module.exports.searchUser = async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.json([]);
    }
    try {
        const bookings = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('_id username email').limit(10);
        res.json(bookings);
    } catch (e) {
        res.status(500).send('SERVER ERROR');
        console.error(e)
    }
}


module.exports.analytics = async(req, res) => {
    res.render('pages/analytics')
}

module.exports.userDetails = async(req, res) => {
    res.render('pages/userDetails')
}

module.exports.approved = async (req, res) => {
    const bookings = await Booking.find({approved: true, unApproved: false})
    res.render('pages/approved', { bookings })
}

module.exports.completed = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/completed', { bookings })
}

module.exports.allBookings = async (req, res) => {
    const bookings = await Booking.find({})
    res.render('pages/allBookings', { bookings })
}



module.exports.addBooking = async (req, res) => {
    const booking = new Booking(req.body)
    await booking.save();
    req.flash('success', 'Booked Successfully!')
    res.render('success')
}

module.exports.details = async (req, res) => {
    const { id } = req.params
    const booking = await Booking.findById(id)
    res.render('pages/details', { booking })
}


module.exports.approveBooking = async (req, res) => {
    const { id } = req.params;
    await Booking.findByIdAndUpdate(id, { approved: true, unApproved: false }, { new: true });
    req.flash('success', 'Booking approved!');
    res.redirect('/bookings/pending'); 
};

module.exports.unApprovedBooking = async (req, res) => {
    const { id } = req.params;
    await Booking.findByIdAndUpdate(id, { unApproved: true, approved: false }, { new: true });
    req.flash('success', 'Booking unapproved!');
    res.redirect('/bookings/pending'); 
};

module.exports.getPendingBookings = async (req, res) => {
    const pendingBookings = await Booking.find({
        approved: false,
        unApproved: false,
    });
    res.render('pages/pending', { pendingBookings });
};




module.exports.bookForm = (req, res) => {
    res.render('pages/form')
}

module.exports.showUsers = async (req, res) => {
    const users = await User.find({})
    res.render('pages/showUsers', { users })
}

