const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    alias: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
    },
    description: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    gender: { type: mongoose.Schema.Types.ObjectId ,ref:'Gender' },
    dateOfBirth: {
        type: Date,
        required: true
    },
    followers: { type: mongoose.Schema.Types.ObjectId, ref:'Followers' },
    followersLength: {
        type: Number
    },
    following: { type: mongoose.Schema.Types.ObjectId, ref:'Following' },
    followingLength: {
        type: Number
    },
    recipeListe: {  },
    userUrl: {
        type: String
    }
})