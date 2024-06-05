const pool = require('../config/db');

const getAllAuthors = async () => {
    const result = await pool.query('SELECT * FROM authors');
    return result.rows;
};

const getAuthorById = async (id) => {
    const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return result.rows[0];
};

const createAuthor = async (author) => {
    const { id, name, born_date } = author;
    const result = await pool.query(
        'INSERT INTO authors (id, name, born_date) VALUES ($1, $2, $3) RETURNING *',
        [id, name, born_date]
    );
    return result.rows[0];
};

const updateAuthor = async (id, author) => {
    const { name, born_date } = author;
    const result = await pool.query(
        'UPDATE authors SET name = $1, born_date = $2 WHERE id = $3 RETURNING *',
        [name, born_date, id]
    );
    return result.rows[0];
};

const deleteAuthor = async (id) => {
    const result = await pool.query('DELETE FROM authors WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
};
