const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', async function (req, res) {
    try {
        const meds = await db.Medicine.find({});
        return res.status(202).json(meds);
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/:id', async function (req, res) {
    try {
        const med = await db.Medicine.findById(req.params.id);
        return res.status(202).json(med);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.put('/:id', async function (req, res) {
    try {
        const med = await db.Medicine.findById(req.params.id);
        med.med_name = req.body.med_name;
        await med.save();
        return res.status(202).json({ "msg": "med updated" });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.delete('/:id', async function (req, res) {
    try {
        await db.Medicine.findByIdAndDelete(req.params.id);
        await db.Receipt.find({med: req.params.id}).remove();
        await db.Order.find({med: req.params.id}).remove();
        await db.Price.find({med: req.params.id}).remove();
        await db.Storage.find({med: req.params.id}).remove();
        return res.status(202).json({ "msg": "med deleted" });

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.post('/add', async function (req, res) {
    try {
        const med = await db.Medicine.create({ med_name: req.body.med_name });
        return res.status(201).json(med);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});


module.exports = router;
