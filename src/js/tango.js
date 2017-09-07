import {TimelineMax, TweenMax} from "gsap";

module.exports = class Tango {
    constructor(_, options = {}) {
        // constants
        this.UP = 0x026;
        this.DOWN = 0x028;

        this.options = Object.assign({
            tango: "#tango",
            orientation: "vertical",
            itemSelector: '.tango-item',
            changeTimeout: 500,
            onChange: undefined,
            hasIndicators: true,
            colorTarget:'#app'
        }, options);


        this.document = _;// document passed as constructor pass
        this.tango = this.document.querySelector(this.options.tango);
        if(this.tango != null){
            this.colorTarget  = this.document.querySelector(this.options.colorTarget);
            this.index = 0;
            this.recent = 0;
            this.max = this.tango.children.length;
        }


        if (this.tango != null && this.options.hasIndicators) {
            this.addIndicators();
            this.indicatorItems = [...this.document.querySelector('#tango-indicators-wrapper').children];
            this.indicatorItems.forEach((elem, i) => {
                elem.onclick = (event) => {
                    if (this.index != i && this.index < this.max) {
                        const dir = this.index > i ? "up" : "down";
                        this.recent = this.index;
                        this.index = i;
                        this.dispatchState(dir)
                    }
                }
            })
        }

        if(this.tango != null){
            this.tangoItems = [...this.tango.children].filter(elem => elem.classList.contains(this.options.itemSelector
                .replace(this.options.itemSelector[0], "")));

            //create event for change in box
            this.indexchange = new Event("indexchange", {"bubbles": true, "cancelable": false});
            this.document.addEventListener("indexchange", this.onIndexChange.bind(this));

            // some event handling
            this.document.addEventListener('keydown', ({keyCode}) => {
                if (keyCode == this.UP || keyCode == this.DOWN) {
                    //this.changeIndex(keyCode);
                }
            });

            this.deActivateAll();
            this.dispatchState();}
    }

    deActivateAll() {
        this.tangoItems.forEach((_, i) => {
            if (i !== this.index) {
                _.classList.remove('active', "recent");
                _.classList.add('in-active');
            }
        });
        this.indicatorItems.forEach((_, i) => {
            if (i !== this.index) {
                _.classList.remove('active', "recent");
                _.classList.add('in-active');
            }
        });
    }

    onIndexChange(ev) {
        const state = ev.state;
        const current = this.tangoItems[state.current];
        const recent = this.tangoItems[state.recent];
        //...
        //this.colorTarget.style.backgroundColor = current.attributes['data-color'].value || this.colorTarget.style.backgroundColor;
        console.log(this.colorTarget)
        current.classList.add('active');
        if (state.recent !== state.current) {
            recent.classList.add('recent');
            current.classList.remove('recent');
            this.classReplace(recent, "active", "in-active");
            this.classReplace(current, "in-active", "active");
        }
        const timelineMax = new TimelineMax({
            yoyo: false,
            repeat: 0
        });

        if (this.index >= 0 && this.index < this.max) {
            const easing = Circ.easeInOut;
            const recent_up_anim = {y: "100px", opacity: 0, ease: easing};
            const current_up_anim = {y: "0px", opacity: 1, ease: easing};
            const recent_down_anim = {y: "-100px", opacity: 0, ease: easing};
            const current_down_anim = {y: "0px", opacity: 1, ease: easing};
            const time = 0.8;
            if (state.direction == "down") {
                TweenMax.fromTo(current, time, recent_down_anim, current_down_anim)
                if (current != recent)
                    TweenMax.fromTo(recent, time, current_up_anim, recent_up_anim)
            } else {
                TweenMax.fromTo(current, time, recent_up_anim, current_up_anim);
                if (current != recent)
                    TweenMax.fromTo(recent, time, current_down_anim, recent_down_anim)
            }
        }

        const _current = this.indicatorItems[state.current];
        const _recent = this.indicatorItems[state.recent];
        //...
        _current.classList.add('active');
        if (state.recent !== state.current) {
            _recent.classList.add('recent');
            _current.classList.remove('recent');
            this.classReplace(_recent, "active", "in-active");
            this.classReplace(_current, "in-active", "active");
        }
        if (this.options.onChange)
            this.options.onChange(ev);
    }

    dispatchState(direction) {
        let recent = 0;
        this.tangoItems.forEach((ch, i) => {
            switch (direction) {
                case "up":
                    this.moveUp();
                    break;
                case "down":
                    this.moveDown();
                    break;
            }
        });

        this.deActivateAll();
        // a little event hack
        this.indexchange['state'] = {recent: this.recent, current: this.index, direction: direction};
        this.document.dispatchEvent(this.indexchange)
    }


    addIndicators() {
        const indicator = `<a href="#" class="tango-indicator" ></a>`;
        let indicators = ""
        for (var i = this.max; i != 0; i--) {

            indicators += indicator;
        }
        this.tango.innerHTML += `<div class="tango-indicators-wrapper" id="tango-indicators-wrapper">${indicators}</div>`;
    }

    changeIndex(direction) {
        switch (direction) {
            case this.UP:
                this.index = Math.max(--this.index, 0);
                this.dispatchState('up');
                break;
            case this.DOWN:
                this.index = Math.min(++this.index, this.max - 1);
                this.dispatchState('down');
                break;
        }
    }

    moveUp() {
        this.classReplace(this.tango, "down", "up");
    }

    moveDown() {
        this.classReplace(this.tango, "up", "down");
    }

    classReplace(elem, cl1, cl2) {
        elem.classList.add(cl2);
        elem.classList.remove(cl1);
    }
}