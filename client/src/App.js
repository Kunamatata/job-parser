import React, { Component } from 'react';

import JobListing from './Components/joblisting/joblisting';
import './App.css';

document.getElementById("root").style.background = "#100e15";

class App extends Component {
  render() {
    return (
      <div className="job-board">
        <JobListing />
      </div>
    );
  }
}

export default App;
