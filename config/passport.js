const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy( { usernameField: 'email'}, (email, password, done) => {
            // Match User
            User.findOne({ email: email })
            .then(user => {
                if(!user) {
                    // 'null' for the error, 'false' for the user, 'msg' object for the option (to render msg); 'done' callback is always returned from passport; the arguments, however, differ given circumstances.
                    return done(null, false, { message: 'That email is not registered'});
                }

                // Match password (password is that entered by person attempting to log in; user.password is the actual password for the user as per the database)
                bcrypt.compare(password, user.password, (err, isMatch) => {
                
                if(err) throw error;

                if(isMatch) {
                    // null for error, user for the account the person has successfully logged into
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password Incorrect.'});
                }
            })
        })
            .catch(err => console.log(err))
        } )
    )



    passport.serializeUser((user, done) => {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, (err, user) => {
          done(err, user);
        });
      });
}