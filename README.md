<!DOCTYPE html>
<html>
<head>
 
</head>
<body>
  <h1>Flight Booking Website</h1>
  <p>
    This is a flight booking website that allows users to book flights and administrators to manage flights.
  </p>
  <h2>Admin Routes</h2>
  <ul>
    <li>Admin Login: <code>POST /admin/login</code></li>
    <li>Add Flight: <code>POST /admin/addflight</code></li>
    <li>Remove Flight: <code>DELETE /admin/removeflight</code></li>
    <li>Get Customer Details: <code>POST /admin/getflightdetails</code></li>
    <li>Logout: <code>POST /admin/logout</code></li>
  </ul>
  
  <h3>Admin Login Request Body</h3>
  <pre>
{
  "email": "admin@test.com",
  "password": "test123"
}
  </pre>

  <h3>Add Flight Request Body</h3>
  <pre>
{
  "flightId": "12ABC22",
  "airlineName": "AirIndia",
  "arrivalTime": "20:00",
  "departureTime": "20:25",
  "totalDuration": "4:00",
  "startDestination": "nepal",
  "date": "05.01.2023",
  "endDestination": "kanyakumari",
  "seats": 60,
  "price": 8000,
  "email": "admin@test.com"
}
  </pre>

  <h3>Remove Flight Request Body</h3>
  <pre>
{
  "flightId": "12ABC23",
  "email": "admin@test.com"
}
  </pre>

  <h3>Get Customer Details Request Body</h3>
  <pre>
{
  "flightId": "12ABC19",
  "arrivalTime": "20:00",
  "email": "admin@test.com"
}
  </pre>

  <h3>Logout Request Body</h3>
  <pre>
{
  "email": "admin@test.com"
}
  </pre>

  <h2>User Routes</h2>
  <ul>
    <li>User Signup: <code>POST /user/signup</code></li>
    <li>User Login: <code>POST /user/login</code></li>
    <li>Search Flight: <code>POST /user/searchflight</code></li>
    <li>Book Flight: <code>POST /user/bookticket</code></li>
    <li>Get My Bookings: <code>GET /user/mybooking</code></li>
    <li>User Logout: <code>POST /user/logout</code></li>
  </ul>

  <h3>User Signup Request Body</h3>
  <pre>
{
  "fname": "abhijeet",
  "lname": "jha",
  "email": "abhijeety@123.com",
  "password": "123456"
}
  </pre>

  <h3>User Login Request Body</h3>
  <pre>
{
  "email": "mukund@123.com",
  "password": "123456"
}
  </pre>

  <h3>Search Flight Request Body</h3>
  <pre>
{
  "date": "05.01.2023",
  "startDestination": "bengalore",
  "endDestination": "hyderabad",
  "email": "mukund@123.com"
}
  </pre>

  <h3>Book Flight Request Body</h3>
  <pre>
{
  "flightId": "12ABC19",
  "arrivalTime": "20:00",
  "departureTime": "20:25",
  "startDestination": "jammu",
  "date": "05.01.2023",
  "endDestination": "kanyakumari",
  "seats": 3,
  "email": "mukund@123.com"
}
  </pre>

  <h3>Get My Bookings Request Body</h3>
  <pre>
{
  "email": "mukund@123.com"
}
  </pre>

  <h3>User Logout Request Body</h3>
  <pre>
{
  "email": "mukund@123.com"
}
  </pre>

  <h2>Database</h2>
  <p>
    The website uses a MongoDB database hosted on the cloud. It has three collections: <code>users</code>, <code>flight</code>, and <code>admin</code>.
  </p>

  <h3>User Schema</h3>
  <pre>
const user = {
  fName: req.body.fName,
  lName: req.body.lName,
  email: req.body.email,
  password: hashedPassword,
  isLoggedIn: false,
  currBooking: []
};
  </pre>

  <h3>Flight Schema</h3>
  <pre>
{
  "flightId": "12ABC22",
  "airlineName": "AirIndia",
  "arrivalTime": "20:00",
  "departureTime": "20:25",
  "totalDuration": "4:00",
  "startDestination": "nepal",
  "date": "05.01.2023",
  "endDestination": "kanyakumari",
  "seats": 60,
  "price": 8000,
  "customerDetails": []
}
  </pre>

  <h3>Admin Credentials</h3>
  <pre>
Email: "admin@test.com"
Password: "test123"
  </pre>

  <h2>Technologies Used</h2>
  <p>
    The website is built using HTML, CSS, JavaScript, Node.js, Express.js, MongoDB, EJS, and bcrypt for password hashing.
  </p>

  <h2>Important Notes</h2>
  <p>
    - Admins can only be added by the database administrator for testing purposes.
    <br>
    - The website has been tested and works perfectly on Postman.
    <br>
    - For frontend, all features work perfectly except for booking flights.
    <br>
    - Admin and user routes are protected through middlewares.
    <br>
    - bcrypt is used for hashing passwords before storing in the database.
  </p>
</body>
</html>
