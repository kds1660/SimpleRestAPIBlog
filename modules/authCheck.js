module.exports  = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        next(new Error(401));
    }
}