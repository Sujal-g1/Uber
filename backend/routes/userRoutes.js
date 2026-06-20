const express = require('express')
const router = express.Router();

const { body } = require('express-validator')
const userController = require('../controllers/userController')

// ------------- user register
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('firstname').isLength({min:3}).withMessage('first name must be atleast  3 characters long'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long')
],

userController.registerUser

)

// ------------- user login
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:8}).withMessage('Password must be atleast 8 characters long')
],
 userController.loginUser 

)

module.exports = router