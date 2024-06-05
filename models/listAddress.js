const pool = require('../config/db');

const getAllAddresses = async () => {
    const result = await pool.query('SELECT * FROM list_address');
    return result.rows;
};

const getAddressById = async (address_id) => {
    const result = await pool.query('SELECT * FROM list_address WHERE address_id = $1', [address_id]);
    return result.rows[0];
};

const createAddress = async (address) => {
    const { address_id, customer_id, street, city, zipcode } = address;
    const result = await pool.query(
        'INSERT INTO list_address (address_id, customer_id, street, city, zipcode) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [address_id, customer_id, street, city, zipcode]
    );
    return result.rows[0];
};

const updateAddress = async (address_id, address) => {
    const { customer_id, street, city, zipcode } = address;
    const result = await pool.query(
        'UPDATE list_address SET customer_id = $1, street = $2, city = $3, zipcode = $4 WHERE address_id = $5 RETURNING *',
        [customer_id, street, city, zipcode, address_id]
    );
    return result.rows[0];
};

const deleteAddress = async (address_id) => {
    const result = await pool.query('DELETE FROM list_address WHERE address_id = $1 RETURNING *', [address_id]);
    return result.rows[0];
};

module.exports = {
    getAllAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
};
