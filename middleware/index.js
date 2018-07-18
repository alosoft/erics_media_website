let middleObj = {};

middleObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You need to be logged in do that');
    res.redirect('/login');
};



module.exports = middleObj;