let projectData = [];
// Require Express to run server and routes
var path = require('path')
const express = require('express');
const cors = require('cors');
// Start up an instance of app
const app = express(); 

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Spin up the server
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

//get route
app.get('/data', (req, res) => {
  res.send(projectData)
});
  
//geoname data
app.post('/geonames', (req, res) => {
  dataGeonames = {
  latitude: req.body.latitude,
  longitude: req.body.longitude,
  country: req.body.country,
  city: req.body.city,
  };
  console.log(dataGeonames);
  projectData.push(dataGeonames);
  res.send(projectData);
});
  
//weatherbit data
app.post('/weatherbit', (req, res) => {
  dataWeatherbit = {
    high: req.body.high,
    low: req.body.low,
    description: req.body.description,
  };
  projectData.push(dataWeatherbit);
  res.send(projectData);
})

//pixabay data
app.post('/pixabay', (req, res) => {
  dataPixabay = {
    image: req.body.image,
  }
  projectData.push(dataPixabay);
  res.send(projectData)
})