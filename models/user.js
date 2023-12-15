const Datastore = require('nedb');
const bcrypt = require('bcrypt');

// Initialize NeDB database
const db = new Datastore({ filename: './data/users.db', autoload: true });

// Define the User model
class User {
    constructor(email_or_phone, password) {
        this.email_or_phone = email_or_phone;
        this.password = password; // This should be hashed before storage
    }

    // Save the user to the database
    save(callback) {
        const user = {
            email_or_phone: this.email_or_phone,
            password: this.password
        };
        db.insert(user, callback);
    }

    // Static method to find a user by email or phone
    static findByEmailOrPhone(email_or_phone, callback) {
        db.findOne({ email_or_phone }, callback);
    }

    // Static method to update a user by ID
    static updateById(userId, data, callback) {
        db.update({ _id: userId }, { $set: data }, {}, callback);
    }

    // Static method to delete a user by ID
    static deleteById(userId, callback) {
        db.remove({ _id: userId }, {}, callback);
    }
}

// Export the User model
module.exports = User;
