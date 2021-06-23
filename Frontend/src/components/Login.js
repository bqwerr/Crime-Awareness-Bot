import React, { Component } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Card, Button } from "react-bootstrap";
import * as Yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUndo } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import backend from "../config";

class Login extends Component {
  initialValues = {
    uid: "",
    password: "",
  };

  onSubmit = (values, onSubmitProps) => {
    const vals = {
      uid: values.uid,
      password: values.password,
    };
    //console.log(onSubmitProps)

    axios
      .post(backend + "/police/login/", vals)
      .then((response) => {
        if (response.data != null) {
          
          localStorage.setItem("uid", response.data.uid);
          localStorage.setItem("email", response.data.email);
         
          onSubmitProps.setSubmitting(false);
          onSubmitProps.resetForm();
          window.location = "/";
          toast.success("Login Successful");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid Credentials");
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
      });
  };

  validationSchema = Yup.object({
    uid: Yup.string().required("UID is Required"),
    password: Yup.string().required("No Password provided."),
  });

  render() {
    return (
      <Card
        style={{  }}
        className={"border border-dark bg-dark text-white mx-auto"}
        style={{ width: "58%", background: "#272b30"}}
      >
        <Card.Header className={"text-center"}>
          <h3>Login To Admin Console</h3>
        </Card.Header>
        <Formik
          initialValues={this.initialValues}
          validationSchema={this.validationSchema}
          onSubmit={this.onSubmit}
        >
          {(formik) => {
            //console.log("Formik props", formik);
            return (
              <Form>
                <Card.Body>
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="uid">UID</label>
                      <Field
                        type="text"
                        id="uid"
                        name="uid"
                        className={"bg-dark text-white form-control"}
                      />
                      <div className="error">
                        <ErrorMessage name="uid" />
                      </div>
                    </div>
                  </div>
                  <br></br>
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="password">Password</label>
                      <Field
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="on"
                        className={"bg-dark text-white form-control"}
                      />
                      <div className="error">
                        <ErrorMessage name="password" />
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Login&nbsp;
                    <FontAwesomeIcon icon={faSignInAlt} />
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="danger" type="reset">
                    Reset&nbsp;
                    <FontAwesomeIcon icon={faUndo} />
                  </Button>
                </Card.Footer>
              </Form>
            );
          }}
        </Formik>
      </Card>
    );
  }
}

export default Login;
