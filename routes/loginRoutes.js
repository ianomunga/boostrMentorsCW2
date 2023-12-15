const express = require('express');
const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Create a router instance instead of an app instance
const router = express.Router();
const db = new Datastore({ filename: './data/nedb_database.db'});

// GET route to serve the login page
router.get('/', (req, res) => {
  res.render('login'); 
});

// Middleware for parsing application/x-www-form-urlencoded
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Define validation middleware array
const loginValidationRules = [
  body('email_or_phone').isEmail().withMessage('Please enter a valid email address').trim().normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  // Add other validation or sanitization as needed
];

// POST route for the login form submission with validation
router.post('/', loginValidationRules, async (req, res) => {
    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Look up the user by email or phone
        db.findOne({ email_or_phone: req.body.email_or_phone }, async (err, user) => {
            if (err) {
                return res.status(500).json({ error: 'Server error during authentication' });
            }

            if (user) {
                // Compare submitted password with hashed password in the database
                const match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    // Passwords match
                    return res.status(200).json({ message: 'Logged in successfully', user: user._id });
                } else {
                    // Passwords do not match
                    return res.status(401).json({ error: 'Invalid credentials' });
                }
            } else {
                // User not found
                return res.status(401).json({ error: 'User not found' });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server error while logging in' });
    }
});

// Export the router
module.exports = router;
