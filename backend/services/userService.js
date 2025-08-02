const User = require('../models/UserSchema')

exports.createUser = async (data) => {
    return await User.create(data)
};

exports.getAllUsers = async () => {
    return await User.find()
};

exports.getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    if(!user) throw new Error('Utilisateur introuvable')
    return user;
}

exports.getUserById = async (id) => {
    const user = await User.findById(id)
    if(!user) throw new Error('Utilisateur introuvable')
    return user;
};

exports.getUserByUsername = async (username) => {
    const user = await User.findOne({ username });
    if(!user) throw new Error('Utilisateur introuvable')
    return user
};

exports.getUserByAlias = async (alias) => {
    const user = await User.findOne({ alias });
    if(!user) throw new Error('Utilisateur introuvable')
    return user
};

exports.updateManyUsers = async (filter, updateData) => {
    const result = await User.updateMany(filter, updateData);
    return result
};

exports.updateUserById = async (userId, updateData) => {
    const result = await User.findByIdAndUpdate(userId ,updateData)
    return result
};

exports.updateUserByEmail = async (email, updateData) => {
    const user = await User.findOneAndUpdate(
        { email },
        updateData,
        {
            new: true,
            runValidators: true
        }
    );
    if(!user) {
        throw new Error('Utilisateur introuvable')
    }
    return user
};

exports.updateUserByAlias = async (alias, updateData) => {
    const user = await User.findOneAndUpdate(
        { alias },
        updateData,
        {
            new: true,
            runValidators: true
        }
    );
    if(!user) {
        throw new Error('Utilisateur introuvable')
    }
    return user
};

exports.updateUserField = async (userId, field, value) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { [field]: value },
        { new: true, runValidators: true }
    );
    if (!updatedUser) throw new Error('Utilisateur non trouvé');
    return updatedUser;
};

exports.deleteUserById = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if(!user) {
        throw new Error('Utilisateur non trouvé');
    }
    return user;
};

exports.deleteManyUsersByField = async (field, values) => {
    if (!Array.isArray(values) || values.length === 0) {
        throw new Error("Liste invalide");
    }
    const result = await User.deleteMany({ [field]: { $in: values } })
    if (result.deletedCount === 0) {
        throw new Error(`Aucun utilisateur trouvé à supprimer par ${field}`);
    }
    return result;
};

exports.desactivateUser = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { isActive: false },
        { new: true }
    )
    if (!user) throw new Error('Utilisateur non trouvé');
    return user;
};

exports.reactiveUser = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { isActive: true },
        { new: true }
    )
    if (!user) throw new Error('Utilisateur non trouvé');
    return user;
};

exports.updateUserRole = async (userId, newRole) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { role: newRole },
        { new: true }
    )
    if(!user) throw new Error('Utilisateur non trouvé');
    return user
};

exports.searchUsers = async (query) => {
    return await User.find({
        $or: [
            { userName: { $regex: query, $options: 'i' } },
            { alias: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
        ],
        isActive: true
    });
};