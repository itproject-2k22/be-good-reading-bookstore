const express = require('express');
const genreController = require('../controllers/genreController');

const router = express.Router();

router.get('/genres', genreController.getAllGenres);
router.get('/genres/:id', genreController.getGenreById);
router.post('/genres', genreController.createGenre);
router.put('/genres/:id', genreController.updateGenre);
router.delete('/genres/:id', genreController.deleteGenre);

module.exports = router;
