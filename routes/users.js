var express = require('express');
var router = express.Router();

// get home page
router.get('/', function (req, res) {
    res.render('home');
});

// get profile page
router.get('/profile', function (req, res) {
    res.render('profile');
});

// get contact us page
router.get('/contact', function (req, res) {
    res.render('contact');
});

// get package us page
router.get('/package', function (req, res) {
    res.render('package');
});

// test route
router.get('/test', function (req, res) {
    res.render('test');
});


module.exports = router;