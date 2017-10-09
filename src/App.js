import React, {Component} from 'react';
import {Grid, Col} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import './App.css';
import Sidebar from "./Sidebar";
import Diagrams from "./Diagrams";

import ShortHistory from "./ShortHistory/ShortHistory"
import History from "./History/History";
import MainMenu from './MainMenu'

class App extends Component {
    render() {
        return (
            <Router>
                <Grid fluid>

                    <Col xs={6} md={4}><Sidebar/></Col>
                    <Col xs={6} md={8} className='components'>
                    <MainMenu/>
                    <Route exact path='/history' component={History}/>
                    <Route path='/diagrams' component={Diagrams}/>
                    <Route path  component={ShortHistory}/>

                    </Col>
                </Grid>
            </Router>
        );
    }
}




export default App;
