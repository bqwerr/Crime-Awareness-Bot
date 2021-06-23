import React, { Component } from "react";
import FormUserDetails from "./FormUserDetails";
import FormTravelDetails from "./FormTravelDetails";
import Confirm from "./Confirm";
import Joi from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";

export class Permission extends Component {
  state = {
    step: 1,
    document_type: "Passport",
    document_ref: "",
    fullname: "",
    phone: "",
    email: "",
    reason: "Touring",
    permission_name: "Travel Within State",
    travellers: "1",
    src_state: "",
    dest_state: "",
    src_district: "",
    dest_district: "",
    src_zip: "",
    dest_zip: "",
    src_landmark: "",
    dest_landmark: "",
    src_area: "",
    dest_area: "",
    description: "",
    errors: {},
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    let errors = null;
    if (step === 1) {
      errors = this.validatePartOne();
    } else {
      errors = this.validatePartTwo();
    }
    if (errors === null) {
      this.setState({
        step: step + 1,
      });
    }
  };

  // Proceed to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  schema = {
    document_ref: Joi.string().required().min(6).label("Proof Ref"),
    fullname: Joi.string().required().label("Full Name"),
    document_type: Joi.string().required().label("Document Type"),
    reason: Joi.string().required().label("Reason"),
    travellers: Joi.string().required().label("Travellers"),
    permission_name: Joi.string().required().label("Permission Type"),
    phone: Joi.string().required().min(10).max(10).label("Phone"),
    email: Joi.string().required().email().label("Email"),
    src_state: Joi.string().required().label("State"),
    dest_state: Joi.string().required().label("Destination State"),
    src_district: Joi.string().required().label("District"),
    dest_district: Joi.string().required().label("Destination District"),
    src_zip: Joi.string().required().label("Pincode"),
    src_area: Joi.string().required().label("Area / Localty"),
    src_landmark: Joi.string().required().label("Landmark"),
    description: Joi.string().required().label("Description"),
    dest_zip: Joi.string().required().label("Pincode"),
    dest_area: Joi.string().required().label("Area / Localty"),
    dest_landmark: Joi.string().required().label("Landmark"),
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input, e.target.value);
    if (errorMessage) errors[input] = errorMessage;
    else delete errors[input];

    this.setState({ [input]: e.target.value, errors });
  };

  validatePartOne = () => {
    const options = { abortEarly: false };
    const data = {
      fullname: this.state.fullname,
      document_ref: this.state.document_ref,
      phone: this.state.phone,
      email: this.state.email,
    };
    const schemaOne = {
      fullname: this.schema.fullname,
      document_ref: this.schema.document_ref,
      phone: this.schema.phone,
      email: this.schema.email,
    };
    const { error } = Joi.validate(data, schemaOne, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    this.setState({ errors });
    return 1;
  };

  validatePartTwo = () => {
    const options = { abortEarly: false };
    const data = {
      src_state: this.state.src_state,
      dest_state: this.state.dest_state,
      src_district: this.state.src_district,
      dest_district: this.state.dest_district,
      src_zip: this.state.src_zip,
      src_area: this.state.src_area,
      src_landmark: this.state.src_landmark,
      description: this.state.description,
      dest_zip: this.state.dest_zip,
      dest_area: this.state.dest_area,
      dest_landmark: this.state.dest_landmark,
    };
    const schemaTwo = {
      src_state: this.schema.src_state,
      dest_state: this.schema.dest_state,
      src_district: this.schema.src_district,
      dest_district: this.schema.dest_district,
      src_zip: this.schema.src_zip,
      src_area: this.schema.src_area,
      src_landmark: this.schema.src_landmark,
      description: this.schema.description,
      dest_zip: this.schema.dest_zip,
      dest_area: this.schema.dest_area,
      dest_landmark: this.schema.dest_landmark,
    };
    const { error } = Joi.validate(data, schemaTwo, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    this.setState({ errors });
    return 1;
  };

  handleSubmit = () => {
    var data = { ...this.state };
    delete data.errors;
    delete data.step;
    data["src_address"] =
      data.src_landmark +
      " " +
      data.src_area +
      " " +
      data.src_district +
      " " +
      data.src_state +
      " " +
      data.src_zip;
    data["dest_address"] =
      data.dest_landmark +
      " " +
      data.dest_area +
      " " +
      data.dest_district +
      " " +
      data.dest_state +
      " " +
      data.dest_zip;

    delete data.src_landmark;
    delete data.src_area;
    delete data.src_district;
    delete data.src_state;
    delete data.src_zip;
    delete data.dest_landmark;
    delete data.dest_area;
    delete data.dest_district;
    delete data.dest_state;
    delete data.dest_zip;
    var config = {
      method: "post",
      url: "http://localhost:8080/form/submit/",
      data: data,
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          this.props.history.replace("/");
          toast.success(
            "Successfully Submitted. Check status to download E-pass"
          );
        } else {
          toast.error("An unexpected error Occurred");
        }
      })
      .catch((error) => {
        toast.error("Please Check your Internet Connection");
      });
  };

  render() {
    const { step } = this.state;
    const {
      document_type,
      document_ref,
      fullname,
      phone,
      email,
      reason,
      travellers,
      src_area,
      dest_area,
      permission_name,
      src_state,
      dest_state,
      description,
      src_district,
      dest_district,
      src_zip,
      dest_zip,
      src_landmark,
      dest_landmark,
    } = this.state;
    const values = {
      document_type,
      document_ref,
      fullname,
      phone,
      email,
      permission_name,
      reason,
      travellers,
      description,
      src_state,
      dest_state,
      src_district,
      dest_district,
      src_zip,
      dest_zip,
      src_landmark,
      dest_landmark,
      src_area,
      dest_area,
    };
    switch (step) {
      case 1:
        return (
          <FormUserDetails
            step={this.state.step}
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            errors={this.state.errors}
            validate={this.validateOne}
          />
        );
      case 2:
        return (
          <FormTravelDetails
            step={this.state.step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            errors={this.state.errors}
            validate={this.validateTwo}
          />
        );

      case 3:
        return (
          <Confirm
            step={this.state.step}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            handleSubmit={this.handleSubmit}
          />
        );

      default:
        console.log("This is a multi-step form built with React.");
    }
  }
}

export default Permission;
