// @flow weak

import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavigationBar, BackToTop } from "../../components";
import navigationModel from "../../config/navigation.json";
import MainRoutes from "../../routes/MainRoutes";

class App extends Component {
  static propTypes = {
    // react-router 4:
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    // views:
    currentView: PropTypes.string
  };

  state = {
    navModel: navigationModel
  };

  render() {
    const { navModel } = this.state;

    return (
      <div id="appContainer">
        <div className="container">
          <div className="clearfix main-container">
            <MainRoutes />
          </div>
        </div>
      </div>
    );
  }

  handleLeftNavItemClick = (event, viewName) => {
    // something to do here?
  };

  handleRightNavItemClick = (event, viewName) => {
    // something to do here?
  };
}

export default App;
