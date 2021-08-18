const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const currDate = require('./currDate');

const app = express();


// Passport config
require('./config/passport')(passport);

// DB CONFIG
const db = require('./config/keys').MongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB Connected ...'))
.catch(err => console.log(err));


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');


// Bodyparser
app.use(express.urlencoded({ extended: false}));

// Access static files (CSS)
app.use(express.static(path.join(__dirname + '/public')));


// Express Session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars (to differentiate colors of error messages and success message)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.success_msg_d = req.flash('success_msg_d');
  res.locals.success_msg_dash = req.flash('success_msg_dash');
  res.locals.success_msg_dash_d = req.flash('success_msg_dash_d');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error_msg_d = req.flash('error_msg_d');
  res.locals.error = req.flash('error');
  res.locals.error_d = req.flash('error_d');
    next();
})

// Routes
app.use('/', require('./routes/index')); // display what's specified in routes/index in the browser when default route

app.use('/users', require('./routes/users')); // display what's specified in routes/index in the browser when register or login route


// Run on the specified port, or 9000 on localhost
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));