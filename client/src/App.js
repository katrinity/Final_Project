import React from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import SearchPage from './components/Pages/Search';
import SavedPage from './components/Pages/Saved';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/saved" component={SavedPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
