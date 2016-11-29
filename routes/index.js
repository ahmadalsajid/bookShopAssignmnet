var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* get login page */
router.get('/login', function (req, res, next) {
    res.render('login', { message: req.flash('loginMessage') });
});

/* get publisher SignUp page */
router.get('/publisherSignUp', function (req, res, next) {
    res.render('publisherSignUp',{ message: req.flash('loginMessage') });
});

/* get Reader SignUp page */
router.get('/readerSignUp', function (req, res, next) {
    res.render('readerSignUp',{ message: req.flash('loginMessage') });
});

/* get home page */
router.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {user : req.user});
});

/* log out*/
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
}));


router.post('/readerSignUp', passport.authenticate('reader-signup', {
    successRedirect: '/profile',
    failureRedirect: '/readerSignUp',
    failureFlash: true,
}));

router.post('/publisherSignUp', passport.authenticate('publisher-signup', {
    successRedirect: '/profile',
    failureRedirect: '/publisherSignUp',
    failureFlash: true,
}));


module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
