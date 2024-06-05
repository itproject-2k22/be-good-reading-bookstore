const pool = require('../config/db');

const getAllBookReleases = async () => {
    const result = await pool.query('SELECT * FROM book_release');
    return result.rows;
};

const getBookReleaseById = async (book_id, author_id) => {
    const result = await pool.query('SELECT * FROM book_release WHERE book_id = $1 AND author_id = $2', [book_id, author_id]);
    return result.rows[0];
};

const createBookRelease = async (bookRelease) => {
    const { book_id, author_id, release_year } = bookRelease;
    const result = await pool.query(
        'INSERT INTO book_release (book_id, author_id, release_year) VALUES ($1, $2, $3) RETURNING *',
        [book_id, author_id, release_year]
    );
    return result.rows[0];
};

const updateBookRelease = async (book_id, author_id, bookRelease) => {
    const { release_year } = bookRelease;
    const result = await pool.query(
        'UPDATE book_release SET release_year = $1 WHERE book_id = $2 AND author_id = $3 RETURNING *',
        [release_year, book_id, author_id]
    );
    return result.rows[0];
};

const deleteBookRelease = async (book_id, author_id) => {
    const result = await pool.query('DELETE FROM book_release WHERE book_id = $1 AND author_id = $2 RETURNING *', [book_id, author_id]);
    return result.rows[0];
};

module.exports = {
    getAllBookReleases,
    getBookReleaseById,
    createBookRelease,
    updateBookRelease,
    deleteBookRelease,
};
