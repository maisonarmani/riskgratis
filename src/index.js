const VideoHeader = require("./js/header-video");

import Animations from "./js/animations";
import Hoverable from "./js/hoverable";

// scss
import "./scss/index.scss";

class Riskgratis {
    constructor(_) {
        this.document = _;
        this.addAnimations();
        this.addHeader();
        this.addHoverable();
    }

    addHeader(){
        var vh = new VideoHeader(this.document);
        vh.render();
    }

    addHoverable(){
        var hoverable = new Hoverable(this.document, 300, "#background");
        hoverable.renderColorClass()
    }

    addAnimations(){
        const animations = new Animations(this.document);
        animations.morphs();
        animations.parralax();
        animations.fadeUps();
    }

}

window.onload = function(){
    new Riskgratis(document)
};