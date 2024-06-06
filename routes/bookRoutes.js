const express = require('express');
const bookController = require('../controllers/bookController');

const router = express.Router();

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.post('/books', bookController.createBook);
router.post('/books/new-publisher', bookController.createBookNewPublisher);
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);
module.exports = router;
