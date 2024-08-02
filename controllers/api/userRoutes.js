const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id);

        if(!userData) {
            res.status(404).json({message: 'No user found with this id!'});
        };

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
    res.status
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({
            where: {
                user_name: req.body.user_name
            }
        });

        if (!userData) {
            res
              .status(400)
              .json({ message: 'Incorrect username or password, please try again' });
            return;
          }

          const validPassword = await userData.checkPassword(req.body.password);

          if (!validPassword) {
            res
              .status(400)
              .json({ message: 'Incorrect username or password, please try again' });
            return;
          }

          req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            res.json({ user: userData, message: 'You are now logged in!' });
          });
    } catch (err) {
        res.status(500).json(err);
      }
});

router.post('/logout', async (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

router.get('/posts/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({plain: true});
       
        res.render('myPost', {
            post
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;