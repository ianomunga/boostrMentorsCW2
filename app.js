const express = require('express');
const path = require('path');
const Datastore = require('nedb'); // Only if you need a db reference here

// Import route handlers
const joinRouter = require('./routes/joinRoutes');
const loginRouter = require('./routes/loginRoutes');
const adminLoginRouter = require('./routes/adminLoginRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');
const studentRouter = require('./routes/studentRoutes');

const app = express();

// Database setup - This is after db.js exports the database instance
const db = require('./config/db'); // This line imports the database configuration

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static('public'));

// Body parser middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/studentDashboard', (req, res) => {
  res.render('studentDashboard');
});


app.use('/join', joinRouter); // Use joinRouter for the /join route
app.use('/login', loginRouter); // Use loginRouter for the /login route
app.use('/adminLogin', adminLoginRouter); // Use adminRouter for the /adminLogin route
app.use('/admin', dashboardRouter); // Use dashboardRouter for the /admin/{CRUD} routes CRUD functions
app.use('/student', studentRouter); // Use studentRouter for the /student/{CRUD} routes CRUD functions

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));