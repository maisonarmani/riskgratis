import React from 'react';
import ReactDOM from 'react-dom';

import "./scss/index.scss";
import App from "./components/app.jsx";

// register
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render( <App/>,document.getElementById('app')); // render to the dom

registerServiceWorker();