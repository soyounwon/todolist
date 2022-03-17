const express = require('express');
const multer = require('multer');
const fs = require('fs');

const { Todo } = require('../models');
const {isLoggedIn} = require('./middlewares');
const { Op } = require("sequelize");

const router = express.Router();



const upload = multer();
// todo/ 
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

// /todo/checkEdit
router.post('/checkEdit', async (req, res, next) => {

    Todo.update({
        done: true,
    }, {
        where: {content: req.body.todo},
    });

    Todo.update({
        done: false,
    }, {
        where: {content: {[Op.not]: req.body.todo}},
    });

    res.redirect('/');

});

// /todo/delete
router.post('/delete', (req, res, next)=>{
    
    Todo.destroy({
        where: {content: req.body.deleteTarget}
    })
    res.redirect('/');
});


module.exports = router;