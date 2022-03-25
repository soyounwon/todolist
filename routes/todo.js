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
router.patch('/checkEdit/:todoId', async (req, res, next) => {

    var target = await Todo.findAll({
        where: {
            [Op.and] : [
                {id: req.params.todoId}, 
                {done: true}
            ]
        }
    });

    // 클릭된 값이 done=false면 true로 바꾸고 true면 false로 바꿈
    if (target.length == 0){
        Todo.update({
            done: true,
        }, {
            where: {
                [Op.and] : [
                    {id: req.params.todoId}, 
                    {done: false}
                ]
            }
        });
    }
    else{
        Todo.update({
            done: false,
        }, {
            where: {
                [Op.and] : [
                    {id: req.params.todoId}, 
                    {done: true}
                ]
            }
        });
    }
    res.redirect('/');

});

// /todo/deleteList
router.post('/deleteList', (req, res, next)=>{
    console.log("deleteList=====================")
    console.log(req.body);
    Todo.destroy({
        where: {id: req.body.deleteTargetList}
    });
    res.redirect('/');
});

// /todo/deleteFolder
router.post('/deleteFolder', (req, res, next)=>{
    
    console.log("deleteFolder====================");
    console.log(req.body);
    
    Todo.destroy({
        where: {folderName: req.body.folderName}
    });
    res.redirect('/');
});

router.post('/editFolder', (req, res, next)=>{
    console.log("editFolder============");
    console.log(req.body);

    Todo.update({
        folderName: req.body.newFolderName,
    }, {
        where: {folderName: req.body.folderName}
    });
    res.redirect('/');

});

module.exports = router;