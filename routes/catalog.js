const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

//GET Home Page
router.get('/', user_controller.home_get)

//GET user Sign-Up form
router.get('/sign-up', user_controller.sign_up_get)

//POST user Sign-Up form
router.post('/sign-up', user_controller.sign_up_post)

module.exports = router;