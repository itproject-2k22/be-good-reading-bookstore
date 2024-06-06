const pool = require('../config/db');

const getAllWarehouses = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM warehouse');
        await client.query('COMMIT');
        return result.rows;
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const getWarehouseById = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('SELECT * FROM warehouse WHERE id = $1', [id]);
        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
};

const createWarehouse = async (warehouse) => {
    const { id, name, type, address, city } = warehouse;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'INSERT INTO warehouse (id, name, type, address, city) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [id, name, type, address, city]
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

const updateWarehouse = async (id, warehouse) => {
    const { name, type, address, city } = warehouse;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query(
            'UPDATE warehouse SET name = $1, type = $2, address = $3, city = $4 WHERE id = $5 RETURNING *',
            [name, type, address, city, id]
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

const deleteWarehouse = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result = await client.query('DELETE FROM warehouse WHERE id = $1 RETURNING *', [id]);
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
    getAllWarehouses,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
};
