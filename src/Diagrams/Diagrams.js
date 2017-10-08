import React from 'react';
import {Panel} from 'react-bootstrap'
import {Grid, Row, Col} from 'react-bootstrap'
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
]

class Diagrams extends React.Component {
    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        currentBalance: 0,
        totalTransactions: 0,
        totalExpences: 0,
        totalIncome: 0,
        bankHistory: [
            {currentBalance: 2100, totalIncome: 2100, totalTransactions: 1, data: 1},
            {currentBalance: 2200, totalIncome: 100, data: 2},
            {currentBalance: 2300, totalIncome: 100, data: 3},
            {currentBalance: 2400, totalIncome: 100, data: 4}
        ],
    };

    render() {
        return (
            <div>
                <h1>Overview/charts</h1>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={6} xsOffset={6}>
                            <DateRangePicker
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onDatesChange={({startDate, endDate}) => {
                                    const element = this.state.bankHistory.filter(function (element) {
                                        return element.data === 1
                                    })[0];
                                    console.log(element);
                                    this.setState({
                                        startDate,
                                        endDate,
                                        currentBalance: element.currentBalance,
                                        totalIncome: element.totalIncome
                                    })
                                }}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({focusedInput})}/>
                        </Col>
                    </Row>

                    <Row className="show-grid">
                        <Col md={6} mdPush={6}>
                            <Panel header="Current balance">
                                Current balance: {this.state.currentBalance}
                                {/*<div>
                                </div>*/}
                            </Panel>
                        </Col>
                        <Col md={6} mdPull={6}>
                            <Panel header="Total transactions">
                                <div>
                                    Total transations: {this.state.totalTransations}
                                </div>
                            </Panel>
                        </Col>
                    </Row>

                </Grid>
                    <LineChart width={600} height={300} data={data}
                               margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend/>
                        <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                        <Line type="monotone" dataKey="uv" stroke="#82ca9d"/>
                    </LineChart>
                    )

                </div>
        )
    }
}

export default Diagrams