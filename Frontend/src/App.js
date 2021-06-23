import React, { Component } from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import ChatBox from "./components/ChatWidget";
import Welcome from "./components/Welcome";
import Permission from "./components/Permission";
import { Container, Row, Col } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Details from "./components/Details";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Status from "./components/Status";
import LiveMap from "./components/LiveMap";
import Stats from "./components/Stats";

class App extends Component {
  state = {};

 
  componentDidMount() {
    
    try {
      const uid = localStorage.getItem("uid");
      const email = localStorage.getItem("email");
      if (uid && email) {
        const user = {
          uid,
          email,
        };
        this.setState({ user });
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  handleChange = () => {
    try {
      const uid = localStorage.getItem("uid");
      const email = localStorage.getItem("email");
      if (uid && email) {
        const user = {
          uid,
          email,
        };
        this.setState({ user });
      }
    } catch (ex) {
      console.log(ex);
    }
  };


  render() {
    const marginTop = { marginTop: "30px" };
    return (
      <div>
        
        <Router>
          <NavigationBar user={this.state.user} />
          <ToastContainer />
          <Container >
            <Row>
              <Col lg={12} style={marginTop}>
                <Switch>
                  <Route
                    path="/"
                    exact
                    render={(props) => (
                      <Welcome
                        {...props}
                        user={this.state.user}
                        handleChange={this.handleChange}
                      />
                    )}
                  />
                  <Route
                    path="/dashboard"
                    exact
                    render={(props) => {
                      if (!this.state.user) return <Redirect to="/" />;
                      return <Dashboard {...props} />;
                    }}
                  />

                  <Route path="/status" exact component={Status} />
                  <Route path='/api' component={() => { 
                      window.location.href = 'http://localhost:8000/bot'; 
                      return null;
                  }}/>
                  <Route
                    path="/login"
                    exact
                    render={(props) => {
                      if (this.state.user) return <Redirect to="/" />;
                      return <Login {...props} />;
                    }}
                  />
                  <Route
                    path="/dashboard/:id"
                    exact
                    render={(props) => {
                      if (!this.state.user) return <Redirect to="/" />;
                      return <Details {...props} />;
                    }}
                  />

                   <Route
                      path="/sos"
                      exact
                      render={(props) => {
                        return <LiveMap {...props} user={this.state.user}/>;
                      }}
                    />

                    <Route
                      path="/stats"
                      exact
                      render={(props) => {
                        return <Stats />;
                      }}
                    />  


                  <Redirect to="/" />
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
        <ChatBox />
      </div>
      
    );
  }
}

export default App;