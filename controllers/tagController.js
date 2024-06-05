const Tag = require('../models/tag');

const getAllTags = async (req, res, next) => {
    try {
        const tags = await Tag.getAllTags();
        res.json(tags);
    } catch (err) {
        next(err);
    }
};

const getTagById = async (req, res, next) => {
    try {
        const tag = await Tag.getTagById(req.params.id);
        if (!tag) {
            return res.status(404).json({ msg: 'Tag not found' });
        }
        res.json(tag);
    } catch (err) {
        next(err);
    }
};

const createTag = async (req, res, next) => {
    try {
        const tag = await Tag.createTag(req.body);
        res.json(tag);
    } catch (err) {
        next(err);
    }
};

const updateTag = async (req, res, next) => {
    try {
        const tag = await Tag.updateTag(req.params.id, req.body);
        if (!tag) {
            return res.status(404).json({ msg: 'Tag not found' });
        }
        res.json(tag);
    } catch (err) {
        next(err);
    }
};

const deleteTag = async (req, res, next) => {
    try {
        const tag = await Tag.deleteTag(req.params.id);
        if (!tag) {
            return res.status(404).json({ msg: 'Tag not found' });
        }
        res.json({ msg: 'Tag deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag,
};
