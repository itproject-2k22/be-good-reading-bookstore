const pool = require('../config/db');

const showAllBooks = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT title, pages, publishers.name, price  FROM books JOIN publishers ON publisher = publishers.id');
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
        const result = await client.query('select books.title as book, publishers.name as publisher, avg(score) from reviews join books on books.id = book_id join publishers on publishers.id = books.publisher GROUP BY publishers.name, books.title');
        // const result = await client.query('SELECT * FROM book_list');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const showAllReviews = async (keyword) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('select reviews_id, books.title as "Title", score as "Score", detail_review as "Reviews" from reviews JOIN books ON books.id = book_id WHERE books.title ILIKE $1',
            [`%${keyword}%`]
        );
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
        const result = await client.query('select customer_id, customer.name, array_agg(books.title) as books FROM wishlist JOIN customer ON customer_id = customer.id JOIN books ON books.id = books_id GROUP BY customer.name, customer_id');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const addWishlist = async (body) => {
    const {customer_id, books_id} = body;
    const client = await pool.connect();
    try{
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

const deleteWishlist = async (body) => {
    const {customer_id, books_id} = body;
    const client = await pool.connect();
    try{
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

const deleteReview = async (body) =>{
    const { reviews_id} = body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const bookResult = await client.query(
            'DELETE FROM reviews WHERE reviews_id = $1 RETURNING *',
            [reviews_id]
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

const addRecommendExistPublisher = async (body) => {
    const { title, publisher_id,} = body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO book_recomendation (title, publisher) VALUES ($1, $2) RETURNING *',
            [title, publisher_id]
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

const addRecommendNewPublisher = async (body) =>{
    const { title, publisher_id, name, city, country, telephone} = body;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(
            'INSERT INTO publishers (id, name, city, country, telephone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [publisher_id, name, city, country, telephone]
        );
        const bookResult = await client.query(
            'INSERT INTO book_recomendation (title, publisher) VALUES ($1, $2) RETURNING *',
            [title, publisher_id]
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
    showAllWishlist,
    addWishlist,
    deleteWishlist,
    addReview,
    updateReview,
    deleteReview,
    addRecommendExistPublisher,
    addRecommendNewPublisher,
};