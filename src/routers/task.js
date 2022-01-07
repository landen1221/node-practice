const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (task) {
            res.status(200).send(task);
        }
        res.status(404).send({ msg: 'Task not found' });
    } catch (e) {
        if (e.name === 'CastError') {
            res.status(404).send({ msg: 'Task not found' });
        }
        res.status(500).send(e);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const allowed = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) =>
        allowed.includes(update)
    );
    if (!isValidOperation) {
        res.status(400).send({ error: 'Invalid update inputs!' });
    }
    try {
        const task = await Task.findById(id);
        updates.forEach((update) => (task[update] = req.body[update]));
        await task.save();

        if (!task) {
            return res.status(404).send({ msg: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (e) {
        res.status(400).send({ msg: "Didn't work" });
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            res.status(404).send({ msg: 'Task not found' });
        }
        res.status(200).send(task);
    } catch (e) {
        console.log(e);
        if (e.name === 'CastError') {
            res.status(404).send({ msg: 'Task not found' });
        }
        res.status(500).send(e);
    }
});

module.exports = router;
