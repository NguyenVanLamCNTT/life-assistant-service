const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const usersSchema = new mongoose.Schema({
    full_name: String,
    gender: String,
    age: Number,
    role: String,
    avatar_id: String,
    email: String,
    password: String
});
autoIncrement.initialize(mongoose.connection);

usersSchema.plugin(autoIncrement.plugin, 'users');
const Users = mongoose.model('Users',usersSchema,'users');
module.exports = {
    Users
};
