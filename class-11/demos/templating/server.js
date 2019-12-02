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

app.get('/searches', (req,res) => {
  console.log(req.query);
  // { words: '-99999', searchBy: 'title' }
  let searchBy = req.query.searchBy;
  let words = req.query.words;
  let url = `https://www.googleapis.com/books/v1/volumes?q=in${searchBy}:${words}`;
  superagent.get(url)
    .then( data => {
      let books = data.body.items.map( book => new Book(book) );
      res.render('pages/books', {books:books});
    });
});

function Book(data) {
  this.title = data.volumeInfo.title;
  this.author = (data.volumeInfo.authors && data.volumeInfo.authors[0]) || '';
  this.description = data.volumeInfo.description;
  this.isbn = (data.volumeInfo.industryIdentifiers && data.volumeInfo.industryIdentifiers[0].identifier) || '';
  this.image = (data.volumeInfo.imageLinks && data.volumeInfo.imageLinks.thumbnail) || '';
}

app.listen(PORT, () => console.log('Up on port', PORT));
