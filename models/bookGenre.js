const pool = require('../config/db');

const getAllBooksGenres = async () => {
    const result = await pool.query('SELECT * FROM books_genre');
    return result.rows;
};

const getBookGenreById = async (genre_id, books_id) => {
    const result = await pool.query('SELECT * FROM books_genre WHERE genre_id = $1 AND books_id = $2', [genre_id, books_id]);
    return result.rows[0];
};

const createBookGenre = async (bookGenre) => {
    const { genre_id, books_id } = bookGenre;
    const result = await pool.query(
        'INSERT INTO books_genre (genre_id, books_id) VALUES ($1, $2) RETURNING *',
        [genre_id, books_id]
    );
    return result.rows[0];
};

const updateBookGenre = async (genre_id, books_id, bookGenre) => {
    const result = await pool.query(
        'UPDATE books_genre SET genre_id = $1, books_id = $2 WHERE genre_id = $3 AND books_id = $4 RETURNING *',
        [bookGenre.genre_id, bookGenre.books_id, genre_id, books_id]
    );
    return result.rows[0];
};

const deleteBookGenre = async (genre_id, books_id) => {
    const result = await pool.query('DELETE FROM books_genre WHERE genre_id = $1 AND books_id = $2 RETURNING *', [genre_id, books_id]);
    return result.rows[0];
};

module.exports = {
    getAllBooksGenres,
    getBookGenreById,
    createBookGenre,
    updateBookGenre,
    deleteBookGenre,
};
