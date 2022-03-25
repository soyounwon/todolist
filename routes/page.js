const express = require('express');
const { serializeUser } = require('passport');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const {Todo, User} = require('../models');
const { sequelize } = require('../models/user');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    
    next();
});

router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.html');
})

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join.html');
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login.html');
});

router.get('/', async (req, res, next) => {
    try{
        const todos = await Todo.findAll({
            where: {UserId: req.user.id},
            order: [['folderName'],['createdAt', 'DESC']],
        });
        
        var foldersDistinct = await sequelize.query(
            'SELECT DISTINCT folderName FROM todos WHERE UserId = :userid',
            {replacements: {userid : req.user.id}}
        );
        foldersDistinct = foldersDistinct[0];


        // [0]안하면 같은게 두 세트가 나옴.. 왜지..

        
        res.render('index.html', {
            todos: todos,
            foldersDistinct: foldersDistinct,
        });
    }
    
    catch{
        res.render('index.html');
    }
});

module.exports = router;