const axios = require('axios');
var querystring = require('querystring');

export default class Feedback {
    constructor(_) {
        this.document = _;
    }

    init() {
        this.document.querySelectorAll("form.loading *[type=submit]").forEach(v => {
            v.addEventListener('click', function (ev) {
                ev.preventDefault();
            })
        });
        this.document.querySelectorAll("form").forEach(v => {
            v.addEventListener('submit', ev => {
                const params = this.getParams(v);
                this.sendFeedback(v, params);
                ev.preventDefault();
            })
        })
    }

    getParams(elem) {
        var params = {};
        [...elem.elements].forEach(v => {
            params[v.getAttribute('name')] = v.value;
        })
        return params;
    }

    validate() {
        return true
    }


    sendFeedback(form, params) {
        if (this.validate()) {
            form.classList.add('loading');
            form.classList.remove('complete');
            form.classList.remove('error');

            axios.post(form.getAttribute('action'),
                JSOP.stringify(params), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                }).then(function (response) {
                form.classList.remove('loading');
                form.classList.remove('error');
                form.classList.add('complete');

                // clear form data
                [...form.elements].forEach(v => {
                    v.value ="";
                })

            }).catch(function (err) {
                form.classList.remove('loading');
                form.classList.remove('complete');
                form.classList.add('error');
            });
        }
    }


}