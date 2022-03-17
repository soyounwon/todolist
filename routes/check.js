const express = require('express');
const { Todo } = require('../models');
const { Op } = require("sequelize");

const router = express.Router();




// /check로 접속할 때
router.post('/', async (req, res, next) => {


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


module.exports = router;