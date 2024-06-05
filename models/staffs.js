const pool = require('../config/db');

const getAllStaffs = async () => {
    const result = await pool.query('SELECT * FROM staffs');
    return result.rows;
};

const getStaffById = async (id) => {
    const result = await pool.query('SELECT * FROM staffs WHERE id = $1', [id]);
    return result.rows[0];
};

const createStaff = async (staff) => {
    const { id, name, role, salary, store } = staff;
    const result = await pool.query(
        'INSERT INTO staffs (id, name, role, salary, store) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, name, role, salary, store]
    );
    return result.rows[0];
};

const updateStaff = async (id, staff) => {
    const { name, role, salary, store } = staff;
    const result = await pool.query(
        'UPDATE staffs SET name = $1, role = $2, salary = $3, store = $4 WHERE id = $5 RETURNING *',
        [name, role, salary, store, id]
    );
    return result.rows[0];
};

const deleteStaff = async (id) => {
    const result = await pool.query('DELETE FROM staffs WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    getAllStaffs,
    getStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
};
