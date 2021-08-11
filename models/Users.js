const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    fromPlace: {
        type: String,
        default: "",
        required: false
    },
    currentPlace: {
        type: String,
        default:"",
        required: false,
    },
    desc: {
        type: String,
        default: "",
        required: false,
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
    active: {
        type: Boolean,
        default: false,
        required: true
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("User",UserSchema);