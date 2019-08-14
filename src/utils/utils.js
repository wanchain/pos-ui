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
        <p>In the calculator below, the values are estimated and may differ from the actual values.</p>
        <p>these are dynamic estimates which can change at any time according to behaviors of other participants.</p>
        <p>Because of the probability, Rewards are only close to our estimates value when they work long days.</p>
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
