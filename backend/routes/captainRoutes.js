const express = require('express')
const router = express.Router();
const { body } = require('express-validator')
const captainController = require('../controllers/captainController')
const authMiddleware = require('../middlewares/authMiddleware')

//  ---------- captain register 
router.post('/register',[
    body('firstname').notEmpty().withMessage('First name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),

    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),

    body('color').notEmpty().withMessage('Vehicle color is required').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),

    body('plate').notEmpty().withMessage('Vehicle plate is required').isLength({ min: 4 }).withMessage('Vehicle plate must be at least 4 characters long'),

    body('vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid Vehicle' ),

    body('capacity').notEmpty().withMessage('Vehicle capacity is required').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
],

    captainController.registerCaptain

)
   
//  ---------- captain login 
router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'), 
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
],

captainController.loginCaptain

)

//  ---------- captain profile
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile) 

//  ---------- captain logout
router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router