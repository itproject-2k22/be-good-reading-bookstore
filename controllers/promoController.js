const Promo = require('../models/promo');

const getAllPromos = async (req, res, next) => {
    try {
        const promos = await Promo.getAllPromos();
        res.json(promos);
    } catch (err) {
        next(err);
    }
};

const getPromoById = async (req, res, next) => {
    try {
        const promo = await Promo.getPromoById(req.params.id);
        if (!promo) {
            return res.status(404).json({ msg: 'Promo not found' });
        }
        res.json(promo);
    } catch (err) {
        next(err);
    }
};

const createPromo = async (req, res, next) => {
    try {
        const promo = await Promo.createPromo(req.body);
        res.json(promo);
    } catch (err) {
        next(err);
    }
};

const updatePromo = async (req, res, next) => {
    try {
        const promo = await Promo.updatePromo(req.params.id, req.body);
        if (!promo) {
            return res.status(404).json({ msg: 'Promo not found' });
        }
        res.json(promo);
    } catch (err) {
        next(err);
    }
};

const deletePromo = async (req, res, next) => {
    try {
        const promo = await Promo.deletePromo(req.params.id);
        if (!promo) {
            return res.status(404).json({ msg: 'Promo not found' });
        }
        res.json({ msg: 'Promo deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllPromos,
    getPromoById,
    createPromo,
    updatePromo,
    deletePromo,
};
