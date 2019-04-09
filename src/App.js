import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

const serverUrl = 'http://localhost:8000/'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      blockNumber: 0,
      totalStake: 0,
      minerCount: 0,
      delegatorCount: 0,
      delePartiCnt: 0,
      minerTotalReward: 'N/A',
      minerRewardRate: 'N/A',
      delegateTotalReward: 'N/A',
      delegateRewardRate: 'N/A',
    }
  }

  getInfo() {
    this.serverRequest = $.get(serverUrl + 'info', function (result) {
      console.log(result)
      this.setState({
        blockNumber: result.blockNumber,
        totalStake: result.totalStake,
        minerCount: result.minerCount,
        delegatorCount: result.delegatorCount,
        delePartiCnt: result.delePartiCnt,
      });
    }.bind(this));
  }

  componentDidMount() {
    this.getInfo()
    this.timer = setInterval(this.getInfo.bind(this), 5000, null)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.serverRequest.abort();
  }

  minerCalc() {
    console.log('minerCalc')
    this.setState({
      minerTotalReward: 'Waiting',
      minerRewardRate: 'Waiting',
    })

    let amount = this.minerLockAmount.value
    let locktime = this.minerLockTime.value

    this.serverRequest = $.get(serverUrl + 'minerCalc?amount=' + amount + '&locktime=' + locktime,
      function (result) {
        console.log(result)
        this.setState({
          minerTotalReward: result.minerTotalReward.toFixed(2),
          minerRewardRate: result.minerRewardRate.toFixed(2) + '%',
        });
      }.bind(this));
  }

  delegateCalc() {
    console.log('delegateCalc')
    this.setState({
      delegateTotalReward: 'Waiting',
      delegateRewardRate: 'Waiting',
    })

    let amount = this.delegateAmount.value
    let locktime = this.delegateLockTime.value
    let feerate = this.delegateFeeRate.value

    this.serverRequest = $.get(serverUrl + 'delegateCalc?amount=' +
      amount + '&locktime=' + locktime + '&feerate=' + feerate,
      function (result) {
        console.log(result)
        this.setState({
          delegateTotalReward: result.delegateTotalReward.toFixed(2),
          delegateRewardRate: result.delegateRewardRate.toFixed(2) + '%',
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="grid-container">
        <div className="title">Wanchain POS Incentive Calculator</div>
        <div className="blkN0Title">Block Number:</div>
        <div className="blkNoValue">{this.state.blockNumber}</div>
        <div className="totalstkTitle">Total Stake:</div>
        <div className="totalstkValue">{this.state.totalStake}</div>
        <div className="everageTitle">Average Reward:</div>
        <div className="everagetValue">{2100000 * 100 / (this.state.totalStake)}%</div>
        <div className="minerCntTitle">Miner Count:</div>
        <div className="minerCntValue">{this.state.minerCount}</div>
        <div className="delegatorCntTitle">Delegator Count:</div>
        <div className="delegatorCntValue">{this.state.delegatorCount}</div>
        <div className="delegatePartCntTitle">Delegator Participant:</div>
        <div className="delegatePartCntValue">{this.state.delePartiCnt}</div>
        <div className="calculateMinerTitle">Miner reward calculator:</div>
        <div className="calcMiner">
          <div className="lockAmount">
            <input placeholder="Lock Amount"
              ref={(input) => { this.minerLockAmount = input }}
            /></div>
          <div className="lockTime">
            <input placeholder="Lock Time"
              ref={(input) => { this.minerLockTime = input }}
            /></div>
          <div className="calcButton"><button onClick={this.minerCalc.bind(this)}>Calculate</button></div>
          <div className="totalReward">Total Reward:</div>
          <div className="totalRewardValue">
            {this.state.minerTotalReward}
          </div>
          <div className="rewardRate">Reward Rate:</div>
          <div className="rewardRateValue">{this.state.minerRewardRate}</div>
        </div>
        <div className="calculateDelegatorTitle">Send delegate reward calculator:</div>
        <div className="calcDelegate">
          <div className="inputDelegate">
            <input placeholder="Lock Amount"
              ref={(input) => { this.delegateAmount = input }}
            /></div>
          <div className="inputDelegateTime">
            <input placeholder="Lock Time"
              ref={(input) => { this.delegateLockTime = input }}
            /></div>
          <div className="inputDelegateFeerate">
            <input placeholder="Delegator Fee Rate"
              ref={(input) => { this.delegateFeeRate = input }}
            /></div>
          <div className="deleButton">
            <button onClick={this.delegateCalc.bind(this)}>Calculate</button></div>
          <div className="totalDelegateReward">Total Reward:</div>
          <div className="totalDelegateRewardValue">{this.state.delegateTotalReward}</div>
          <div className="deleRewardRate">Reward Rate:</div>
          <div className="deleRewardRateValue">{this.state.delegateRewardRate}</div>
        </div>
      </div>
    );
  }
}

export default App;
