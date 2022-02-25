const {Users} = require('../models');
const bcrypt = require('bcryptjs');
const createUser = async (req, res) => {
    try {
        const {full_name, gender, age, email, password} = req.body;
        const user_email = await Users.findOne({email: email});
        if (user_email){
            return res.status(400).json({success: false, message: "email exists"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        const user = new Users({
            full_name: full_name,
            gender: gender,
            age: age,
            role: "customer",
            avatar_id: "",
            email: email,
            password: hashPassword
        });
        await user.save();
        return res.status(200).json({success: true});
    }catch (err) {
        return  res.status(400).json(err);
    }
}

module.exports = {
    createUser
}
