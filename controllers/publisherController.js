const Publisher = require('../models/publisher');

const getAllPublishers = async (req, res, next) => {
    try {
        const publishers = await Publisher.getAllPublishers();
        res.json(publishers);
    } catch (err) {
        next(err);
    }
};

const getPublisherById = async (req, res, next) => {
    try {
        const publisher = await Publisher.getPublisherById(req.params.id);
        if (!publisher) {
            return res.status(404).json({ msg: 'Publisher not found' });
        }
        res.json(publisher);
    } catch (err) {
        next(err);
    }
};

const createPublisher = async (req, res, next) => {
    try {
        const publisher = await Publisher.createPublisher(req.body);
        res.json(publisher);
    } catch (err) {
        next(err);
    }
};

const updatePublisher = async (req, res, next) => {
    try {
        const publisher = await Publisher.updatePublisher(req.params.id, req.body);
        if (!publisher) {
            return res.status(404).json({ msg: 'Publisher not found' });
        }
        res.json(publisher);
    } catch (err) {
        next(err);
    }
};

const deletePublisher = async (req, res, next) => {
    try {
        const publisher = await Publisher.deletePublisher(req.params.id);
        if (!publisher) {
            return res.status(404).json({ msg: 'Publisher not found' });
        }
        res.json({ msg: 'Publisher deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllPublishers,
    getPublisherById,
    createPublisher,
    updatePublisher,
    deletePublisher,
};
