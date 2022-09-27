import React from 'react';
import ReactDOM from 'react-dom/client';
import {store} from './store'
import App from './App';
import {Provider} from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
        <App />
</Provider>,
);


