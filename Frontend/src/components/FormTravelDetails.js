import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

export default class FormTravelDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange, step, errors } = this.props;
    return (
      <div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header className={"text-center"}>
            <h3>Permission Form</h3>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-primary">
              Step {step} of 3 : Travel Details
            </Card.Title>
            <br />
            <Card.Title className={"text-muted"}>
              <Card.Title>Present Address</Card.Title>
            </Card.Title>
            <div className={"row"}>
              <div className={"col-md-3"}>
                <Form.Label>State</Form.Label>
                <Form.Control
                  defaultValue={values.src_state}
                  onChange={handleChange("src_state")}
                  className={"bg-dark text-white"}
                />
                {errors["src_state"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["src_state"]}</p>
                  </div>
                )}
              </div>
              <div className={"col-md-3"}>
                <Form.Label>District</Form.Label>
                <Form.Control
                  defaultValue={values.src_district}
                  onChange={handleChange("src_district")}
                  className={"bg-dark text-white"}
                />
                {errors["src_district"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["src_district"]}</p>
                  </div>
                )}
              </div>
              <div className={"col-md-3"}>
                <Form.Label>Area</Form.Label>
                <Form.Control
                  defaultValue={values.src_area}
                  onChange={handleChange("src_area")}
                  className={"bg-dark text-white"}
                />
                {errors["src_area"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["src_area"]}</p>
                  </div>
                )}
              </div>
              <div className={"col-md-3"}>
                <Form.Label>Zip / Pincode</Form.Label>
                <Form.Control
                  defaultValue={values.src_zip}
                  onChange={handleChange("src_zip")}
                  className={"bg-dark text-white"}
                />
                {errors["src_zip"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["src_zip"]}</p>
                  </div>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className={"col-md-8"}>
                <Form.Label>
                  Landmark to your address with H.No / Flat.No
                </Form.Label>
                <Form.Control
                  defaultValue={values.src_landmark}
                  onChange={handleChange("src_landmark")}
                  className={"bg-dark text-white"}
                />
                {errors["src_landmark"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["src_landmark"]}</p>
                  </div>
                )}
              </div>
            </div>
            <br />
            <Card.Title className={"text-muted"}>
              <Card.Title>Destination Address</Card.Title>
            </Card.Title>
            <div className={"row"}>
              <div className={"col-md-3"}>
                <Form.Label>State</Form.Label>
                <Form.Control
                  defaultValue={values.dest_state}
                  onChange={handleChange("dest_state")}
                  className={"bg-dark text-white"}
                />
                {errors["dest_state"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["dest_state"]}</p>
                  </div>
                )}
              </div>
              <div className={"col-md-3"}>
                <Form.Label>District</Form.Label>
                <Form.Control
                  defaultValue={values.dest_district}
                  onChange={handleChange("dest_district")}
                  className={"bg-dark text-white"}
                />
                {errors["dest_district"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["dest_district"]}</p>
                  </div>
                )}
              </div>
              <div className={"col-md-3"}>
                <Form.Label>Area</Form.Label>
                <Form.Control
                  defaultValue={values.dest_area}
                  onChange={handleChange("dest_area")}
                  className={"bg-dark text-white"}
                />
                {errors["dest_area"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["dest_area"]}</p>
                  </div>
                )}
              </div>
              <div className={"col-md-3"}>
                <Form.Label>Zip / Pincode</Form.Label>
                <Form.Control
                  defaultValue={values.dest_zip}
                  onChange={handleChange("dest_zip")}
                  className={"bg-dark text-white"}
                />
                {errors["dest_zip"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["dest_zip"]}</p>
                  </div>
                )}
              </div>
            </div>
            <br />
            <div className="row">
              <div className={"col-md-8 mb-3"}>
                <Form.Label>
                  Landmark to your destination address with H.No / Flat.No
                </Form.Label>
                <Form.Control
                  defaultValue={values.dest_landmark}
                  onChange={handleChange("dest_landmark")}
                  className={"bg-dark text-white"}
                />
                {errors["dest_landmark"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["dest_landmark"]}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  defaultValue={values.description}
                  onChange={handleChange("description")}
                  className={"bg-dark text-white"}
                  placeholder="How Important this Travel to you ?"
                />
                {errors["description"] && (
                  <div className="text-danger">
                    <p className="text-danger">{errors["description"]}</p>
                  </div>
                )}
              </div>
            </div>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
            <Button variant="warning" onClick={this.back}>
              Go Back
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="primary" onClick={this.continue}>
              Continue
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
