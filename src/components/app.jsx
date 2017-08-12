import React from "react";
import Link from "./Link.jsx";

// lets assume this is our canvas
export default class App extends React.Component{
    constructor(props){
        super(props)
    }

    shouldComponentUpdate(prev,current){
        return true;
    }

    render(){
        return (
            <div>
                <Link href="#" value="Maison Armani" alt="Maison Armani"/>
            </div>
        )
    }
}

