const express = require("express");
const router = express.Router();
const multer = require("multer");
const { MonthlyBooks } = require("../models/MonthlyBooks");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage: storage }).single("file");

router.post("/image", (req, res) => {
    // 가져온 이미지 저장
    upload(req, res, (err) => {
        if (err) {
            return res.json({ success: false, err });
        }

        return res.json({
            success: true,
            filePath: res.req.file.path,
            fileName: res.req.file.filename,
        });
    });
});

router.post("/", (req, res) => {
    // 받아온 정보들을 DB에 넣어준다.

    const monthlyBooks = new MonthlyBooks(req.body);
    monthlyBooks.save((err) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    });
});

router.get("/monthlyBooks", (req, res) => {
    // monthlyBooks collection에 들어있는 모든 상품정보를 가져오기

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    MonthlyBooks.find()
        .skip(skip)
        .limit(limit)
        .exec((err, monthlyBooksInfo) => {
            if (err) return res.status(400).json({ seccess: false, err });
            return res.status(200).json({ success: true, monthlyBooksInfo });
        });
});

router.get("/books_by_id", (req, res) => {
    // bookId를 이용해서 DB에서 book 정보를 가져온다.

    let type = req.query.type;
    let bookId = req.query.id;

    MonthlyBooks.find({ _id: bookId }).exec((err, book) => {
        if (err) return res.status(400).send(err);
        return res.status(200).send({success: true, book});
    });
});

module.exports = router;
