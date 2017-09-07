const axios = require("axios");
var querystring = require('querystring');
//...
axios.post("http://localhost/feedback.php",
    querystring.stringify({
        email: 'Maison Armani', //gave the values directly for testing
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function (response) {
    console.log(response);
}).catch(function (err) {
    console.log(err.toLocaleString())
});
