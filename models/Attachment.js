var mongoose = require('mongoose');

var attachmentSchema = mongoose.Schema({
    // 文件原始名字
    originalname: String,
    // mimetype
    mimetype: String,
    // 文件内容
    buffer: Buffer,
});

var Attachment = mongoose.model('Attachment', attachmentSchema);
module.exports = Attachment;
