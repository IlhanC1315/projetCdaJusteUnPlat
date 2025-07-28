const userService = require('../services/userService');

exports.create = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers()
        res.json(users);
    } catch (err) {
        next(err);
    }
}

exports.getByEmail = async (req, res, next) => {
  try {
    const user = await userService.findByEmail(req.params.email);
    res.json(user);
  } catch (err) {
    next(err);
  }
};