var express = require('express');
var multer = require('multer');
const FIELDNAMEATTACHMENTS = 'attachments';
const FIELDNAMELOGFILE = 'logfile';
var upload = multer();
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
        var fileNameList = '';
        attachents = req.files[FIELDNAMEATTACHMENTS];
        for (i = 0; i < attachents.length; i++) {
            console.log(`${attachents[i].originalname}`);
            fileNameList = fileNameList + attachents[i].originalname + '\n';
        }

        logfiles = req.files[FIELDNAMELOGFILE];
        for (i = 0; i < logfiles.length; i++) {
            console.log(`${logfiles[i].originalname}`);
            fileNameList = fileNameList + logfiles[i].originalname + '\n';
        }

        res.send(`Crash Reports\n${req.body.metadata}\n${fileNameList}`);
    });

module.exports = router;
