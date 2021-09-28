const mongoose = require('mongoose');

// The purpose of this file is to create a connection from our express 
// server to the mongodb server that is running on our computer
// 2 servers, express (Web application) mongodb (database)

// 'mongodb://localhost <--- this is our mongodb servers location on port 27017
mongoose.connect('mongodb://localhost/flights', { // /movies <--- name of the database that we're connecting to
// if movies exists, connect to that database in mongodb, if not, create it
  useNewUrlParser: true,
  useUnifiedTopology: true // <--- this object are configuration options, that are dealing with 
  // deprecations and changes in the mongoose module

});


const db = mongoose.connection;


// connected is a default event listener

db.on('connected', function() {
	// this log will occur when our express app has a connection with 
	// mongodb
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`);
});