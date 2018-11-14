var mongoose = require('mongoose');

var DeviceInfo = require('./DeviceInfo');
var ProcessInfo = require('./ProcessInfo');
var SystemInfo = require('./SystemInfo');

var crashReportSchema = mongoose.Schema({
    // dropbox tag
    tag: String,
    // when the crash report is generated
    createTime: Date,
    // for now dropbox
    from: String,
    // free text in complain report, for now basicly dropbox entry
    description: String,
    // from scenario
    summary: String,
    // Hash code of summary
    summaryHash: String,
    // attachment from report, max 10 files, in type of Attachment
    attachments: [mongoose.SchemaTypes.Mixed],
    // logfile,max 10 files, in type of Attachment
    logFiles: [mongoose.SchemaTypes.Mixed],
    // ProcessInfo
    processInfo: mongoose.SchemaTypes.Mixed,
    // DeviceInfo
    deviceInfo: mongoose.SchemaTypes.Mixed,
    // SystemInfo
    systemInfo: mongoose.SchemaTypes.Mixed,
});


var CrashReport = mongoose.model('CrashReport', crashReportSchema);

module.exports = CrashReport;
