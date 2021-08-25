const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.message_form_get = function (req, res) {
    res.render('new-message', { title: "Create New Message", user: req.user })
};

exports.message_form_post = [
    body('messageTitle', 'Title can not be empty').trim().isLength({ min: 1 }).escape(),
    body('messageText', 'Message text can not be empty').trim().isLength({ min: 1 }).escape(),

    (req, res, next) => {

        const errors = validationResult(req);

        const message = new Message({
            userID: req.user,
            username: req.user.username,
            title: req.body.messageTitle,
            text: req.body.messageText,
            date: Date.now()
        })

        if (!errors.isEmpty()) {
            res.render('new-message', { title: "Create New Message", user: req.user, errors: errors.array() })
            return
        } else {
            message.save(function (err) {
                if (err) { return next(err) }
                res.redirect('/')
            });
        }
    }
]

exports.messages_list_get = function (req, res, next) {
    Message.find()
        .exec(function (err, all_messages) {
            if (err) { return next(err) }
            res.render('index', { title: "Members Only", user: req.user, all_messages: all_messages })
        })
}