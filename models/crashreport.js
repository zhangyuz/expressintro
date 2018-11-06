var mongoose = require('mongoose');

var crashReportSchame = mongoose.Schame({
    deviceSerialNumber: String,
    logFile: Buffer;
});

var CrashReport = mongoose.Model('CrashReport', crashReportSchame);

module.exports = CrashReport;
