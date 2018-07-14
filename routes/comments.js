var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');


console.log('routes comment');
//=================================================
//COMMENTS ROUTES
//================================================
//COMMENT NEW
router.get('/campgrounds/:id/comments/new', middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new',
                {
                    campground: campground
                });
        }
    })
});

//CREATE COMMENT
router.post('/campgrounds/:id/comments', middleware.isLoggedIn, function (req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds')
        } else {
            // var text = req.body.text;
            // var author = req.body.author;
            // var newComment = ({text: text, author: author});
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    console.log("New comment's username will be " + req.user.username);
                    comment.save();
                    // console.log(req.body.comment);
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
});

//COMMENT EDIT ROUTE
router.get('/campgrounds/:id/comments/:comment_id/edit', middleware.checkCommentOwnerShip, function (req, res) {
    Comment.findById(req.params.comment_id, function (err, foundComment) {
        if (err) {
            res.redirect('back');
        } else {
            res.render('comments/edit',
                {
                    campground_id: req.params.id,
                    comment: foundComment
                });
        }
    });
});

//COMMENT UPDATE
router.put('/campgrounds/:id/comments/:comment_id', middleware.checkCommentOwnerShip, function (req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err) {
        if (err) {
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id)
        }
    })
});


//COMMENT DESTROY ROUTE
router.delete('/campgrounds/:id/comments/:comment_id', middleware.checkCommentOwnerShip, function (req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function (err) {
        if (err) {
            res.redirect('back');
        } else {
            req.flash('success', 'Comment deleted');
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});


module.exports = router;