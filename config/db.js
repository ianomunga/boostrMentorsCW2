// Database configuration and connections
const Datastore = require('nedb');

// Instantiate a NeDB database and point it to the /data directory
const db = new Datastore({ filename: './data/nedb_database.db', autoload: true });
module.exports = db; // Export the db instance