import React, { Component } from 'react';
import './board.css';

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="board">
        <div className="blkN0Title">Block Number:</div>
        <div className="blkNoValue">{this.state.blockNumber}</div>
        <div className="totalstkTitle">Total Stake:</div>
        <div className="totalstkValue">{this.state.totalStake}</div>
        <div className="everageTitle">Average Reward:</div>
        <div className="everagetValue">{this.state.yearReward * 100 / this.state.totalStake}%</div>
        <div className="minerCntTitle">Miner Count:</div>
        <div className="minerCntValue">{this.state.minerCount}</div>
        <div className="delegatorCntTitle">Delegator Count:</div>
        <div className="delegatorCntValue">{this.state.delegatorCount}</div>
        <div className="delegatePartCntTitle">Delegator Participant:</div>
        <div className="delegatePartCntValue">{this.state.delePartiCnt}</div>
        <div className="epochIDTitle">Current Epoch ID:</div>
        <div className="epochID">{this.state.epochID}</div>
        <div className="slotIDTitle">Current Slot ID:</div>
        <div className="slotID">{this.state.slotID}</div>
        <div className="epochPercentTitle">Epoch Percent:</div>
        <div className="epochPercent">{this.state.epochPercent}%</div>
      </div>
    );
  }
}

export default Board;