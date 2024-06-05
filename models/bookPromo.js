const pool = require('../config/db');

const getAllBooksPromos = async () => {
    const result = await pool.query('SELECT * FROM books_promo');
    return result.rows;
};

const getBookPromoById = async (books_id, promo_id) => {
    const result = await pool.query('SELECT * FROM books_promo WHERE books_id = $1 AND promo_id = $2', [books_id, promo_id]);
    return result.rows[0];
};

const createBookPromo = async (bookPromo) => {
    const { books_id, promo_id } = bookPromo;
    const result = await pool.query(
        'INSERT INTO books_promo (books_id, promo_id) VALUES ($1, $2) RETURNING *',
        [books_id, promo_id]
    );
    return result.rows[0];
};

const updateBookPromo = async (books_id, promo_id, bookPromo) => {
    const result = await pool.query(
        'UPDATE books_promo SET books_id = $1, promo_id = $2 WHERE books_id = $3 AND promo_id = $4 RETURNING *',
        [bookPromo.books_id, bookPromo.promo_id, books_id, promo_id]
    );
    return result.rows[0];
};

const deleteBookPromo = async (books_id, promo_id) => {
    const result = await pool.query('DELETE FROM books_promo WHERE books_id = $1 AND promo_id = $2 RETURNING *', [books_id, promo_id]);
    return result.rows[0];
};

module.exports = {
    getAllBooksPromos,
    getBookPromoById,
    createBookPromo,
    updateBookPromo,
    deleteBookPromo,
};
