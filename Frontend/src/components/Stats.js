import React, { Component, lazy, Suspense } from 'react';
import axios from "axios";
import {

  Card,

  Col,

  Row,

  Modal,

  Button

} from 'react-bootstrap';
import backend from "../config";
import Chart from "react-google-charts";


import { JsonToTable } from "react-json-to-table";

class Stats extends Component {

    constructor(props) {

      super(props);

      this.state = {

          csvDataObject: [],
          show: false,
          states: ["a&n islands", "andhra pradesh", "arunachal pradesh", "assam", "bihar", "chandigarh", "chhattisgarh", "d&n haveli", "daman&diu", "delhi ut", "goa", "gujarat", "haryana", "himachal pradesh", "jammu&kashmir", "jharkhand", "karnataka", "kerala", "lakshadweep", "madhya pradesh", "maharashtra", "manipur", "meghalaya", "mizoram", "nagaland", "odisha", "puducherry", "punjab", "rajasthan", "sikkim", "tamil nadu", "tripura", "uttar pradesh", "uttarakhand", "west bengal"],
          selectedState: "andhra pradesh",
          stats: []
      };

    }


    renderColumnNames = (colmunList) => {
        return(

           colmunList.map( (item, index) => {

                return(

                    <span key={index} className="mr-1 text-default">{index+1}: {item}</span>

                )

          })

       )

    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});
    change = (e) => {
        this.setState({selectedState: e.target.value});
        const data = {
            state: this.state.selectedState,
        };
        var config = {
        method: "post",
        url: backend + "/bot/get-stats/",
        data: data,
        };
    
            axios(config)
            .then((response) => {
                if (response.data != null) {
                    this.setState({
                        stats: response.data.stats
                    });
                    
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ stats: [] });
            });
    }
 

    renderCsvDataResults = () => {

        if (this.state.csvDataObject && this.state.csvDataObject['State & Year']){
            
            var apiStatus = 'SUCCESS';

            var apiData = this.state.csvDataObject;

            var state_year = apiData['State & Year'];
            console.log(apiData['Stats']);
            if (apiStatus === 'SUCCESS'){

                
                return(

                    <div>

                        <span className="text-success">Rows: <span className="text-primary"><b>{state_year.rows}</b></span></span>

                       <br/>

                        <span className="text-success">Columns: <span className="text-primary"><b>{state_year.cols}</b></span></span>

                        <br/>
                        <br />
                        <Button variant="primary" size='sm' onClick={this.handleShow}>
                            Visualize
                        </Button>

                        <hr/>

                       <Card>

                            <Card.Header>Grouped Records State & Year wise</Card.Header>

                            <Card.Body className="mb-1" style={{height:'400px', overflowY: "auto", overflow: "-moz-scrollbars-horizontal"}}>

                                {/* <JsonTable rows={apiData.rowData} columns={apiData.columns} /> */}
                                <JsonToTable json={state_year.rowData} />
                                

                            </Card.Body>
                        </Card>
                        <Modal
                            show={this.state.show}
                            onHide={this.handleClose}
                            dialogClassName="modal-120w"
                            size="xl"
                            aria-labelledby="example-custom-modal-styling-title"
                        >
                            <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                Visualizations
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                            <select value={this.state.selectedState}
                                onChange={this.change}>
                                {this.state.states.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <div style={{ display: 'flex', maxWidth: 900 }}>
                                <Chart
                                    height={'500px'}
                                    width={'1110px'}
                                    chartType="AreaChart"
                                    loader={<div>Loading Chart</div>}
                                    data={this.state.stats}
                                    options={{
                                    title: 'Grouped By State & Year',
                                    hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                                    vAxis: { minValue: 0 },
                                    // For the legend to fit, we make the chart area smaller
                                    chartArea: { width: '66%', height: '77%' },
                                    // lineWidth: 25
                                    }}
                                />
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>

                )

            } else {

                return(

                    <div>

                        <span className="text-danger">loading...</span>

                    </div>

                )

            }

        }

    }

    HelloGetRequestedDetails = () => {
        
       
            var data = "";
            var config = {
            method: "get",
            url: backend + "/police/get-stats/",
            data: data,
            };
    
            axios(config)
            .then((response) => {
                if (response.data != null) {
                    this.setState({
                        csvDataObject: response.data
                    });
                    
                }
            })
            .catch((error) => {
                console.log(error);
                this.setState({ csvDataObject: [] });
            });
            
        

    }

    componentDidMount(){

      this.HelloGetRequestedDetails();

    }


   loading = () => <div className="text-success"><strong>Loading...</strong></div>

  

    render() {

      return (

        <div className="animated fadeIn">

          <Row>
           <Col md={12}>

              <h3>Crime Statistics</h3>
              <hr/>
              {this.state.csvDataObject ? this.renderCsvDataResults() : this.loading()}
              
            </Col>

          </Row>
        </div>

    );

  }

}

export default Stats;