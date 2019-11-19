import React from 'react';
import ReactDOM from 'react-dom';

import './static/styles/reset.css';
import './static/styles/debug.css';
import './static/styles/debug-ie7.css';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

// eslint-disable-next-line
import _ from './utils/install'; // grabs before install PWA prompt event

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
