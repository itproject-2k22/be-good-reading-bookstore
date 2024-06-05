const pool = require('../config/db');

const getAllGenres = async () => {
    const result = await pool.query('SELECT * FROM genre');
    return result.rows;
};

const getGenreById = async (id) => {
    const result = await pool.query('SELECT * FROM genre WHERE id = $1', [id]);
    return result.rows[0];
};

const createGenre = async (genre) => {
    const { id, name } = genre;
    const result = await pool.query(
        'INSERT INTO genre (id, name) VALUES ($1, $2) RETURNING *',
        [id, name]
    );
    return result.rows[0];
};

const updateGenre = async (id, genre) => {
    const { name } = genre;
    const result = await pool.query(
        'UPDATE genre SET name = $1 WHERE id = $2 RETURNING *',
        [name, id]
    );
    return result.rows[0];
};

const deleteGenre = async (id) => {
    const result = await pool.query('DELETE FROM genre WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllGenres,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre,
};
