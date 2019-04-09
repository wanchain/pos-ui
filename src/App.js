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
      minerTotalReward: 0,
      minerRewardRate: 0,
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

    socket.on('calcMiner', (info) => {
      console.log('result comed')
      this.setState({
        minerTotalReward: info.minerTotalReward,
        minerRewardRate: info.minerRewardRate,
      })
    })

    this.timer = setInterval(() => {
      socket.emit('getInfo', '')
    }, 5000, null)
    this.socket = socket
  }

  componentWillUnmount() {
    this.socket.close()
    clearInterval(this.timer)
  }

  minerCalc() {
    console.log('minerCalc')
    this.setState({
      minerTotalReward: 0,
      minerRewardRate: 0,
    })
    this.socket.emit('calcMiner', {
      amount: this.minerLockAmount.value,
      locktime: this.minerLockTime.value
    })
  }

  render() {
    return (
      <div class="grid-container">
        <div class="title">Wanchain POS Incentive Calculator</div>
        <div class="blkN0Title">Block Number:</div>
        <div class="blkNoValue">{this.state.blockNumber}</div>
        <div class="totalstkTitle">Total Stake:</div>
        <div class="totalstkValue">{this.state.totalStake}</div>
        <div class="everageTitle">Average Reward:</div>
        <div class="everagetValue">{2100000 * 100 / (this.state.totalStake)}%</div>
        <div class="minerCntTitle">Miner Count:</div>
        <div class="minerCntValue">{this.state.minerCount}</div>
        <div class="delegatorCntTitle">Delegator Count:</div>
        <div class="delegatorCntValue">{this.state.delegatorCount}</div>
        <div class="delegatePartCntTitle">Delegator Participant:</div>
        <div class="delegatePartCntValue">{this.state.delePartiCnt}</div>
        <div class="calculateMinerTitle">Miner reward calculator:</div>
        <div class="calcMiner">
          <div class="lockAmount">
            <input placeholder="Lock Amount"
              ref={(input) => { this.minerLockAmount = input }}
            /></div>
          <div class="lockTime">
            <input placeholder="Lock Time"
              ref={(input) => { this.minerLockTime = input }}
            /></div>
          <div class="calcButton"><button onClick={this.minerCalc.bind(this)}>Calculate</button></div>
          <div class="totalReward">Total Reward:</div>
          <div class="totalRewardValue">
          {this.state.minerTotalReward.toFixed(2)}
          </div>
          <div class="rewardRate">Reward Rate:</div>
          <div class="rewardRateValue">{this.state.minerRewardRate.toFixed(2)}%</div>
        </div>
        <div class="calculateDelegatorTitle">Send delegate reward calculator:</div>
        <div class="calcDelegate">
          <div class="inputDelegate"><input placeholder="Lock Amount" /></div>
          <div class="inputDelegateTime"><input placeholder="Lock Time" /></div>
          <div class="inputDelegateFeerate"><input placeholder="Delegator Fee Rate" /></div>
          <div class="deleButton"><button>Calculate</button></div>
          <div class="totalDelegateReward">Total Reward:</div>
          <div class="totalDelegateRewardValue">{}</div>
          <div class="deleRewardRate">Reward Rate:</div>
          <div class="deleRewardRateValue">{}</div>
        </div>

      </div>
    );
  }
}

export default App;
