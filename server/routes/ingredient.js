const express = require('express');
const router = express.Router();
const db = require('../models');


router.get('/', async function (req, res) {
    try {
        const ingrs = await db.Ingredient.find({});
        return res.status(202).json(ingrs);
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/:id', async function (req, res) {
    try {
        const ingr = await db.Ingredient.findById(req.params.id);
        return res.status(202).json(ingr);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.put('/:id', async function (req, res) {
    try {
        const ingr = await db.Ingredient.findById(req.params.id);
        ingr.ingr_name = req.body.ingr_name;
        await ingr.save();
        return res.status(202).json({ "msg": "ingr updated" });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.delete('/:id', async function (req, res) {
    try {
        await db.Ingredient.findByIdAndDelete(req.params.id);
        return res.status(202).json({ "msg": "ingr deleted" });

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.post('/add', async function (req, res) {
    try {
        const ingr = await db.Ingredient.create({ ingr_name: req.body.ingr_name });
        return res.status(201).json(ingr);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});


module.exports = router;