const express = require('express');

const router = express.Router();

const User = require('../models/User');

const bcrypt = require('bcryptjs');

const passport = require('passport');

// display login route
router.get('/login', (req, res) => res.render('login'));

// display login route (dark)
router.get('/login_d', (req, res) => res.render('loginDark'));

// display register route
router.get('/register', (req, res) => res.render('register'));

// display register route (dark)
router.get('/register_d', (req, res) => res.render('registerDark'));

// display settings route
router.get('/settings', (req, res) => res.render('settings'));

// display settings route (dark)
router.get('/settings_d', (req, res) => res.render('settingsDark'));

// display settings route
router.get('/update_password', (req, res) => res.render('updatePW'));

// display settings route (dark)
router.get('/update_password_d', (req, res) => res.render('updatePWDark'));

// display settings route
router.get('/update', (req, res) => res.render('update'));

// display settings route (dark)
router.get('/update_d', (req, res) => res.render('updateDark'));

//Register Handle
router.post('/register', (req, res) => {
    const {
        name, email, password, password2, nflTeam, nbaTeam, mlbTeam, nhlTeam
    } = req.body;


    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2 || !nflTeam || !nbaTeam || !mlbTeam || !nhlTeam) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    // Verify passwords match
    else if(password && (password !== password2)) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Verify that passwords are long enough
    else if(password.length < 6) {
        errors.push({ msg: 'Password should be 6+ characters long' });
    }

    // console.log(`ERRORS: ${errors}`);

    if(errors.length > 0) {
        res.render(
            'register', {
                errors,
                name,
                email,
                password,
                password2,
                nflTeam,
                nbaTeam,
                mlbTeam,
                nhlTeam
            }
        );
    } else {
        // validation passed
        // use mongoose method "findOne" to ensure that the email for a user attempting to register does not already exist in the database
        User.findOne({ email: email })
        .then(user => {
            // console.log(`User exists?: ${user}`)
            if(user) {
                // user exists
                errors.push({ msg: 'Email already registered.' });
                res.render(
                    'register', {
                        errors,
                        name,
                        email,
                        password,
                        password2,
                        nflTeam,
                        nbaTeam,
                        mlbTeam,
                        nhlTeam
                    }
                );      
            } else {
                // creating new instance of User; i.e. new User
                const newUser = new User({
                    name,
                    email,
                    password,
                    nflTeam,
                    nbaTeam,
                    mlbTeam,
                    nhlTeam
                });

                
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    // Set password to hashed as opposed to plain text
                    newUser.password = hash;

                    // Save user to db
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'Success! You may now log in.');
                        res.redirect('/users/login')
                    })
                    .catch(err => console.log(err));
                }))
            }
        })

        //res.send('pass')
};
});

//Register Dark Handle
router.post('/register_d', (req, res) => {
    const {
        name, email, password, password2, nflTeam, nbaTeam, mlbTeam, nhlTeam
    } = req.body;


        


    let errors = [];

    // Check required fields
    if(!name || !email || !password || !password2 || !nflTeam || !nbaTeam || !mlbTeam || !nhlTeam) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    // Verify passwords match
    else if(password && (password !== password2)) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Verify that passwords are long enough
    else if(password.length < 6) {
        errors.push({ msg: 'Password should be 6+ characters long' });
    }

    // console.log(`ERRORS: ${errors}`);

    if(errors.length > 0) {
        res.render(
            'registerDark', {
                errors,
                name,
                email,
                password,
                password2,
                nflTeam,
                nbaTeam,
                mlbTeam,
                nhlTeam
            }
        );
    } else {
        // validation passed
        // use mongoose method "findOne" to ensure that the email for a user attempting to register does not already exist in the database
        User.findOne({ email: email })
        .then(user => {
            // console.log(`User exists?: ${user}`)
            if(user) {
                // user exists
                errors.push({ msg: 'Email already registered.' });
                res.render(
                    'registerDark', {
                        errors,
                        name,
                        email,
                        password,
                        password2,
                        nflTeam,
                        nbaTeam,
                        mlbTeam,
                        nhlTeam
                    }
                );      
            } else {
                // creating new instance of User; i.e. new User
                const newUser = new User({
                    name,
                    email,
                    password,
                    nflTeam,
                    nbaTeam,
                    mlbTeam,
                    nhlTeam
                });

                
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    // Set password to hashed as opposed to plain text
                    newUser.password = hash;

                    // Save user to db
                    newUser.save()
                    .then(user => {
                        req.flash('success_msg_d', 'Success! You may now log in.');
                        res.redirect('/users/login_d')
                    })
                    .catch(err => console.log(err));
                }))
            }
        })

        //res.send('pass')
};
});



//Update PW Handle
router.post('/update_password', (req, res, next) => {
    const {
        email, newPassword, password, password2
    } = req.body;


    let errors = [];

    

    // Check required fields
    if(!password || !password2 || !newPassword) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    // Verify passwords match
    else if(newPassword && (newPassword !== password2)) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Verify that passwords are long enough
    else if(newPassword.length < 6) {
        errors.push({ msg: 'Password should be 6+ characters long' });
    }


    if(errors.length > 0) {
        res.render(
            'updatePW', {
                errors,
                email,
                password
            }
        );
    } else {
        // validation passed
        // use mongoose method "findOne" to ensure that the email for a user attempting to register does not already exist in the database
        User.findOne({ email: req.body.email })
        .then(user => {

            // extrapolating data from the user as a means of updating
            const updatedUser = {};
            updatedUser.name = req.user.name;
            updatedUser.email = req.user.email;
            updatedUser.password = req.body.newPassword;
            updatedUser.nflTeam = req.user.nflTeam;
            updatedUser.nbaTeam = req.user.nbaTeam;
            updatedUser.mlbTeam = req.user.mlbTeam;
            updatedUser.nhlTeam = req.user.nhlTeam;

            
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(updatedUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    // req.body.newPassword
                    let newPassword = req.body.newPassword;


                    // req.body.password
                    let currPW = req.body.password;
                    

                    const reRender = () => {
                        errors.push({msg: 'Current password incorrect.'}); 
                            
                                res.render(
                                    'updatePW', {
                                        errors,
                                        email
                                    }
                                );
                    }

                    bcrypt.compare(currPW, req.user.password, (err, res) => {
                            if(res === false) {
                                reRender();
                            
                            } else {    
                                console.log('Password update successful.');
                                
                                updatePassword();
                            }            
                        })
                

                    newPassword = hash;
                    updatedUser.password = newPassword;

                    // Save user to db
                 const updatePassword = async () => {
                    await User.findOneAndUpdate({__id: req.params.id}, updatedUser)
                    .then(user => {
                        req.flash('success_msg', 'Success! Please log in with new password.');
                        res.redirect('./update')
                    })
                    .catch(err => console.log(err));
                }

                

                
                   
                }))

                 

            
        })

        
};
});



//Update PW Handle (Dark)
router.post('/update_password_d', (req, res, next) => {
    const {
        email, newPassword, password, password2
    } = req.body;


    let errors = [];

    

    // Check required fields
    if(!password || !password2 || !newPassword) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    // Verify passwords match
    else if(newPassword && (newPassword !== password2)) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Verify that passwords are long enough
    else if(newPassword.length < 6) {
        errors.push({ msg: 'Password should be 6+ characters long' });
    }


    if(errors.length > 0) {
        res.render(
            'updatePWDark', {
                errors,
                email,
                password
            }
        );
    } else {
        // validation passed
        // use mongoose method "findOne" to ensure that the email for a user attempting to register does not already exist in the database
        User.findOne({ email: req.body.email })
        .then(user => {

            // extrapolating data from the user as a means of updating
            const updatedUser = {};
            updatedUser.name = req.user.name;
            updatedUser.email = req.user.email;
            updatedUser.password = req.body.newPassword;
            updatedUser.nflTeam = req.user.nflTeam;
            updatedUser.nbaTeam = req.user.nbaTeam;
            updatedUser.mlbTeam = req.user.mlbTeam;
            updatedUser.nhlTeam = req.user.nhlTeam;

            
                // Hash Password
                bcrypt.genSalt(10, (err, salt) => bcrypt.hash(updatedUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    // req.body.newPassword
                    let newPassword = req.body.newPassword;


                    // req.body.password
                    let currPW = req.body.password;
                    

                    const reRender = () => {
                        errors.push({msg: 'Current password incorrect.'}); 
                            
                                res.render(
                                    'updatePWDark', {
                                        errors,
                                        email
                                    }
                                );
                    }

                    bcrypt.compare(currPW, req.user.password, (err, res) => {
                            if(res === false) {
                                reRender();
                            
                            } else {    
                                console.log('Password update successful.');
                                
                                updatePassword();
                            }            
                        })
                

                    newPassword = hash;
                    updatedUser.password = newPassword;

                    // Save user to db
                 const updatePassword = async () => {
                    await User.findOneAndUpdate({__id: req.params.id}, updatedUser)
                    .then(user => {
                        req.flash('success_msg_d', 'Success! Please log in with new password.');
                        res.redirect('./update_d')
                    })
                    .catch(err => console.log(err));
                }

                

                
                   
                }))

                 

            
        })

        
};
});



//Settings Handle (Dark)
router.post('/settings_d', (req, res, next) => {
    const {
        name, email, password, nflTeam, nbaTeam, mlbTeam, nhlTeam
    } = req.body;


    let errors = [];

    // Check required fields
    if(!name || !email /*|| !password || !password2 */ || !nflTeam || !nbaTeam || !mlbTeam || !nhlTeam) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    // Verify passwords match
/*    else if(password && (password !== password2)) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Verify that passwords are long enough
    else if(password.length < 6) {
        errors.push({ msg: 'Password should be 6+ characters long' });
    }
*/
    // console.log(`ERRORS: ${errors}`);

    if(errors.length > 0) {
        res.render(
            'settingsDark', {
                errors,
                name,
                email,
                password,
                nflTeam,
                nbaTeam,
                mlbTeam,
                nhlTeam
            }
        );
    } else {
        // validation passed
        // use mongoose method "findOne" to ensure that the email for a user attempting to register does not already exist in the database
        User.findOne({ email: email, name: name })
        .then(user => {
            // console.log(`User exists?: ${user}`)

            
            // creating new instance of User; i.e. new User

                const updatedUser = {};
                updatedUser.name = req.body.name;
                updatedUser.email = req.body.email;
                updatedUser.password = req.user.password;
                updatedUser.nflTeam = req.body.nflTeam;
                updatedUser.nbaTeam = req.body.nbaTeam;
                updatedUser.mlbTeam = req.body.mlbTeam;
                updatedUser.nhlTeam = req.body.nhlTeam;

                // console.log(updatedUser);

                
                const updateTeams = async () => {
                    await User.findOneAndUpdate({__id: req.params.id}, updatedUser)
                    .then(user => {
                        req.flash('success_msg_dash_d', 'Changes successful.');
                        res.redirect('../dashboard_d')
                    })
                    .catch(err => console.log(err));
                }

                updateTeams();
                
                // Hash Password
                /*bcrypt.genSalt(10, (err, salt) => bcrypt.hash(updatedUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    // Set password to hashed as opposed to plain text
                    updatedUser.password = hash;

                    // Save user to db
                    /*updatedUser.save()
                    .then(user => {
                        req.flash('success_msg_dark', 'Success! You may now log in.');
                        res.redirect('/dashboard_d')
                    })
                    .catch(err => console.log(err));*/

                //}))
            
        })

        //res.send('pass')
};
});


//Settings Handle (Dark)
router.post('/settings', (req, res, next) => {
    const {
        name, email, password, nflTeam, nbaTeam, mlbTeam, nhlTeam
    } = req.body;


    let errors = [];

    // Check required fields
    if(!name || !email /*|| !password || !password2 */ || !nflTeam || !nbaTeam || !mlbTeam || !nhlTeam) {
        errors.push({ msg: 'Please fill in all fields'});
    }

    // Verify passwords match
/*    else if(password && (password !== password2)) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Verify that passwords are long enough
    else if(password.length < 6) {
        errors.push({ msg: 'Password should be 6+ characters long' });
    }
*/
    // console.log(`ERRORS: ${errors}`);

    if(errors.length > 0) {
        res.render(
            'settings', {
                errors,
                name,
                email,
                password,
                nflTeam,
                nbaTeam,
                mlbTeam,
                nhlTeam
            }
        );
    } else {
        // validation passed
        // use mongoose method "findOne" to ensure that the email for a user attempting to register does not already exist in the database
        User.findOne({ email: email, name: name })
        .then(user => {
            // console.log(`User exists?: ${user}`)
            
            // creating new instance of User; i.e. new User

            
            // console.log(`user: ${user}`);

                const updatedUser = {};
                updatedUser.name = req.body.name;
                updatedUser.email = req.body.email;
                updatedUser.password = req.user.password;
                updatedUser.nflTeam = req.body.nflTeam;
                updatedUser.nbaTeam = req.body.nbaTeam;
                updatedUser.mlbTeam = req.body.mlbTeam;
                updatedUser.nhlTeam = req.body.nhlTeam;

                // console.log(updatedUser);

                
                const updateTeams = async () => {
                    await User.findOneAndUpdate({__id: req.params.id}, updatedUser)
                    .then(user => {
                        req.flash('success_msg_dash', 'Changes successful.');
                        res.redirect('../dashboard')
                    })
                    .catch(err => console.log(err));
                }

                updateTeams();
                
                // Hash Password
                /*bcrypt.genSalt(10, (err, salt) => bcrypt.hash(updatedUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    // Set password to hashed as opposed to plain text
                    updatedUser.password = hash;

                    // Save user to db
                    /*updatedUser.save()
                    .then(user => {
                        req.flash('success_msg_dark', 'Success! You may now log in.');
                        res.redirect('/dashboard_d')
                    })
                    .catch(err => console.log(err));*/

                //}))
            
        })

        //res.send('pass')
};
});



/*
// Update Handle 
router.post('/update', (req, res, next) => {
    res.redirect('../dashboard');
});


// Update Handle (dark)
router.post('/update_d', (req, res, next) => {
    res.redirect('../dashboard_d');
});
*/


// Login Handle 
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
})


// Login Handle (dark)
router.post('/login_d', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard_d',
        failureRedirect: '/users/login_d',
        failureFlash: true
    })(req, res, next);
})


// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'Logout Successful');
    res.redirect('/users/login');
})

// Logout Handle (dark)
router.get('/logout_d', (req, res) => {
    req.logout();
    req.flash('success_msg_d', 'Logout Successful');
    res.redirect('/users/login_d');
})

// Update Handle
router.post('/update', (req, res, next) => {
    const {
        name, email, password, nflTeam, nbaTeam, mlbTeam, nhlTeam
    } = req.body;


    let errors = [];

    // Check required fields
    if(!email || !password) {
        errors.push({ msg: 'Missing credentials.'});
    }

    // Verify passwords match
/*    else if(password && (password !== password2)) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Verify that passwords are long enough
    else if(password.length < 6) {
        errors.push({ msg: 'Password should be 6+ characters long' });
    }
*/
   // console.log(`ERRORS: ${errors}`);

    if(errors.length > 0) {
        res.render(
            'update', {
                errors,
                name,
                email,
                password,
                nflTeam,
                nbaTeam,
                mlbTeam,
                nhlTeam
            }
        );
    } else {
        User.findOne({ email: email, name: name })
        .then(user => {
            // console.log(`User exists?: ${user}`)
            
            // creating new instance of User; i.e. new User

                const updatedUser = {};
                updatedUser.name = req.body.name;
                updatedUser.email = req.body.email;
                updatedUser.password = req.body.password;
                updatedUser.nflTeam = req.body.nflTeam;
                updatedUser.nbaTeam = req.body.nbaTeam;
                updatedUser.mlbTeam = req.body.mlbTeam;
                updatedUser.nhlTeam = req.body.nhlTeam;

                // console.log(updatedUser);

            
                
                // Hash Password
                /*bcrypt.genSalt(10, (err, salt) => bcrypt.hash(updatedUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    // Set password to hashed as opposed to plain text
                    updatedUser.password = hash;

                    // Save user to db
                    /*updatedUser.save()
                    .then(user => {
                        req.flash('success_msg_dark', 'Success! You may now log in.');
                        res.redirect('/dashboard_d')
                    })
                    .catch(err => console.log(err));*/

                //}))
            
        })

        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/users/update',
            failureFlash: true
        })(req, res, next);
    }
})


// Update Handle (dark)
router.post('/update_d', (req, res, next) => {
    const {
        name, email, password, nflTeam, nbaTeam, mlbTeam, nhlTeam
    } = req.body;


    let errors = [];

    // Check required fields
    if(!email || !password) {
        errors.push({ msg: 'Missing credentials.'});
    }

    // Verify passwords match
/*    else if(password && (password !== password2)) {
        errors.push({ msg: 'Passwords do not match' });
    }

    //Verify that passwords are long enough
    else if(password.length < 6) {
        errors.push({ msg: 'Password should be 6+ characters long' });
    }
*/
    // console.log(`ERRORS: ${errors}`);

    if(errors.length > 0) {
        res.render(
            'updateDark', {
                errors,
                name,
                email,
                password,
                nflTeam,
                nbaTeam,
                mlbTeam,
                nhlTeam
            }
        );
    } else {
        User.findOne({ email: email, name: name })
        .then(user => {
            // console.log(`User exists?: ${user}`)
            
            // creating new instance of User; i.e. new User

                const updatedUser = {};
                updatedUser.name = req.body.name;
                updatedUser.email = req.body.email;
                updatedUser.password = req.body.password;
                updatedUser.nflTeam = req.body.nflTeam;
                updatedUser.nbaTeam = req.body.nbaTeam;
                updatedUser.mlbTeam = req.body.mlbTeam;
                updatedUser.nhlTeam = req.body.nhlTeam;

                // console.log(updatedUser);

            
                
                // Hash Password
                /*bcrypt.genSalt(10, (err, salt) => bcrypt.hash(updatedUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    // Set password to hashed as opposed to plain text
                    updatedUser.password = hash;

                    // Save user to db
                    /*updatedUser.save()
                    .then(user => {
                        req.flash('success_msg_dark', 'Success! You may now log in.');
                        res.redirect('/dashboard_d')
                    })
                    .catch(err => console.log(err));*/

                //}))
            
        })

        passport.authenticate('local', {
            successRedirect: '/dashboard_d',
            failureRedirect: '/users/update_d',
            failureFlash: true
        })(req, res, next);
    }
})


// export router from this file so that it can be utilized in other files
module.exports = router;