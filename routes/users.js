var express = require('express');
var router = express.Router();

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

module.exports = router;