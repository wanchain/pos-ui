import React, { Component } from 'react';
import './rewardMiner.css';
import $ from 'jquery';
import { message, Statistic } from 'antd';



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


    let amount = this.delegateAmount.value
    let locktime = this.delegateLockTime.value
    let feerate = this.delegateFeeRate.value

    if (locktime < 7 || locktime > 90) {
      message.error('Lock Time value must in range [7 ~ 90]');
      return
    }

    if (amount <= 0) {
      message.error("Amount must > 0")
      return
    }

    if (feerate < 0 || feerate > 100) {
      message.error('Fee Rate value must in range [0 ~ 100]');
      return
    }

    this.setState({
      delegateTotalReward: 'Waiting',
      delegateRewardRate: 'Waiting',
    })

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
        <div className="rewardTitle">Delegator Reward Estimate</div>
        <div className="rewardGrid">
          <div className="i">
            <div className="i1">Amount:</div>
            <div className="i2">Lock Time:</div>
            <div className="i3">Fee Rate:</div>
            <div className="bt"><button onClick={this.delegateCalc.bind(this)}>Calculate</button></div>
            <div className="i11"><input placeholder="Lock Amount In Wan Coins"
              ref={(input) => { this.delegateAmount = input }}
            ></input></div>
            <div className="i21"><input placeholder="Lock Time In Epochs"
            ref={(input) => { this.delegateLockTime = input }}
            ></input></div>
            <div className="i31"><input placeholder="Delegator's Fee Rate 10 (%)"
              ref={(input) => { this.delegateFeeRate = input }}

            ></input></div>
          </div>
          <div className="o">
            <Statistic title="Total Reward" value={this.state.delegateTotalReward}/>
            <Statistic title="Reward Rate" value={this.state.delegateRewardRate}/>
          </div>
        </div>
      </div>
    );
  }
}

export default RewardDelegate;