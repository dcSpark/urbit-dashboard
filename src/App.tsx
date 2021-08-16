import React from 'react';
import logo from './logo.svg';
import Navbar from "./components/Navbar"
import Dashboard from "./components/Dashboard"
import './App.css';
declare const window:any ;

function App() {
  return (
    <div className="App">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
