const pool = require('../config/db');

const showAllBooks = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM book_list');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const showBooksRating = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM book_list');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const showAllReviews = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('select books.title as "Title", score as "Score", detail_review as "Reviews" from reviews JOIN books ON books.id = book_id');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const showAllWishlist = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('select * FROM wishlist_quantity');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const addReview = async (body) =>{
    const { reviews_id, book_id, score, detail_review} = body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const bookResult = await client.query(
            'INSERT INTO reviews (reviews_id, book_id, score, detail_review) VALUES ($1, $2, $3, $4) RETURNING *',
            [reviews_id, book_id, score, detail_review]
        );
        await client.query('COMMIT');
        return bookResult.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}
const updateReview = async (body) =>{
    const { reviews_id, book_id, score, detail_review} = body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'UPDATE reviews SET book_id = $1, score = $2, detail_review = $3 WHERE reviews_id = $4 RETURNING *',
            [book_id, score, detail_review, reviews_id]
        );
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

const deleteReview = async (id) =>{
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const bookResult = await client.query(
            'DELETE FROM reviews WHERE reviews_id = $1 RETURNING *',
            [id]
        );
        await client.query('COMMIT');
        return bookResult.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

const addBookExistPublisher = async (body) => {
    const { id, title, pages, publisher_id, price } = body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO books (id, title, pages, publisher, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, title, pages, publisher_id, price]
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

const addBookNewPublisher = async (body) =>{
    const { id, title, pages, publisher_id, price, name, city, country, telephone} = body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(
            'INSERT INTO publishers (id, name, city, country, telephone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [publisher_id, name, city, country, telephone]
        );
        const bookResult = await client.query(
            'INSERT INTO books (id, title, pages, publisher, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, title, pages, publisher_id, price]
        );
        await client.query('COMMIT');
        return bookResult.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}


module.exports = {
    showAllBooks,
    showBooksRating,
    showAllReviews,
    addReview,
    updateReview,
    deleteReview,
    addBookExistPublisher,
    addBookNewPublisher,
    showAllWishlist,
};