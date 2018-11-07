var mongoose = require('mongoose');
var processInfoSchema = mongoose.Schema({
    packageName: String,
    versionName: String,
    versionCode: String,
    processName: String,
});

var ProcessInfo = mongoose.Model('ProcessInfo', processInfoSchema);
module.exports = ProcessInfo;
