'use strict';

require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.use( express.json() );

// MAGIC -- converts a POST from a form into req.body for you
app.use( express.urlencoded({extended:true}));
app.use( express.static('./public') );

app.get('/incoming', (req,res) => {
  console.log('Got here from a get request ... ', req.query);
  res.redirect('/thanks.html');
});

app.post('/incoming', (req,res) => {
  console.log('Got here from a post request ... ', req.body);
  res.redirect('/thanks.html');
});

/// app.put()
/// app.delete()


app.listen( PORT, () => console.log(`Up on port ${PORT}`));
