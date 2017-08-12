// register
import App from "./__effects/index";
document.addEventListener("DOMContentLoaded",function (){
    "use strict";
    document.querySelector("#splash-screen").classList.add('hidden')
    App();
})


import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();