var express = require('express');
var router = express.Router();
const db = require('./db');

/* GET users listing. */
router.get('/', function(req, res) {
  db.query('SELECT * FROM new_table', (err, rows) => {
    if(err) console.log(err);
    res.render('event', {rows});
  }) 
});

router.get('/write', function(req, res) {
    res.render('write')
})


module.exports = router;



