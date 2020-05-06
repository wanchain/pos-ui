import React, { Component } from 'react';
import './title.css';
import {Tag} from 'antd';

class Title extends Component {
  render() {
    return (
      <div className="title">
        <div>Wanchain PoS Calculator</div>
        {/* <Tag color="#2db7f5" className="tags">Testnet</Tag> */}
        <Tag color="#2db7f5" className="tags">Mainnet</Tag>

      </div>
    );
  }
}

export default Title
