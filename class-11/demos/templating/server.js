'use strict';

require('dotenv').config();
const express = require('express');
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs');


app.get('/', (req,res) => {
  res.render('pages/index');
});

app.get('/list', (req,res) => {
  let people = ['John','Cathy','Zach','Allie','Char','Rosie'];
  res.render('pages/list', {figglesandbits:people});
});

app.get('/books', (req,res) => {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=peanuts';
  superagent.get(url)
    .then( data => {
      res.render('pages/books', {books:data.body.items});
    });
});

app.listen(PORT, () => console.log('Up on port', PORT));
