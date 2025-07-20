const express = require('express');
const router = express.Router();
const recetteControllers = require('../controllers/recette.controller');

router.get('/', recetteControllers.getAllRecipe);
router.post('/', recetteControllers.createRecipe);
router.put('/:id', recetteControllers.uptdateRecipe);
router.delete('/:id', recetteControllers.deleteRecipe);

module.exports = router;