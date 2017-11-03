// @flow weak

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Home from "./Home";
import * as dataActions from "../../redux/modules/leaderboardData";

const mapStateToProps = state => {
  return {
    // views
    inputData: state.formData.input,
    leaderboardData: state.leaderboardData
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      parseData: dataActions.parseData,
      parseXLSX: dataActions.parseXLSX,
      resetData: dataActions.resetData
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
