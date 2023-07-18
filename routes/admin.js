module.exports = {
    adminLogin: (req,res,db) => {
        let data = [];
        db.collection('admin')
          .find({email:req.body.email})
          .forEach(d => data.push(d))
          .then(() => {
             let message = '';
             if(!data.length){
                message = "No such admin exists";
             }
             else if(data[0].password !== req.body.password){
                message = "Wrong Password";
             }
             else{
                message = "Logged In sucessfully";
             }
             return res.json({"message":message});
          })
          .catch(err => console.error(err));
    },
    addFlight: (req,res,db) => {
        const flightDetails = {
            flightId: req.body.flightId,
            airlineName: req.body.airlineName,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departTime,
            startDestination: req.body.startDestination,
            endDestination: req.body.endDestination,
            seats: req.body.seats,
            price: req.body.price,
            customerDetails: req.body.customerDetails
        }
        return db.collection('flight')
          .findOne({flightId:req.body.flightId})
          .then(isFound => {
                if(!isFound){
                    db.collection('flight')
                    .insertOne(flightDetails)
                    .then(data => res.json({"data":data,"message":"Added sucessfully"}))
                    .catch(err => res.json({"Message":err}))
                }
                else res.json({"message":"Flight with this flight ID already exists"}) 
          })
          .catch(err => res.json({"error":err}))
    },
    removeFlight: (req,res,db) => {
        return db.collection('flight')
          .findOne({flightId:req.body.flightId})
          .then(isFound => {
                if(isFound){
                    db.collection('flight')
                    .deleteOne({flightId:req.body.flightId})
                    .then(data => res.json({"data":data,"message":"deleted sucessfully"}))
                    .catch(err => res.json({"Message":err}))
                }
                else res.json({"message":"No such flight exists with the following flightId"}) 
          })
          .catch(err => res.json({"error":err}))
        
    },
    getFlightDetails: (req,res,db) => {
        let data = [];
        return db.collection('flight')
          .find({flightId:req.body.flightId,arrivalTime: req.body.arrivalTime},{customerDetails:1})
          .forEach(d => data.push(d.customerDetails))
          .then(() => {
             if(!data.length){
                res.json({"Message":"No such flight exists with the given flightId and Time"});
             }
             else{
                res.json({"data":data});
             }
          })
          .catch(err => console.error(err));
    }
};