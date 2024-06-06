const pool = require('../config/db');

const getAllWishlists = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM wishlist');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getWishlistByCustomerId = async (customer_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM wishlist WHERE customer_id = $1', [customer_id]);
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getBooksByWishlistId = async (books_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM wishlist WHERE books_id = $1', [books_id]);
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const addToWishlist = async (wishlist) => {
    const { customer_id, books_id } = wishlist;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO wishlist (customer_id, books_id) VALUES ($1, $2) RETURNING *',
            [customer_id, books_id]
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

const removeFromWishlist = async (customer_id, books_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'DELETE FROM wishlist WHERE customer_id = $1 AND books_id = $2 RETURNING *',
            [customer_id, books_id]
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

module.exports = {
    getAllWishlists,
    getWishlistByCustomerId,
    getBooksByWishlistId,
    addToWishlist,
    removeFromWishlist,
};
