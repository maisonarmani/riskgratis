var express = require('express');
var router = express.Router();

const data = {
    ready:true,
    ingredient:[
        'honey','jam','sugar',{
        sauce:["pepper","tomato"]}
    ]
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',data);
});

module.exports = router;
