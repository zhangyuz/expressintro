var mongoose = require('mongoose');

var systemInfoSchema = mongoose.Schema({
    abis: [String],
    buildType: String,
    chjVersion: String,
    fingerprint: String,
    incrementalVersion: String,
    releaseVersion: String,
    sdkInt: String,
});

var SystemInfo = mongoose.model('SystemInfo', systemInfoSchema);

module.exports = SystemInfo;
