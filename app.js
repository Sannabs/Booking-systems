const dotenv = require('dotenv').config();
const path = require('path')
const mongoose = require('mongoose');
const express = require('express')
const ejsMate = require('ejs-mate')
const ejs = require('ejs')
const cookieParser = require('cookie-parser');
const Booking = require('./models/Booking')
const app = express()
const ExpressError = require('./utils/ExpressError');
const BookingRoutes = require('./routes/Booking');
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoute")



mongoose.connect('mongodb://127.0.0.1:27017/Coder')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});



app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'src')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());
app.use(express.json());



// routes
app.use('/bookings', BookingRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)





app.get('/', (req, res) => {
    res.render('home')
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No Something Went Wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(5000, () => {
    console.log("LISTENING ON PORT 3000");
})