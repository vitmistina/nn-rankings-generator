import _ from "lodash";

const PARSE_DATA = "PARSE_DATA";
const RESET_DATA = "RESET_DATA";

const initialState = {
  top70Production: [],
  top10Meetings: [],
  topUMsPercentage: [],
  timeline: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PARSE_DATA:
      return Object.assign({}, state, {
        top70Production: action.top70Production,
        top10Meetings: action.top10Meetings,
        topUMsPercentage: action.topUMsPercentage,
        timeline: action.timeline
      });
    case RESET_DATA:
      return Object.assign({}, initialState);
    default:
      return state;
  }
}

export function parseData(form, history) {
  return dispatch => {
    dispatch({
      type: PARSE_DATA,
      top70Production: _.compact(
        _.map(
          _.slice(_.tail(_.split(form.top70Production, "\n")), 0, 70),
          row => {
            if (_.size(row) > 0) {
              const parsedRow = _.split(row, "\t");
              return {
                posun: null,
                agentura: _.nth(parsedRow, 0).substring(0, 2),
                jmeno: _.nth(parsedRow, 1),
                produkce: _.nth(parsedRow, 2)
              };
            }
            return null;
          }
        )
      ),
      top10Meetings: _.compact(
        _.map(_.tail(_.split(form.top10Meetings, "\n")), row => {
          if (_.size(row) > 0) {
            return {
              jmeno: row
            };
          }
          return null;
        })
      ),
      topUMsPercentage: _.compact(
        _.map(_.tail(_.split(form.topUMsPercentage, "\n")), row => {
          if (_.size(row) > 0) {
            const parsedRow = _.split(row, "\t");
            return {
              agentura: _.nth(parsedRow, 0).substring(0, 2),
              jmeno: _.nth(parsedRow, 1),
              procento: _.nth(parsedRow, 2)
            };
          }
          return null;
        })
      ),
      timeline: _.compact(
        _.map(_.tail(_.split(form.timeline, "\n")), row => {
          if (_.size(row) > 0) {
            const parsedRow = _.split(row, "\t");
            return {
              datum: _.nth(parsedRow, 0),
              produkce: _.nth(parsedRow, 1)
            };
          }
          return null;
        })
      )
    });
    dispatch(history.push("/zebricek"));
  };
}
