import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Landing from './components/Pages/Landing';
import NewSearch from './components/Pages/NewSearch';
import SavedPage from './components/Pages/Saved';
import Footer from './components/Footer';

function App() {
  return (
    <Fragment>
      <Router>

        <div className="App">

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/search" component={NewSearch} />
            <Route exact path="/saved" component={SavedPage} />
            <Route exact path="/saved/cat1" component={SavedPage} />
            <Route exact path="/saved/cat2" component={SavedPage} />
            <Route exact path="/saved/cat3" component={SavedPage} />
            <Route exact path="/saved/cat4" component={SavedPage} />
            <Route exact path="/saved/cat5" component={SavedPage} />
          </Switch>

        </div>

      </Router>
      {/* <Footer /> */}
    </Fragment>
  );
}

export default App;
