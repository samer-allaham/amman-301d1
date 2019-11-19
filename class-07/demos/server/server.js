'use strict';

// Dependecies (express, cors, dotenv)

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;

const server = express();

server.use( cors() );

server.get('/location', locationHandler);
server.get('/weather', weatherHandler);

function locationHandler(req,res) {
  // Query String = ?a=b&c=d
  getLocation(req.query.data)
    .then( locationData => res.status(200).json(locationData) );
}

function getLocation(city) {
  // No longer get from file
  // let data = require('./data/geo.json');

  // Get it from Google Directly`
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.GEOCODE_API_KEY}`

  return superagent.get(url)
    .then( data => {
      return new Location(city, data.body);
    })

}

function Location(city, data) {
  this.search_query = city;
  this.formatted_query = data.results[0].formatted_address;
  this.latitude = data.results[0].geometry.location.lat;
  this.longitude = data.results[0].geometry.location.lng;

}

// ------------------------------- //
// WEATHER
// ------------------------------- //

function weatherHandler(req,res) {
  // Query String = ?a=b&c=d
  getWeather(req.query.data)
    .then( weatherData => res.status(200).json(weatherData) );

}

function getWeather(query) {
  // let data = require('./data/darksky.json');
  const url = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${query.latitude},${query.longitude}`;
  return superagent.get(url)
    .then( data => {
      let weather = data.body;
      return weather.daily.data.map( (day) => {
        return new Weather(day);
      });
    });
}

function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toDateString();
}


server.use('*', (req,res) => {
  // This is a comment
  res.status(404).send('huh?????');
});

server.listen( PORT, () => console.log('hello world, from port', PORT));
