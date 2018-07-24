let express = require('express');
let router = express.Router();
let Home = require('../models/home');
let methodOverride = require('method-override');
let middleware = require('../middleware');

console.log('routes users');

// var data = {pic: 'i love you', position: 'right'};
// Home.remove({}, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('removed all home pics')
//     }
// });

// get home page
router.get('/', (req, res) => {
    Home.find({}, (err, home) => {
        if (err){
            console.log(err);
        } else {
            res.render('home',
                {
                    home: home
                });
        }
    })
});

// create home picture
router.post('/', function (req, res) {
    let pic = req.body.pic;
    let position = req.body.position;
    let newHome = {pic: pic, position: position};
    Home.create(newHome, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(newHome);
            res.redirect('/')
        }
    });
});


//NEW - show new home picture form
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('home/new')
});



// edit route
router.get('/:id/edit', middleware.isLoggedIn, function (req, res) {
    Home.findById(req.params.id, (err, foundHome) => {
        if (err){
            console.log(err);
        } else {
            res.render('home/edit',
                {
                    home: foundHome
                })
        }
    })
});


// update home picture
router.put ('/:id/edit', middleware.isLoggedIn, (req, res) => {
    Home.findByIdAndUpdate(req.params.id, req.body.home, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(req.body.home);
            res.redirect('/');
        }
    })
});


// destroy route
router.delete('/:id', middleware.isLoggedIn, (req, res) => {
    Home.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
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

//handle unknown address
router.get('/:id', function (req, res) {
    // res.send('Unknown Address');
    req.flash('error', 'Wrong Address');
    res.redirect('/');
});

module.exports = router;