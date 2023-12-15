const express = require('express');
const Datastore = require('nedb');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

// Create a new router instance
const router = express.Router();

// Initialize the NeDB Datastore
const db = new Datastore({ filename: './data/nedb_database.db', autoload: true });

// GET route to serve the join page
router.get('/', (req, res) => {
  res.render('join'); 
});

// Define validation middleware array
const userValidationRules = [
  body('email_or_phone').isEmail().withMessage('Please enter a valid email address').trim().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  // Add other validation or sanitization as needed
];

// POST route for the form submission with validation
router.post('/', userValidationRules, async (req, res) => {
    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create user object with hashed password
        const user = {
            email_or_phone: req.body.email_or_phone,
            password: hashedPassword,
        };

        // Insert the new user into the database
        db.insert(user, (err, newDoc) => {
            if (err) {
                return res.status(500).json({ error: 'Error saving user to database' });
            }
            return res.status(200).json({ message: 'User saved to database', id: newDoc._id });
        });
    } catch (error) {
        return res.status(500).json({ error: 'Server error while hashing password' });
    }
});

// Export the router
module.exports = router;
