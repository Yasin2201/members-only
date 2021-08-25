const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

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

//GET Home Page & All Messages
router.get('/', message_controller.messages_list_get)

//GET member-join page
router.get('/member-join', user_controller.member_join_get)

//POST member-join page
router.post('/member-join', user_controller.member_join_post)

//GET admin-access page
router.get('/admin-access', user_controller.admin_access_get)

//POST admin-access page
router.post('/admin-access', user_controller.admin_access_post)

//GET delete-message page
router.get('/delete-message/:id', message_controller.delete_message_get)

//POST delete-message page
router.post('/delete-message/:id', message_controller.delete_message_post)

module.exports = router;