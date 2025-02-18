import { check, validationResult } from "express-validator";

export const validateUser = [
    check('username')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),

    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isStrongPassword({
            minLength:8,
            minUppercase:1,
            minSymbols:1,
            minNumbers:3
        }).withMessage('Password must have minimum 8 characters,1 uppercase,1 special symbol,at least 3 digits'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateLoginUser = [

    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),

    check('password')
        .notEmpty().withMessage('Password is required')
        .isStrongPassword({
            minLength:8,
            minUppercase:1,
            minSymbols:1,
            minNumbers:3
        }).withMessage('Password must have minimum 8 characters,1 uppercase,1 special symbol,at least 3 digits'),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

