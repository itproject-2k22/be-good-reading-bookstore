const pool = require('../config/db');

const getAllWarehouses = async () => {
    const result = await pool.query('SELECT * FROM warehouse');
    return result.rows;
};

const getWarehouseById = async (id) => {
    const result = await pool.query('SELECT * FROM warehouse WHERE id = $1', [id]);
    return result.rows[0];
};

const createWarehouse = async (warehouse) => {
    const { id, name, type, address, city } = warehouse;
    const result = await pool.query(
        'INSERT INTO warehouse (id, name, type, address, city) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, name, type, address, city]
    );
    return result.rows[0];
};

const updateWarehouse = async (id, warehouse) => {
    const { name, type, address, city } = warehouse;
    const result = await pool.query(
        'UPDATE warehouse SET name = $1, type = $2, address = $3, city = $4 WHERE id = $5 RETURNING *',
        [name, type, address, city, id]
    );
    return result.rows[0];
};

const deleteWarehouse = async (id) => {
    const result = await pool.query('DELETE FROM warehouse WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllWarehouses,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
};
