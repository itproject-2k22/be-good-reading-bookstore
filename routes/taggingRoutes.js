const express = require('express');
const taggingController = require('../controllers/taggingController');

const router = express.Router();

router.get('/taggings', taggingController.getAllTaggings);
router.get('/taggings/book/:books_id', taggingController.getTaggingByBookId);
router.get('/taggings/tag/:tag_id', taggingController.getBooksByTagId);
router.post('/taggings', taggingController.createTagging);
router.delete('/taggings/:tag_id/book/:books_id', taggingController.deleteTagging);

module.exports = router;
