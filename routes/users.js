let express = require('express');
let router = express.Router();
let Picture = require('../models/picture');
let methodOverride = require('method-override');
let middleware = require('../middleware');
let nodemailer = require('nodemailer');

console.log('routes users');

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


router.post('/contact', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Phone: ${req.body.phone}</li>
        </ul>
        <p>${req.body.message}</p>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'alosoftinc@gmail.com',
            pass: '@Allo2020'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Erics Media Website" <admin@ericsmedia.com>', // sender address
        to: 'ericsmedia307@gmail.com', // list of receivers
        subject: 'New Contact Request', // Subject line
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    res.redirect('/');
});


module.exports = router;