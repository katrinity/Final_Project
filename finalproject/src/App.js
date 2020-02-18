import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Carousel from './components/Carousel';
import AddInfo from './components/AddInfo';
function App() {
  return (
    <div className="App">
      <Nav />
      <AddInfo />
      <Carousel />
      <AddInfo />
    </div>
  );
}

export default App;
