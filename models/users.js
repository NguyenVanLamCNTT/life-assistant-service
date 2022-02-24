const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId(),
    fullName: {
        type: String,
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    role: {
        type: String
    },
    avatar_id: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    }
});
const Users = mongoose.model('Users',usersSchema,'users');
module.exports = Users;
