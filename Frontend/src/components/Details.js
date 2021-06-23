import React from "react";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import backend from "../config";

const Details = (props) => {
  const markSafeOrUnsafe = (id, val) => {
    var data = props.location.state;
    data.permission.status = val;
    var config = {
      method: "post",
      url: backend + "/police/compliant/" + id + "/",
      data: data.permission,
    };
    axios(config)
      .then((response) => {
        if (response.data != null) {
          toast.success("Status Updated for this Compliant");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An unexpected error Occured");
      });
  };

  const { permission } = props.location.state ? props.location.state : null;
  if (!permission) return null;
  return (
    <div>
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <h3 className="text-primary">Details for {permission.name}</h3>
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
          <Button
            variant="danger"
            onClick={() =>
              markSafeOrUnsafe(permission.id, "Ignored")
            }
          >
            Ignore
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            onClick={() =>
              markSafeOrUnsafe(permission.id, "In Touch")
            }
          >
            Get In Touch
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            variant="success"
            onClick={() =>
              markSafeOrUnsafe(permission.id, "Clear")
            }
          >
            Solved
          </Button>
        </Card.Footer>
      </Card>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Details;
