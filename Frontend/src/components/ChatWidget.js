import React, {Component} from 'react';
import { toast } from "react-toastify";
import 'react-chat-widget/lib/styles.css';
import "../App.css";
import axios from "axios";
import { Widget, 
    addResponseMessage, 
    addUserMessage, 
    addLinkSnippet, 
    setQuickButtons, 
    toggleMsgLoader, 
    toggleWidget, 
    toggleInputDisabled,
    dropMessages,
    setBadgeCount,
} from 'react-chat-widget';
import * as Yup from "yup";
import backend from "../config";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container, Modal, Button } from 'react-bootstrap';

const buttons = [{label: 'Chat With Me ?', value: '1'}, {label: 'Register Compliant', value: '2'}, {label: 'Check Status', value: 'status'}, {label: 'SOS', value: 'sos'}];

class ChatBox extends Component {

    constructor() {
        super();
        this.state = {
            data: {
                uid: "Please input your Aadhar Number.",
                name: "Please mention your full name as mentioned in Aadhaar Card",
                mobile: "What's your Mobile Number ?",
                email: "Enter your email address..",
                district: "In which district do you live currently ?",
                place: "Where did the Incident took place ?",
                category: "Please choose the Incident type from below..",
                description: "",
                url: "In case you got any incident pictures that can help, please upload it here",
            },
            show: false,
            idx: 1,
            flag: -1
        };
    }

    initialValues = {
        name: "",
        mobile: "",
        description: "",
      };
    

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});

    // flag : -1 : None
    // flag : 1 : compliant registration

    componentDidMount = () => {
        var localObj = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            localObj.state.data.lat = position.coords.latitude + "";
            localObj.state.data.lon = position.coords.longitude + "";
          });
        if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
        }
        addResponseMessage('Hi there, I am Jagrukta : ) I can help you register a compliant or make you aware about crimes...');
        addResponseMessage('Here are few quick links to help you..');
        addLinkSnippet({ title: 'Crime In India', link: "https://ncrb.gov.in/en/crime-india", target: '_blank' });
        addLinkSnippet({ title: 'Crime Prevention', link: "https://publicsafety.columbia.edu/content/crime-prevention-tips", target: '_blank' });
        setQuickButtons(buttons);
        toggleInputDisabled();
        
    }

    handleSubmit = (values, onSubmitProps) => {
        
        const vals = {
            name: values.name,
            mobile: values.mobile,
            description: values.description,
            lat: this.state.data.lat,
            lon: this.state.data.lon
        };

        axios
            .post(backend + "/police/add-sos/", vals)
            .then((response) => {
                if (response.data != null) {
                var data = response.data
                window.location = "/sos";
                toast.success("Emergency received. Please be online..");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    validationSchema = Yup.object({
        mobile: Yup.string().required("Mobile is required"),
        description: Yup.string().required("please describe the issue.."),
      });

    handleQuickButtonClicked = data => {
        toggleInputDisabled();
        setQuickButtons([]);
        if(data == 1) {
            // chat
            addResponseMessage('So.. How can I help you ?');

        }
        else if(data == 2) {
            // compliant
            addUserMessage('Register Compliant');
            addResponseMessage('Sure, follow along..');
            addResponseMessage('please input your ' + "Aadhaar Number");
            var flag = 1;
            this.setState({ flag });
        }
        else if(data == 'new') {
            dropMessages();
            toggleWidget();
        }
        else if(data == 'status') {
            addUserMessage('Check Status');
            var statusUrl = "http://localhost:3000/status/";
            addLinkSnippet({ title: 'Check Status Here..', link: statusUrl, target: '_blank' });
            addResponseMessage("Any more Queries ?");
        }
        else if(data == 'sos') {
            addUserMessage('SOS');
            addResponseMessage("Your location is being shared with police. Please be online...");
            addLinkSnippet({ title: 'Visit here', link: "http://localhost:3000/sos", target: '_blank' });
            this.handleShow();
          
        }
        else {
            this.state.data.category = data.toString();
            addResponseMessage('Please describe the incident');
        }
    }

    sendCompliant = () => {
        const data = this.state.data;
        var config = {
        method: "post",
        url: backend + "/police/add-compliant/",
        data: data,
        };
        console.log(data);
        axios(config)
        .then((response) => {
            if (response.status === 200) {
                console.log(response);
                toast.success("Compliant Registered");
            }
        })
        .catch((error) => {
            toast.error("Please provide valid input..");
        });
    }

    handleNewUserMessage = (newMessage) => {
        var flag = this.state.flag;
        if(flag === 1) {
            var prevKey = Object.keys(this.state.data)[this.state.idx - 1];
            if(prevKey === 'category') {
                this.state.data.description = newMessage
                this.state.idx += 1;
            } else {
                this.state.data[prevKey] = newMessage;
            }
            var key = Object.keys(this.state.data)[this.state.idx];
            this.state.idx += 1;
            
            addResponseMessage(this.state.data[key]);
            
            if(key === 'category') {
                const buttons = [{label: 'Cognizable', value: 'Cognizable'}, {label: 'Non Cognizable', value: 'Non Cognizable'}, {label: 'Missing Case', value: 'Missing Report'}, {label: 'Theft', value: 'Theft Report'}];
                setQuickButtons(buttons);
                toggleInputDisabled();
            }
            else if(key === 'url') {
                var url = "https://drive.google.com/";
                addLinkSnippet({ title: 'Incident Pictures', link: url, target: '_blank' });
                this.state.data.url = url;
                var p_id = this.state.data.uid + "@" + this.state.data.mobile;
                this.sendCompliant();
                addResponseMessage("Thanks for the details, our Officer will get back to you once he is online");
                addResponseMessage("You can check status using the compliant ID : " + p_id);
                toggleInputDisabled();
                const buttons = [{label: 'New Chat', value: 'new'}];
                setQuickButtons(buttons);
                var flag = -1;
                this.setState({ flag });
                this.state.idx = 1;
            }
        }
        else {
            toggleMsgLoader();
            const vals = {
                message: newMessage
            };

            axios
            .post(backend + "/bot/", vals)
            .then((response) => {
                if (response.data != null) {
                var data = response.data
                addResponseMessage(data.response);
                toggleMsgLoader();
                }
            })
            .catch((error) => {
                console.log(error);
            });
            
        }
        
        
    };

render() {
    
    const {show} = this.state;
    return (
        <Container>
            <div className="App">
                <Widget 
                handleNewUserMessage={this.handleNewUserMessage}
                title="AskNow"
                subtitle="Crime Awareness & Registration Portal"
                autoFocus="true"
                showTimeStamp="true"
                handleQuickButtonClicked={this.handleQuickButtonClicked}
            />
            </div>

            <Modal
                show={show}
                onHide={this.handleClose}
                backdrop="static"
                keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Emergency Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={this.initialValues}
                    validationSchema={this.validationSchema}
                    onSubmit={this.handleSubmit}>
                {(formik) => {
                    return (
                    <Form>
                        <div className="row">
                            <div className="col-12">
                            <label htmlFor="name">Full Name</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                className={"form-control"}
                            />
                            <div className="error">
                                <ErrorMessage name="name" />
                            </div>
                            </div>
                        </div>
                        <br></br>
                        <div className="row">
                            <div className="col-12">
                            <label htmlFor="mobile">Mobile</label>
                            <Field
                                type="text"
                                id="mobile"
                                name="mobile"
                                autoComplete="on"
                                className={"form-control"}
                            />
                            <div className="error">
                                <ErrorMessage name="mobile" />
                            </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col-12">
                            <label htmlFor="mobile">What's your Emergency ?</label>
                            <Field
                                type="text"
                                id="description"
                                name="description"
                                autoComplete="on"
                                className={"form-control"}
                            />
                            <div className="error">
                                <ErrorMessage name="description" />
                            </div>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button
                                variant="success"
                                type="submit"
                                disabled={!formik.isValid || formik.isSubmitting}
                            >
                                Submit&nbsp;
                            </Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button variant="danger" type="reset">
                                Reset&nbsp;
                            </Button>
                        </Modal.Footer>
                    </Form>
                    );
                }}
                </Formik>
            </Modal.Body>
            </Modal>
        </Container>
    );
  }
}

export default ChatBox;