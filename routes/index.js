var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Awesome Bike App' });
});

router.get('/bikes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM bikes');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error on Bikes');
  }
});
router.get('/rides', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT rides.ride_id, rides.ride_name, rides.ride_description, rides.ride_photo, bikes.bike_name, trails.trail_name 
      FROM rides 
      INNER JOIN bikes ON rides.ride_bike=bikes.bike_id
      INNER JOIN trails ON rides.ride_trail=trails.trail_id
      `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error on Rides');
  }
});
router.get('/trails', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM trails');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error on Trails');
  }
});

module.exports = router;
