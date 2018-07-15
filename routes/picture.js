let express = require('express');
let router = express.Router();
let Picture = require('../models/picture');
let methodOverride = require('method-override');
let middleware = require('../middleware');

console.log('routes picture');

router.use(methodOverride("_method"));


//gallery route

//index - route //show all images
router.get("/gallery", function (req, res) {
    console.log(req.user);
    // get all campgrounds from data base
    Picture.find({}, function (err, picture) {
        if (err) {
            console.log(err);
        } else {
            // console.log(picture);
            res.render("gallery",
                {
                    picture: picture
                });
        }
    })
});


//CREATE - add new campgrounds to database
router.post("/gallery", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to campground array
    let image = req.body.image;
    let type = req.body.type;
    let id = req.body._id;
    let name = req.body.name;
    let description = req.body.description;
    let newPicture = {image: image, type: type, id: id, name: name, description: description};
    // console.log(req.user);
    //create a new campground and save to database
    Picture.create(newPicture, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            // console.log(newlyCreated);
            res.redirect("/gallery");
        }
    });
});

//NEW - show new picture form
router.get('/gallery/new', middleware.isLoggedIn, function (req, res) {
    res.render('picture/new');
});


//SHOW - shows more info about one picture
router.get("/gallery/:id", function (req, res) {
    //find the campground with provided id
    Picture.findById(req.params.id).populate('comments').exec(function (err, foundPicture) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            // res.send(foundPicture);
            res.render("picture/show",
                {
                    picture: foundPicture
                });
            console.log(foundPicture);
            //render show template with that campground
        }
    });
    //and then render show template with that campground
});

//EDIT ROUTE
router.get('/gallery/:id/edit',middleware.isLoggedIn, function (req, res) {
    // res.send('welcome');
    //is user logged in
    Picture.findById(req.params.id, function (err, foundPicture) {
        if (err) {
            req.flash('error', "Picture not found");
            console.log(err);
            res.send("error in picture edit route")
            // res.redirect('campgrounds/login');
        } else {
            res.render('picture/edit', {picture: foundPicture});
        }
    })
});

//UPDATE CAMPGROUND
router.put('/gallery/:id/edit', middleware.isLoggedIn, function (req, res) {
    // let data = {name: req.body.name, image: req.body.image, description: req.body.description};
    Picture.findByIdAndUpdate(req.params.id, req.body.picture, function (err) {
        if (err) {
            console.log(err);
            res.redirect('/gallery');
        } else {
            console.log(req.body.picture);
            console.log(req.body.picture);
            console.log(req.body.picture);
            console.log(req.body.picture);
            console.log(req.body.picture);
            console.log(req.body.picture);
            console.log(req.body.picture);
            res.redirect('/gallery');
        }
    });
});


// DESTROY ROUTE
router.delete("/gallery/:id", middleware.isLoggedIn, function (req, res) {
    Picture.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/gallery');
        } else {
            res.redirect('/gallery');
        }
    });
});

module.exports = router;