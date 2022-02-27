const container = require('./container');
const db = require('./db');
const auth = require('./auth');
const cloudinary = require('./clouddinary')
module.exports = {
    ...container,
    ...db,
    ...auth,
    ...cloudinary
}
