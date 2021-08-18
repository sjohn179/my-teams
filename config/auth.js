module.exports = {
    ensureAuthenticated: function(req, res, next) {
        //method from passport
        if(req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg', 'Please log in to continue.');
        res.redirect('/users/login');
    },
    ensureAuthenticatedDark: function(req, res, next) {
        //method from passport
        if(req.isAuthenticated()) {
            return next();
        }

        req.flash('error_msg_d', 'Please log in to continue.');
        res.redirect('/users/login_d');
    }
}