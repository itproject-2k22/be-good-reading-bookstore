const pool = require('../config/db');

const getAllBooksWarehouses = async () => {
    const result = await pool.query('SELECT * FROM books_warehouse');
    return result.rows;
};

const getBookWarehouseById = async (books_id, warehouse_id) => {
    const result = await pool.query('SELECT * FROM books_warehouse WHERE books_id = $1 AND warehouse_id = $2', [books_id, warehouse_id]);
    return result.rows[0];
};

const createBookWarehouse = async (bookWarehouse) => {
    const { books_id, warehouse_id, quantity } = bookWarehouse;
    const result = await pool.query(
        'INSERT INTO books_warehouse (books_id, warehouse_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [books_id, warehouse_id, quantity]
    );
    return result.rows[0];
};

const updateBookWarehouse = async (books_id, warehouse_id, bookWarehouse) => {
    const { quantity } = bookWarehouse;
    const result = await pool.query(
        'UPDATE books_warehouse SET quantity = $1 WHERE books_id = $2 AND warehouse_id = $3 RETURNING *',
        [quantity, books_id, warehouse_id]
    );
    return result.rows[0];
};

const deleteBookWarehouse = async (books_id, warehouse_id) => {
    const result = await pool.query('DELETE FROM books_warehouse WHERE books_id = $1 AND warehouse_id = $2 RETURNING *', [books_id, warehouse_id]);
    return result.rows[0];
};

module.exports = {
    getAllBooksWarehouses,
    getBookWarehouseById,
    createBookWarehouse,
    updateBookWarehouse,
    deleteBookWarehouse,
};
