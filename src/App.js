import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'react-bootstrap';

import './App.css';
import Sidebar from "./Sidebar";
import Diagrams from "./Diagrams";
import ShortHistory from "./ShortHistory"

class App extends Component {
  render() {
    return (
<div>
     <Sidebar />
     <Diagrams />
      <ShortHistory/>
</div>


    );
  }
}

export default App;
