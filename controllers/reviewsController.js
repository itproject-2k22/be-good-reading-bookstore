const Reviews = require('../models/reviews');

const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await Reviews.getAllReviews();
        res.json(reviews);
    } catch (err) {
        next(err);
    }
};

const getReviewById = async (req, res, next) => {
    try {
        const review = await Reviews.getReviewById(req.params.reviews_id);
        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }
        res.json(review);
    } catch (err) {
        next(err);
    }
};

const createReview = async (req, res, next) => {
    try {
        const review = await Reviews.createReview(req.body);
        res.json(review);
    } catch (err) {
        next(err);
    }
};

const updateReview = async (req, res, next) => {
    try {
        const review = await Reviews.updateReview(req.params.reviews_id, req.body);
        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }
        res.json(review);
    } catch (err) {
        next(err);
    }
};

const deleteReview = async (req, res, next) => {
    try {
        const review = await Reviews.deleteReview(req.params.reviews_id);
        if (!review) {
            return res.status(404).json({ msg: 'Review not found' });
        }
        res.json({ msg: 'Review deleted' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
};
