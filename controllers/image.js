const {Images} = require('../models');

const cloudinary = require('../utils/clouddinary');

const createImages = async (file) => {
    const result = await cloudinary.uploader.upload(file.path);
    const image = new Images({
        url: result.secure_url,
        cloudinary_id: result.public_id,
    });
    await image.save();
    return image._id;
}
const deleteImage = async (image_id) => {
    const image = await Images.findOne({_id: image_id});
    await cloudinary.uploader.destroy(image.cloudinary_id);
    await image.remove();
}
module.exports = {
    createImages,
    deleteImage
}
