const router = require('express').Router();
const { User } = require('../../models');

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

module.exports = router;