var express = require('express');
var router = express.Router();
const links = require('./routes');

const data = {
    title:"Riskgratis - Insurance System",
    active: true,
    links: links('Blog')
}
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('blog', data);
});

module.exports = router;
