import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Notes from './components/Notes';


import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route} from 'react-router-dom'
ReactDOM.render(
    <BrowserRouter>
    <div className="App">
    <NavBar/>
    <Route exact path="/" component={Login}/>
    <Route path="/login" component={Login}/>
    <Route path="/notes" component={Notes}/>
    
    </div>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
