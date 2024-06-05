const Warehouse = require('../models/warehouse');

const getAllWarehouses = async (req, res, next) => {
    try {
        const warehouses = await Warehouse.getAllWarehouses();
        res.json(warehouses);
    } catch (err) {
        next(err);
    }
};

const getWarehouseById = async (req, res, next) => {
    try {
        const warehouse = await Warehouse.getWarehouseById(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ msg: 'Warehouse not found' });
        }
        res.json(warehouse);
    } catch (err) {
        next(err);
    }
};

const createWarehouse = async (req, res, next) => {
    try {
        const warehouse = await Warehouse.createWarehouse(req.body);
        res.json(warehouse);
    } catch (err) {
        next(err);
    }
};

const updateWarehouse = async (req, res, next) => {
    try {
        const warehouse = await Warehouse.updateWarehouse(req.params.id, req.body);
        if (!warehouse) {
            return res.status(404).json({ msg: 'Warehouse not found' });
        }
        res.json(warehouse);
    } catch (err) {
        next(err);
    }
};

const deleteWarehouse = async (req, res, next) => {
    try {
        const warehouse = await Warehouse.deleteWarehouse(req.params.id);
        if (!warehouse) {
            return res.status(404).json({ msg: 'Warehouse not found' });
        }
        res.json({ msg: 'Warehouse deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllWarehouses,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
};
