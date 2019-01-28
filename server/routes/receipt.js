const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', async function (req, res) {
    try {
        const recs = await db.Receipt.find({});
        return res.status(202).json(recs);
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/:id', async function (req, res) {
    try {
        const rec = await db.Receipt.findById(req.params.id);
        return res.status(202).json(rec);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/med/:id', async function (req, res) {
    try {
        const recs = await db.Receipt.find({med: req.params.id});
        return res.status(202).json(recs);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.put('/:id', async function (req, res) {
    try {
        const rec = await db.Receipt.findById(req.params.id);
        rec.mass = req.body.mass;
        await rec.save();
        return res.status(202).json({ "msg": "rec updated" });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.delete('/:id', async function (req, res) {
    try {
        await db.Receipt.findByIdAndDelete(req.params.id);
        return res.status(202).json({ "msg": "rec deleted" });

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.post('/add', async function (req, res) {
    try {
        const rec = await db.Receipt.create({ med: req.body.med,ingr:req.body.ingr,mass:req.body.mass });
        return res.status(201).json(rec);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});


module.exports = router;