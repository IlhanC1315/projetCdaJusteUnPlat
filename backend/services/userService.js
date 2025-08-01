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

exports.getUserById = async () => {
    const id = req.params.id;
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
    const result = await User.findByIdAndUpdate(userId ,{ updateData })
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

exports.updateEmail = async (userId, newEmail) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { email: newEmail },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new Error("Utilisateur non trouvé");
  }

  return updatedUser;
};

exports.updateAlias = async (userId, newAlias) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { alias: newAlias },
        { new: true, runValidators: true }
    );
    if(!updatedUser) {
        throw new Error('Utilisateur non trouvé');
    }
    return updatedUser
};

exports.updateUsername = async (userId, newUsername) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { userName: newUsername },
        { new: true, runValidators: true }
    );
    if(!updatedUser) {
        throw new Error('Utilisateur non trouvé');
    }
    return updatedUser
};

exports.updateProfileImage = async (userId, newProfileImage) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profileImage: newProfileImage },
        { new: true, runValidators: true}
    );
    if(!updatedUser) {
        throw new Error('Utilisateur non trouvé')
    }
    return updatedUser
};

exports.updateDescription = async (userId, newDescription) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { profileImage: newDescription },
        { new: true, runValidators: true }
    );
    if(!updatedUser) {
        throw new Error('Utilisateur non trouvé')
    }
    return updatedUser
};

exports.updatePassword = async (userId, newPassword) => {
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { password: newPassword },
        { new: true, runValidators: true }
    );
     if(!updatedUser) {
        throw new Error('Utilisateur non trouvé')
    }
    return updatedUser
};

exports.deleteUserById = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if(!user) {
        throw new Error('Utilisateur non trouvé');
    }
    return user;
};

exports.deleteUserByEmail = async (email) => {
    const user = await User.findOneAndDelete({ email });
    if(!user) {
        throw new Error('Utilisateur non trouvé');
    }
    return user;
};

exports.deleteUserByAlias = async (alias) => {
    const user = await User.findOneAndDelete({ alias });
    if(!user) {
        throw new Error('Utilisateur non trouvé');
    }
    return user;
};

exports.deleteManyUsersById = async (usersId) => {
    if(!Array.isArray(usersId) || usersId.length === 0) {
        throw new Error("Liste d'ids invalide")
    }
    const result = await User.deleteMany({ _id: { $in: usersId } });
    if(result.deletedCount === 0) {
        throw new Error('Aucun utilisateur trouvé a supprimer')
    }
    return result
};

exports.deleteManyUsersByEmail = async (emails) => {
    const result = await User.deleteMany({ email: { $in: emails } })
    if (result.deletedCount === 0) {
        throw new Error('Aucune utilisateur trouvé à supprimer')
    }
    return result
}

exports.deleteManyUsersByAlias = async (alias) => {
    const result = await User.deleteMany({ alias: { $in: alias } })
    if(result.deletedCount === 0) {
        throw new Error('Aucun utilisateur trouvé à supprimer')
    }
    return result;
};