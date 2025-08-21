var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/bikes', require('./lib/controllers/BikesController'));
app.use('/rides', require('./lib/controllers/RidesController'));
app.use('/trails', require('./lib/controllers/TrailsController'));

app.listen(3000, () => {
  console.log('This Awesome Server is running on port 3000');
});

module.exports = app;
