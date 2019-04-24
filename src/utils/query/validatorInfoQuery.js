import React, { Component } from 'react';
import '../reward/rewardMiner.css';
import $ from 'jquery';


let serverUrl = window.location.href
serverUrl = serverUrl.replace("3000", "8000")

class ValidatorInfoQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Address: "N/A",
      Amount: 0,
      Clients: [],
      FeeRate: 0,
      LockEpochs: 0,
      StakingEpoch: 0
    }
  }

  validatorInfoQuery() {
    console.log('addrWorkingHistoryQuery')
    this.setState({
      Address: "Waiting",
      Amount: 0,
      Clients: [],
      FeeRate: 0,
      LockEpochs: 0,
      StakingEpoch: 0
    })

    let address = this.addr.value

    this.serverRequest = $.get(serverUrl + 'validatorInfo?address=' +
      address,
      function (result) {
        console.log(result)
        this.setState(result);
      }.bind(this));
  }

  render() {
    return (
      <div className="Reward">
        <div class="rewardTitle">Validator Info Query</div>
        <div class="rewardGrid">
          <div class="i">
            <div class="i1">Address:</div>
            <div class="i2"></div>
            <div class="i3"></div>
            <div class="bt"><button onClick={this.validatorInfoQuery.bind(this)}>Calculate</button></div>
            <div class="i11"><input placeholder="Validator Address"
              ref={(input) => { this.addr = input }}
            ></input></div>
            <div class="i21"></div>
            <div class="i31"></div>
          </div>
          <div class="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default ValidatorInfoQuery;