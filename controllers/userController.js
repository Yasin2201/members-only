const User = require('../models/user')
const { body, validationResult } = require('express-validator');

//Home Page
exports.home_get = function (req, res) {
    res.render('index', { title: 'Express' });
};

// Load Sign up form on user sign-up
exports.sign_up_get = function (req, res) {
    res.render('sign-up', { title: 'Sign Up' })
}

// Handle User Sign-up
exports.sign_up_post = [

    //validate and sanitize sign-up fields
    body('username', 'Invalid Username').trim().isLength({ min: 1, max: 10 }).escape(),
    body('password', 'Invalid Password').trim().isLength({ min: 1, }).escape(),

    (req, res, next) => {

        //Errors from req if any
        const errors = validationResult(req)

        //Create new user wit validated data
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        if (!errors.isEmpty()) {
            res.render('sign-up', { title: 'Sign Up', user: user, errors: errors.array() });
            console.log(errors.array())
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
    }
]