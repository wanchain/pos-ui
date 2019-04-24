import React, { Component } from 'react';
import '../reward/rewardMiner.css';
import $ from 'jquery';


let serverUrl = window.location.href
serverUrl = serverUrl.replace("3000", "8000")

class UserHistoryQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workingEpoch: 'N/A',
      disworkingEpoch: 'N/A',
    }
  }

  addrWorkingHistoryQuery() {
    console.log('addrWorkingHistoryQuery')
    this.setState({
      workingEpoch: 'Waiting',
      disworkingEpoch: 'Waiting',
    })

    let address = this.addr.value
    let startepoch = this.startEpoch.value
    let endepoch = this.endEpoch.value

    this.serverRequest = $.get(serverUrl + 'workingHistoryQuery?address=' +
      address + '&startepoch=' + startepoch + '&endepoch=' + endepoch,
      function (result) {
        console.log(result)
        this.setState({
          workingEpoch: result.workingEpoch,
          disworkingEpoch: result.disworkingEpoch,
        });
      }.bind(this));
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
            <div class="bt"><button onClick={this.addrWorkingHistoryQuery.bind(this)}>Calculate</button></div>
            <div class="i11"><input placeholder="Account Address"
            ref={(input) => { this.addr = input }}
            
            ></input></div>
            <div class="i21"><input placeholder="Query Start Epoch"
            ref={(input) => { this.startEpoch = input }}
            
            ></input></div>
            <div class="i31"><input placeholder="Query End Epoch"
            ref={(input) => { this.endEpoch = input }}
            
            ></input></div>
          </div>
          <div class="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default UserHistoryQuery;