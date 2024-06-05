const ListAddress = require('../models/listAddress');

const getAllAddresses = async (req, res, next) => {
    try {
        const addresses = await ListAddress.getAllAddresses();
        res.json(addresses);
    } catch (err) {
        next(err);
    }
};

const getAddressById = async (req, res, next) => {
    try {
        const address = await ListAddress.getAddressById(req.params.address_id);
        if (!address) {
            return res.status(404).json({ msg: 'Address not found' });
        }
        res.json(address);
    } catch (err) {
        next(err);
    }
};

const createAddress = async (req, res, next) => {
    try {
        const address = await ListAddress.createAddress(req.body);
        res.json(address);
    } catch (err) {
        next(err);
    }
};

const updateAddress = async (req, res, next) => {
    try {
        const address = await ListAddress.updateAddress(req.params.address_id, req.body);
        if (!address) {
            return res.status(404).json({ msg: 'Address not found' });
        }
        res.json(address);
    } catch (err) {
        next(err);
    }
};

const deleteAddress = async (req, res, next) => {
    try {
        const address = await ListAddress.deleteAddress(req.params.address_id);
        if (!address) {
            return res.status(404).json({ msg: 'Address not found' });
        }
        res.json({ msg: 'Address deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
};
