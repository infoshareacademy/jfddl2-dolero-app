import React, {Component} from 'react';
import {Grid,Row,Col} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import './App.css';
import Sidebar from "./Sidebar";
import Diagrams from "./Diagrams";
// import Helpdesk from "./Helpdesk"
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
                    <Route path='/history' component={History}/>
                    <Route path='/diagrams' component={Diagrams}/>
                    <Route exact path='/' component={ShortHistory}/>
                        {/*<Route path='/Helpdesk' component={Helpdesk}/>*/}
                    </Col>
                </Grid>
            </Router>
        );
    }
}
export default App;
