var express = require('express');
var router = express.Router();

const links = require('./routes');

const data = {
    title:"Riskgratis - Design Goals  - Insurance System",
    active: true,
    links: links('Platform'),
    goals: [
        {
            title: "Innovation at the speed of light for FREE",
            desc: "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            title: "limitless scalability: online, offline or a road in between the two",
            desc: "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            title: "Simple design: highly modular, ease of use",
            desc: "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            title: "Secure design",
            desc: "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            title: "Stability: little or no regression, update regression",
            desc: "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            title: "OS agnostic",
            desc: "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            title: "Parallel run: you can do parallel run while ignoring us",
            desc: "Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ]
}
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('design-goals', data);
});

module.exports = router;
