const pool = require('../config/db');

const getAllBooks = async () => {
    const result = await pool.query('SELECT * FROM books');
    return result.rows;
};

const getBookById = async (id) => {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    return result.rows[0];
};

const createBook = async (book) => {
    const { id, title, pages, publisher, price } = book;
    const result = await pool.query(
        'INSERT INTO books (id, title, pages, publisher, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, title, pages, publisher, price]
    );
    return result.rows[0];
};

const updateBook = async (id, book) => {
    const { title, pages, publisher, price } = book;
    const result = await pool.query(
        'UPDATE books SET title = $1, pages = $2, publisher = $3, price = $4 WHERE id = $5 RETURNING *',
        [title, pages, publisher, price, id]
    );
    return result.rows[0];
};

const deleteBook = async (id) => {
    const result = await pool.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
