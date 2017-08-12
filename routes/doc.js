var express = require('express');
var router = express.Router();
const links = require('./routes');
const data = {
    title:"Riskgratis - Platform - Insurance System",
    active:true,
    links:links("Platform")
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('doc',data);
});

module.exports = router;
