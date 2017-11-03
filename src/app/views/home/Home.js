// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Control, Form, Errors, actions } from "react-redux-form";
import Dropzone from "react-dropzone";
import _ from "lodash";
import * as XLSX from "xlsx";

class Home extends Component {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.resetDataClick = this.resetDataClick.bind(this);
  }

  render() {
    const { leaderboardData, parseXLSX, history } = this.props;
    const { dataLoaded } = leaderboardData;
    return (
      <div className="col-md-8 col-md-offset-2">
        <div className="well">
          <h2>Zadání informací</h2>
          {!dataLoaded && (
            <div className="form-group">
              <Dropzone
                className="dropzone text-center"
                multiple={false}
                onDrop={files => {
                  _.map(files, file => {
                    parseXLSX(file, history);
                  });
                }}
              >
                <h2>👇</h2>
                <p>Přetáhni sem report z maturit</p>
              </Dropzone>
            </div>
          )}
          {dataLoaded && (
            <Link to="/zebricek" className="btn btn-primary btn-lg">
              Vygenerovat
            </Link>
          )}
          <button
            type="button"
            className="btn btn-danger btn-lg"
            onClick={this.resetDataClick}
          >
            Reset
          </button>
        </div>
        <pre>{JSON.stringify(this.props.leaderboardData, null, 2)}</pre>
      </div>
    );
  }
  resetDataClick() {
    this.props.resetData();
  }
}

export default Home;
