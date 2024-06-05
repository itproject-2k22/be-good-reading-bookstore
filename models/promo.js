const pool = require('../config/db');

const getAllPromos = async () => {
    const result = await pool.query('SELECT * FROM promo');
    return result.rows;
};

const getPromoById = async (id) => {
    const result = await pool.query('SELECT * FROM promo WHERE id = $1', [id]);
    return result.rows[0];
};

const createPromo = async (promo) => {
    const { id, name, description, start, finish } = promo;
    const result = await pool.query(
        'INSERT INTO promo (id, name, description, start, finish) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, name, description, start, finish]
    );
    return result.rows[0];
};

const updatePromo = async (id, promo) => {
    const { name, description, start, finish } = promo;
    const result = await pool.query(
        'UPDATE promo SET name = $1, description = $2, start = $3, finish = $4 WHERE id = $5 RETURNING *',
        [name, description, start, finish, id]
    );
    return result.rows[0];
};

const deletePromo = async (id) => {
    const result = await pool.query('DELETE FROM promo WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllPromos,
    getPromoById,
    createPromo,
    updatePromo,
    deletePromo,
};
