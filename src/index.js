import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from './router/router';
import { Provider } from "react-redux";
import store from "./redux/store";



class Index extends React.Component {
    render(){
        return(
            <Provider store={store}><Router /></Provider>
        )
    }
}
ReactDOM.render(<Index />, document.getElementById('root'))
serviceWorker.unregister();
