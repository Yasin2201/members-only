const Message = require('../models/message');
const { body, check, validationResult } = require('express-validator');

exports.message_form_get = function (req, res) {
    res.render('new-message', { title: "Create New Message", user: req.user })
};
