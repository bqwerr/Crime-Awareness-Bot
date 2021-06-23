import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";

export default class FormUserDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
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
              Step {step} of 3 : General
            </Card.Title>
            <br />
            <div className={"row"}>
              <div className={"col-md-6"}>
                <Form.Group className="mu-3 ">
                  <Form.Label>Applicant Name</Form.Label>
                  <Form.Control
                    aria-describedby="inputGroup-sizing-default"
                    className={"bg-dark text-white"}
                    onChange={handleChange("fullname")}
                    defaultValue={values.fullname}
                  />

                  <Form.Text className="text-muted">
                    Full Name as printed on id proof
                  </Form.Text>
                  {errors["fullname"] && (
                    <div className="text-danger">
                      <p className="text-danger">{errors["fullname"]}</p>
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className={"col-md-6"}>
                <Form.Group className="mu-3 ">
                  <Form.Label>Applicant Proof Ref.No</Form.Label>
                  <Form.Control
                    aria-describedby="inputGroup-sizing-default"
                    className={"bg-dark text-white"}
                    onChange={handleChange("document_ref")}
                    defaultValue={values.document_ref}
                    placeholder="Enter valid Reference number"
                  />
                  {errors["document_ref"] && (
                    <div className="text-danger">
                      <p className="text-danger">{errors["document_ref"]}</p>
                    </div>
                  )}
                </Form.Group>
              </div>
            </div>
            <div className={"row"}>
              <div className={"col-md-6"}>
                <Form.Group className="mu-3 ">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    aria-describedby="inputGroup-sizing-default"
                    className={"bg-dark text-white"}
                    onChange={handleChange("phone")}
                    defaultValue={values.phone}
                    placeholder="Enter valid Mobile number"
                  />
                  {errors["phone"] && (
                    <div className="text-danger">
                      <p className="text-danger">{errors["phone"]}</p>
                    </div>
                  )}
                </Form.Group>
              </div>
              <div className={"col-md-6"}>
                <Form.Group className="mu-3 ">
                  <Form.Label>Email ID</Form.Label>
                  <Form.Control
                    type="email"
                    aria-describedby="inputGroup-sizing-default"
                    className={"bg-dark text-white"}
                    onChange={handleChange("email")}
                    defaultValue={values.email}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                  {errors["email"] && (
                    <div className="text-danger">
                      <p className="text-danger">{errors["email"]}</p>
                    </div>
                  )}
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className={"col-md-3"}>
                <Form.Label>Selected Proof Type</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={values.document_type}
                  onChange={handleChange("document_type")}
                  className={"bg-dark text-white"}
                >
                  <option value="Aadhaar Card">Aadhaar Card</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Passport">Passport</option>
                  <option value="Pan card">Pan card</option>
                  <option value="Voter ID">Voter ID</option>
                </Form.Control>
              </div>
              <div className={"col-md-2"}>
                <Form.Label>No.of Travellers</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={values.travellers}
                  onChange={handleChange("travellers")}
                  className={"bg-dark text-white"}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </Form.Control>
              </div>
              <div className={"col-md-3"}>
                <Form.Label>Reason for Travel</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={values.reason}
                  onChange={handleChange("reason")}
                  className={"bg-dark text-white"}
                >
                  <option value="Medical/Emergency">Medical/Emergency</option>
                  <option value="Goods Transport">Goods Transport</option>
                  <option value="Marriage">Marriage</option>
                  <option value="Education Purpose">Education Purpose</option>
                  <option value="Touring">Touring</option>
                </Form.Control>
              </div>

              <div className={"col-md"}>
                <Form.Label>Select Type of travel</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={values.permission_name}
                  onChange={handleChange("permission_name")}
                  className={"bg-dark text-white"}
                >
                  <option value="Travel Within State">
                    Travel Within State
                  </option>
                  <option value="Travel Outside State">
                    Travel Outside State
                  </option>
                  <option value="Goods Transport">Goods Transport</option>
                </Form.Control>
              </div>
            </div>
          </Card.Body>
          <Card.Footer style={{ textAlign: "right" }}>
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
