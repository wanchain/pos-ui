import React, { Component } from 'react';
import '../reward/rewardMiner.css';

class RewardQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="Reward">
        <div class="rewardTitle">Account's Current Reward Query</div>
        <div class="rewardGrid">
          <div class="i">
            <div class="i1">Address:</div>
            <div class="i2">Register Time:</div>
            <div class="i3">Lock Time:</div>
            <div class="bt"><button>Calculate</button></div>
            <div class="i11"><input placeholder="Amount Address"></input></div>
            <div class="i21"><input placeholder="Register Time In Epochs"></input></div>
            <div class="i31"><input placeholder="Lock Time In Epochs"></input></div>
          </div>
          <div class="o"></div>
        </div>
      </div>
    );
  }
}

export default RewardQuery;