import React, { Component } from 'react';
import '../reward/rewardMiner.css';
import $ from 'jquery';



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

    this.serverRequest = $.get(global.serverUrl + 'workingHistoryQuery?address=' +
      address + '&startepoch=' + startepoch + '&endepoch=' + endepoch,
      function (result) {
        console.log(result)
        if (result["workingEpoch"] === undefined) {
          this.setState({
            workingEpoch: 'No found',
            disworkingEpoch: 'No found',
          })
          return
        }
        this.setState({
          workingEpoch: result.workingEpoch,
          disworkingEpoch: result.disworkingEpoch,
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="Reward">
        <div className="rewardTitle">Account's All Working History Query</div>
        <div className="rewardGrid">
          <div className="i">
            <div className="i1">Address:</div>
            <div className="i2">Start Epoch:</div>
            <div className="i3">End Epoch:</div>
            <div className="bt"><button onClick={this.addrWorkingHistoryQuery.bind(this)}>Calculate</button></div>
            <div className="i11"><input placeholder="Account Address"
              ref={(input) => { this.addr = input }}

            ></input></div>
            <div className="i21"><input placeholder="Query Start Epoch"
              ref={(input) => { this.startEpoch = input }}

            ></input></div>
            <div className="i31"><input placeholder="Query End Epoch"
              ref={(input) => { this.endEpoch = input }}

            ></input></div>
          </div>
          <div className="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default UserHistoryQuery;