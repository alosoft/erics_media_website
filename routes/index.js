var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

console.log('routes index');

//show register form
router.get('/register', function (req, res) {
    // res.send('welcome to the register route');
    res.render('register');
});

/////////////handle sign up logic////////////////
router.post('/register', function (req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash('error', err.message);
            console.log(err);
            return res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function () {
                req.flash('success', 'Welcome to YelpCamp ' + user.username);
                res.redirect('/campgrounds');
            })
        }
    })
});


//show login form
router.get('/login', function (req, res) {
    res.render('login');
});

///////////////handle login logic//////////////
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}), function (req, res) {

});

/////////////handle logout/////////////
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success', 'Logged You out');
    res.redirect('/');
});


module.exports = router;