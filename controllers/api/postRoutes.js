const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{model: User}, {model: Comment}]
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{model: User}, {model: Comment}]
        });

        if(!postData) {
            res.status(404).json({message: 'No post found with this id!'});
        };

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
        };

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
        };

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', async (req, res) => {
    try{
        const id = req.params.id;
        res.render('edit', {
            id
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new/form', async (req, res) => {
    try{
        res.render('Post', {
            id: req.session.user_id
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/comment/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({plain: true});
       
        res.render('commentPost', {
            post
        });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;