// Require necessary modules
const express = require('express');

// Require route handlers
const { adminLogin, addFlight, removeFlight, getFlightDetails } = require('./routes/admin');
const { userLogin, userSignup, getFlight, bookTicket, getMyBooking, userLogout } = require('./routes/user');

// Require database functions
const { connectToDb, adminLogout } = require('./database/database');

// Require middleware functions
const { secureAdminRoute } = require('./middlewares/secureadmin');
const { secureUserRoute } = require('./middlewares/secureuser');

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

let db = '';

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Apply middleware for secure admin routes
app.use('/admin/*', secureAdminRoute);

// Apply middleware for secure user routes
app.use('/user/*', secureUserRoute);

// Connect to the database
connectToDb((flag, DB) => {
  if (flag) {
    // Database connection successful, start the server
    app.listen(port, () => {
      console.log('Server is connected to the database and running successfully at port:', port);
      db = DB;
    });
  } else {
    // Database connection failed
    console.log('Error in connection to database:', DB);
  }
});

// Admin routes
app.post('/admin/login', (req, res) => {
  // Handle admin login
  adminLogin(req, res, db);
});

app.post('/admin/addflight', (req, res) => {
  // Handle adding a flight
  addFlight(req, res, db);
});

app.delete('/admin/removeflight', (req, res) => {
  // Handle removing a flight
  removeFlight(req, res, db);
});

app.get('/admin/getflightdetails', (req, res) => {
  // Handle getting flight details
  getFlightDetails(req, res, db);
});

app.post('/admin/logout', (req, res) => {
  // Handle admin logout
  adminLogout(req.body.email, res);
});

// User routes
app.post('/user/login', (req, res) => {
  // Handle user login
  userLogin(req, res, db);
});

app.post('/user/signup', (req, res) => {
  // Handle user signup
  userSignup(req, res, db);
});

app.get('/user/searchflight', (req, res) => {
  // Handle searching for a flight
  getFlight(req, res, db);
});

app.post('/user/bookticket', (req, res) => {
  // Handle booking a ticket
  bookTicket(req, res, db);
});

app.get('/user/mybooking', (req, res) => {
  // Handle getting user's booking details
  getMyBooking(req, res, db);
});

app.post('/user/logout', (req, res) => {
  // Handle user logout
  userLogout(req, res, db);
});
