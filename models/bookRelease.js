const pool = require('../config/db');

const getAllBookReleases = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM book_release');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getBookReleaseById = async (book_id, author_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM book_release WHERE book_id = $1 AND author_id = $2', [book_id, author_id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const createBookRelease = async (bookRelease) => {
    const { book_id, author_id, release_year } = bookRelease;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO book_release (book_id, author_id, release_year) VALUES ($1, $2, $3) RETURNING *',
            [book_id, author_id, release_year]
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

const updateBookRelease = async (book_id, author_id, bookRelease) => {
    const { new_book_id, new_author_id, release_year } = bookRelease;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'UPDATE book_release SET book_id = $1, author_id = $2, release_year = $3 WHERE book_id = $4 AND author_id = $5 RETURNING *',
            [new_book_id, new_author_id, release_year, book_id, author_id]
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

const deleteBookRelease = async (book_id, author_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('DELETE FROM book_release WHERE book_id = $1 AND author_id = $2 RETURNING *', [book_id, author_id]);
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
    getAllBookReleases,
    getBookReleaseById,
    createBookRelease,
    updateBookRelease,
    deleteBookRelease,
};
