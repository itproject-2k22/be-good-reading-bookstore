const express = require('express');
const bookWarehouseController = require('../controllers/bookWarehouseController');

const router = express.Router();

router.get('/books-warehouses', bookWarehouseController.getAllBooksWarehouses);
router.get('/books-warehouses/:books_id/:warehouse_id', bookWarehouseController.getBookWarehouseById);
router.post('/books-warehouses', bookWarehouseController.createBookWarehouse);
router.put('/books-warehouses/:books_id/:warehouse_id', bookWarehouseController.updateBookWarehouse);
router.delete('/books-warehouses/:books_id/:warehouse_id', bookWarehouseController.deleteBookWarehouse);

module.exports = router;
