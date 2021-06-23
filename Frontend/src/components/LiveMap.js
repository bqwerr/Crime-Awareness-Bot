import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ListGroup, Row, Col, Card, Badge, Button, Form } from "react-bootstrap";
//mapbox directions
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import axios from "axios";
import { loadClusters } from "../services/CrimeClusterService";
import { renderAlert } from "../services/AlertService";
import { getZones } from "../services/PoliceService";
import backend from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const token = 'Your MapBox Token';
mapboxgl.accessToken = token;


export default class LiveMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lng: 77.5757,
            lat: 12.9991,
            zoom: 13,
            alerts: [],
            zones: []
        };
        this.mapContainer = React.createRef();
        
    }

    locatePoint = (alert, map) => {
        renderAlert(alert, map);
    }

    getAlerts = () => {
        var data = "";
        var config = {
        method: "get",
        url: backend + "/police/get-sos/",
        data: data,
        };

        axios(config)
        .then((response) => {
            if (response.data != null) {
                this.setState({ alerts: response.data });
                
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({ alerts: [] });
        });
        return []
    }

    getStations = () => {
        var data = "";
        var config = {
        method: "get",
        url: backend + "/police/get-zones/",
        data: data,
        };

        axios(config)
        .then((response) => {
            if (response.data != null) {
                this.setState({ zones: response.data });
                
            }
        })
        .catch((error) => {
            console.log(error);
            this.setState({ alerts: [] });
        });
        return []
    }


    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        this.map = map;
        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.addControl(
            new MapboxDirections({
              accessToken: mapboxgl.accessToken,
              profile: 'mapbox/driving'
            }),
            'bottom-left'
          );

        // Add geolocate control to the map.
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true
            })
        );


        loadClusters(map, mapboxgl);
        this.getStations();
        this.getAlerts();
        getZones(map);
        
    }

    flyToPoint = (alert, map) => {
        console.log([alert.lat, alert.lon]);
       
            map.flyTo({
                center: [(alert.lon), (alert.lat)],
                zoom: 12,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });
         
    }

    render() {
        const { user } = this.props;
        const { lng, lat } = this.state;
      
        return (
                <Row>
                    <Col md={8}>
                        <div className="sidebar">
                            Longitude: {lng} | Latitude: {lat}
                        </div>
                        
                        <div ref={this.mapContainer} className="map-container" />
                    
                    </Col>
                    <Col>
                        <div>
                            {!user ? (
                                    <Card className="border border-dark bg-dark text-white mx-auto">
                                        <Card.Header className={"text-center"}>
                                            <h5> Nearest Police Stations </h5>
                                        </Card.Header>
                                        
                                        <Card.Body>
                                            <ListGroup className={"border border-dark bg-dark text-white"}>
                                               
                                                {this.state.zones.map((zone) => (
                                                    
                                                    <ListGroup.Item
                                                        key={zone.lat + zone.lon}
                                                        className="bg-dark text-white"
                                                        >
                                                        <Badge variant="success">
                                                            <Button variant="success" 
                                                            id={zone.lat + zone.lon}
                                                            onClick={() => this.flyToPoint(zone, this.map)}
                                                            size='sm'><FontAwesomeIcon icon={faMapMarkerAlt} /></Button>
                                                        </Badge> &nbsp;&nbsp;
                                                        {zone.zone_name}
                                                    </ListGroup.Item>
                                                ))}                                    
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                    
                                ) : (

                            <Card className="border border-dark bg-dark text-white mx-auto">
                                
                                <Card.Header className={"text-center"}>
                                    <h5> Live Alerts </h5> <Badge variant="danger">Emergency</Badge>
                                </Card.Header>
                                <Card.Body>
                                    <ListGroup className={"border border-dark bg-dark text-white"}>
                                            {this.state.alerts.map((alert) => this.locatePoint(alert, this.map))}
                                            {this.state.alerts.map((alert) => (
                                                
                                                <ListGroup.Item
                                                    key={alert.name + alert.mobile}
                                                    className="bg-dark text-white"
                                                    >
                                                    <Badge variant="warning">
                                                        <Button variant="warning" 
                                                        id={alert.name + alert.mobile}
                                                        onClick={() => this.flyToPoint(alert, this.map)}
                                                        size='sm'><FontAwesomeIcon icon={faMapMarkerAlt} /></Button>
                                                    </Badge> &nbsp;&nbsp;
                                                    {alert.description}
                                                </ListGroup.Item>
                                            ))}                                    
                                        </ListGroup>

                                </Card.Body>
                            </Card>
                                   
                            )}
                        </div>
                    </Col>
                </Row>
        );
    }
}
