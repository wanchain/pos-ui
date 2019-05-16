import React, { Component } from 'react';
import './rewardMiner.css';
import $ from 'jquery';
import { message } from 'antd';

class Reward extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minerTotalReward: 'N/A',
      minerRewardRate: 'N/A',
    }
  }

  minerCalc() {
    console.log('minerCalc')


    let amount = this.minerLockAmount.value
    let locktime = this.minerLockTime.value

    if (locktime < 7 || locktime > 90) {
      message.error('Lock Time value must in range [7 ~ 90]');
      return
    }

    if (amount <= 0) {
      message.error("Amount must > 0")
      return
    }

    this.setState({
      minerTotalReward: 'Waiting',
      minerRewardRate: 'Waiting',
    })

    this.serverRequest = $.get(window.serverUrl + 'minerCalc?amount=' + amount + '&locktime=' + locktime,
      function (result) {
        console.log(result)
        if (result["minerTotalReward"] === undefined) {
          this.setState({
            minerTotalReward: 'No found',
            minerRewardRate: 'No found',
          })
          return
        }
        this.setState({
          minerTotalReward: result.minerTotalReward.toFixed(2),
          minerRewardRate: result.minerRewardRate.toFixed(2) + '%',
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="Reward">
        <div className="rewardTitle">Validator Reward Estimate</div>
        <div className="rewardGrid">
          <div className="i">
            <div className="i1">Amount:</div>
            <div className="i2">Lock Time:</div>
            <div className="i3"></div>
            <div className="bt"><button onClick={this.minerCalc.bind(this)}>Calculate</button></div>
            <div className="i11">
              <input placeholder="Lock Amount In Wan Coins"
                ref={(input) => { this.minerLockAmount = input }}
              ></input></div>
            <div className="i21"><input placeholder="Lock Time In Epochs"
              ref={(input) => { this.minerLockTime = input }}
            ></input></div>
            <div className="i31"></div>
          </div>
          <div className="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default Reward;