const db = require('../../database');

class CategoriesRepository {
  async findAll() {
    const rows = db.query('SELECT * FROM categories ORDER BY name');
    return rows;
  }

  async create({
    name,
  }) {
    // Retorna com o RETURNING.
    const [row] = await db.query(
      'INSERT INTO categories (name) VALUES ($1) RETURNING *',
      [name],
    );

    return row;
  }
}

module.exports = new CategoriesRepository();
