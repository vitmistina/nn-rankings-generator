// @flow weak

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Line as LineChart } from "react-chartjs";
import {
  Top70Production,
  Top10Meetings,
  TopUMsPercentage
} from "../../components";

class Leaderboard extends PureComponent {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <div className="col-md-12">
          <div className="col-md-12">
            <h1>
              <span className="nn-light-orange">NN</span>{" "}
              <span className="nn-medium-orange">Maturity</span>
            </h1>
          </div>
        </div>
        <div className="col-md-12">
          <Top10Meetings
            list={_.get(this.props, "leaderboardData.top10Meetings")}
          />
          <TopUMsPercentage
            list={_.get(this.props, "leaderboardData.topUMsPercentage")}
          />
        </div>
        <Top70Production
          top70Production={_.get(this.props, "leaderboardData.top70Production")}
        />
        <div className="col-md-12">
          <h2>Historie produkce</h2>
          <LineChart
            data={{
              labels: _.map(this.props.leaderboardData.timeline, datapoint => {
                return _.get(datapoint, "datum");
              }),
              datasets: [
                {
                  fillColor: "rgba(234,101,13,1)",
                  data: _.map(
                    this.props.leaderboardData.timeline,
                    datapoint => {
                      return _.get(datapoint, "produkce");
                    }
                  )
                }
              ]
            }}
            options={{
              scaleOverride: true,
              scaleSteps: 2,
              scaleStepWidth: 10000000,
              scaleStartValue: 0,
              pointDot: false
            }}
            width="1100"
            height="400"
          />
        </div>
      </div>
    );
  }
}

export default Leaderboard;
