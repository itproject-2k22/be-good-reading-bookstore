const pool = require('../config/db');

const getAllPublishers = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM publishers');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getPublisherById = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM publishers WHERE id = $1', [id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const createPublisher = async (publisher) => {
    const { id, name, city, country, telephone } = publisher;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO publishers (id, name, city, country, telephone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, name, city, country, telephone]
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

const updatePublisher = async (id, publisher) => {
    const { name, city, country, telephone } = publisher;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'UPDATE publishers SET name = $1, city = $2, country = $3, telephone = $4 WHERE id = $5 RETURNING *',
            [name, city, country, telephone, id]
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

const deletePublisher = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('DELETE FROM publishers WHERE id = $1 RETURNING *', [id]);
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
    getAllPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher,
};