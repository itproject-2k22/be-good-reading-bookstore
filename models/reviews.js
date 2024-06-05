const pool = require('../config/db');

const getAllReviews = async () => {
    const result = await pool.query('SELECT * FROM reviews');
    return result.rows;
};

const getReviewById = async (reviews_id) => {
    const result = await pool.query('SELECT * FROM reviews WHERE reviews_id = $1', [reviews_id]);
    return result.rows[0];
};

const createReview = async (review) => {
    const { reviews_id, book_id, score, detail_review } = review;
    const result = await pool.query(
        'INSERT INTO reviews (reviews_id, book_id, score, detail_review) VALUES ($1, $2, $3, $4) RETURNING *',
        [reviews_id, book_id, score, detail_review]
    );
    return result.rows[0];
};

const updateReview = async (reviews_id, review) => {
    const { book_id, score, detail_review } = review;
    const result = await pool.query(
        'UPDATE reviews SET book_id = $1, score = $2, detail_review = $3 WHERE reviews_id = $4 RETURNING *',
        [book_id, score, detail_review, reviews_id]
    );
    return result.rows[0];
};

const deleteReview = async (reviews_id) => {
    const result = await pool.query('DELETE FROM reviews WHERE reviews_id = $1 RETURNING *', [reviews_id]);
    return result.rows[0];
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};
