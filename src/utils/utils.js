import React, { Component } from 'react';
import './utils.css';
import Reward from './reward/reward'

class Utils extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="Utils">
        <Reward />
      </div>
    );
  }
}

export default Utils;