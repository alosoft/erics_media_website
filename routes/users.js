let express = require('express');
let router = express.Router();
let Picture = require('../models/picture');
let methodOverride = require('method-override');
let middleware = require('../middleware');

console.log('routes users');

// var data = {pic: 'i love you', position: 'right'};
// Picture.remove({}, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('removed all home pics')
//     }
// });

// get home page
router.get('/', (req, res) => {
    Picture.find({}, (err, newPicture) => {
        if (err){
            console.log(err);
        } else {
            res.render('home',
                {
                    picture: newPicture
                });
        }
    })
});

// create home picture
// router.post('/', (req, res) => {
//     let pic = req.body.pic;
//     let position = req.body.position;
//     let newPicture = {pic: pic, position: position};
//     Picture.create(newPicture, (err) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(newPicture);
//             res.redirect('/')
//         }
//     });
// });


//NEW - show new home picture form
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('home/new')
});



// edit route
router.get('/:id/edit', middleware.isLoggedIn, (req, res) => {
    Picture.findById(req.params.id, (err, foundPicture) => {
        if (err){
            console.log(err);
        } else {
            res.render('home/edit',
                {
                    home: foundPicture
                })
        }
    })
});


// update home picture
router.put ('/:id/edit', middleware.isLoggedIn, (req, res) => {
    Picture.findByIdAndUpdate(req.params.id, req.body.home, (err) => {
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
    Picture.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    })
});

// get profile page
router.get('/profile', (req, res) => {
    res.render('profile');
});

// get contact us page
router.get('/contact', (req, res) => {
    res.render('contact');
});

// get package us page
router.get('/package', (req, res) => {
    res.render('package');
});

// about route
router.get('/about', (req, res) => {
    res.render('about');
});

// test route
router.get('/test', (req, res) => {
    res.render('test');
});

// blog route
router.get('/blog', (req, res) => {
    Picture.find({}, (err, newPicture) => {
        if (err){
            console.log(err);
        } else {
            res.render('blog',
                {
                    picture: newPicture
                });
        }
    })
});


//handle unknown address
router.get('/:id', (req, res) => {
    // res.send('Unknown Address');
    req.flash('error', 'Wrong Address');
    res.redirect('/');
});

module.exports = router;