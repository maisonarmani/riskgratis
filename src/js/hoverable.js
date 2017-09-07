/**
 * Created by mason on 12/07/2017.
 */
export default class Hoverable{
    constructor(_, time = 400, target) {
        const ts = time;
        this.target = target;
        this.document = _;
        this.init()
    }

    init(){
        this.document.querySelectorAll(".hoverable").forEach(function(el){
            el.addEventListener("mouseenter", function(){
                this.classList.remove("mouse-leave");
                this.classList.add("mouse-enter");
            });

            el.addEventListener("mouseleave", function(){
                this.classList.add("mouse-leave");
                this.classList.remove("mouse-enter");
            })
        })
    }
    renderColorClass(){
        if (this.target != undefined){
            let tgColor =  this.document.querySelector(this.target);
            const tg = this.document.querySelector(this.target);
            if (tgColor){
                tgColor = tgColor.style.backgroundColor;
                if (tg != null){
                    this.document.querySelectorAll("*[data-color-class]").forEach(el=>{
                        el.addEventListener('mouseenter',ev=>{
                            tg.style.backgroundColor = el.getAttribute('data-color-class')
                        })
                        el.addEventListener('mouseleave',ev=>{
                            tg.style.backgroundColor = tgColor;
                        })
                    })
                }
            }
        }
    }

}