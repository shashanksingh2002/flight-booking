const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://shashanksingh:Qwerty2002@cluster0.a6k5yop.mongodb.net/';
const dbName = 'flightbooking';

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(uri)
                   .then(client => {
                        return cb(1,client.db(dbName));
                   })
                   .catch(err => {
                        return cb(0,err);
                   })
    }
};