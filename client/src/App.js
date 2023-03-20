import './App.css';
import React from 'react';
import MainView from './pages';
import Navbar from './components/Navbar/index';
import {BrowserRouter as Router} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar/>
      <MainView/>
    </Router>
  );
}

export default App;
