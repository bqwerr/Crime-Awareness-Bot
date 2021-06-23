import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import Posts from "./Posts";
import { toast } from "react-toastify";
import axios from "axios";

export default class Welcome extends Component {
  onClick = () => this.props.history.push("/login");
  handleLogout = () => {
    localStorage.clear();
    window.location = "/";
    toast.success("Logout Successful");
  };

  render() {
    const { user } = this.props;
    return (
      <div >
        <Jumbotron className="bg-dark text-white">
          <h2>Welcome to Crime Awareness Portal</h2>
          <p>
            This portal allows a user to get awarness about different crimes happening around the world and also can register complaint through the chatbot.
          </p>
          <div>
            {!user ? (
              <Button variant="secondary" onClick={this.onClick}>
                Login
              </Button>
            ) : (
              <div>
                <p>
                  Logged In as :{" "}
                  <span className="text-success">{user.uid}</span>
                </p>
                <p>
                  Email ID : {" "}
                  <span className="text-success">{user.email.toLowerCase()}</span>
                </p>
    
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={this.handleLogout}
                >
                  Log Out
                </Button>
                &nbsp;&nbsp;&nbsp;
              </div>
            )}
          </div>
        </Jumbotron>
        <Posts user={user} />
      </div>
    );
  }
}
