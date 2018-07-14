let express = require('express');
let router = express.Router();
let Campground = require('../models/campground');
let methodOverride = require('method-override');
let middleware = require('../middleware');

console.log('routes camp');

router.use(methodOverride("_method"));


// /* GET home page. */
// router.get("/", function (req, res) {
//     res.render("home");
// });


//INDEX - route //show all campgrounds
router.get("/", function (req, res) {
    console.log(req.user);
    // get all campgrounds from data base
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("home",
                {
                    campgrounds: allCampgrounds
                });
        }
    })
});

//INDEX - route //show all campgrounds
router.get("/campgrounds", function (req, res) {
    console.log(req.user);
    // get all campgrounds from data base
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index",
                {
                    campgrounds: allCampgrounds
                });
        }
    })
});


//CREATE - add new campgrounds to database
router.post("/campgrounds", middleware.isLoggedIn, function (req, res) {
    // get data from form and add to campground array
    let description = req.body.description;
    let price = req.body.price;
    let name = req.body.name;
    let image = req.body.image;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {name: name, image: image, price: price, description: description, author: author};
    // console.log(req.user);
    //create a new campground and save to database
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});


//NEW - show forms to create campgrounds
router.get("/campgrounds/new", middleware.isLoggedIn, function (req, res) {
    // shows the form with input
    res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/campgrounds/:id", function (req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show",
                {
                    campground: foundCampground
                });
            // console.log(foundCampground);
            //render show template with that campground
        }
    });
    //and then render show template with that campground
});


//EDIT ROUTE
router.get('/campgrounds/:id/edit', middleware.checkCampgroundOwnerShip, function (req, res) {
    //is user logged in
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            req.flash('error', "Campground not found");
            console.log(err);
            res.redirect('campgrounds/login');
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    })
});


//UPDATE CAMPGROUND
router.put('/campgrounds/:id/edit', middleware.checkCampgroundOwnerShip, function (req, res) {
    // let data = {name: req.body.name, image: req.body.image, description: req.body.description};
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds')
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnerShip, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds');
        }
    });
});


module.exports = router;