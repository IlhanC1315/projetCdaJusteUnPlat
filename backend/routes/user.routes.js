const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');

router.get('/', userController.getAll);
router.post('/', userController.create);
router.get('/:email', userController.getByEmail);

module.exports = router;
