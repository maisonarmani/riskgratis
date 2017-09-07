export default class Animations {
    constructor(_){
        this.document = _;
        this.controller = new window.ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onEnter',
            }
        });
    }


    fadeUps(){
        const fd  = this.document.querySelector(".fade-up-in");
        if (fd){
            var fadeUps = [...fd.children];
            const easing = Circ.easeInOut;
            const start_up_anim = {y: "100px", opacity: 0, ease: easing};
            const end_anim = {y: "0px", opacity: 1, ease: easing};
            window.TweenMax.staggerFromTo(fadeUps, 0.5, start_up_anim, end_anim,0.2);
        }
    }


    morphs(){
        const tm = new window.TimelineMax({repeat:"infinite", yoyo:true, paused:false})
        const tween1 = window.TweenLite.to(".morpher#amoeba > #one", 4, {morphSVG:".morpher#amoeba > #two"});
        const tween2 = window.TweenLite.to(".morpher#amoeba > #two", 4, {morphSVG:".morpher#amoeba > #three"});
        tm.add(tween1).add(tween2).play()
    }

    parralax(){
        var p =  this.document.querySelectorAll(".parrallax");
        window.addEventListener('scroll',ev => {
            setTimeout(function(){
                p.forEach((e,i)=>{
                    // top
                    var stripped = e.style.top.replace("px","")
                    var _ = parseInt(stripped == "" ? 0 : stripped )
                    e.style.top = (_ - (window.pageYOffset * (10 / 100))) + "px";
                })
            },500)
        });
    }

    animatables(){
        const animatables = this.document.querySelectorAll(".animatable") || [];
        animatables.forEach((v)=>{
            var scrollMagic = new window.ScrollMagic.Scene({
                triggerElement: v,
                duration:10,
                offset:-50,
                reverse:false
            }).addTo(this.controller);

            // add the class for the animations
            scrollMagic.on('enter', ev => {
                console.log('enter');
                v.classList.add("active");
            })
        })
    }


}