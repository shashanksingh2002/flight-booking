const { updateAdminLoggedIn } = require('../database/database');

module.exports = {
  adminLogin: async (req, res, db) => {
    let data = [];
    let message = '';
    await db.collection('admin')
      .find({ email: req.body.email })
      .forEach(d => data.push(d))
      .then(async () => {
        let message = '';
        if (!data.length) {
          // No admin with the given email exists
          message = "No such admin exists";
        } else if (data[0].password !== req.body.password) {
          // Password doesn't match
          message = "Wrong Password";
        } else {
          // Update admin's logged-in status
          await updateAdminLoggedIn(req.body.email);
          message = "Logged In successfully";
        }
        return res.json({ "message": message });
      })
      .catch(err => console.error(err));
  },

  addFlight: (req, res, db) => {
    const flightDetails = {
      flightId: req.body.flightId,
      airlineName: req.body.airlineName,
      arrivalTime: req.body.arrivalTime,
      date: req.body.date,
      departureTime: req.body.departureTime,
      startDestination: req.body.startDestination,
      endDestination: req.body.endDestination,
      seats: req.body.seats,
      price: req.body.price,
      totalDuration: req.body.totalDuration,
      customerDetails: req.body.customerDetails
    };
    return db.collection('flight')
      .findOne({ flightId: req.body.flightId })
      .then(isFound => {
        if (!isFound) {
          // Flight with the given flightId doesn't exist, insert the flight details
          db.collection('flight')
            .insertOne(flightDetails)
            .then(data => res.json({ "data": data, "message": "Added successfully" }))
            .catch(err => res.json({ "Message": err }));
        } else {
          // Flight with the given flightId already exists
          res.json({ "message": "Flight with this flight ID already exists" });
        }
      })
      .catch(err => res.json({ "error": err }));
  },

  removeFlight: (req, res, db) => {
    return db.collection('flight')
      .findOne({ flightId: req.body.flightId })
      .then(isFound => {
        if (isFound) {
          // Flight with the given flightId exists, delete it
          db.collection('flight')
            .deleteOne({ flightId: req.body.flightId })
            .then(data => res.json({ "data": data, "message": "Deleted successfully" }))
            .catch(err => res.json({ "Message": err }));
        } else {
          // No flight with the given flightId exists
          res.json({ "message": "No such flight exists with the following flightId" });
        }
      })
      .catch(err => res.json({ "error": err }));
  },

  getFlightDetails: (req, res, db) => {
    let data = [];
    return db.collection('flight')
      .find({ flightId: req.body.flightId, arrivalTime: req.body.arrivalTime }, { customerDetails: 1 })
      .forEach(d => data.push(d.customerDetails))
      .then(() => {
        if (!data.length) {
          // No flight exists with the given flightId and arrivalTime
          res.json({ "Message": "No such flight exists with the given flightId and Time" });
        } else {
          // Return the flight details
          res.json({ "data": data });
        }
      })
      .catch(err => console.error(err));
  }
};
