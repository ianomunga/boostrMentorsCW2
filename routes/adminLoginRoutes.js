const express = require('express');
const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const router = express.Router();

const ADMIN_EMAIL = 'i.omunga@alustudent.com';
const ADMIN_PASSWORD_HASH = '$2b$10$iig3vnPjLKXeFtVeyRTpeemxj90gYjxc6lURQv1KHNuArtisPw.1C';

// Initialize the NeDB Datastore
const db = new Datastore({ filename: './data/nedb_database.db'});

// Define validation middleware array for login
const loginValidationRules = [
  body('email_or_phone').isEmail().withMessage('Please enter a valid email address').trim().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  // Add other validation or sanitization as needed
];

// Middleware for parsing application/x-www-form-urlencoded and application/json
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// GET route to serve the admin login page
router.get('/', (req, res) => {
    res.render('adminLogin'); 
});

// POST route for the admin login form submission with validation
router.post('/', loginValidationRules, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const submittedEmail = req.body.email_or_phone;
    const submittedPassword = req.body.password;

    try {
        // Compare submitted credentials with environment variables
        if (submittedEmail === ADMIN_EMAIL) {
            const match = await bcrypt.compare(submittedPassword, ADMIN_PASSWORD_HASH);
            if (match) {
                // Passwords match, log in the admin
                // TODO: Set session or JWT token as per your authentication strategy
                return res.status(200).json({ message: 'Hey Ian. Welcome back!' });
            } else {
                // Passwords do not match
                return res.status(401).json({ error: "You're not my Admin. Iaaaan!" });
            }
        } else {
            // Email does not match
            return res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Server error while logging in' });
    }
});

module.exports = router;
