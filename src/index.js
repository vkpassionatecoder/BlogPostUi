import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PostDetail from './Components/PostDetail';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/postdetail" component={PostDetail} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))

