const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', async function (req, res) {
    try {
        const prices = await db.Price.find({});
        return res.status(202).json(prices);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/:id', async function (req, res) {
    try {
        const price = await db.Price.findById(req.params.id);
        return res.status(202).json(price);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.put('/:id', async function (req, res) {
    try {
        const price = await db.Price.findById(req.params.id);
        price.cena = req.body.cena;
        await price.save();
        return res.status(202).json({ "msg": "price updated" });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});
router.get('/med/:id', async function (req, res) {
    try {
        const price = await db.Price.findOne({med: req.params.id});
        return res.status(202).json(price);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.delete('/:id', async function (req, res) {
    try {
        await db.Price.findByIdAndDelete(req.params.id);
        return res.status(202).json({ "msg": "price deleted" });

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.post('/add', async function (req, res) {
    try {
        const price = await db.Price.create({ med: req.body.med,cena:req.body.cena });
        return res.status(201).json(price);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});


module.exports = router;
