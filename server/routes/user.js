const express = require('express');
const router = express.Router();
const db = require('../models');
const md5 = require('md5');

const mypassword = "testpassword322";
const myemail = "dimonus2008@gmail.com";
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myemail,
        pass: mypassword
    }
});


router.get('/', async function (req, res) {
    try {
        const users = await db.User.find({});
        return res.status(201).json(users);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.post('/register', async function (req, res) {
    try {
        if (req.body.username.length < 1)
            throw new Error('Empty username');
        if (req.body.password.length < 1)
            throw new Error('Empty password');
        if (req.body.email.length < 1)
            throw new Error('Empty Email');
        const user1 = await db.User.findOne({ username: req.body.username });
        if (!!user1)
            throw new Error('Username was already taken');
        const user = await db.User.create(req.body);
        user.password = md5(user.password);
        await user.save();
        const { _id, username, email } = user;
        var mailOptions = {
            from: myemail,
            to: email,
            subject: 'validation',
            text: 'Your validation link: http://127.0.0.1:4000/user/validate/' + _id
        };
        transporter.sendMail(mailOptions);
        if (!!_id)


            return res.status(201).json({ _id, username, email });

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.post('/login', async function (req, res) {
    try {
        const user = await db.User.findOne({ username: req.body.username });
        if (!user)
            throw new Error('No user was found');
        if (user.password !== md5(req.body.password))
            throw new Error('wrong password');
        if (user.isvalidated === false)
            throw new Error('User must be validated in');
        user.status = "online";
        await user.save();
        return res.status(202).json(user)
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/validate/:id', async function (req, res) {
    try {
        const user = await db.User.findById(req.params.id);
        user.isvalidated = true;
        await user.save();
        return res.status(202).json({ "msg": "user was validated" });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});



router.post('/logout', async function (req, res) {
    try {
        const user = await db.User.findOne({ username: req.body.username });
        user.status = "offline";
        await user.save();
        return res.status(202).json({ "msg": "logout done" });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});


router.get('/:_id', async function (req, res) {
    try {
        const user = await db.User.findOne({ _id: req.params._id });
        const { id, username, password } = user;
        return res.status(201).json({ id, username, password });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.delete('/:_id', async function (req, res) {
    try {
        const user = await db.User.deleteOne({ _id: req.params._id });
        await db.Order.find({ user: req.params._id }).remove();
        const { id, username, password } = user;
        return res.status(201).json({ id, username, password });
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});




module.exports = router;