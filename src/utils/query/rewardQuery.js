import React, { Component } from 'react';
import '../reward/rewardMiner.css';
import $ from 'jquery';


let serverUrl = window.location.href
serverUrl = serverUrl.replace("3000", "8000")

class RewardQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addrReward: 'N/A'
    }
  }

  addrIncentiveCheck() {
    console.log('addrIncentiveCheck')
    this.setState({
      addrReward: 'Waiting',
    })

    let address = this.addr.value
    let startepoch = this.startEpoch.value
    let endepoch = Number(startepoch) + Number(this.lockEpoch.value) + 2

    this.serverRequest = $.get(serverUrl + 'addrIncentiveCheck?address=' +
      address + '&startepoch=' + startepoch + '&endepoch=' + endepoch,
      function (result) {
        console.log(result)
        this.setState({
          addrReward: result.addrReward.toFixed(2),
        });
      }.bind(this));
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
            <div class="bt"><button onClick={this.addrIncentiveCheck.bind(this)}>Calculate</button></div>
            <div class="i11"><input placeholder="Amount Address"
              ref={(input) => { this.addr = input }}
            ></input></div>
            <div class="i21"><input placeholder="Register Time In Epochs"
              ref={(input) => { this.startEpoch = input }}
            ></input></div>
            <div class="i31"><input placeholder="Lock Time In Epochs"
              ref={(input) => { this.lockEpoch = input }}
            ></input></div>
          </div>
          <div class="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default RewardQuery;