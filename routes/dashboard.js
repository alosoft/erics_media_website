let express = require('express');
let passport = require('passport');
let Picture = require('../models/picture');
let router = express.Router();

console.log('router dashboard');

// GET / dashboard page
router.get('/dashboard', (req, res) => {
    res.render('dashboard/home');
});

// GET / dashboard Picture
router.get('/dashboard/picture', (req, res) => {
   Picture.find({}, (err, picture) => {
       if (err) {
           console.log(err);
           req.flash('error', 'Couldn\'t find picture in database');
           res.redirect('dashboard');
       } else {
           res.render('dashboard/picture', {
               picture: picture
           });
       }
   })
})

module.exports = router;