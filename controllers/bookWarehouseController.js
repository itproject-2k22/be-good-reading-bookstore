const BookWarehouse = require('../models/bookWarehouse');

const getAllBooksWarehouses = async (req, res, next) => {
    try {
        const bookWarehouses = await BookWarehouse.getAllBooksWarehouses();
        res.json(bookWarehouses);
    } catch (err) {
        next(err);
    }
};

const getBookWarehouseById = async (req, res, next) => {
    try {
        const { books_id, warehouse_id } = req.params;
        const bookWarehouse = await BookWarehouse.getBookWarehouseById(books_id, warehouse_id);
        if (!bookWarehouse) {
            return res.status(404).json({ msg: 'Book Warehouse not found' });
        }
        res.json(bookWarehouse);
    } catch (err) {
        next(err);
    }
};

const createBookWarehouse = async (req, res, next) => {
    try {
        const bookWarehouse = await BookWarehouse.createBookWarehouse(req.body);
        res.json(bookWarehouse);
    } catch (err) {
        next(err);
    }
};

const updateBookWarehouse = async (req, res, next) => {
    try {
        const { books_id, warehouse_id } = req.params;
        const bookWarehouse = await BookWarehouse.updateBookWarehouse(books_id, warehouse_id, req.body);
        if (!bookWarehouse) {
            return res.status(404).json({ msg: 'Book Warehouse not found' });
        }
        res.json(bookWarehouse);
    } catch (err) {
        next(err);
    }
};

const deleteBookWarehouse = async (req, res, next) => {
    try {
        const { books_id, warehouse_id } = req.params;
        const bookWarehouse = await BookWarehouse.deleteBookWarehouse(books_id, warehouse_id);
        if (!bookWarehouse) {
            return res.status(404).json({ msg: 'Book Warehouse not found' });
        }
        res.json({ msg: 'Book Warehouse deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllBooksWarehouses,
    getBookWarehouseById,
    createBookWarehouse,
    updateBookWarehouse,
    deleteBookWarehouse,
};
