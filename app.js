const path = require('path')
const mongoose = require('mongoose');
const express = require('express')
const ejsMate = require('ejs-mate')
const ejs = require('ejs')
const Booking = require('./models/Booking')
const app = express()
const BookingRoutes = require('./routes/Booking');
const ExpressError = require('./utils/ExpressError');




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

app.use('/bookings', BookingRoutes)





app.get('/', (req, res) => {
    res.render('index')
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