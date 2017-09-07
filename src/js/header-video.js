module.exports = class VideoHeader {
    constructor(_) {
        this.document = _;
        this.render("header")
        this.renderMenu()
    }

    render(type) {
        if (type == "header") {
            this.renderHeader()
        }
    }

    renderMenu(){
        const menu = this.document.querySelector(".menu");
        const toggle = this.document.querySelectorAll(".toggle-menu");
        toggle.forEach(v =>{
            v.addEventListener('click',ev=>{

                ev.preventDefault();
                if(menu.classList.contains('active')){
                    menu.classList.remove('active');
                    menu.classList.add('in-active');
                }else{
                    menu.classList.remove('in-active');
                    menu.classList.add('active');
                }
            })
        });
    }
    renderHeader() {
        var body = this.document.body,
            html = this.document.documentElement;

        var height = Math.max( body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight );

        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave',
            }
        });

        const sM = new ScrollMagic.Scene({
            triggerElement: "#section-md-1", duration: height, reverse: true
        }).addTo(controller);

        sM.on("leave enter", (ev) => {
            const header = this.document.querySelector("#header");
            switch (ev.type) {
                case "enter":
                    header.classList.add("active");
                    break;
                case "leave":
                    header.classList.add("transit");
                    setTimeout(l=>{
                        header.classList.remove("active","transit");
                    },500)
                    break;
            }
        })
    }
}