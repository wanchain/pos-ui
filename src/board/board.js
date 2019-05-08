import React, { Component } from 'react';
import './board.css';
import $ from 'jquery';



class Board extends Component {
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
      yearReward: 0,
      curEpochStartTime: 0,
      nextEpochStartTime: 0,
    }
  }

  getInfo() {
    console.log("getInfo called")
    this.serverRequest = $.get((window.serverUrl + 'info'), function(result) {
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
        curEpochStartTime: result.curEpochStartTime,
        nextEpochStartTime: result.nextEpochStartTime,
        stableBlock: result.stableBlock,
      });
    }.bind(this));
  }

  componentDidMount() {
    console.log("componentDidMount")
    this.getInfo()
    this.timer = setInterval(this.getInfo.bind(this), 5000, null)
  }

  componentWillUnmount() {
    console.log("componentWillUnmount")
    clearInterval(this.timer)
    this.serverRequest.abort();
  }

  render() {
    return (
      <div className="Board">
        <div className="blkN0Title">Block Number:</div>
        <div className="blkNoValue">{this.state.blockNumber}</div>
        <div className="totalstkTitle">Total Stake:</div>
        <div className="totalstkValue">{this.state.totalStake}</div>
        <div className="everageTitle">Average Reward:</div>
        <div className="everagetValue">{(this.state.yearReward * 100 / this.state.totalStake).toFixed(2)}%</div>
        <div className="minerCntTitle">Validator Count:</div>
        <div className="minerCntValue">{this.state.minerCount}</div>
        <div className="delegatorCntTitle">Delegate Validator Count:</div>
        <div className="delegatorCntValue">{this.state.delegatorCount}</div>
        <div className="delegatePartCntTitle">Delegator Count:</div>
        <div className="delegatePartCntValue">{this.state.delePartiCnt}</div>
        <div className="epochIDTitle">Current Epoch ID:</div>
        <div className="epochID">{this.state.epochID}</div>
        <div className="slotIDTitle">Current Slot ID:</div>
        <div className="slotID">{this.state.slotID}</div>
        <div className="epochPercentTitle">Epoch Percent:</div>
        <div className="epochPercent">{this.state.epochPercent}%</div>
        <div className="curEpochTime">Current Epoch Start:</div>
        <div className="curEpochTimeValue">{(new Date(this.state.curEpochStartTime*1000)).toLocaleString()}</div>
        <div className="nextEpochTime">Next Epoch Start:</div>
        <div className="nextEpochTimeValue">{(new Date(this.state.nextEpochStartTime*1000)).toLocaleString()}</div>
        <div className="sbkT">Stable Block:</div>
        <div className="sbkV">{this.state.stableBlock}</div>
      </div>
    );
  }
}

export default Board;