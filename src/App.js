import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blockNumber: 0,
      totalStake: 0,
      minerCount: 0,
      delegatorCount: 0,
      delePartiCnt: 0,
    }

    
  }

  componentDidMount() {
    const socket = io.connect('http://localhost:8000/my-namespace');

    socket.on('info', (info) => {
      this.setState({
        blockNumber: info.blockNumber,
        totalStake: info.totalStake,
        minerCount: info.minerCount,
        delegatorCount: info.delegatorCount,
        delePartiCnt: info.delePartiCnt,
      })
    });

    this.timer = setInterval(()=>{
      socket.emit('getInfo', '')
    }, 5000, null)
    this.socket = socket
  }

  componentWillUnmount() {
    this.socket.close()
    clearInterval(this.timer)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <div className="title">Wanchain PoS Status</div>
          <div>
            <div>Block Number: {this.state.blockNumber}</div>
            <div>Total Stake: {this.state.totalStake} wanCoins</div>
            <div>Miner count: {this.state.minerCount}</div>
            <div>Delegator count: {this.state.delegatorCount}</div>
            <div>Delegate participant count: {this.state.delePartiCnt}</div>
          </div>

        </header>
      </div>
    );
  }
}

export default App;
