const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', async function (req, res) {
    try {
        const strs = await db.Storage.find({});
        return res.status(202).json(strs);
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/:id', async function (req, res) {
    try {
        const str = await db.Storage.findById(req.params.id);
        return res.status(202).json(str);
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/med/:id', async function (req, res) {
    try {
        const strs = await db.Storage.find({med: req.params.id});
        return res.status(202).json(strs);
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.put('/:id', async function (req, res) {
    try {
        const str = await db.Storage.findById(req.params.id);
        str.number=req.body.number;
        str.status= req.body.status;
        str.med=req.body.med;
        await str.save();
        return res.status(202).json({ "msg": "str updated" });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.delete('/:id', async function (req, res) {
    try {
        await db.Storage.findByIdAndDelete(req.params.id);
        return res.status(202).json({ "msg": "str deleted" });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.post('/add', async function (req, res) {
    try {
        const str = await db.Storage.create({ med: req.body.med,status:req.body.status,number:req.body.number });
        return res.status(201).json(str);
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});


module.exports = router;