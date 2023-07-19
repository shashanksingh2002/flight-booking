const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://shashanksingh:Qwerty2002@cluster0.a6k5yop.mongodb.net/'; // MongoDB connection URI
const dbName = 'flightbooking'; // Name of your MongoDB database
let db = ''; // Placeholder for the MongoDB client

module.exports = {
  // Function to connect to the MongoDB database
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then(client => {
        db = client.db(dbName); // Store the MongoDB client
        return cb(1, db); // Callback with success flag and database object
      })
      .catch(err => {
        return cb(0, err); // Callback with error flag and error message
      })
  },

  // Check if the email already exists in the users collection
  isEmailAlreadyPresentInDb: (email) => {
    return db.collection('users')
      .findOne({ email: email })
      .then(isFound => isFound) // Return the result of the findOne operation
      .catch(err => console.error('Error in searching in db', err));
  },

  // Get user details based on the email
  getUserDetails: (email) => {
    let data = [];
    return db.collection('users')
      .find({ email: email })
      .forEach(d => data.push(d)) // Push each document into the data array
      .then(() => data) // Return the data array
      .catch(err => console.error(err));
  },

  // Update the isLoggedIn field to true for a user
  updateisLoggedIn: (email) => {
    return db.collection('users')
      .updateOne({ email: email }, { $set: { isLoggedIn: true } })
      .then(d => d) // Return the result of the updateOne operation
      .catch(err => console.error(err));
  },

  // Update the isLoggedIn field to false for a user
  updateisLoggedOut: (email) => {
    return db.collection('users')
      .updateOne({ email: email }, { $set: { isLoggedIn: false } })
      .then(d => d) // Return the result of the updateOne operation
      .catch(err => console.error(err));
  },

  // Check if there are enough seats available for a flight
  checkIfSeatsPresent: (flightId, seatsNeeded) => {
    let data = [];
    return db.collection('flight')
      .find({ flightId: flightId }, { seats: 1 })
      .forEach(d => data.push(d)) // Push each document into the data array
      .then(() => (data[0].seats >= seatsNeeded) ? true : false) // Return true or false based on seats availability
      .catch(err => console.error(err));
  },

  // Update user's current booking with a new ticket
  updateCustomerFlight: (req) => {
    const ticket = {
      seats: req.body.seats,
      flightId: req.body.flightId,
      startDestination: req.body.startDestination,
      endDestination: req.body.endDestination,
      date: req.body.date,
      arrivalTime: req.body.arrivalTime,
      departureTime: req.body.departureTime
    }
    return db.collection('users')
      .updateOne({ email: req.body.email }, { $push: { currBooking: ticket } })
      .then(d => d) // Return the result of the updateOne operation
      .catch(err => err);
  },

  // Update flight's customerDetails with a new booking
  updateFlightsCustomer: (req) => {
    const booking = {
      seats: req.body.seats,
      email: req.body.email
    }
    return db.collection('flight')
      .updateOne(
        { flightId: req.body.flightId },
        { $push: { customerDetails: booking }, $inc: { seats: -req.body.seats } }
      )
      .then(result => result) // Return the result of the updateOne operation
      .catch(err => err);
  },

  // Update the isLoggedIn field to true for an admin
  updateAdminLoggedIn: (email) => {
    return db.collection('admin')
      .updateOne({ email: email }, { $set: { isLoggedIn: true } })
      .then(d => d) // Return the result of the updateOne operation
      .catch(err => console.error(err));
  },

  // Update the isLoggedIn field to false for an admin
  adminLogout: (email, res) => {
    return db.collection('admin')
      .updateOne({ email: email }, { $set: { isLoggedIn: false } })
      .then(() => res.json({ "message": "Admin logged out successfully" }))
      .catch(err => console.error(err));
  },

  // Check if an admin is logged in based on the email
  isAdminLoggedIn: (email) => {
    let data = [];
    return db.collection('admin')
      .find({ email: email })
      .forEach(d => data.push(d)) // Push each document into the data array
      .then(() => {
        if (data[0].isLoggedIn) {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => console.error(err));
  },

  // Check if a user is logged in based on the email
  isUserLoggedIn: (email) => {
    let data = [];
    return db.collection('users')
      .find({ email: email })
      .forEach(d => data.push(d)) // Push each document into the data array
      .then(() => {
        if (data[0].isLoggedIn) {
          return true;
        } else {
          return false;
        }
      })
      .catch(err => console.error(err));
  }
};
