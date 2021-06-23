import React, { Component } from "react";
import MyListGroup from "./common/ListGroup";
import MyPagination from "./common/Pagination";
import { getTypes } from "../services/TypeService";
import PermissionsTable from "./PermissionsTable";
import { paginate } from "../services/PaginateService";
import _ from "lodash";
import axios from "axios";
import SearchBox from "./SearchBox";
import { toast } from "react-toastify";
import backend from "../config";

export default class Dashboard extends Component {
  state = {
    permissions: [],
    types: [],
    currentPage: 1,
    pageSize: 3,
    searchQuery: "",
    sortColumn: { path: "date_created", order: "desc" },
  };

  componentDidMount() {
    if (localStorage.getItem("uid") != null) {
      var data = "";

      var config = {
        method: "get",
        url: backend + "/police/get-compliants/",
        data: data,
      };

      axios(config)
        .then((response) => {
          if (response.data != null) {
            const types = [{ _id: "", name: "All Compliants" }, ...getTypes()];
            this.setState({ permissions: response.data, types });
          }
        })
        .catch((error) => {
          toast.error("Something went wrong !!");
        });
    } else {
      const types = [{ _id: "", name: "All Compliants" }, ...getTypes()];
      this.setState({ permissions: [], types });
    }
  }

  handleTypeSelect = (type) => {
    this.setState({ selectedType: type, searchQuery: "", currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = (permission) => {
    const permissions = this.state.permissions.filter(
      (p) => p.date_created !== permission.date_created
    );
    this.setState({ permissions });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedType: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedType,
      searchQuery,
      permissions: allPermissions,
    } = this.state;

    let filtered = allPermissions;
    if (searchQuery)
      filtered = allPermissions.filter((p) =>
        p.uid.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedType && selectedType._id)
      filtered = allPermissions.filter((p) => p.category === selectedType.name);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const permissions = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: permissions };
  };

  render() {
    const { length: count } = this.state.permissions;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: permissions } = this.getPagedData();

    if (count === 0)
      return (
        <p className="text-secondary">Loading Permissions from database...</p>
      );

    return (
      <div className="row">
        <div className="col-md">
          <MyListGroup
            types={this.state.types}
            selectedType={this.state.selectedType}
            onTypeSelect={this.handleTypeSelect}
          />
        </div>
        <div className={"col-md-9"}>
          <p className={"text-white"}>
            Showing all {totalCount} Permissions in the Database.
          </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <PermissionsTable
            permissions={permissions}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <MyPagination
            totalCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }
}
