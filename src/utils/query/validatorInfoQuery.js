import React, { Component } from 'react';
import '../reward/rewardMiner.css';
import $ from 'jquery';


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

    this.serverRequest = $.get(global.serverUrl + 'validatorInfo?address=' +
      address,
      function (result) {
        console.log(result)
        if (!result) { 
          this.setState({Address: "No found"})
          return; 
        }
        this.setState(result);
      }.bind(this));
  }

  render() {
    return (
      <div className="Reward">
        <div className="rewardTitle">Validator Info Query</div>
        <div className="rewardGrid">
          <div className="i">
            <div className="i1">Address:</div>
            <div className="i2"></div>
            <div className="i3"></div>
            <div className="bt"><button onClick={this.validatorInfoQuery.bind(this)}>Calculate</button></div>
            <div className="i11"><input placeholder="Validator Address"
              ref={(input) => { this.addr = input }}
            ></input></div>
            <div className="i21"></div>
            <div className="i31"></div>
          </div>
          <div className="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default ValidatorInfoQuery;