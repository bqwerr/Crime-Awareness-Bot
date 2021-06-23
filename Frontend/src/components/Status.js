import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, Button, Form } from "react-bootstrap";
import backend from "../config";

export default class Status extends Component {
  state = {
    permission: [],
  };
  permission_id = React.createRef();

  handleSubmit = (e) => {
    e.preventDefault();
    const vals = {};

    var config = {
      method: "get",
      url:
        backend + "/police/get-status/" + this.permission_id.value,
      data: vals,
    };

    axios(config)
      .then((response) => {
        if (response.data != null) {
          this.setState({ permission: response.data });
        }
      })
      .catch((error) => {
        toast("Sorry, Couldn't find your Compliant");
        this.setState({ permission: [] });
      });
  };
  render() {
    const { permission } = this.state;

    return (
      <div className="col">
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            autoFocus
            className="form-control my-3"
            placeholder="Enter provided permission id.."
            defaultValue=""
            ref={(input) => (this.permission_id = input)}
          />
        </Form>
        <br />
        {permission.length === 0 ? (
          <div>
            <p className="text-danger">Please provide Valid Compliant Id</p>
            <p className="text-primary">
              Compliant id is: Aadhaar@Mobile
            </p>
          </div>
        ) : (
          <div>
            <Card className={"border border-dark bg-dark text-white"}>
              <Card.Header>
                <h3 className="text-primary">
                  Details for {permission.name}
                </h3>
                <div>
                  <strong>
                    {permission.status === "Clear" ? (
                      <div>
                        <p className="text-success">
                          Your Compliant was solved
                        </p>
                      </div>
                    ) : permission.status === "Ignored" ? (
                      <p className="text-danger">
                        Your Compliant was rejected due to Incorrect / Insufficient details
                      </p>
                    ) : permission.status === "In Touch" ? (
                      <p className="text-info">
                        Your Compliant has been seen and assigned to an Officer. Please check your mail for Officer details.
                      </p>
                    ) : (
                      <p className="text-info">
                        Your Compliant is still under validation, Once validated we will get back yo you.
                      </p>
                    )}
                  </strong>
                </div>
              </Card.Header>
              <Card.Body>
                <div className={"row"}>
                  <div className={"col-md-6"}>
                    <Card.Title>Applicant Full Name:</Card.Title>
                    <Card.Text>{permission.name}</Card.Text>
                  </div>
                  <div className={"col-md-6"}>
                    <Card.Title>Applicant Aadhaar.No:</Card.Title>
                    <Card.Text>{permission.uid}</Card.Text>
                  </div>
                </div>
                <hr />
                <div className={"row"}>
                  <div className={"col-md-6"}>
                    <Card.Title>Mobile.No:</Card.Title>
                    <Card.Text>{permission.mobile}</Card.Text>
                  </div>
                  <div className={"col-md-6"}>
                    <Card.Title>Email ID:</Card.Title>
                    <Card.Text>{permission.email}</Card.Text>
                  </div>
                </div>
                <hr />
                <div className={"row"}>
                  <div className={"col-md-6"}>
                    <Card.Title>District:</Card.Title>
                    <Card.Text>{permission.district}</Card.Text>
                  </div>
                  <div className={"col-md-6"}>
                    <Card.Title>Place Of Incident:</Card.Title>
                    <Card.Text>{permission.place}</Card.Text>
                  </div>
                </div>
                <hr />
                <div className={"row"}>
                  <div className={"col-md-6"}>
                    <Card.Title>Date Created:</Card.Title>
                    <Card.Text>{permission.date_created}</Card.Text>
                  </div>
                  <div className={"col-md-6"}>
                    <Card.Title>Status Of Compliant:</Card.Title>
                    <Card.Text>{permission.status}</Card.Text>
                  </div>
                </div>
                <hr />
                <div className={"row"}>
                  <div className={"col-md-6"}>
                    <Card.Title>Description:</Card.Title>
                    <Card.Text>{permission.description}</Card.Text>
                  </div>
                </div>
              </Card.Body>
              <Card.Footer style={{ textAlign: "right" }}>
                <Button variant="primary" onClick={() => window.print()}>
                  Print
                </Button>
              </Card.Footer>
            </Card>
            <br></br>
            <br></br>
            <br></br>
          </div>
        )}
      </div>
    );
  }
}
