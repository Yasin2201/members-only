const User = require('../models/user')

//Home Page
exports.home_get = function (req, res) {
    res.render('index', { title: 'Express' });
};

// Load Sign up form on user sign-up
exports.sign_up_get = function (req, res) {
    res.render('sign-up')
}