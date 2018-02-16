import _ from "lodash";
import * as XLSX from "xlsx";

const PARSE_DATA = "PARSE_DATA";
const RESET_DATA = "RESET_DATA";

const initialState = {
  top70Production: [],
  top10Meetings: [],
  topUMsPercentage: [],
  timeline: [],
  dataLoaded: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PARSE_DATA:
      return Object.assign({}, state, {
        top70Production: action.top70Production,
        top10Meetings: action.top10Meetings,
        topUMsPercentage: action.topUMsPercentage,
        timeline: action.timeline,
        dataLoaded: true
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

export function parseXLSX(file, history) {
  return dispatch => {
    const reader = new FileReader();
    reader.onload = () => {
      const wb = XLSX.read(reader.result, { type: "binary" });
      const unityDetail = _.filter(
        XLSX.utils.sheet_to_json(wb.Sheets["Unity_detail"], {
          range: 4
        }),
        row => {
          return _.size(row) > 0;
        }
      );

      const poradciDetail = _.filter(
        XLSX.utils.sheet_to_json(wb.Sheets["Poradci_detail"], {
          range: 4
        }),
        row => {
          return _.size(row) > 0;
        }
      );

      const topUMsPercentageSource = _.reverse(
        _.sortBy(unityDetail, row => {
          const uspesnost = new Number(
            _.get(row, "Úspěšnost Kč").replace(/[^0-9$.,]/g, "")
          );
          return uspesnost;
        })
      );

      const topUMsPercentage = _.map(topUMsPercentageSource, row => {
        return {
          agentura: _.get(row, "Agentura").substring(0, 2),
          jmeno: _.get(row, "UNIT_MANAGER"),
          procento: new Number(
            _.get(row, "Úspěšnost Kč").replace(/[^0-9$.,]/g, "")
          ).toLocaleString("cs-CZ", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
          })
        };
      });

      const top70Production = poradciDetail
        .map(row => {
          return {
            ...row,
            "Skutečná produkce NNIP": new Number(
              row["Skutečná produkce NNIP"].replace(/[^0-9$.]/g, "")
            )
          };
        })
        .filter(row => row["Skutečná produkce NNIP"] > 0)
        .sort(
          (a, b) =>
            a["Skutečná produkce NNIP"] < b["Skutečná produkce NNIP"] ? 1 : -1
        )
        .slice(0, 70)
        .map(
          row =>
            new Object({
              agentura: _.get(row, "Agentura").substring(0, 2),
              jmeno: _.get(row, "PORADCE"),
              produkce: _.get(row, "Skutečná produkce NNIP").toLocaleString(
                "cs-CZ",
                {
                  style: "currency",
                  currency: "CZK",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }
              )
            })
        );

      const top10MeetingSource = _.reverse(
        _.sortBy(
          _.sortBy(poradciDetail, row => {
            const produkce = new Number(
              _.get(row, "Úspěšnost Kč").replace(/[^0-9$.,]/g, "")
            );
            return produkce;
          }),
          row => {
            const pocetPrilezitosti = new Number(_.get(row, "Počet maturit"));
            const pocetUzavrenych = new Number(_.get(row, "Lead ukončen"));
            const uspesnost = pocetUzavrenych / pocetPrilezitosti;
            return uspesnost;
          }
        )
      );

      const top10Meetings = _.slice(
        _.map(top10MeetingSource, row => {
          return {
            jmeno: _.get(row, "PORADCE")
          };
        }),
        0,
        10
      );

      dispatch({
        type: PARSE_DATA,
        top70Production: top70Production,
        topUMsPercentage: topUMsPercentage,
        top10Meetings: top10Meetings
      });

      // history.push("/zebricek");
    };
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");

    reader.readAsBinaryString(file);
  };
}

export function resetData() {
  return dispatch => {
    dispatch({ type: RESET_DATA });
  };
}
