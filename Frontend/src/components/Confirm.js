import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";

export default class Confirm extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  render() {
    const {
      values: {
        document_type,
        document_ref,
        fullname,
        phone,
        email,
        reason,
        travellers,
        src_state,
        dest_state,
        src_district,
        dest_district,
        src_zip,
        dest_zip,
        src_area,
        dest_area,
        src_landmark,
        dest_landmark,
      },
      step,
    } = this.props;
    return (
      <div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header className={"text-center"}>
            <h3>Permission Form</h3>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-primary">
              Step {step} of 3 : Confirm Your Details
            </Card.Title>
            <br></br>
            <div className={"row"}>
              <div className={"col-md-6"}>
                <Card.Title>Applicant Full Name:</Card.Title>
                <Card.Text>{fullname}</Card.Text>
              </div>
              <div className={"col-md-6"}>
                <Card.Title>Applicant Proof Document.No:</Card.Title>
                <Card.Text>{document_ref}</Card.Text>
              </div>
            </div>
            <hr />
            <div className={"row"}>
              <div className={"col-md-6"}>
                <Card.Title>Mobile.No:</Card.Title>
                <Card.Text>{phone}</Card.Text>
              </div>
              <div className={"col-md-6"}>
                <Card.Title>Email ID:</Card.Title>
                <Card.Text>{email}</Card.Text>
              </div>
            </div>
            <hr />
            <div className={"row"}>
              <div className={"col-md-6"}>
                <Card.Title>Selected Proof Type:</Card.Title>
                <Card.Text>{document_type}</Card.Text>
              </div>
              <div className={"col-md-6"}>
                <Card.Title>No.of Travellers:</Card.Title>
                <Card.Text>{travellers}</Card.Text>
              </div>
            </div>
            <hr />
            <div className={"row"}>
              <div className={"col-md-6"}>
                <Card.Title>Reason:</Card.Title>
                <Card.Text>{reason}</Card.Text>
              </div>
              <div className={"col-md-6"}>
                <Card.Title>Category of Travel:</Card.Title>
                <Card.Text>{reason}</Card.Text>
              </div>
            </div>
            <hr />
            <div className={"row"}>
              <div className={"col-md-6"}>
                <Card.Title>Source Address:</Card.Title>
                <Card.Text>
                  {src_landmark}, {src_area}, {src_district}, {src_state},{" "}
                  {src_zip}.
                </Card.Text>
              </div>
              <div className={"col-md-6"}>
                <Card.Title>Destination Address:</Card.Title>
                <Card.Text>
                  {dest_landmark}, {dest_area}, {dest_district}, {dest_state}{" "}
                  {dest_zip}.
                </Card.Text>
              </div>
            </div>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button variant="warning" onClick={this.back}>
              Go Back
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="success" onClick={this.props.handleSubmit}>
              Apply
            </Button>
          </Card.Footer>
        </Card>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}
