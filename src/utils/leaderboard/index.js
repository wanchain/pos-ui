import React, { Component } from 'react';
import './index.css';
import $ from 'jquery';
import { Table } from 'antd';


console.log(window.location.href)
let serverUrl = window.location.href
serverUrl = serverUrl.replace("3000", "8000")
console.log(serverUrl)

class LeaderBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leaderBoard: []
    }
  }

  getLeaderBoard() {
    this.serverRequest = $.get(serverUrl + 'stakerInfo', function (result) {
      console.log(result)
      if (!result) { return }
      console.log(result)
      this.setState({
        leaderBoard: result,
      })
    }.bind(this));
  }

  componentDidMount() {
    this.getLeaderBoard()
    this.timer = setInterval(this.getLeaderBoard.bind(this), 5000, null)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  columns = [{
    title: 'Address',
    dataIndex: 'Address',
    key: 'Address',
  }, {
    title: 'Amount',
    dataIndex: 'Amount',
    key: 'Amount',
  }, {
    title: 'Start Epoch',
    dataIndex: 'StakingEpoch',
    key: 'StakingEpoch',
  }, {
    title: 'Lock Epoch',
    dataIndex: 'LockEpochs',
    key: 'LockEpochs',
  }, {
    title: 'Next Lock',
    dataIndex: 'NextLockEpochs',
    key: 'NextLockEpochs',
  }, {
    title: 'Fee Rate',
    dataIndex: 'FeeRate',
    key: 'FeeRate',
  }, {
    title: 'Delegators',
    dataIndex: 'Delegators',
    key: 'Delegators',
  }, {
    title: 'Delegate Percent',
    dataIndex: 'DelegatePercent',
    key: 'DelegatePercent',
  }];

  render() {
    const snap = this.state.leaderBoard.slice(0, this.state.leaderBoard.length)
    if (snap != undefined && snap.length == 0) {

      this.items = snap.map((value, index) => {
        let delegateAmount = 0
        for (let i = 0; i < value.Clients.length; i++) {
          delegateAmount += value.Clients[i].Amount;
        }
        delegateAmount /= 1e18;
        let delePercent = delegateAmount * 100 / (value.Amount * 5)

        value.Delegators = value.Clients.length
        value.DelegatePercent = delePercent.toFixed(0) + '%'

        return value
      })
    } else {
      this.items = undefined
    }

    return (
      <div className="LeaderBoard">
        <div className="LeaderBoardTitle">All Validators</div>
        <div className="LeaderBoardBody">
          <Table dataSource={this.items} columns={this.columns}></Table>
        </div>
      </div>
    );
  }
}


export default LeaderBoard;