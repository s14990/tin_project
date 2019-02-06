const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', async function (req, res) {
    try {
        const orders = await db.Order.find({});
        return res.status(202).json(orders);
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/:id', async function (req, res) {
    try {
        const order = await db.Order.findById(req.params.id);
        return res.status(202).json(order);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/user/:id', async function (req, res) {
    try {
        const order = await db.Order.find({ user: req.params.id });
        return res.status(202).json(order);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.put('/:id', async function (req, res) {
    try {
        const order = await db.Order.findById(req.params.id);
        order.status = req.body.status;
        order.med=req.body.med;
        order.number=req.body.number;
        await order.save();
        return res.status(202).json({ "msg": "order updated" });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.delete('/:id', async function (req, res) {
    try {
        await db.Order.findByIdAndDelete(req.params.id);
        return res.status(202).json({ "msg": "order deleted" });

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.post('/add', async function (req, res) {
    try {
        const order = await db.Order.create(req.body);
        return res.status(201).json(order);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});


module.exports = router;