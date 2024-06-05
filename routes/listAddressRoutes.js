const express = require('express');
const listAddressController = require('../controllers/listAddressController');

const router = express.Router();

router.get('/addresses', listAddressController.getAllAddresses);
router.get('/addresses/:address_id', listAddressController.getAddressById);
router.post('/addresses', listAddressController.createAddress);
router.put('/addresses/:address_id', listAddressController.updateAddress);
router.delete('/addresses/:address_id', listAddressController.deleteAddress);

module.exports = router;
