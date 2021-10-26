const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        isSubscribe: req.user.subscription,
        selectedBook: req.user.selectedBook,
        selectedBookHistory: req.user.selectedBookHistory,
        paidHistory: req.user.paidHistory,
        address: req.user.address,
        phone: req.user.phone
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.put("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.get("/book/selected", auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true,
            selected: user.selectedBook
        });
    })
});

router.put("/book/selected", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { selectedBook: req.body.selected }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    })
});

router.get("/user", auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true,
            user
        });
    })
});

module.exports = router;
