const pool = require('../config/db');

const getAllTaggings = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM tagging');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getTaggingByBookId = async (book_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM tagging WHERE books_id = $1', [book_id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getBooksByTagId = async (tag_id) => {
    const result = await pool.query('SELECT * FROM tagging WHERE tag_id = $1', [tag_id]);
    return result.rows;
};

const createTagging = async (tagging) => {
    const { tag_id, books_id } = tagging;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await pool.query(
            'INSERT INTO tagging (tag_id, books_id) VALUES ($1, $2) RETURNING *',
            [tag_id, books_id]
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

const deleteTagging = async (tag_id, books_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await pool.query(
            'DELETE FROM tagging WHERE tag_id = $1 AND books_id = $2 RETURNING *',
            [tag_id, books_id]
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

module.exports = {
    getAllTaggings,
    getTaggingByBookId,
    getBooksByTagId,
    createTagging,
    deleteTagging,
};
