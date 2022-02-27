const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {createUser,loginUser,refreshToken} = require('../controllers');

router.post('/register',upload.single('avatar'),createUser);
router.post('/login', loginUser);
router.post('/refreshToken', refreshToken);

 module.exports = router;
