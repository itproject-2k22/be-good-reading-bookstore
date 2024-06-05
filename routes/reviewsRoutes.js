const express = require('express');
const reviewsController = require('../controllers/reviewsController');

const router = express.Router();

router.get('/reviews', reviewsController.getAllReviews);
router.get('/reviews/:reviews_id', reviewsController.getReviewById);
router.post('/reviews', reviewsController.createReview);
router.put('/reviews/:reviews_id', reviewsController.updateReview);
router.delete('/reviews/:reviews_id', reviewsController.deleteReview);

module.exports = router;
