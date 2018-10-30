var express = require('express');
var router = express.Router();

/* GET api page. */
router.get('/:min/:max', function(req, res, next) {
    var min = parseInt(req.params.min);
    var max = parseInt(req.params.max);
    if (isNaN(min) || isNaN(max)) {
        res.status(400);
        res.json({error: 'Bad Request ${min} ${max}'});
        return;
    }
    res.render('api', {min: min, max: max})
});

module.exports = router;

