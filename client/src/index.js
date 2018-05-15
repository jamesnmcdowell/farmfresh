import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import Router from './Router';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import TokenFromLocal from './components/TokenFromLocal';

ReactDOM.render(
    <Provider store={store}><TokenFromLocal /></Provider>, document.getElementById('root'));
registerServiceWorker();
