import React, { Component } from 'react';
import './rewardMiner.css';
import $ from 'jquery';



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
    let locktime = 7//this.delegateLockTime.value
    let feerate = this.delegateFeeRate.value

    this.serverRequest = $.get(window.serverUrl + 'delegateCalc?amount=' +
      amount + '&locktime=' + locktime + '&feerate=' + feerate,
      function (result) {
        console.log(result)
        if (result["delegateTotalReward"] === undefined) {
          this.setState({
            delegateTotalReward: 'No found',
            delegateRewardRate: 'No found',
          })
          return
        }
        this.setState({
          delegateTotalReward: result.delegateTotalReward.toFixed(2),
          delegateRewardRate: result.delegateRewardRate.toFixed(2) + '%',
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="Reward">
        <div className="rewardTitle">Send Delegate Reward Estimate</div>
        <div className="rewardGrid">
          <div className="i">
            <div className="i1">Amount:</div>
            <div className="i2" hidden="true">Lock Time:</div>
            <div className="i2">Fee Rate:</div>
            <div className="bt"><button onClick={this.delegateCalc.bind(this)}>Calculate</button></div>
            <div className="i11"><input placeholder="Lock Amount In Wan Coins"
              ref={(input) => { this.delegateAmount = input }}
            ></input></div>
            <div className="i21" hidden="true"><input placeholder="Lock Time In Epochs"
            value="7" readOnly={true}></input></div>
            <div className="i21"><input placeholder="Delegator's Fee Rate 10 (%)"
              ref={(input) => { this.delegateFeeRate = input }}

            ></input></div>
          </div>
          <div className="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default RewardDelegate;