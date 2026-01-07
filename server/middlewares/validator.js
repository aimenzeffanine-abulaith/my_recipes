const {body, validationResult} = require('express-validator');

const userValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
  ];
}

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    return res.status(400).json({errors: errors.array()});
}

module.exports = {
    userValidationRules,
    validate,
};