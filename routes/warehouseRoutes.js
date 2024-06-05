const express = require('express');
const warehouseController = require('../controllers/warehouseController');

const router = express.Router();

router.get('/warehouses', warehouseController.getAllWarehouses);
router.get('/warehouses/:id', warehouseController.getWarehouseById);
router.post('/warehouses', warehouseController.createWarehouse);
router.put('/warehouses/:id', warehouseController.updateWarehouse);
router.delete('/warehouses/:id', warehouseController.deleteWarehouse);

module.exports = router;
