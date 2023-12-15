const express = require('express');
const Datastore = require('nedb');

const router = express.Router();

// Initialize the NeDB Datastore
const db = new Datastore({ filename: './data/nedb_database.db', autoload: true });

// Middleware for parsing application/x-www-form-urlencoded and application/json
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Add a New Mentor
router.post('/addMentor', (req, res) => {
    const mentorData = Object.assign({}, req.body, { type: 'mentor' });
    db.insert(mentorData, (err, newDoc) => {
        if (err) {
            res.status(500).send('Error adding mentor');
        } else {
            res.send(`Mentor added successfully: ${newDoc.name}`);
        }
    });
});

// Display Mentor by Name
router.post('/displayMentorByName', (req, res) => {
    var regex = new RegExp(req.body.name, 'i'); // 'i' for case-insensitivity to prevent false-negatives
    db.findOne({ name: req.body.name, type: 'mentor' }, (err, doc) => {
        if (err) {
            res.status(500).send('Error finding mentor');
        } else if (doc) {
            res.json(doc); // Sends the single mentor object
        } else {
            res.send('No mentor found with that name');
        }
    });
});

// Update a Mentor
router.post('/updateMentor', (req, res) => {
    const updatedData = Object.assign({}, req.body, { type: 'mentor' });
    db.update({ email: req.body.email, type: 'mentor' }, { $set: updatedData }, {}, (err) => {
        if (err) {
            res.status(500).send('Error updating mentor');
        } else {
            res.send('Mentor updated successfully');
        }
    });
});

// Delete a Mentor
router.post('/deleteMentor', (req, res) => {
    //var regex = new RegExp(req.body.name, 'i'); // 'i' for case-insensitivity to prevent false-negatives
    db.remove({ name: req.body.name, type: 'mentor' }, {}, (err, numRemoved) => {
        if (err) {
            res.status(500).send('Error deleting mentor');
        } else if (numRemoved > 0) {
            res.send('Mentor deleted successfully');
        } else {
            res.send('No mentor found with that name');
        }
    });
});

// Display all Mentors
router.post('/displayMentors', (req, res) => {
    db.find({ type: 'mentor' }, (err, docs) => {
        if (err) {
            res.status(500).send('Error retrieving mentors');
        } else {
            res.json(docs);
        }
    });
});

module.exports = router;
