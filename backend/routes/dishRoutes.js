const express = require('express');
const router = express.Router();
const controller = require('../controllers/dishController');

router.get('/', controller.getAll);
router.post('/', controller.create);
router.delete('/:id', controller.remove);

router.post('/:id/categories', controller.addCategory);
router.delete('/:id/categories/:categoryId', controller.removeCategory);

module.exports = router;