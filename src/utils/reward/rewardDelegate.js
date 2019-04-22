import React, { Component } from 'react';
import './rewardMiner.css';

class RewardDelegate extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="Reward">
        <div class="rewardTitle">Miner Reward Estimate</div>
        <div class="rewardGrid">
          <div class="i">
            <div class="i1">Amount:</div>
            <div class="i2">Lock Time:</div>
            <div class="i3">Fee Rate:</div>
            <div class="bt"><button>Calculate</button></div>
            <div class="i11"><input placeholder="Lock Amount In Wan Coins"></input></div>
            <div class="i21"><input placeholder="Lock Time In Epochs"></input></div>
            <div class="i31"><input placeholder="Delegator's Fee Rate 10 (%)"></input></div>
          </div>
          <div class="o"></div>
        </div>
      </div>
    );
  }
}

export default RewardDelegate;