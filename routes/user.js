const { cmpHashedPassword, hashPassword} = require('../src/bcrypt');
const { isEmailAlreadyPresentInDb, getUserDetails, updateisLoggedIn, updateisLoggedOut, checkIfSeatsPresent, updateFlightsCustomer, updateCustomerFlight } = require('../database/database');

module.exports = {
  userSignup: async (req, res, db) => {
    // Check if the email is already present in the database
    const isEmailAlreadyPresent = await isEmailAlreadyPresentInDb(req.body.email);
    if (isEmailAlreadyPresent) {
      // Email is already signed up, return a message
      return res.json({ "Message": "Please, go to login page. Email already signed up." });
    } else {
      // Hash the password and create a new user object
      const hashedPassword = await hashPassword(req.body.password);
      const user = {
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: hashedPassword,
        isLoggedIn: false,
        currBooking: []
      };
      return db.collection('users')
        .insertOne(user)
        .then(ack => { return { "Message": "Added user", "data": ack }})
        .catch(err => { return { "Message": "Failed to add user" }});
    }
  },
  userLogin: async (req, res, db) => {
    // Check if the email is present in the database
    const checkInDbEmail = await isEmailAlreadyPresentInDb(req.body.email);

    // If the email is not found, return an error message
    if (!checkInDbEmail) {
      return { 'Message': 'Please sign up. Email not found.' };
    }

    // Get user details for checking the password
    const getUser = await getUserDetails(req.body.email);
    // Check if the password is correct
    const checkPassword = await cmpHashedPassword(req.body.password, getUser[0].password);

    // If the password is incorrect, return an error message
    if (!checkPassword) {
      return { 'Message': 'Incorrect password. Please try again.'};
    } else {
      // Update user's logged-in status
      await updateisLoggedIn(req.body.email);
      return { 'Message': 'Successfully logged in.','data':1, email: req.body.email};
    }
  },
  getFlight: (req, res, db) => {
    let data = [];
    return db.collection('flight')
      .find({ date: req.body.date, startDestination: req.body.startDestination, endDestination: req.body.endDestination })
      .forEach(d => data.push(d))
      .then(() => {
        if (!data.length) {
          // No flights exist with the given criteria
          return { message: "No flights exist" };
        } else {
          // Return the flight data
          return { data: data };
        }
      })
      .catch(err => {
        return {err : data};
      });
  },
  bookTicket: async (req, res, db) => {
    const IsSeatsPresent = await checkIfSeatsPresent(req.body.flightId, req.body.seats);
    if (!IsSeatsPresent) {
      // Not enough seats available, return a message
      return { 'Message': 'Not enough seats present' };
    }
    await updateFlightsCustomer(req);
    const booking = await updateCustomerFlight(req);
    // Return the booking details and success message
    return { 'booking': booking, 'message': 'Tickets booked successfully' };
  },
  getMyBooking: (req, res, db) => {
    let data = [];
    return db.collection('users')
      .find({ email: req.body.email }, { currBooking: 1 })
      .forEach(d => data.push(d.currBooking))
      .then(() => {
        // Return the user's booking data
        return { "data": data };
      })
      .catch(err => console.error(err));
  },
  userLogout: async (req, res, db) => {
    // Update user's logged-out status
    await updateisLoggedOut(req.body.email);
    return { 'message': 'Successfully logged out.' };
  }
};
