import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

function App() {
  return (<Router>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </Router> 
  );
}

export default App;
