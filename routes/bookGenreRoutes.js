const express = require('express');
const bookGenreController = require('../controllers/bookGenreController');

const router = express.Router();

router.get('/books-genres', bookGenreController.getAllBooksGenres);
router.get('/books-genres/:genre_id/:books_id', bookGenreController.getBookGenreById);
router.post('/books-genres', bookGenreController.createBookGenre);
router.put('/books-genres/:genre_id/:books_id', bookGenreController.updateBookGenre);
router.delete('/books-genres/:genre_id/:books_id', bookGenreController.deleteBookGenre);

module.exports = router;
