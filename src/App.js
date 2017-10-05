import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import {
    Grid
} from 'react-bootstrap'
import './App.css';
import Sidebar from "./Sidebar";
// import Diagrams from "./Diagrams";
// import Diagrams from "./ShortHistory";

import History from "./History/History";
import MainMenu from './MainMenu'

class App extends Component {
    render() {
        return (
            <Router>
                <Grid>

                    <Sidebar/>
                    <MainMenu/>
                    <Route path='/history' component={History}/>
                    {/*<Route path='/diagrams' component={Diagrams}/>*/}
                    {/*<Route path='/shorthistory' component={ShortHistory}/>*/}

                </Grid>
            </Router>
        );
    }
}


export default App;
