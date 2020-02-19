import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Carousel from './components/Carousel';
import AddInfo from './components/AddInfo';
import Bucket from './components/Bucket';

function App() {
  return (
    <div className="App">
      <Nav />
      <Carousel />
      <Bucket />
    </div>
  );
}

export default App;
