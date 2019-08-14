import React, { Component } from 'react';
import './utils.css';
import RewardMiner from './reward/rewardMiner'
import RewardDelegate from './reward/rewardDelegate'
import RewardQuery from './query/rewardQuery'
import ActivityQuery from './query/activityQuery'
import UserHistoryQuery from './query/userHistoryQuery'
import ValidatorInfoQuery from './query/validatorInfoQuery'
import LeaderBoard from './leaderboard'

class Utils extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="Utils">
        <LeaderBoard />
        <p></p>
        <p>In the calculators below, the values are dynamic estimates of future values based on the current available date. </p>
        <p>The actual future values may differ from these estimates due to the behavior of other participants in the staking ecosystem. </p>
        <p>Due to this, estimates may be less accurate over longer periods of time.</p>
        <RewardMiner />
        <RewardDelegate />
        <RewardQuery />
        <ActivityQuery />
        <UserHistoryQuery />
        <ValidatorInfoQuery />
      </div>
    );
  }
}

export default Utils;
