import React from 'react';
import {Panel} from 'react-bootstrap'
import {Grid, Row, Col} from 'react-bootstrap'
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {PieChart, Pie} from 'recharts'

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
]

const data01 = [{name: "abc", value: 3}];

const data02 = [{name: 'A1', value: 100},
    {name: 'A2', value: 300},
    {name: 'B1', value: 100},
    {name: 'B2', value: 80},
    {name: 'B3', value: 40},
    {name: 'B4', value: 30},
    {name: 'B5', value: 50},
    {name: 'C1', value: 100},
    {name: 'C2', value: 200},
    {name: 'D1', value: 150},
    {name: 'D2', value: 50}]

const transactions = [
    {amount: 300, category: "food", date: new Date(2017, 9, 9)},
    {amount: -400, category: "food", date: new Date(2017, 9, 9)},
    {amount: 3500, category: "food", date: new Date(2017, 9, 9)},
    {amount: 200, category: "food", date: new Date(2017, 9, 10)},
    {amount: -500, category: "food", date: new Date(2017, 9, 10)},
    {amount: 3500, category: "food", date: new Date(2017, 9, 11)},
    {amount: 700, category: "food", date: new Date(2017, 9, 11)}
];


let spendings = JSON.parse(localStorage.getItem('spendings') || '[]')

function getPieChart(spendings) {
    return spendings.map(function (spending) {
        return {name: spending.spendingCategory, value: spending.value}
    })
}

function getBalance(date, transactions) {
    return transactions.filter(function (transaction) {
        return transaction.date.getDate() <= date.getDate()
    }).map(function (transaction) {
        return transaction.amount
    }).reduce((p1, p2) => {
        return p1 + p2
    }, 0)
}

function getIncome(date, transactions) {
    return transactions.filter(function (transaction) {
        return transaction.date.getDate() === date.getDate() && transaction.amount > 0
    }).map(function (transaction) {
        return transaction.amount
    }).reduce((p1, p2) => {
        return p1 + p2
    }, 0)
}


function getExpenses(date, transactions) {
    return transactions.filter(function (transaction) {
        return transaction.date.getDate() === date.getDate() && transaction.amount < 0
    }).map(function (transaction) {
        return transaction.amount
    }).reduce((p1, p2) => {
        return p1 + p2
    }, 0)
}

function getTransactions(date, transactions) {
    return transactions.filter(function (transaction) {
        return transaction.date.getDate() === date.getDate()
    }).length
}

class Diagrams extends React.Component {
    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        currentBalance: 0,
        totalTransactions: 0,
        totalExpenses: 0,
        totalIncome: 0,
    };


    render() {
        return (
            <div style={{marginLeft: 15 + "px"}}>
                <h1>Overview/charts</h1>
                <Grid>
                    <Row className="show-grid" style={{marginRight: -90 + "px"}}>
                        <Col md={2} mdOffset={6}>
                            <DateRangePicker
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onDatesChange={({startDate, endDate}) => {
                                    this.setState({
                                        startDate: startDate,
                                        endDate: endDate,
                                        currentBalance: getBalance(startDate._d, transactions),
                                        totalIncome: getIncome(startDate._d, transactions),
                                        totalTransactions: getTransactions(startDate._d, transactions),
                                        totalExpenses: getExpenses(startDate._d, transactions)
                                    })
                                }}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({focusedInput})}/>
                        </Col>
                    </Row>

                    <Row className="show-grid" style={{marginRight: -90 + "px"}}>
                        <Col md={2}>
                            <Panel header="Current balance">
                                {this.state.currentBalance}
                            </Panel>
                        </Col>
                        <Col md={2}>
                            <Panel header="Total transactions">
                                <div>
                                    {this.state.totalTransactions}
                                </div>
                            </Panel>
                        </Col>
                        <Col md={2}>
                            <Panel header="Total expenses">
                                <div>
                                    {this.state.totalExpenses}
                                </div>
                            </Panel>
                        </Col>
                        <Col md={2}>
                            <Panel header="Total income">
                                <div>
                                    {this.state.totalIncome}
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
                <PieChart width={800} height={400}>
                    <Pie data={getPieChart(spendings)} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label/>
                    <Tooltip/>
                </PieChart>

            </div>
        )
    }
}

export default Diagrams