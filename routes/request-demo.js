var express = require('express');
var router = express.Router();
const links = require('./routes');

const data = {
    title:"Riskgratis - Request Demo - Insurance System",
    active: true,
    links: links('Request Demo')
}
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('request-demo', data);
});

module.exports = router;
