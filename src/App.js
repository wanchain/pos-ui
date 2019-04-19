import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

import Board from './board.js'

console.log(window.location.href)

let serverUrl = window.location.href
serverUrl = serverUrl.replace("3000", "8000")

console.log(serverUrl)

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
      addrReward: 'N/A',
      epochID: 0,
      slotID: 0,
      epochPercent: 'N/A',
      addrMine: 'N/A',
      addrEp: 'N/A',
      addrRp: 'N/A',
      yearReward: 0,
    }

    
  }

  getInfo() {
    this.serverRequest = $.get(serverUrl + 'info', function (result) {
      console.log(result)
      if(!result["blockNumber"]) { return }
      this.setState({
        blockNumber: result.blockNumber,
        totalStake: result.totalStake,
        minerCount: result.minerCount,
        delegatorCount: result.delegatorCount,
        delePartiCnt: result.delePartiCnt,
        epochID: result.epochID,
        slotID: result.slotID,
        epochPercent: result.epochPercent.toFixed(2),
        yearReward: result.yearReward,
      });
    }.bind(this));
  }

  componentDidMount() {
    this.getInfo()
    this.timer = setInterval(this.getInfo.bind(this), 1000, null)
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

  addrIncentiveCheck() {
    console.log('addrIncentiveCheck')
    this.setState({
      addrReward: 'Waiting',
    })

    let address = this.addr.value
    let startepoch = this.startEpoch.value
    let endepoch = this.endEpoch.value

    this.serverRequest = $.get(serverUrl + 'addrIncentiveCheck?address=' +
      address + '&startepoch=' + startepoch + '&endepoch=' + endepoch,
      function (result) {
        console.log(result)
        this.setState({
          addrReward: result.addrReward.toFixed(2),
        });
      }.bind(this));
  }

  addrActivityCheck() {
    console.log('addrActivityCheck')
    this.setState({
      addrMine: 'Waiting',
      addrEp: 'Waiting',
      addrRp: 'Waiting',
    })

    let address = this.addrAct.value
    let startepoch = this.startEpochAct.value
    let endepoch = this.endEpochAct.value

    this.serverRequest = $.get(serverUrl + 'addrActivityCheck?address=' +
      address + '&startepoch=' + startepoch + '&endepoch=' + endepoch,
      function (result) {
        console.log(result)
        this.setState({
          addrMine: result.addrMine,
          addrEp: result.addrEp,
          addrRp: result.addrRp,
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="grid-container">
        <div className="title">Wanchain POS Incentive Calculator</div>
        <Board className="board"/>
        <div className="calculateMinerTitle">Miner reward calculate:</div>
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
        <div className="calculateDelegatorTitle">Delegate reward calculate:</div>
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

        <div className="addrIncentiveTitle">Address Incentive Check:</div>
        <div className="addrIncentive">
          <div className="inputAddress">
            <input placeholder="Your Address"
              ref={(input) => { this.addr = input }}
            /></div>
          <div className="inputStartEpoch">
            <input placeholder="Start Epoch"
              ref={(input) => { this.startEpoch = input }}
            /></div>
          <div className="inputEndEpoch">
            <input placeholder="End Epoch"
              ref={(input) => { this.endEpoch = input }}
            /></div>
          <div className="addrButton">
            <button onClick={this.addrIncentiveCheck.bind(this)}>Check Incentive</button></div>
          <div className="addrReward">Total Reward:</div>
          <div className="addrRewardValue">{this.state.addrReward}</div>
        </div>

        <div className="addrActivityTitle">Address Activity Check:</div>
        <div className="addrActivity">
          <div className="actAddress">
            <input placeholder="Your Address"
              ref={(input) => { this.addrAct = input }}
            /></div>
          <div className="actStartEpoch">
            <input placeholder="Start Epoch"
              ref={(input) => { this.startEpochAct = input }}
            /></div>
          <div className="actEndEpoch">
            <input placeholder="End Epoch"
              ref={(input) => { this.endEpochAct = input }}
            /></div>
          <div className="actButton">
            <button onClick={this.addrActivityCheck.bind(this)}>Check Activity</button></div>
          <div className="actMine">Total Mine:</div>
          <div className="actMineValue">{this.state.addrMine}</div>
          <div className="actEp">Ep / Rp:</div>
          <div className="actEpValue">{this.state.addrEp} / {this.state.addrRp}</div>
        </div>
      </div>
    );
  }
}

export default App;
