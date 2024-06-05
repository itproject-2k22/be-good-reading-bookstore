const express = require('express');
const bookReleaseController = require('../controllers/bookReleaseController');

const router = express.Router();

router.get('/book-releases', bookReleaseController.getAllBookReleases);
router.get('/book-releases/:book_id/:author_id', bookReleaseController.getBookReleaseById);
router.post('/book-releases', bookReleaseController.createBookRelease);
router.put('/book-releases/:book_id/:author_id', bookReleaseController.updateBookRelease);
router.delete('/book-releases/:book_id/:author_id', bookReleaseController.deleteBookRelease);

module.exports = router;
