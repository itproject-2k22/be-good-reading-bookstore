const pool = require('../config/db');

const getAllBooksPromos = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM books_promo');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getBookPromoById = async (books_id, promo_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM books_promo WHERE books_id = $1 AND promo_id = $2', [books_id, promo_id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const createBookPromo = async (bookPromo) => {
    const { books_id, promo_id } = bookPromo;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO books_promo (books_id, promo_id) VALUES ($1, $2) RETURNING *',
            [books_id, promo_id]
        );
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const updateBookPromo = async (books_id, promo_id, bookPromo) => {
    const { new_books_id, new_promo_id } = bookPromo;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'UPDATE books_promo SET books_id = $1, promo_id = $2 WHERE books_id = $3 AND promo_id = $4 RETURNING *',
            [new_books_id, new_promo_id, books_id, promo_id]
        );
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const deleteBookPromo = async (books_id, promo_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('DELETE FROM books_promo WHERE books_id = $1 AND promo_id = $2 RETURNING *', [books_id, promo_id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

module.exports = {
    getAllBooksPromos,
    getBookPromoById,
    createBookPromo,
    updateBookPromo,
    deleteBookPromo,
};
