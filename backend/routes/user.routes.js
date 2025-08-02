const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');

// Création
router.post('/', userController.create);

// Lecture
router.get('/', userController.getAll);
router.get('/search', userController.searchUsers); // ?query=...

// Récupération spécifique par champ
router.get('/id/:id', userController.getById);
router.get('/email/:email', userController.getByEmail);
router.get('/username/:username', userController.getByUsername);
router.get('/alias/:alias', userController.getByAlias);

// Mises à jour
router.put('/update-many', userController.updateManyUsers);
router.put('/update/id/:id', userController.updateUserById);
router.put('/update/email/:email', userController.updateUserByEmail);
router.put('/update/alias/:alias', userController.updateUserByAlias);
router.put('/update-field/:id', userController.updateUserByField);

// Suppressions
router.delete('/delete/id/:id', userController.deleteUserById);
router.delete('/delete-field', userController.deleteManyByField); // utilise body pour `field` et `values`

// Actions spécifiques
router.put('/ban/:id', userController.banUser);
router.put('/unban/:id', userController.unbanUser);
router.put('/role/:id', userController.changeUserRole);

module.exports = router;
