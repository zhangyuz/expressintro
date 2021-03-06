var express = require('express');
var CrashReport = require('../models/CrashReport');
var Attachment = require('../models/Attachment');
var multer = require('multer');
const FIELDNAMEATTACHMENTS = 'attachments';
const FIELDNAMELOGFILE = 'logfiles';
var upload = multer();
var crashFields = upload.fields([{ name: FIELDNAMEATTACHMENTS, maxCount: 10 },
    { name: FIELDNAMELOGFILE, maxCount: 10 }]);
var router = express.Router();

router.route('/')
    .get(function(req, res) {
        console.log('Debug', `Get ${req.originalUrl}`);
        res.send('Crash Reports');
    })
    .post(crashFields, function(req, res) {
        console.log('Debug', `Post ${req.originalUrl}`);
        console.log(req.body);
        console.log(req.body.metadata);
        console.log(JSON.parse(req.body.metadata).tag);
        console.log(JSON.parse(req.body.metadata).summary);
        var crashReport = new CrashReport(JSON.parse(req.body.metadata));
        var fileNameList = '';
        attachments = req.files[FIELDNAMEATTACHMENTS];
        for (i = 0; i < attachments.length; i++) {
            console.log(`${attachments[i].originalname}`);
            fileNameList = fileNameList + attachments[i].originalname + '\n';
            var attachment = new Attachment({
                originalname: attachments[i].originalname,
                mimetype: attachments[i].mimetype,
                buffer: attachments[i].buffer,
            });
            crashReport.attachments[i] = attachment;
        }

        logfiles = req.files[FIELDNAMELOGFILE];
        for (i = 0; i < logfiles.length; i++) {
            console.log(`${logfiles[i].originalname}`);
            fileNameList = fileNameList + logfiles[i].originalname + '\n';
            var logfile  = new Attachment({
                originalname: logfiles[i].originalname,
                mimetype: logfiles[i].mimetype,
                buffer: logfiles[i].buffer,
            });
            crashReport.logFiles[i] = logfile;
        }

        crashReport.save().then(() => {
            //res.send(`Crash Reports\n${req.body.metadata}\n${fileNameList}`);
            res.json({successful: true, msg: `Crash Reports\n${req.body.metadata}\n${fileNameList}`});
        });
    });

module.exports = router;
