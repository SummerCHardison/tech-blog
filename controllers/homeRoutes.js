const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name']
                },
                {
                    model: Comment,
                    attributes: ['comment_body']
                }
            ]
        });
        const posts = postData.map((post) => post.get({ plain: true}));

        res.render('homepage', {
            posts
        });
    } catch (err) {
        res.status(500).json(err)
    }
    
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.get('/login', async (req, res) => {
    res.render('login');
});

module.exports = router;