import React, { Component } from 'react';
import './rewardMiner.css';
import $ from 'jquery';


let serverUrl = window.location.href
serverUrl = serverUrl.replace("3000", "8000")

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
    this.setState({
      minerTotalReward: 'Waiting',
      minerRewardRate: 'Waiting',
    })

    let amount = this.minerLockAmount.value
    let locktime = this.minerLockTime.value

    this.serverRequest = $.get(serverUrl + 'minerCalc?amount=' + amount + '&locktime=' + locktime,
      function (result) {
        console.log(result)
        this.setState({
          minerTotalReward: result.minerTotalReward.toFixed(2),
          minerRewardRate: result.minerRewardRate.toFixed(2) + '%',
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="Reward">
        <div class="rewardTitle">Miner Reward Estimate</div>
        <div class="rewardGrid">
          <div class="i">
            <div class="i1">Amount:</div>
            <div class="i2">Lock Time:</div>
            <div class="i3"></div>
            <div class="bt"><button onClick={this.minerCalc.bind(this)}>Calculate</button></div>
            <div class="i11">
              <input placeholder="Lock Amount In Wan Coins"
                ref={(input) => { this.minerLockAmount = input }}
              ></input></div>
            <div class="i21"><input placeholder="Lock Time In Epochs"
              ref={(input) => { this.minerLockTime = input }}
            ></input></div>
            <div class="i31"></div>
          </div>
          <div class="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default Reward;