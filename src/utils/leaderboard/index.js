import React, { Component } from 'react';
import './index.css';
import $ from 'jquery';


console.log(window.location.href)
let serverUrl = window.location.href
serverUrl = serverUrl.replace("3000", "8000")
console.log(serverUrl)

class LeaderBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leaderBoard:[]
    }
  }

  getLeaderBoard() {
    this.serverRequest = $.get(serverUrl + 'stakerInfo', function (result) {
      console.log(result)
      if(!result) { return }
      console.log(result)
      this.setState({
        leaderBoard:result,
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

  render() {
    const snap = this.state.leaderBoard.slice(0, this.state.leaderBoard.length)
    const items = snap.map((value, index)=>{
      return (
        <li className="liGrid" key={index}>
          <div className="liAddr">Address:</div>
          <div className="liAddrValue">{value.Address}</div>
          <div className="liAmount">Amount:</div>
          <div className="liAmountValue">{value.Amount}</div>
          <div className="liStartEpoch">Start Epoch:</div>
          <div className="liStartEpochValue">{value.StakingEpoch}</div> 
          <div className="liEndEpoch">End Epoch:</div>
          <div className="liEndEpochValue">{(value.StakingEpoch + value.LockEpochs)}</div>
        </li>
      );
    })

    return (
      <div className="LeaderBoard">
        <div className="LeaderBoardTitle">Leader Board</div>
        <ul>{items}</ul>
      </div>
    );
  }
}


export default LeaderBoard;