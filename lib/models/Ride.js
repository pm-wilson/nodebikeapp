const pool = require('../utils/pool');

class Ride {
  ride_id;
  ride_name;
  ride_description;
  ride_photo;
  ride_bike;
  ride_trail;
  bike_name;
  trail_name;


  constructor(row) {
    this.ride_id = row.ride_id;
    this.ride_name = row.ride_name;
    this.ride_description = row.ride_description;
    this.ride_photo = row.ride_photo;
    this.ride_bike = row.ride_bike;
    this.ride_trail = row.ride_trail;
    this.bike_name = row.bike_name;
    this.trail_name = row.trail_name;
  }

  static async insert(ride) {
    const { rows } = await pool.query(
      `INSERT INTO rides (ride_name, ride_description, ride_photo, ride_bike, ride_trail)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [ride.ride_name, ride.ride_description, ride.ride_photo, ride.ride_bike, ride.ride_trail]
    );

    return new Ride(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
      SELECT rides.ride_id, rides.ride_name, rides.ride_description, rides.ride_photo, bikes.bike_name, trails.trail_name 
      FROM rides 
      INNER JOIN bikes ON rides.ride_bike = bikes.bike_id
      INNER JOIN trails ON rides.ride_trail = trails.trail_id
      `);
    return rows.map(row => new Ride(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM rides WHERE ride_id = $1',
      [id]
    );

    if (!rows[0]) return null;
    return new Ride(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM rides WHERE ride_id = $1 RETURNING *',
      [id]
    );

    return rows[0] ? new Ride(rows[0]) : null;
  }

  static async updateById(id, ride) {
    const { rows } = await pool.query(
      `UPDATE rides
       SET ride_name = $1,
           ride_description = $2,
           ride_photo = $3,
           ride_bike = $4,
           ride_trail = $5
       WHERE ride_id = $6
       RETURNING *`,
      [ride.ride_name, ride.ride_description, ride.ride_photo, ride.ride_bike, ride.ride_trail, id]
    );

    return rows[0] ? new Ride(rows[0]) : null;
  }
}

module.exports = Ride;