const {Users,Images} = require('../models');
const {createImages,deleteImage} = require('./image');
const updateUser = async (req, res) => {
    try {
        const {full_name, gender, age} = req.body;
        const user_id = req.user.id;
        const user = await Users.findOne({_id: user_id});
        let image_id;
        if (req.file){
            image_id = await createImages(req.file);
            await deleteImage(user.avatar_id);
        }
        const newUser = {
            full_name: full_name || user.full_name,
            gender: gender || user.gender,
            age: age || user.age,
            avatar_id: image_id || user.avatar_id
        }
        await Users.updateOne(
            {_id: user_id},
            {
                $set: (newUser)
            }
        )
        return res.status(200).json({message: "User updated successfully!", success : true});
    }catch (err) {
        return res.status(400).json(err);
    }
}
const getUser = async (req, res) => {
    try {
        const user_id = req.user.id;
        const user = await Users.findOne({_id: user_id});
        const image = await Images.findOne({_id: user.avatar_id});
        const data = {
            id: user_id,
            full_name: user.full_name,
            gender: user.gender,
            age: user.age,
            email: user.email,
            avatar: image.url,
        }
        return res.status(200).json(data);
    }catch (err) {
        return res.status(400).json(err);
    }
}
module.exports ={
    updateUser,
    getUser
}
