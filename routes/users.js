let express = require('express');
let router = express.Router();
let Picture = require('../models/picture');
let middleware = require('../middleware');
let nodemailer = require('nodemailer');

console.log('routes users');

// // get home page
// router.get('/', (req, res) => {
//     Picture.find({}, (err, newPicture) => {
//         if (err){
//             console.log(err);
//             req.flash('error', 'Sorry, No Pictures Found');
//             res.redirect('/');
//         } else {
//             res.render('home',
//                 {
//                     picture: newPicture
//                 });
//         }
//     })
// });


// //NEW - show new home picture form
// router.get('/new', middleware.isLoggedIn, (req, res) => {
//   res.render('video/new')
// });

// // EDIT - show video edit form
// router.get('/gallery/:id/edit_video', middleware.isLoggedIn, function (req, res) {
//   // res.send('welcome');
//   //is user logged in
//   Picture.findById(req.params.id, function (err, foundPicture) {
//     if (err) {
//       console.log(err);
//       req.flash('error', "Picture not found");
//       res.redirect('/');
//     } else {
//       res.render('video/edit', {picture: foundPicture});
//     }
//   })
// });

// //test2
// router.get('/test2', function (req, res) {
//     res.render('test2');
// });


// //test3
// router.get('/test3', function (req, res) {
//     res.render('test3');
// });

// // edit route
// router.get('/:id/edit', middleware.isLoggedIn, (req, res) => {
//     Picture.findById(req.params.id, (err, foundPicture) => {
//         if (err){
//             console.log(err);
//             req.flash('error', 'Sorry, No Pictures Found');
//             res.redirect('/');
//         } else {
//             res.render('home/edit',
//                 {
//                     home: foundPicture
//                 })
//         }
//     })
// });


// // update home picture
// router.put ('/:id/edit', middleware.isLoggedIn, (req, res) => {
//     Picture.findByIdAndUpdate(req.params.id, req.body.home, (err) => {
//         if (err) {
//             console.log(err);
//             req.flash('error', 'Sorry, Could not Update Picture');
//             res.redirect('/');
//         } else {
//             // console.log(req.body.home);
//             res.redirect('/');
//         }
//     })
// });


// // destroy route
// router.delete('/:id', middleware.isLoggedIn, (req, res) => {
//     Picture.findByIdAndRemove(req.params.id, (err) => {
//         if (err) {
//             console.log(err);
//             req.flash('error', 'Sorry, Could not Update Picture');
//             res.redirect('/');
//         } else {
//             res.redirect('/');
//         }
//     })
// });

// // get profile page
// router.get('/profile', (req, res) => {
//     res.render('profile');
// });

// // get contact us page
// router.get('/contact', (req, res) => {
//     res.render('contact');
// });

// // get package us page
// router.get('/package', (req, res) => {
//     res.render('package');
// });

// // about route
// router.get('/about', (req, res) => {
//     res.render('about');
// });

// // test route
// router.get('/test', (req, res) => {
//     Picture.find({}, (err, newPicture) => {
//         if (err) {
//             console.log(err);
//             req.flash('error', 'Sorry, No Pictures Found');
//             res.redirect('/');
//         } else {
//             res.render('test',
//                 {
//                     picture: newPicture
//                 });
//         }
//     });
//     // res.render('test');
// });

// // blog route
// router.get('/blog', (req, res) => {
//     Picture.find({}, (err, newPicture) => {
//         if (err){
//             console.log(err);
//             req.flash('error', 'Sorry, No Pictures Found');
//             res.redirect('/');
//         } else {
//             res.render('blog',
//                 {
//                     picture: newPicture
//                 });
//         }
//     })
// });


// //handle unknown address
// // router.get('/:id', (req, res) => {
// //     // res.send('Unknown Address');
// //     req.flash('error', 'Wrong Address');
// //     res.redirect('/');
// // });


// // handle contact forms
// router.post('/contact', (req, res) => {
//     if (req.body.sub){
//         const subscribe = `
//             <h3>You have a new Subscriber</h3>
//             <h3>Subscriber Email: ${req.body.sub}</h3>
//         `;
//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'alosoftinc@gmail.com',
//                 pass: '@Allo2020'
//             },
//             tls: {
//                 rejectUnauthorized: false
//             }
//         });

//         // setup email data with unicode symbols
//         let mailOptions = {
//             from: '"Erics Media Website" <alosoftinc@gmial.com', // sender address
//             to: 'ericsmedia308@gmail.com', // list of receivers
//             subject: 'New Subscriber', // Subject line
//             html: subscribe // html body
//         };

//         // send mail with defined transport object
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log('Message sent: %s', info.messageId);
//             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//         });
//         req.flash('success', 'Email received, stay tuned');
//         res.redirect('/');

//     } else {
//         const output = `
//         <p>You have a new contact request</p>
//         <h3>Contact Details</h3>
//         <ul>
//             <li>Name: ${req.body.name}</li>
//             <li>Email: ${req.body.email}</li>
//             <li>Phone: ${req.body.phone}</li>
//         </ul>
//         <p>${req.body.message}</p>
//     `;

//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'alosoftinc@gmail.com',
//                 pass: '@Allo2020'
//             },
//             tls: {
//                 rejectUnauthorized: false
//             }
//         });

//         // setup email data with unicode symbols
//         let mailOptions = {
//             from: '"Erics Media Website" <alosoftinc@gmial.com', // sender address
//             to: 'ericsmedia308@gmail.com', // list of receivers
//             subject: 'New Contact Request', // Subject line
//             html: output // html body
//         };

//         // send mail with defined transport object
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log('Message sent: %s', info.messageId);
//             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//         });
//         req.flash('success', 'Message received, we will get back to you. Thank You.');
//         res.redirect('/');
//     }

// });


module.exports = router;