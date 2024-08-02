const router = require('express').Router();
const { Comment, User, Post } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [{model: User}, {model: Post}]
        });
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create(req.body);
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/form/:postID', async (req, res) => {
    try {
        const postID = req.params.postID;
        const userID = req.session.user_id;

        res.render('commentForm', {
            postID, userID
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;