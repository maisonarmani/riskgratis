import axios from "axios";
import querystring from "querystring";
import ScrollMagic from "scrollmagic";
import "particles.js"

import "./scss/index.scss";

const controller = new ScrollMagic.Controller({
    globalSceneOptions: {
        triggerHook: 'onEnter',
    }
});

const hoverable = function () {
    // using the __hoverable indicator
    const hoverableElems = [...document.getElementsByClassName("__hoverable")];
    hoverableElems.forEach((_) => {
        "use strict";
        _.addEventListener("mouseenter", function () {
            this.classList.add('mouse-enter');
            this.classList.remove('mouse-left');
        });
        _.addEventListener("mouseleave", function () {
            this.classList.remove('mouse-enter');
            this.classList.add('mouse-left');
        });
    })
}

const toggler = function () {
    // open to modification
    const togglers = [...document.querySelectorAll("*[data-toggle]")];
    togglers.forEach((_) => {
        "use strict";
        const toggler_trigger = _.getAttribute("data-toggle-trigger");
        if (toggler_trigger == "hover") {
            _.addEventListener("mouseenter", function (ev) {
                const data_toggle = this.getAttribute("data-toggle");
                if (data_toggle != "") {
                    const toggled = [...document.querySelectorAll(`*[data-toggled=${data_toggle}]`)];
                    toggled.forEach((_) => {
                        _.classList.add(_.getAttribute('data-toggled-state'));
                    })
                }
                ev.preventDefault();
            });
            _.addEventListener("mouseleave", function (ev) {
                const data_toggle = this.getAttribute("data-toggle");
                if (data_toggle != "") {
                    const toggled = [...document.querySelectorAll(`*[data-toggled=${data_toggle}]`)];
                    toggled.forEach((_) => {
                        _.classList.remove(_.getAttribute('data-toggled-state'));
                    })
                }
                ev.preventDefault();
            })
        }
        else if (toggler_trigger == "click") {
            _.addEventListener("click", function (ev) {
                const data_toggle = this.getAttribute("data-toggle");
                if (data_toggle != "") {
                    const toggled = [...document.querySelectorAll(`*[data-toggled=${data_toggle}]`)];
                    toggled.forEach((_) => {
                        _.classList.toggle(_.getAttribute('data-toggled-state'));
                    })
                }
                ev.preventDefault();
            })
        }
        else if (toggler_trigger == "scroll") {
            const data_toggle = _.getAttribute("data-toggle");
            if (data_toggle != "") {
                const s = new ScrollMagic.Scene({
                    triggerElement: _,
                    reverse: true
                }).addTo(controller);
                s.on("leave enter", (ev) => {
                    const toggled = [...document.querySelectorAll(`*[data-toggled=${data_toggle}]`)];
                    toggled.forEach((target) => {
                        const data_toggle_state = target.getAttribute("data-toggle-state");
                        switch (ev.type) {
                            case "enter":
                                target.classList.remove("in-active");
                                target.classList.add(data_toggle_state);
                                break;
                            case "leave":
                                target.classList.add("in-active");
                                setTimeout(()=>{
                                    target.classList.remove("in-active");
                                },300);
                                target.classList.remove(data_toggle_state);
                                break;
                        }
                    })
                })
            }
        }
    });
};

const animatable = function () {
    "use strict";
    const animatables = document.querySelectorAll("*[data-animate]") || [];
    animatables.forEach((v) => {
        const animation_active_state = v.getAttribute('data-animate-true');
        const animation = v.getAttribute('data-animate');
        const scrollMagic = new ScrollMagic.Scene({triggerElement: v, duration: 10, offset: 100, reverse: false})
            .addTo(controller);

        // this way even without the animation everything still works fine
        v.classList.add(animation);
        // add the class for the animations
        scrollMagic.on('enter', ev => {
            v.classList.add(animation_active_state);
        });
    });
};

const stwag = function () {
    "use strict";
    const stwag = document.querySelectorAll("*[data-stwag]");
    stwag.forEach(_ => {
        var current = 0, previous = 0;
        const reverse = true;
        const timeout = _.getAttribute('data-stwag-timeout') || 4;
        _.children[current].classList.add("active");
        setInterval(p => {
            previous = current;
            if (reverse) current = current == _.children.length - 1 ? -1 : current; // reverse
            _.children[previous].classList.remove("active");
            _.children[previous].classList.add("in-active");
            current = Math.min(++current, _.children.length - 1);
            _.children[current].classList.remove("in-active");
            _.children[current].classList.add("active");
        }, timeout * 1000);
    });


}

const particles = function(){
    console.log(particlesJS)
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('background', '/json/particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
}

class Feedback {
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
                querystring.stringify(params), {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                }).then(function (response) {
                form.classList.remove('loading');
                form.classList.remove('error');
                form.classList.add('complete');

                // clear form data
                [...form.elements].forEach(v => {
                    v.value = "";
                })

            }).catch(function (err) {
                form.classList.remove('loading');
                form.classList.remove('complete');
                form.classList.add('error');
            });
        }
    }


}

//
const initialize = () => {
    "use strict";
    hoverable();
    toggler();
    animatable();
    stwag();
    particles();
};

export default initialize; // same as app on index