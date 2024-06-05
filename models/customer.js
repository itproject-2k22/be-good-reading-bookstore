const pool = require('../config/db');

const getAllCustomers = async () => {
    const result = await pool.query('SELECT * FROM customer');
    return result.rows;
};

const getCustomerById = async (id) => {
    const result = await pool.query('SELECT * FROM customer WHERE id = $1', [id]);
    return result.rows[0];
};

const createCustomer = async (customer) => {
    const { id, name, email, phone_number } = customer;
    const result = await pool.query(
        'INSERT INTO customer (id, name, email, phone_number) VALUES ($1, $2, $3, $4) RETURNING *',
        [id, name, email, phone_number]
    );
    return result.rows[0];
};

const updateCustomer = async (id, customer) => {
    const { name, email, phone_number } = customer;
    const result = await pool.query(
        'UPDATE customer SET name = $1, email = $2, phone_number = $3 WHERE id = $4 RETURNING *',
        [name, email, phone_number, id]
    );
    return result.rows[0];
};

const deleteCustomer = async (id) => {
    const result = await pool.query('DELETE FROM customer WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
