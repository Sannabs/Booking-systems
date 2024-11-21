require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const Booking = require('../models/Booking')
const User = require('../models/userModel')



module.exports.index = async (req, res) => {
    const bookings = await Booking.find({})
    const totalPending = await Booking.countDocuments({ approved: false, unApproved: false });
    const totalApproved = await Booking.countDocuments({ approved: true, unApproved: false });
    const totalbookings = await Booking.countDocuments();
    res.render('pages/index', { bookings, totalApproved, totalPending, totalbookings })
}


module.exports.analytics = async (req, res) => {
    // Total number of bookings
    const totalBookings = await Booking.countDocuments();

    // Find number of unique users
    const uniqueUsers = await Booking.aggregate([
        { $group: { _id: "$email" } },
        { $count: "uniqueUsers" }
    ]);

    const totalUniqueUsers = uniqueUsers.length > 0 ? uniqueUsers[0].uniqueUsers : 0;

    // Count repeat customers (users with more than one booking)
    const repeatCustomers = await Booking.aggregate([
        { $group: { _id: "$email", count: { $sum: 1 } } },
        { $match: { count: { $gt: 1 } } },
        { $count: "repeatCustomers" }
    ]);

    const totalRepeatCustomers = repeatCustomers.length > 0 ? repeatCustomers[0].repeatCustomers : 0;

    // Calculate percentage of repeat customers
    const repeatCustomerPercentage = totalBookings > 0 ? (totalRepeatCustomers / totalBookings) * 100 : 0;

    // Most booked services
    const mostBookedServices = await Booking.aggregate([
        { $group: { _id: "$service", totalBookings: { $sum: 1 } } },
        { $sort: { totalBookings: -1 } }, // Sort by the total bookings, descending
        { $limit: 5 }  // Top 5 most booked services
    ]);

    res.render('pages/analytics', {
        totalBookings,
        totalUniqueUsers,
        totalRepeatCustomers,
        repeatCustomerPercentage,
        mostBookedServices  // Pass most booked services to the view
    });
};

module.exports.getMostBookedServices = async (req, res) => {
    try {
        const mostBookedServices = await Booking.aggregate([
            { $group: { _id: "$service", count: { $sum: 1 } } }, // Group bookings by service
            { $sort: { count: -1 } }, // Sort by count in descending order
            { $limit: 10 } // Limit the number of services shown
        ]);
        res.json(mostBookedServices);
    } catch (error) {
        console.error("Error fetching most booked services:", error);
        res.status(500).send("Server Error");
    }
};



module.exports.approved = async (req, res) => {
    const bookings = await Booking.find({ approved: true, unApproved: false })
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
    const booking = new Booking(req.body);
    await booking.save();

    // Set up the email transport using Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Define the email content
    const mailOptions = {
        from: 'your-email@gmail.com',  // Sender's email
        to: 'ousainoubsj@gmail.com',   // Recipient's email (the one to be notified)
        subject: 'New Booking Notification',
        html: `<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            padding: 20px;
        }
        .email-container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
            margin: auto;
        }
        h2 {
            color: #3a86ff;
            font-size: 24px;
            text-align: center;
        }
        .booking-details {
            margin-top: 20px;
            font-size: 16px;
            color: #555;
            line-height: 1.5;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h2>New Booking Notification</h2>
        <div class="booking-details">
            <p>A new booking has been made from <strong>${booking.company}</strong>. The customer has booked a <strong>${booking.service}</strong> Service. Please review the booking details and proceed accordingly.</p>
        </div>
        <div class="footer">
            <p>This is an automatic email, please do not reply.</p>
        </div>
    </div>
</body>
</html>
`
    };


    // Send the email notification
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    req.flash('success', 'Booked Successfully!');
    res.render('success');
};

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

module.exports.getBookingTrends = async (req, res) => {
    try {
        const { period } = req.query; // 'daily', 'weekly', 'monthly', or 'seasonal'

        const groupByFormat = {
            daily: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            weekly: { $isoWeek: "$createdAt" },
            monthly: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            seasonal: { $dateToString: { format: "%m", date: "$createdAt" } }, // Group by month for seasonal
        };

        const groupKey = groupByFormat[period] || groupByFormat.daily;

        const trends = await Booking.aggregate([
            { $group: { _id: groupKey, totalBookings: { $sum: 1 } } },
            { $sort: { _id: 1 } },
        ]);

        res.json(trends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch booking trends" });
    }

};

module.exports.getBookingAnalyticsData = async (req, res) => {
    try {
        const { period } = req.query; // 'daily', 'weekly', 'monthly', or 'seasonal'

        const groupByFormat = {
            daily: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            weekly: { $isoWeek: "$createdAt" },
            monthly: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            seasonal: { $dateToString: { format: "%m", date: "$createdAt" } }, // Group by month for seasonal
        };

        const groupKey = groupByFormat[period] || groupByFormat.daily; // Default to daily if no period is specified

        // Aggregate the data to get the total bookings for the selected period
        const analyticsData = await Booking.aggregate([
            { $group: { _id: groupKey, totalBookings: { $sum: 1 } } },
            { $sort: { _id: 1 } }, // Sort the data by the group (time)
        ]);

        // Send the analytics data as JSON to the frontend
        res.json(analyticsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch analytics data" });
    }
};

module.exports.getBookingSummaryData = async (req, res) => {
    try {
        // Fetch the total number of bookings
        const totalBookings = await Booking.countDocuments();

        // Fetch the total number of pending bookings (approved: false, unApproved: false)
        const totalPending = await Booking.countDocuments({ approved: false, unApproved: false });

        // Fetch the total number of approved bookings (approved: true, unApproved: false)
        const totalApproved = await Booking.countDocuments({ approved: true, unApproved: false });

        // Send the data as JSON to the frontend
        res.json({
            totalBookings,
            totalPending,
            totalApproved
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch booking summary data" });
    }
};

module.exports.repeatedUsers = async (req, res) => {
    try {
        const repeatedUsers = await Booking.aggregate([
            {
                $group: {
                    _id: "$email", // Group by email
                    company: { $first: "$company" }, // Take the first company value (assuming it's the same for the user)
                    fullname: { $first: "$fullname" }, // Take the first fullname value
                    bookings: { $push: "$$ROOT" }, // Store all bookings of the user in an array
                    totalBookings: { $sum: 1 } // Count the number of bookings for this user
                }
            },
            {
                $match: {
                    totalBookings: { $gt: 1 } // Only select users with more than one booking
                }
            }
        ]);

        // Render the repeated users page with the repeated bookings data
        res.render('pages/repeatedUsers', { repeatedUsers });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching repeated users");
    }
};
