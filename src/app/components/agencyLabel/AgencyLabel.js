import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

export default class AgencyLabel extends Component {
  render() {
    const { data } = this.props;
    const model = {
      15: "rgb(164,204,234)",
      37: "rgb(124,170,214)",
      40: "rgb(83,137,194)",
      50: "rgb(200,205,46)",
      54: "rgb(150,180,67)",
      60: "rgb(91,152,83)",
      80: "rgb(198,191,224)",
      85: "rgb(156,145,198)",
      90: "rgb(112,108,176)",
      96: "rgb(234,101,13)"
    };
    return (
      <span className="label" style={{ backgroundColor: _.get(model, data) }}>
        {data}
      </span>
    );
  }
}

AgencyLabel.propTypes = {
  data: PropTypes.string.isRequired
};
