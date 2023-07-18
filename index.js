//requiring functions
const express = require('express');
const { adminLogin, addFlight, removeFlight, getFlightDetails } = require('./routes/admin');
const { connectToDb } = require('./database/database');
const app = express();
const port = 3000;


let db = '';

//middlewares
app.use(express.json());
app.use(express.static('public'));


//connecting to server
connectToDb((flag,DB) => {
   if(flag){
       app.listen(port, () => {
            console.log('Server is connected to database and running sucessfully at port:',port);
            db = DB;
       });
   }
   else{
       console.log('Error in connection to database: ',db);
   } 
});



//admin routes
app.post('/admin/adminlogin', (req, res) => {
    adminLogin(req,res,db);
});

app.post('/admin/addflight', (req,res) => {
    addFlight(req,res,db);
});

app.delete('/admin/removeflight', (req,res) => {
    removeFlight(req,res,db);
});

app.get('/admin/getflightdetails', (req,res) => {
    getFlightDetails(req,res,db);
});



//user routes
app.post('/user/login', (req,res) => {

});

app.post('/user/signup', (req,res) => {

});

app.get('/user/searchflight', (req,res) => {

});

app.post('/user/bookticket', (req,res) => {

});

app.get('/user/mybooking', (req,res) => {

});

app.post('/user/logout', (req,res) => {
    
});






