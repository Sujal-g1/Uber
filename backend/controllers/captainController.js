const captainModel = require('../models/captainModel')
const captainService = require('../services/captainService')
const { validationResult } = require('express-validator')
const BlackListTokenModel = require('../models/blackListTokenModel')


module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

     const { firstname, lastname, email, password, color, plate, capacity, vehicleType } = req.body;

     const isCaptainExist = await captainModel.findOne({ email })
     if (isCaptainExist) {
        return res.status(400).json({ message: 'Captain already exists' })
     } else {

     const hashedPassword = await captainModel.hashPassword(password)

        const captain = await captainService.createCaptain({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            color,
            plate,
            capacity,
            vehicleType
        });

        const token = captain.generateAuthToken()
        
        res.status(201).json({ message: 'Captain registered successfully', token, captain });
    }

} catch (error) {
    next(error)
}
}
       
module.exports.loginCaptain = async (req, res, next) => { 
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;
        
        const captain = await captainModel.findOne({ email }).select('+password');

        if (!captain) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        const isPasswordMatch = await captain.comparePassword(password)

        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        const token = captain.generateAuthToken()
        res.cookie('token', token)

        res.status(200).json({ message: 'Captain logged in successfully', token, captain });

    } catch (error) {
        next(error)
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        const captain = req.captain;
        res.status(200).json({ captain });
    } catch (error) {
        next(error)
    }
}

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split( ' ')[1];
        
        await BlackListTokenModel.create({ token });
        res.clearCookie('token')

        res.status(200).json({ message: 'Captain logged out successfully' });
    } catch (error) {
        next(error)
    }
}