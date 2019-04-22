import React, { Component } from 'react';
import './rewardMiner.css';
import $ from 'jquery';

let serverUrl = window.location.href
serverUrl = serverUrl.replace("3000", "8000")

class RewardDelegate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delegateTotalReward: 'N/A',
      delegateRewardRate: 'N/A',
    }
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
      <div className="Reward">
        <div class="rewardTitle">Send Delegate Reward Estimate</div>
        <div class="rewardGrid">
          <div class="i">
            <div class="i1">Amount:</div>
            <div class="i2">Lock Time:</div>
            <div class="i3">Fee Rate:</div>
            <div class="bt"><button onClick={this.delegateCalc.bind(this)}>Calculate</button></div>
            <div class="i11"><input placeholder="Lock Amount In Wan Coins"
              ref={(input) => { this.delegateAmount = input }}
            ></input></div>
            <div class="i21"><input placeholder="Lock Time In Epochs"
              ref={(input) => { this.delegateLockTime = input }}

            ></input></div>
            <div class="i31"><input placeholder="Delegator's Fee Rate 10 (%)"
              ref={(input) => { this.delegateFeeRate = input }}

            ></input></div>
          </div>
          <div class="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default RewardDelegate;