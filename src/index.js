import Animations from "./js/animations";
// scss
import "./scss/index.scss";

class Riskgratis {
    constructor(_) {
        this.document = _;
        this.addAnimations();
        this.addHoverable();
        this.addToggler();
    }


    addAnimations() {
        const animations = new Animations(this.document);
        animations.morphs();
        animations.parralax();
        animations.fadeUps();
    }

    addHoverable() {
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

    addToggler() {
        // open to modification
        const dts = [...document.querySelectorAll("*[dt]")];
        const magic = function (ev, reverse) {
            const dt = this.getAttribute("dt");
            if (dt != "") {
                const dtts = [...document.querySelectorAll(`*[dtt=${dt}]`)];
                dtts.forEach((dtt) => {
                    if (reverse != true)
                        if (dtt.classList.contains(dtt.getAttribute('dt-value'))) {
                            dtt.classList.add(`${dtt.getAttribute('dt-value')}-remove`)
                            setTimeout(function () {
                                dtt.classList.remove(`${dtt.getAttribute('dt-value')}-remove`)
                                dtt.classList.remove(`${dtt.getAttribute('dt-value')}`)
                            }, 500)
                        } else {
                            dtt.classList.add(`${dtt.getAttribute('dt-value')}`)
                        }
                    else
                        dtt.classList.remove(dtt.getAttribute('dt-value'));

                })
            }
            ev.preventDefault();
        }

        dts.forEach((_) => {
            "use strict";
            const dt_trigger = _.getAttribute("dt-trigger");
            if (dt_trigger == "hover") {
                _.addEventListener("mouseenter", function (ev) {
                    magic.bind(this)(ev)
                });
                _.addEventListener("mouseleave", function (ev) {
                    magic.bind(this)(ev, true)
                })
            }
            else if (dt_trigger == "click") {
                _.addEventListener("click", function (ev) {
                    magic.bind(this)(ev)
                })
            }
        });
    };


}

window.onload = function () {
    new Riskgratis(document)
};