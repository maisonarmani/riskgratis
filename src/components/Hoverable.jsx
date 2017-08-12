import React  from "react";
import ReactDom from "react-dom";

const Hoverable = (Component) => class Wrapped extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        // get the dom representation of the wrapped  element
        // then bind the mouse indicator to it
        const hoverableElem = ReactDom.findDOMNode(this);
        hoverableElem.classList.add('__hoverable'); // add the __hoverable indicator

        hoverableElem.addEventListener("mouseenter", function (){
            this.classList.add('mouse-enter');
            this.classList.remove('mouse-left');
        });
        hoverableElem.addEventListener("mouseleave", function (){
            this.classList.remove('mouse-enter');
            this.classList.add('mouse-left');
        });
    }
    render(){
        return (
            <Component {...this.props} />
        )
    }
}
export default Hoverable;