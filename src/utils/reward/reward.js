import React, { Component } from 'react';
import './reward.css';

class Reward extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
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
            <div class="bt"><button>Calculate</button></div>
            <div class="i11"><input placeholder="Lock Amount"></input></div>
            <div class="i21"><input placeholder="Lock Time"></input></div>
            <div class="i31"></div>
          </div>
          <div class="o"></div>
        </div>
      </div>
    );
  }
}

export default Reward;