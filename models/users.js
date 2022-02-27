const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const usersSchema = new mongoose.Schema({
    full_name: {
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
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
});
autoIncrement.initialize(mongoose.connection);

usersSchema.plugin(autoIncrement.plugin, 'users');
const Users = mongoose.model('Users',usersSchema,'users');
module.exports = {
    Users
};
