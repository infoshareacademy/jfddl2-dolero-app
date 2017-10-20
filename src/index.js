import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css'
import Auth from './Auth'
import { Provider } from 'react-redux'

import store from './store'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Auth>
            <App />
        </Auth>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
