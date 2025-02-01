if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

// const dotenv = require('dotenv').config();
const flash = require('connect-flash');
const path = require('path')
const mongoose = require('mongoose');
const express = require('express')
const { storeReturnTo } = require('./middlewares/authMiddlewares');
const ejsMate = require('ejs-mate')
const ejs = require('ejs')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const localStrategy = require('passport-local')
const mongoStore = require('connect-mongo');
const Booking = require('./models/Booking')
const User = require('./models/userModel')
const app = express()
const ExpressError = require('./utils/ExpressError');
const BookingRoutes = require('./routes/Booking');
const authRoutes = require("./routes/authRoutes")
// const MeetingRoutes = require('./routes/Meeting')

mongoose.connect('mongodb://127.0.0.1:27017/Coder')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected");
});



app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'src')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser());


// cookie set up
const sessionConfig = {
    name: 'session',
    secret: "thisisasecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        // THAT WAY A USER WONT BE LOGGED IN FOREVER. WE DONT WANT THAT
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash())
app.use(ipExtractor);



app.use(passport.initialize())
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id).select('username email role customPermissions');
        done(null, user);
    } catch (err) {
        done(err);
    }
});


app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

app.use(storeReturnTo)  //REMOVE ME


// routes
app.use('/bookings', BookingRoutes)
// app.use('/meetings', MeetingRoutes)
app.use('/', authRoutes)
app.use ('/api', logRoutes)





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
    console.log("LISTENING ON PORT 5000");
})