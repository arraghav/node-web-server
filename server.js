const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials (__dirname + '/views/partials');
app.set ('view engine', 'hbs');

app.use ((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile ('server.log', log + '\n', (err) => {
    if (err) {
      console.log ('Unable to append to server.log');
    }
  });
  console.log (log);
  next();
});

// app.use ((req,res,next) => {
//   res.render ('maintenance.hbs', {
//     pageTitle: 'Under maintenance'
//   });
// });

app.use (express.static(__dirname + '/public'));

hbs.registerHelper ('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper ('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send ('<h1>Hello express!</h1>');
  // res.send ({
  //   name: 'Raghav',
  //   likes: [
  //     'Sports',
  //     'Movies'
  //   ]
  // })
  res.render ('home.hbs', {
    welcomeMessage: 'Welcome to Raghav',
    pageTitle: 'Home Page',
  });
});

app.get('/about', (req, res) => {
  res.render ('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/projects', (req, res) => {
  res.render ('projects.hbs', {
    pageTitle: 'Project Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen (port, () => {
  console.log (`Server is running in port ${port}`);
});
