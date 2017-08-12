// Maison Armani
const fs = require("fs")
const pt = require("path");
const tp = {
    "scss":pt.resolve(__dirname+'/src/scss'), // unless something else is specified
    "components":pt.resolve(__dirname+'/src/components') // unless something else is specified
}


const name = process.argv[2] || "test";
const is_class = process.argv[3] || false;

const default_scss =  "@import \"../scss/preset.scss\";";
const default_jsx = !is_class ? `
import React  from "react"; 
import "../scss/${name}.scss";
const ${name} = (props) => {
    "use strict";
    return (
        <span></span>
    );
}
export default ${name};`
    :`
import React  from "react"; 
import "../scss/${name}.scss";
export default class ${name} extends React.Component {
    constructor(props){
        super(props);
     }
     render(){
         return (
            <span></span>
        );
     }
    
}`;


fs.writeFile(`${tp.scss}/${name}.scss`,default_scss ,null, function(){
    "use strict";
    console.log("scss file created....")
});

fs.writeFile(`${tp.components}/${name}.jsx`,default_jsx,null, function(){
    "use strict";
    console.log("jsx file created....")
});
