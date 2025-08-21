const pool = require('../utils/pool');

class Trail {
  trail_id;
  trail_name;
  trail_description;
  trail_photo;
  trail_miles;

  constructor(row) {
    this.trail_id = row.trail_id;
    this.trail_name = row.trail_name;
    this.trail_description = row.trail_description;
    this.trail_photo = row.trail_photo;
    this.trail_miles = row.trail_miles;
  }

  static async insert(trail) {
    const { rows } = await pool.query(
      'INSERT INTO trails (trail_name, trail_description, trail_photo, trail_miles) VALUES ($1, $2, $3, $4) RETURNING *',
      [trail.trail_name, trail.trail_description, trail.trail_photo, trail.trail_miles]
    );

    return new Trail(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query('SELECT * FROM trails');

    return rows.map(row => new Trail(row));
  }

  static async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM trails WHERE id = $1',
      [id]
    );

    if (!rows[0]) return null;

    return new Trail(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM trails WHERE id = $1 RETURNING *',
      [id]
    );

    return rows[0] ? new Trail(rows[0]) : null;
  }

  static async updateById(id, trail) {
    const { rows } = await pool.query(
      `UPDATE trails
       SET trail_name = $1,
           trail_description = $2,
           trail_photo = $3,
           trail_miles = $4
       WHERE trail_id = $5
       RETURNING *`,
      [trail.trail_name, trail.trail_description, trail.trail_photo, trail.trail_miless, id]
    );

    return rows[0] ? new Trail(rows[0]) : null;
  }
}

module.exports = Trail;