import React, { Component } from 'react';
import './App.css';
import Title from './title/title'
import Board from './board/board'
import Utils from './utils/utils'

console.log(window.location.href)

let serverUrl = window.location.href
serverUrl = serverUrl.replace("3000", "8000")

console.log(serverUrl)

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
