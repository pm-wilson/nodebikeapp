const pool = require('../utils/pool');

class Bike {
    bike_id;
    bike_name;
    bike_description;
    bike_photo;

    constructor(row) {
        this.bike_id = row.bike_id;
        this.bike_name = row.bike_name;
        this.bike_description = row.bike_description;
        this.bike_photo = row.bike_photo;
    }

    static async insert(bike) {
        const { rows } = await pool.query(
            'INSERT INTO bikes (name, description, photo) VALUES ($1, $2, $3) RETURNING *',
            [bike.bike_name, bike.bike_description, bike.bike_photo]
        );

        return new Bike(rows[0]);
    }

    static async find() {
        const { rows } = await pool.query(
            'SELECT * FROM bikes'
        );

        const formattedRows = rows.map(row => new Bike(row));
        
        return formattedRows;
    }

    static async findById(id) {
        const { rows } = await pool.query(
        'SELECT * FROM bikes WHERE bike_id=$1',
        [id]
        );
        
        if(!rows[0]) return null;

        return new Bike(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query(
        'DELETE FROM bikes WHERE bike_id = $1 RETURNING *',
        [id]
        );

        return new Bike(rows[0]);
    }

  static async updateById(id, bike) {
    const { rows } = await pool.query(
      `UPDATE bikes
        SET bike_name = $1,
            bike_description = $2,
            bike_photo = $3
        WHERE bike_id = $4
        RETURNING *`,
      [bike.bike_name, bike.bike_description, bike.bike_photo, id]
    );

    return new Bike(rows[0]);
  }
}

module.exports = Bike;