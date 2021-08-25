const User = require('../models/user')
const bcrypt = require('bcryptjs')
const passport = require("passport");
const { body, check, validationResult } = require('express-validator');

// Load Sign up form on user sign-up
exports.sign_up_get = function (req, res) {
    res.render('sign-up', { title: 'Sign Up' })
}

// Handle User Sign-up
exports.sign_up_post = [

    //validate and sanitize sign-up fields
    body('username', 'Invalid Username').trim().isLength({ min: 1, max: 10 }).escape(),
    body('password', 'Invalid Password').trim().isLength({ min: 1, }).escape(),
    check('password').exists(),
    check('passwordConfirmation', 'Password Confirmation must be the same as Password')
        .exists()
        .custom((value, { req }) => value === req.body.password),

    (req, res, next) => {

        //Errors from req if any
        const errors = validationResult(req)

        //hash users inputted password with bcrypt for security
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) { return next(err) }

            //Create new user with validated data and hashed password
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
                isMember: false,
                isAdmin: false
            });

            if (!errors.isEmpty()) {
                res.render('sign-up', { title: 'Sign Up', user: user, errors: errors.array() });
                return
            } else {
                // first check if username already exists
                User.findOne({ 'username': req.body.username })
                    .exec(function (err, found_username) {
                        if (err) { return next(err) }

                        // if username exists re-render sign-up with error
                        if (found_username) {
                            res.render('sign-up', { title: 'Sign Up', user: user, errors: [{ value: '', msg: 'Username already exists', param: 'username', location: 'body' }] });
                        } else {
                            user.save(function (err) {
                                if (err) { return next(err) }
                                res.redirect('/')
                            });
                        }
                    });
            }
        });
    }
];

//Login Page
exports.login_get = function (req, res) {
    res.render('login', { title: 'Sign In' });
};

//Log in user POST
exports.login_post = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login"
});

//Log out user
exports.logout_get = function (req, res) {
    req.logout();
    res.redirect('/');
};