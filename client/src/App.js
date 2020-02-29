import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Main from './pages/Main';
import AddInfo from './components/AddInfo';


function App() {
  return (
    <Router>
    <div>
      <Nav />
      <Switch>
        {/* <Route exact path="/" component={Landing} /> */}
        <Route exact path="/home" component={Main} />
        {/* <Route exact path="/books/:id" component={Detail} /> */}
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
    </Router>
  );
}

export default App;
