import React, { Component } from "react";
import MyTable from "./common/MyTable";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash } from "@fortawesome/free-solid-svg-icons";

class PermissionsTable extends Component {
  columns = [
    {
      path: "uid",
      label: "Aadhaar No.",
      content: (permission) => (
        <Link
          to={{
            pathname: `/dashboard/${permission.id}`,
            state: { permission },
          }}
          permission={permission}
        >
          {permission.uid}
        </Link>
      ),
    },
    { path: "name", label: "Name" },
    { path: "mobile", label: "Mobile" },
    
    // { path: "email", label: "Email" },
    { path: "status", label: "Status" },
    { path: "district", label: "District" },
    { path: "place", label: "Incident Place" },
    {
      key: "Delete",
      content: (permission) => (
        <div>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            className="text-danger"
            icon={faTrash}
            title="trash"
            onClick={() => this.props.onDelete(permission)}
          ></FontAwesomeIcon>
          <br />
          <br />
          {permission.status === "accepted" ? (
            <span className="text-success text-center" title="accepted">
              <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
            </span>
          ) : null}
        </div>
      ),
    },
  ];

  render() {
    const { permissions, onSort, sortColumn } = this.props;

    return (
      <MyTable
        columns={this.columns}
        data={permissions}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default PermissionsTable;
