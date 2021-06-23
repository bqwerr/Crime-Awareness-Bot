import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    if (column.path === "date_created") {
      let date = _.get(item, column.path);
      date = new Date(date * 1000).toString();
      let idx = date.indexOf("GMT");
      return date.substring(0, idx);
    }
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.date_created + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item.uid}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
