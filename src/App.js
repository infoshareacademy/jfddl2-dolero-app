import React, {Component} from 'react';
import {Grid, Col} from 'react-bootstrap';
import './App.css';
import Sidebar from "./Sidebar";
import Diagrams from "./Diagrams";

class App extends Component {
    render() {
        return (
            <Grid
                fluid
            >
                <Col xs={6} md={4}><Sidebar/></Col>
                {/*<Col xs={6} md={8}><Diagrams/></Col>*/}

            </Grid>
        )
    }
}

export default App;
