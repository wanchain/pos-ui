import React, { Component } from 'react';
import './board.css';
import $ from 'jquery';
import { Statistic } from 'antd';



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
        <div className="blkNoValue"><Statistic title="Block Number" value={this.state.blockNumber} /></div>
        <div className="totalstkValue"><Statistic title="Total Stake" value={this.state.totalStake} /></div>
        <div className="everagetValue"><Statistic title="Average Reward" value={(this.state.yearReward * 100 / this.state.totalStake).toFixed(2) + '%'} /></div>
        <div className="minerCntValue"><Statistic title="Validator" value={this.state.minerCount} /></div>
        <div className="delegatorCntValue"><Statistic title="Delegate" value={this.state.delegatorCount} /></div>
        <div className="delegatePartCntValue"><Statistic title="Delegator" value={this.state.delePartiCnt} /></div>
        <div className="epochID"><Statistic title="Epoch ID" value={this.state.epochID} /></div>
        <div className="slotID"><Statistic title="Slot ID" value={this.state.slotID} /></div>
        <div className="epochPercent"><Statistic title="Epoch Percent" value={this.state.epochPercent + '%'}/></div>
        {/* <div className="curEpochTimeValue"><Statistic title="Current Epoch Start" value={(new Date(this.state.curEpochStartTime*1000)).toLocaleString()} /></div> */}
        {/* <div className="nextEpochTimeValue"><Statistic title="Next Epoch Start" value={(new Date(this.state.nextEpochStartTime*1000)).toLocaleString()} /></div> */}
        <div className="sbkV"><Statistic title="Stable Block" value={this.state.stableBlock} /></div>
      </div>
    );
  }
}

export default Board;