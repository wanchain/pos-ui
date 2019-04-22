import React, { Component } from 'react';
import '../reward/rewardMiner.css';

class UserHistoryQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="Reward">
        <div class="rewardTitle">Account's All Working History Query</div>
        <div class="rewardGrid">
          <div class="i">
            <div class="i1">Address:</div>
            <div class="i2">Start Epoch:</div>
            <div class="i3">End Epoch:</div>
            <div class="bt"><button>Calculate</button></div>
            <div class="i11"><input placeholder="Amount Address"></input></div>
            <div class="i21"><input placeholder="Query Start Epoch"></input></div>
            <div class="i31"><input placeholder="Query End Epoch"></input></div>
          </div>
          <div class="o"></div>
        </div>
      </div>
    );
  }
}

export default UserHistoryQuery;