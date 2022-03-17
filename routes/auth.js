const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();



router.post('/join', isNotLoggedIn, async(req, res, next) => {
    const {email, nickname, password} = req.body;
    try{
        const exUser = await User.findOne({ where: {email}});
        if (exUser){
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nickname,
            password: hash,
        });
        return res.redirect('/');
    }
    catch(error){
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, async(req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError){
            console.error(authError);
            return next(authError);
        }
        if (!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError) => {
            if (loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});


router.get('/kakao', passport.authenticate('kakao'));
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/'
}), (req, res) => {
    res.redirect('/');
});


// router.get('/twitter', passport.authenticate('twitter'));
// router.get('/twitter/callback', passport.authenticate('twitter'), {
//     failureRedirect: '/'
// }, (req, res) => {
//     res.redirect('/');
// });

// router.get('/naver', passport.authenticate('naver'));
// router.get('/naver/callback', passport.authenticate('naver', {
//     failureRedirect: '/'
// }), (req, res) => {
//     res.redirect('/');
// });


router.get('/naver', passport.authenticate('naver', null), function(req, res) {
        console.log('/auth/naver failed, stopped');
    });

router.get('/naver/callback', 
passport.authenticate('naver', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/'); 
});





module.exports = router;