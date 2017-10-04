import React, {Component} from 'react';
import {Grid, Col} from 'react-bootstrap';
import './App.css';
import Sidebar from "./Sidebar";

class App extends Component {
    render() {
        return (
            <Grid
                fluid
            >
                <Col xs={6} md={4}><Sidebar/></Col>
            </Grid>
        )
    }
}

export default App;
