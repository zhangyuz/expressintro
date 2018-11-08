var express = require('express');
var CrashReport = require('../models/CrashReport');
var multer = require('multer');
const FIELDNAMEATTACHMENTS = 'attachments';
const FIELDNAMELOGFILE = 'logfile';
var memStorage = multer.memoryStorage();
var upload = multer({storage: memStorage});
var crashFields = upload.fields([{ name: FIELDNAMEATTACHMENTS, maxCount: 10 },
    { name: FIELDNAMELOGFILE, maxCount: 1 }]);
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
        var crashReport = new CrashReport(JSON.parse(req.body.metadata));
        var fileNameList = '';
        attachments = req.files[FIELDNAMEATTACHMENTS];
        for (i = 0; i < attachments.length; i++) {
            console.log(`${attachments[i].originalname}`);
            fileNameList = fileNameList + attachments[i].originalname + '\n';
        }

        logfiles = req.files[FIELDNAMELOGFILE];
        for (i = 0; i < logfiles.length; i++) {
            console.log(`${logfiles[i].originalname}`);
            fileNameList = fileNameList + logfiles[i].originalname + '\n';
        }

        crashReport.attachments = attachments;
        crashReport.logFiles = logfiles;
        crashReport.save().then(() => {
            res.send(`Crash Reports\n${req.body.metadata}\n${fileNameList}`);
        });
    });

module.exports = router;
