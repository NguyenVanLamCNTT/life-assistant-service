const express = require('express');
const router = express.Router();
const {createUser,loginUser,refreshToken} = require('../controllers');

router.post('/register',createUser);
router.post('/login', loginUser);
router.post('/refreshToken', refreshToken);

 module.exports = router;
