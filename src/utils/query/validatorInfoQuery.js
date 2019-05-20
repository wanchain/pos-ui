import React, { Component } from 'react';
import '../reward/rewardMiner.css';
import $ from 'jquery';


class ValidatorInfoQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: "N/A",
      amount: 0,
      clients: [],
      feeRate: 0,
      lockEpochs: 0,
      stakingEpoch: 0
    }
  }

  validatorInfoQuery() {
    console.log('addrWorkingHistoryQuery')
    this.setState({
      address: "Waiting",
      amount: 0,
      clients: [],
      feeRate: 0,
      lockEpochs: 0,
      stakingEpoch: 0
    })

    let address = this.addr.value

    this.serverRequest = $.get(window.serverUrl + 'validatorInfo?address=' +
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