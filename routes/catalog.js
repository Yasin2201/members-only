const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

//GET Home Page
router.get('/', user_controller.home_get)

//GET user Sign-Up form
router.get('/sign-up', user_controller.sign_up_get)

//POST user Sign-Up form
router.post('/sign-up', user_controller.sign_up_post)

//GET user login page
router.get('/login', user_controller.login_get)

//POST user login
router.post('/login', user_controller.login_post)

//GET user logout
router.get('/log-out', user_controller.logout_get)

// Message Routes
// GET create new message page
router.get('/new-message', message_controller.message_form_get)

// POST user new message 
router.post('/new-message', message_controller.message_form_post)

module.exports = router;