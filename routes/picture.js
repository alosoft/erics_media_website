let express = require('express');
let router = express.Router();
let Picture = require('../models/picture');
let methodOverride = require('method-override');
let middleware = require('../middleware');

console.log('routes picture');
router.use(methodOverride("_method"));


// gallery route

//index - route //show all images
router.get("/gallery", function (req, res) {
    console.log(req.user);
    // get all pictures from data base
    Picture.find({}, function (err, picture) {
        if (err) {
            console.log(err);
            req.flash('error', 'Sorry, No Pictures Found');
            res.redirect('/');
        } else {
            // console.log(picture);
            res.render("gallery",
                {
                    picture: picture
                });
        }
    });
});


//CREATE - add new pictures to database
router.post("/gallery", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to pictures array
    let title = req.body.title;
    let name = req.body.name;
    let image = req.body.image;
    let credit = req.body.credit;
    let thumbnail = req.body.thumbnail;
    let location = req.body.location;
    let coordinate = req.body.coordinate;
    let type = req.body.type;
    let description = req.body.description;
    let orientation = req.body.orientation;
    let page = req.body.page;
    let video = req.body.video;
    let newPicture = {
        title: title,
        name: name,
        image: image,
        credit: credit,
        thumbnail: thumbnail,
        location: location,
        coordinate: coordinate,
        type: type,
        description: description,
        orientation: orientation,
        page: page,
        created: new Date().toDateString(),
        video: video,
    };
    // console.log(req.user);
    //create a new picture and save to database
    Picture.create(newPicture, function (err, newlyCreated) {
        if (err) {
            console.log(err);
            req.flash('error', 'Could not create Picture');
            res.redirect('/');
        } else {
            //redirect back to pictures page
            // console.log(newlyCreated);
            res.redirect("/");
        }
    });
});

//NEW - show new picture form
router.get('/gallery/new', middleware.isLoggedIn, function (req, res) {
    res.render('picture/new');
});


//SHOW - shows more info about one picture
router.get("/gallery/:id", function (req, res) {
    //find the pictures with provided id
    Picture.findById(req.params.id).populate('comments').exec(function (err, foundPicture) {
        if (err) {
            console.log(err);
            req.flash('error', 'Wrong Address');
            res.redirect('/');
        } else {
            // res.send(foundPicture);
            res.render("picture/show",
                {
                    picture: foundPicture
                });
            // console.log(foundPicture);
            //render show template with that pictures
        }
    });
    //and then render show template with that pictures
});

//EDIT ROUTE
router.get('/gallery/:id/edit', middleware.isLoggedIn, function (req, res) {
    // res.send('welcome');
    //is user logged in
    Picture.findById(req.params.id, function (err, foundPicture) {
        if (err) {
            console.log(err);
            req.flash('error', "Picture not found");
            res.redirect('/');
        } else {
            res.render('dashboard/edit', {picture: foundPicture});
        }
    });
});


//UPDATE pictures
router.put('/gallery/:id/edit', middleware.isLoggedIn, function (req, res) {
    Picture.findByIdAndUpdate(req.params.id, req.body.picture, function (err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Could not Update Picture');
            res.redirect('/gallery');
        } else {
            // console.log(req.body.picture);
            res.redirect('/gallery');
        }
    });
});


// DESTROY ROUTE
router.delete("/gallery/:id", middleware.isLoggedIn, function (req, res) {
    Picture.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            req.flash('error', 'Could not remove Picture');
            res.redirect('/gallery');
        } else {
            res.redirect('/gallery');
        }
    });
});


module.exports = router;
