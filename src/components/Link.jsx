
import React,{PropTypes}  from "react";
import {prefix} from "../constants";
import Hoverable from "./Hoverable.jsx";
// css
import "../scss/Link.scss";

class Link extends React.Component {
    constructor(props){
        super(props);
     }
     render(){
         return (
             <div className={ `${prefix}-link` }>
                 <a {...this.props } >{ this.props.value }</a>
             </div>
        );
     }
}

Link.defaultProps = {
    href:PropTypes.string.required,
    value:PropTypes.string.required
};

// Wrap our link in an hoverable
// This is used for an hoverable link only
// Test purpose
export default Hoverable(Link);