import React, { Component } from 'react';
import './App.css';
import Title from './title/title'
import Board from './board/board'
import Utils from './utils/utils'

global.serverUrl = "http://52.13.64.66:8000/"

class App extends Component {
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          <Title />
        </div>
        <div className="board">
          <Board />
        </div>
        <div className="utils">
          <Utils />
        </div>
      </div>
    );
  }
}

export default App;
