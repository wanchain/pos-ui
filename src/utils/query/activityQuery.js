import React, { Component } from 'react';
import '../reward/rewardMiner.css';
import $ from 'jquery';


let serverUrl = window.location.href
serverUrl = serverUrl.replace("3000", "8000")

class ActivityQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addrMine: 'N/A',
      addrEp: 'N/A',
      addrRp: 'N/A',
    }
  }


  addrActivityCheck() {
    console.log('addrActivityCheck')
    this.setState({
      addrMine: 'Waiting',
      addrEp: 'Waiting',
      addrRp: 'Waiting',
    })

    let address = this.addrAct.value
    let startepoch = this.startEpochAct.value
    let endepoch = this.endEpochAct.value

    this.serverRequest = $.get(serverUrl + 'addrActivityCheck?address=' +
      address + '&startepoch=' + startepoch + '&endepoch=' + endepoch,
      function (result) {
        console.log(result)
        this.setState({
          addrMine: result.addrMine,
          addrEp: result.addrEp,
          addrRp: result.addrRp,
        });
      }.bind(this));
  }

  render() {
    return (
      <div className="Reward">
        <div class="rewardTitle">Account's Working Activity Query</div>
        <div class="rewardGrid">
          <div class="i">
            <div class="i1">Address:</div>
            <div class="i2">Start Epoch:</div>
            <div class="i3">End Epoch:</div>
            <div class="bt"><button onClick={this.addrActivityCheck.bind(this)}>Calculate</button></div>
            <div class="i11"><input placeholder="Amount Address"
            ref={(input) => { this.addrAct = input }}
            
            ></input></div>
            <div class="i21"><input placeholder="Start Epoch"
            ref={(input) => { this.startEpochAct = input }}
            
            ></input></div>
            <div class="i31"><input placeholder="End Epoch"
            ref={(input) => { this.endEpochAct = input }}
            
            ></input></div>
          </div>
          <div class="o">{JSON.stringify(this.state, null, 4)}</div>
        </div>
      </div>
    );
  }
}

export default ActivityQuery;