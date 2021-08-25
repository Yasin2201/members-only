const Message = require('../models/message');
const { body, validationResult } = require('express-validator');

exports.message_form_get = function (req, res) {
    res.render('new-message', { title: "Create New Message", user: req.user })
};

exports.message_form_post = [

    //validate and sanitize message form fiels
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
            //re-render form if any errors
            res.render('new-message', { title: "Create New Message", user: req.user, errors: errors.array() })
            return
        } else {
            //save message to database
            message.save(function (err) {
                if (err) { return next(err) }
                res.redirect('/')
            });
        }
    }
]

exports.messages_list_get = function (req, res, next) {
    // find all messages and display on homepage
    Message.find()
        .exec(function (err, all_messages) {
            if (err) { return next(err) }
            res.render('index', { title: "Members Only", user: req.user, all_messages: all_messages })
        })
}

exports.delete_message_get = function (req, res) {
    // find message information by id and display message admin requested to delete
    Message.findById(req.params.id)
        .exec(function (err, found_message) {
            if (err) { return next(err) }
            else {
                res.render('delete-message', { title: 'Are you sure you want to delete this message? :', user: req.user, message: found_message })
            }
        })

}

exports.delete_message_post = function (req, res) {
    Message.findByIdAndRemove(req.body.messageid, function deleteMessage(err) {
        if (err) { return next(err) }
        res.redirect('/')
    })
}