const pool = require('../config/db');

const getAllPublishers = async () => {
    const result = await pool.query('SELECT * FROM publishers');
    return result.rows;
};

const getPublisherById = async (id) => {
    const result = await pool.query('SELECT * FROM publishers WHERE id = $1', [id]);
    return result.rows[0];
};

const createPublisher = async (publisher) => {
    const { id, name, city, country, telephone } = publisher;
    const result = await pool.query(
        'INSERT INTO publishers (id, name, city, country, telephone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, name, city, country, telephone]
    );
    return result.rows[0];
};

const updatePublisher = async (id, publisher) => {
    const { name, city, country, telephone } = publisher;
    const result = await pool.query(
        'UPDATE publishers SET name = $1, city = $2, country = $3, telephone = $4 WHERE id = $5 RETURNING *',
        [name, city, country, telephone, id]
    );
    return result.rows[0];
};

const deletePublisher = async (id) => {
    const result = await pool.query('DELETE FROM publishers WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher,
};
