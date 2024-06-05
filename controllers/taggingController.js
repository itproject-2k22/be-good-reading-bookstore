const Tagging = require('../models/tagging');

const getAllTaggings = async (req, res, next) => {
    try {
        const taggings = await Tagging.getAllTaggings();
        res.json(taggings);
    } catch (err) {
        next(err);
    }
};

const getTaggingByBookId = async (req, res, next) => {
    try {
        const taggings = await Tagging.getTaggingByBookId(req.params.books_id);
        res.json(taggings);
    } catch (err) {
        next(err);
    }
};

const getBooksByTagId = async (req, res, next) => {
    try {
        const taggings = await Tagging.getBooksByTagId(req.params.tag_id);
        res.json(taggings);
    } catch (err) {
        next(err);
    }
};

const createTagging = async (req, res, next) => {
    try {
        const tagging = await Tagging.createTagging(req.body);
        res.json(tagging);
    } catch (err) {
        next(err);
    }
};

const deleteTagging = async (req, res, next) => {
    try {
        const tag_id = req.params.tag_id;
        const books_id = req.params.books_id;
        const result = await Tagging.deleteTagging(tag_id, books_id);
        if (!result) {
            return res.status(404).json({ msg: 'Tagging not found' });
        }
        res.json({ msg: 'Tagging deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllTaggings,
    getTaggingByBookId,
    getBooksByTagId,
    createTagging,
    deleteTagging,
};
