const pool = require('../config/db');

const getAllTags = async () => {
    const result = await pool.query('SELECT * FROM tag');
    return result.rows;
};

const getTagById = async (id) => {
    const result = await pool.query('SELECT * FROM tag WHERE id = $1', [id]);
    return result.rows[0];
};

const createTag = async (tag) => {
    const { id, name } = tag;
    const result = await pool.query(
        'INSERT INTO tag (id, name) VALUES ($1, $2) RETURNING *',
        [id, name]
    );
    return result.rows[0];
};

const updateTag = async (id, tag) => {
    const { name } = tag;
    const result = await pool.query(
        'UPDATE tag SET name = $1 WHERE id = $2 RETURNING *',
        [name, id]
    );
    return result.rows[0];
};

const deleteTag = async (id) => {
    const result = await pool.query('DELETE FROM tag WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
};
