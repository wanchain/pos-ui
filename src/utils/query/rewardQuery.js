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
    let endepoch = this.endEpoch.value

    this.serverRequest = $.get(serverUrl + 'addrIncentiveCheck?address=' +
      address + '&startepoch=' + startepoch + '&endepoch=' + endepoch,
      function (result) {
        console.log(result)
        if(!result) {
          this.setState({
            addrReward: 'No found',
          })
          return
        }
        this.setState({
          addrReward: result.addrReward.toFixed(2),
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="Reward">
        <div className="rewardTitle">Account's Current Reward Query</div>
        <div className="rewardGrid">
          <div className="i">
            <div className="i1">Address:</div>
            <div className="i2">Start Epoch:</div>
            <div className="i3">End Epoch:</div>
            <div className="bt"><button onClick={this.addrIncentiveCheck.bind(this)}>Calculate</button></div>
            <div className="i11"><input placeholder="Account Address"
              ref={(input) => { this.addr = input }}
            ></input></div>
            <div className="i21"><input placeholder="Start Epoch"
              ref={(input) => { this.startEpoch = input }}
            ></input></div>
            <div className="i31"><input placeholder="End Epoch"
              ref={(input) => { this.endEpoch = input }}
            ></input></div>
          </div>
          <div className="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default RewardQuery;