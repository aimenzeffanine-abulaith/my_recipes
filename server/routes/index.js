const express = require('express')
const userController = require('../controllers/userController')
const { body, validationResult } = require('express-validator');
const { userValidationRules, validate } = require('../middlewares/validator');
const { isLoggedIn } = require('../middlewares/authentication');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Salam'
    })
})

router.post('/account/register', userValidationRules(), validate, userController.register);
router.post('/account/login', userController.login);
router.get('/account/profile', isLoggedIn, userController.getProfile);

module.exports = router