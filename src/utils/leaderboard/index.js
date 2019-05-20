import React, { Component } from 'react';
import './index.css';
import $ from 'jquery';
import { Table } from 'antd';



class LeaderBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leaderBoard: []
    }
  }

  getLeaderBoard() {
    this.serverRequest = $.get(window.serverUrl + 'stakerInfo', function (result) {
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
    dataIndex: 'address',
    key: 'address',
  }, {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  }, {
    title: 'Start Epoch',
    dataIndex: 'stakingEpoch',
    key: 'stakingEpoch',
    sorter: (a, b) => a.stakingEpoch - b.stakingEpoch,
  }, {
    title: 'Lock Epoch',
    dataIndex: 'lockEpochs',
    key: 'lockEpochs',
    sorter: (a, b) => a.lockEpochs - b.lockEpochs,
  }, {
    title: 'Next Lock',
    dataIndex: 'nextLockEpochs',
    key: 'nextLockEpochs',
    sorter: (a, b) => a.nextLockEpochs - b.nextLockEpochs,
  }, {
    title: 'Fee Rate',
    dataIndex: 'feeRate',
    key: 'feeRate',
    sorter: (a, b) => a.feeRate - b.feeRate,
  }, {
    title: 'Delegators',
    dataIndex: 'delegators',
    key: 'delegators',
    sorter: (a, b) => a.delegators - b.delegators,
  }, {
    title: 'Delegate Percent',
    dataIndex: 'delegatePercent',
    key: 'delegatePercent',
    sorter: (a, b) => {
      var a0 = Number(a.delegatePercent.slice(0,a.delegatePercent.length-1)) 
      var b0 = Number(b.delegatePercent.slice(0,b.delegatePercent.length-1))
      return a0 - b0
    },
  }];

  render() {
    const snap = this.state.leaderBoard.slice(0, this.state.leaderBoard.length)

    const items = snap.map((value, index) => {
      let delegateAmount = 0
      for (let i = 0; i < value.clients.length; i++) {
        delegateAmount += Number(value.clients[i].amount);
      }
      //delegateAmount /= 1e18;
      let delePercent = delegateAmount * 100 / (value.amount * 5)

      value.delegators = value.clients.length
      value.delegatePercent = delePercent.toFixed(0) + '%'

      let parnterAmount = 0
      for (let i = 0; i < value.partners.length; i++) {
        parnterAmount += Number(value.partners[i].amount);
      }
      value.amount =Number(value.amount) + Number(parnterAmount)
      value.key = index
      return value
    })


    return (
      <div className="LeaderBoard">
        <div className="LeaderBoardTitle">Validator List</div>
        <div className="LeaderBoardBody">
          <Table dataSource={items} 
          columns={this.columns} 
          size="small" 
          ></Table>
        </div>
      </div>
    );
  }
}


export default LeaderBoard;