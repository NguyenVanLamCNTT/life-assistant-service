
const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');
const imagesSchema = new mongoose.Schema({
    url: {
        type: String
    },
    cloudinary_id: {
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

imagesSchema.plugin(autoIncrement.plugin, 'images');
const Images = mongoose.model('Images',imagesSchema,'images');
module.exports = {
    Images
};
