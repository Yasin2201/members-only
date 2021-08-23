#! /usr/bin/env node
console.log('This script populates some users and messages to your database.');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
var async = require('async')

var User = require('./models/user')
var Message = require('./models/message')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = []
var messages = []

function userCreate(username, password, cb) {
    userDetail = { username: username, password: password }

    var user = new User(userDetail)

    user.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log(`New user: ${user}`)
        users.push(user)
        cb(null, user)
    });
}

function messageCreate(user, title, text, date, cb) {
    messageDetail = { user: user, title: title, text: text, date: date }

    var message = new Message(messageDetail)

    message.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log(`New message: ${message}`)
        messages.push(message)
        cb(null, message)
    });
}

function createUsers(cb) {
    async.parallel([
        function (callback) {
            userCreate('Max', 'maxPass123', callback)
        },
        function (callback) {
            userCreate('John', 'johnPass123', callback)
        }
    ], cb)
}

function createMessages(cb) {
    async.parallel([
        function (callback) {
            messageCreate(users[0], 'Maxs First Post', 'This is the text of the first post by MAX', Date.now(), callback)
        },
        function (callback) {
            messageCreate(users[1], 'Johns First Post', 'This is the text of the first post by John', Date.now(), callback)
        }
    ], cb)
}

// function createCategoryAndItem(cb) {
//     async.series([
//         function (callback) {
//             categoryCreate('Chairs', 'Beautiful chairs for any environment', callback)
//         },
//         function (callback) {
//             categoryCreate('Tables', 'A Range of tables perfect for you', callback)
//         },
//         function (callback) {
//             itemCreate('Recliner', 'A comfy recliner to relax in', categories[0], 29.99, 5, callback)
//         },
//         function (callback) {
//             itemCreate('Rocking', 'The perfect chair to read your favourite book', categories[0], 49.99, 2, callback)
//         },
//         function (callback) {
//             itemCreate('Dining Table', 'Enjoy your favourite meals on your favourite table', categories[1], 129.99, 1, callback)
//         }
//     ], cb)
// }

async.series([
    createUsers,
    createMessages
],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    });