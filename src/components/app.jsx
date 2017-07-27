import React from "react";
import Header from "./header.jsx";

export default class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <Header/> 
            </div>
        )
    }
}

