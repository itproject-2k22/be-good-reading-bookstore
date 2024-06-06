const pool = require('../config/db');

const getAllBooksWarehouses = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM books_warehouse');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getBookWarehouseById = async (books_id, warehouse_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM books_warehouse WHERE books_id = $1 AND warehouse_id = $2', [books_id, warehouse_id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const createBookWarehouse = async (bookWarehouse) => {
    const { books_id, warehouse_id, quantity } = bookWarehouse;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO books_warehouse (books_id, warehouse_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [books_id, warehouse_id, quantity]
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

const updateBookWarehouse = async (books_id, warehouse_id, bookWarehouse) => {
    const { quantity } = bookWarehouse;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'UPDATE books_warehouse SET quantity = $1 WHERE books_id = $2 AND warehouse_id = $3 RETURNING *',
            [quantity, books_id, warehouse_id]
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

const deleteBookWarehouse = async (books_id, warehouse_id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('DELETE FROM books_warehouse WHERE books_id = $1 AND warehouse_id = $2 RETURNING *', [books_id, warehouse_id]);
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
    getAllBooksWarehouses,
    getBookWarehouseById,
    createBookWarehouse,
    updateBookWarehouse,
    deleteBookWarehouse,
};
