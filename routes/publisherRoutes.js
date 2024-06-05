const express = require('express');
const publisherController = require('../controllers/publisherController');

const router = express.Router();

router.get('/publishers', publisherController.getAllPublishers);
router.get('/publishers/:id', publisherController.getPublisherById);
router.post('/publishers', publisherController.createPublisher);
router.put('/publishers/:id', publisherController.updatePublisher);
router.delete('/publishers/:id', publisherController.deletePublisher);

module.exports = router;
