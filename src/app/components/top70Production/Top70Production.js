import React, { PureComponent } from "react";
import { AgencyLabel } from "../../components";
import PropTypes from "prop-types";
import _ from "lodash";

export default class Top70Production extends PureComponent {
  render() {
    const { top70Production } = this.props;
    return (
      <div className="col-md-12">
        <h2 className="">
          Soutěž o 70 CCS karet dle objemu převedených prostředků
        </h2>
        {_.chunk(
          top70Production,
          _.ceil(_.size(top70Production) / 3)
        ).map((column, columnIndex) => {
          return (
            <div className="col-md-4">
              <table className="table table-responsive table--stripped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Agentura</th>
                    <th>Jméno</th>
                    <th>Výsledek</th>
                  </tr>
                </thead>
                <tbody>
                  {column.map((agent, index) => {
                    return (
                      <tr
                        key={
                          index +
                          columnIndex * _.ceil(_.size(top70Production) / 3)
                        }
                      >
                        <td>
                          {index +
                            1 +
                            columnIndex * _.ceil(_.size(top70Production) / 3)}
                        </td>
                        <td>
                          <AgencyLabel data={agent.agentura} />
                        </td>
                        <td>{agent.jmeno}</td>
                        <td className="text-right">{agent.produkce}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  }
}

Top70Production.propTypes = {
  // top70Production: PropTypes.Array.isRequired
};
