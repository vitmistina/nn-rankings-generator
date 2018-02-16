import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./Top10Meetings.scss";

export default class Top10Meetings extends PureComponent {
  render() {
    const { list } = this.props;
    return (
      <div className="col-md-12 top-10-container">
        <h2 className="">Top 10 podle schůzkovatelnosti</h2>
        <div className="col-md-4">
          <div className="col-md-12 top-1-in-meetings">
            <div className="col-md-4">
              <img src="null" alt="obrázek TV" className="picture-tv" />
            </div>
            <div className="col-md-8">
              <span>
                1. {_.get(_.nth(_.get(this.props, "list"), 0), "jmeno")}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="col-md-12 top-3-in-meetings">
            <div className="col-md-4 text-right">
              <img src="null" alt="obrázek tabletu" className="picture-phone" />
            </div>
            <div className="col-md-8">
              <span>
                2. {_.get(_.nth(_.get(this.props, "list"), 1), "jmeno")}
              </span>
            </div>{" "}
          </div>
          <div className="col-md-12 top-3-in-meetings">
            <div className="col-md-4">
              <img
                src="null"
                alt="obrázek tabletu"
                className="picture-tablet"
              />
            </div>
            <div className="col-md-8">
              <span>
                3. {_.get(_.nth(_.get(this.props, "list"), 2), "jmeno")}
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <ol start="4">
            {_.slice(_.get(this.props, "list"), 3).map((agent, index) => {
              return <li key={index}>{agent.jmeno}</li>;
            })}
          </ol>
        </div>
      </div>
    );
  }
}

Top10Meetings.propTypes = {
  // top70Production: PropTypes.Array.isRequired
};
