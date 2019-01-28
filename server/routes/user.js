const express = require('express');
const router = express.Router();
const db = require('../models');
const md5 = require('md5');

const password="testpassword322";
const email="dimonus2008@gmail.com";
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  });


router.get('/',async function (req, res) {
    try {
        const users = await db.User.find({});
        return res.status(201).json(users);

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.post('/register', async function (req, res) {
    try {
        const user = await db.User.create(req.body);
        user.password=md5(user.password);
        await user.save();
        const { id, username,email } = user;
        var mailOptions = {
            from: email,
            to: user.email,
            subject: 'validation',
            text: 'Your validation link: http://127.0.0.1:4000/user/validate/'+user._id
          };
        transporter.sendMail(mailOptions);
        return res.status(201).json({ id, username,email });

    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.post('/login', async function (req, res) {
    try {
        const user = await db.User.findOne({ username: req.body.username });
        user.status="online";
        await user.save();
        //const { id, username,isvalidated, password } = user;
        if (user.password === md5(req.body.password)) {
            return res.status(202).json(user);
        }
        else {
            throw new Error('wrong password or username');
        }
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.get('/validate/:id', async function (req, res) {
    try {
        const user = await db.User.findById(req.params.id);
        user.isvalidated=true;
        await user.save();
        return res.status(202).json({"msg":"user was validated"});
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});



router.post('/logout', async function (req, res) {
    try {
        const user = await db.User.findOne({ username: req.body.username });
        user.status="offline";
        await user.save();
        return res.status(202).json({"msg" : "logout done"});
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});


router.get('/:_id',async function (req, res) {
    try {
        const user = await db.User.findOne({_id: req.params._id});
        const { id, username, password } = user;
        return res.status(201).json({ id, username,password});
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
});

router.delete('/:_id',async function (req, res) {
    try {
        const user = await db.User.deleteOne({_id: req.params._id});
        const { id, username, password } = user;
        return res.status(201).json({ id, username,password});
    } catch (err) {
        return res.status(400).json({ "error": err.message });
    }
}); 




module.exports = router;