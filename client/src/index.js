import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  '../src/Assets/css/bootstrap.css';
import  '../src/Assets/css/dropdownmenu.css';
import '../src/Assets/css/progress.css';
import '../src/Assets/css/sidebar.css';
import '../src/Assets/css/animate.min.css';
import  '../src/Assets/css/style.css';
import store from './redux/store/store';


ReactDOM.render(
    <React.StrictMode>
        <ToastContainer />
        <Provider store={store}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
