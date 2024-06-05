const Customer = require('../models/customer');

const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.getAllCustomers();
        res.json(customers);
    } catch (err) {
        next(err);
    }
};

const getCustomerById = async (req, res, next) => {
    try {
        const customer = await Customer.getCustomerById(req.params.id);
        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }
        res.json(customer);
    } catch (err) {
        next(err);
    }
};

const createCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.createCustomer(req.body);
        res.json(customer);
    } catch (err) {
        next(err);
    }
};

const updateCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.updateCustomer(req.params.id, req.body);
        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }
        res.json(customer);
    } catch (err) {
        next(err);
    }
};

const deleteCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.deleteCustomer(req.params.id);
        if (!customer) {
            return res.status(404).json({ msg: 'Customer not found' });
        }
        res.json({ msg: 'Customer deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
