const User = require('../models/UserSchema')

exports.createUser = async (data) => {
    return await User.create(data)
};

exports.getAllUsers = async () => {
    return await User.find()
};

exports.getUsersByEmail = async (email) => {
    const user = await User.findOne({ email });
    if(!user) throw new Error('Utilisateur introuvable')
    return user;
}