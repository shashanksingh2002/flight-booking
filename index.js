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
const { json } = require('body-parser');

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

let db = '';

// Middlewares
app.use(express.json());
app.use(express.static(__dirname+'/public'));

// Apply middleware for secure admin routes
app.use('/admin/*', secureAdminRoute);

// Apply middleware for secure user routes
app.use('/user/*', secureUserRoute);

//view engine
app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');




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

//home page

app.get('/', (req,res) => {
    const email = req.query.email;
    res.render(__dirname+'/views/index.ejs',{email:email});
});

app.get('/loginuser' ,(req,res) => {
   res.render(__dirname+'/views/login.ejs');
});

app.get('/signupuser', (req,res) => {
  res.render(__dirname+'/views/signup.ejs');
});

app.get('/loginadmin', (req,res) => {
  res.render(__dirname+'/views/adminlogin.ejs');
});

app.get('/adminhomepage', (req,res) => {
  const email = req.query.email;
  res.render(__dirname+'/views/adminhome.ejs',{email:email});
})

// Admin routes
app.post('/admin/login', async(req, res) => {
  // Handle admin login
  const data = await adminLogin(req, res, db);
  res.json(data);
});

app.post('/admin/addflight', async(req, res) => {
  // Handle adding a flight
  const data = await addFlight(req, res, db);
  res.json(data);
});

app.delete('/admin/removeflight', async(req, res) => {
  // Handle removing a flight
  const data = await removeFlight(req, res, db);
  res.json(data);
});

app.post('/admin/getflightdetails', async(req, res) => {
  // Handle getting flight details
  const data = await getFlightDetails(req, res, db);
  res.json(data);
});

app.post('/admin/logout', async(req, res) => {
  // Handle admin logout
  const data = await adminLogout(req.body.email, res);
  res.json(data);
});

// User routes
app.post('/user/login', async(req, res) => {
  const data = await userLogin(req, res, db);
  res.json(data);
});

app.post('/user/signup', async(req, res) => {
  // Handle user signup
  const data = await userSignup(req, res, db);
  res.json(data);
});

app.post('/user/searchflight', async(req, res) => {
  // Handle searching for a flight
  const data = await getFlight(req, res, db);
  res.json(data);
});

app.post('/user/bookticket', async(req, res) => {
  // Handle booking a ticket
  const data = await bookTicket(req, res, db);
  res.json(data);
});

app.get('/user/mybooking', async(req, res) => {
  // Handle getting user's booking details
  const data = await getMyBooking(req, res, db);
  res.json(data);
});

app.post('/user/logout', async(req, res) => {
  // Handle user logout
  const data = await userLogout(req, res, db);
  res.json(data);
});

app.get('/*',(req,res) => {
  res.send('No such page exists');
});