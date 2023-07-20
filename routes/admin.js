const { updateAdminLoggedIn } = require('../database/database');

module.exports = {
  adminLogin: async (req, res, db) => {
    let data = [];
    let message = '';
    return db.collection('admin')
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
        return { "message": message,"email": req.body.email };
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
      customerDetails: []
    };
    return db.collection('flight')
      .findOne({ flightId: req.body.flightId })
      .then(isFound => {
        if (!isFound) {
          // Flight with the given flightId doesn't exist, insert the flight details
          return db.collection('flight')
            .insertOne(flightDetails)
            .then((data) => { return {"message": "Added successfully" }})
            .catch(err => {return { "message": err }});
        } else {
          return { "message": "Flight with this flight ID already exists" };
        }
      })
      .catch(err => {
        return { "error": err }
      });
  },

  removeFlight: (req, res, db) => {
    console.log(req.body.flightId)
    return db.collection('flight')
      .findOne({ flightId: req.body.flightId })
      .then(isFound => {
        if (isFound) {
          // Flight with the given flightId exists, delete it
          return db.collection('flight')
            .deleteOne({ flightId: req.body.flightId })
            .then(data => {
              return { "message": "Deleted successfully" }  
            })
            .catch(err => { return { "message": err }});
        } else {
          // No flight with the given flightId exists
          return { "message": "No such flight exists with the following flightId" };
        }
      })
      .catch(err => {
        return {error: err};
      });
  },

  getFlightDetails: (req, res, db) => {
    let data = [];
    return db.collection('flight')
      .find({ flightId: req.body.flightId, arrivalTime: req.body.arrivalTime }, { customerDetails: 1 })
      .forEach(d => data.push(d.customerDetails))
      .then(() => {
        if (!data.length) {
          // No flight exists with the given flightId and arrivalTime
          return { "Message": "No such flight exists with the given flightId and Time" };
        } else {
          // Return the flight details
          return data;
        }
      })
      .catch(err => {
         return {error:err};
      });
  }
};
