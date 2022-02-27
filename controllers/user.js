const {Users} = require('../models');
const {createImages,deleteImage} = require('./image');
const updateUser = async (req, res) => {
    try {
        const {full_name, gender, age, email, password} = req.body;
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
module.exports ={
    updateUser
}
