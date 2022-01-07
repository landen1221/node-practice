const express = require('express');
const auth = require('../middleware/auth');
const router = new express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res, next) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send({ msg: 'Invalid login' });
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (user) {
            res.status(200).send(user);
        }
        res.status(404).send({ msg: 'User not found' });
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(404).send({ msg: 'User not found' });
        }
        res.status(500).send(e);
    }
});

router.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];

    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const user = await User.findById(id);
        updates.forEach((update) => (user[update] = req.body[update]));
        await user.save();

        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }
        res.status(200).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).send({ msg: 'User not found' });
        }
        res.status(200).send({ msg: `User successfully deleted`, user });
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(404).send({ msg: 'Task not found' });
        }
        res.status(400).send(e);
    }
});

module.exports = router;
