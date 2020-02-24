import React from 'react';
import {BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Nav from './components/Nav';
import Carousel from './components/Carousel';
import AddInfo from './components/AddInfo';
import Bucket from './components/Bucket';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Carousel />
        <Bucket />
      </div>
    </Router>
  );
}

export default App;
