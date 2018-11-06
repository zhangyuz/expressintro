var express = require('express');
var multer = require('multer');

var router = express.Router();
var receiver = multer();

router.post('/:id', receiver.single('log'), function(req, res, next) {
    // req.file 保存了上传文件
    // req.body 保存其他数据
    req.file
    next();
});

module.exports = router;
