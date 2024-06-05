const pool = require('../config/db');

const getAllWishlists = async () => {
    const result = await pool.query('SELECT * FROM wishlist');
    return result.rows;
};

const getWishlistByCustomerId = async (customer_id) => {
    const result = await pool.query('SELECT * FROM wishlist WHERE customer_id = $1', [customer_id]);
    return result.rows;
};

const getBooksByWishlistId = async (books_id) => {
    const result = await pool.query('SELECT * FROM wishlist WHERE books_id = $1', [books_id]);
    return result.rows;
};

const addToWishlist = async (wishlist) => {
    const { customer_id, books_id } = wishlist;
    const result = await pool.query(
        'INSERT INTO wishlist (customer_id, books_id) VALUES ($1, $2) RETURNING *',
        [customer_id, books_id]
    );
    return result.rows[0];
};

const removeFromWishlist = async (customer_id, books_id) => {
    const result = await pool.query(
        'DELETE FROM wishlist WHERE customer_id = $1 AND books_id = $2 RETURNING *',
        [customer_id, books_id]
    );
    return result.rows[0];
};

module.exports = {
    getAllWishlists,
    getWishlistByCustomerId,
    getBooksByWishlistId,
    addToWishlist,
    removeFromWishlist,
};
