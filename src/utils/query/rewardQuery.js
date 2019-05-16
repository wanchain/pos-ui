import React, { Component } from 'react';
import '../reward/rewardMiner.css';
import $ from 'jquery';
import { message } from 'antd';



class RewardQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addrReward: 'N/A'
    }
  }

  addrIncentiveCheck() {
    console.log('addrIncentiveCheck')
    

    let address = this.addr.value
    let startepoch = this.startEpoch.value
    let endepoch = this.endEpoch.value

    if(startepoch < 0 || endepoch < 0) {
      message.error("epoch id must >= 0")
      return
    }

    this.setState({
      addrReward: 'Waiting',
    })

    this.serverRequest = $.get(window.serverUrl + 'addrIncentiveCheck?address=' +
      address + '&startepoch=' + startepoch + '&endepoch=' + endepoch,
      function (result) {
        console.log(result)
        if(result["addrReward"] === undefined) {
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
        <div className="rewardTitle">Current Reward Query</div>
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