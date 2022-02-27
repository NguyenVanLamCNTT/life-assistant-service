const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {isAuthenticated,updateUser,getUser} = require('../controllers');
router.put('/', isAuthenticated,upload.single('avatar'), updateUser);
router.get('/',isAuthenticated,getUser);

module.exports = router;
