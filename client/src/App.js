import React from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from './components/Pages/Landing';
import SearchPage from './components/Pages/Search';
import SavedPage from './components/Pages/Saved';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/saved" component={SavedPage} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
