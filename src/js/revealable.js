const ScrollMagic = require("scrollmagic");
module.exports = class Revealable{
    constructor(doc){
        this.document =  doc;
        this.controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onEnter',
            }
        });
    }
    render(){
        const revealables = this.document.querySelectorAll(".revealable") || [];
        revealables.forEach((v)=>{
            var scrollMagic = new ScrollMagic.Scene({
                triggerElement: v,
                duration:300,
                offset:20,
                reverse:false
            }).addTo(this.controller);

            // add the class for the animations
            scrollMagic.on('enter', ev => {
                v.classList.add("active");
            })
        })
    }



}