const pool = require('../config/db');

const getAllBooksGenres = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM books_genre');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getBookGenreById = async (genre_id, books_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM books_genre WHERE genre_id = $1 AND books_id = $2', [genre_id, books_id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const createBookGenre = async (booksGenre) => {
    const { genre_id, books_id } = booksGenre;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO books_genre (genre_id, books_id) VALUES ($1, $2) RETURNING *',
            [genre_id, books_id]
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

const updateBookGenre = async (genre_id, books_id, newBooksGenre) => {
    const { new_genre_id, new_books_id } = newBooksGenre;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'UPDATE books_genre SET genre_id = $1, books_id = $2 WHERE genre_id = $3 AND books_id = $4 RETURNING *',
            [new_genre_id, new_books_id, genre_id, books_id]
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

const deleteBookGenre = async (genre_id, books_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('DELETE FROM books_genre WHERE genre_id = $1 AND books_id = $2 RETURNING *', [genre_id, books_id]);
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
    getAllBooksGenres,
    getBookGenreById,
    createBookGenre,
    updateBookGenre,
    deleteBookGenre,
};