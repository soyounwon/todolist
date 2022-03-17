const express = require('express');
const multer = require('multer');
const fs = require('fs');

const { Todo } = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();



const upload = multer();
// todo/ 로 접속할 때
router.post('/', isLoggedIn, upload.none(), (req, res, next) => {
    try{
        Todo.create({
            content: req.body.content,
            UserId: req.user.id,
            folderName: req.body.folder,
        });
        res.redirect('/');
    }
    catch(error){
        console.log(error);
        next(error);
    }

});


module.exports = router;