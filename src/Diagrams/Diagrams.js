import React from 'react';
import {Panel} from 'react-bootstrap'
import {Grid, Row, Col} from 'react-bootstrap'
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {PieChart, Pie, Tooltip} from 'recharts'

// todo przerobić pozostałe funkcje aby działały ze spendings
// todo spięcie logiki działania ze state

const transactions = [
    {amount: 300, category: "food", date: new Date(2017, 9, 9)},
    {amount: -400, category: "food", date: new Date(2017, 9, 9)},
    {amount: 3500, category: "food", date: new Date(2017, 9, 9)},
    {amount: 200, category: "food", date: new Date(2017, 9, 10)},
    {amount: -500, category: "food", date: new Date(2017, 9, 10)},
    {amount: 3500, category: "food", date: new Date(2017, 9, 11)},
    {amount: 700, category: "food", date: new Date(2017, 9, 11)}
];

let spendings = JSON.parse(localStorage.getItem('spendings') || '[]');

function getPieChart(spendings) {
    // 'jedzenie': 300
    // 'wszystkie wydatki': 89
    // 'jedzenie': 600
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    let byCategoriesMap = new Map();
    spendings.forEach(function (spending) {
        if(byCategoriesMap.has(spending.spendingCategory)) { //jezeli by categoriesMap zawiera kategorie z obiektu spending
            //to byCategoriesMap.get zwraca przechowywaną wartość dla kategorii z obiektu spending
            //nastepnie dodaje do wyżej wymienionej wartosci spending.value
            let newValue = byCategoriesMap.get(spending.spendingCategory) + spending.value;
            //w byCategoriesMap jest podmieniana wartość dla kategorii z obiektu spending
            byCategoriesMap.set(spending.spendingCategory, newValue);
        } else {//jezeli by categoriesMap nie zawiera kategorie z obiektu spending
            //to w byCategoriesMap ustawiana jest wartość dla spending category
            byCategoriesMap.set(spending.spendingCategory, spending.value)
        }
    });
    return Array.from(byCategoriesMap).map(array => {
        return {name: array[0], value: Number(array[1])};
    });
}


function getBalance(date, spendings) {
    return spendings.filter(function (spending) {
        return getDateFromSpending(spending).getDate() <= date.getDate()
    }).map(function (spending) {
        return spending.value
    }).reduce((p1, p2) => {
        return Number(p1) + Number(p2)
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

function getDateFromSpending(spending) {
    let splittedDate = spending.spendingDate.split('/');
    return new Date(splittedDate[2], splittedDate[0] - 1, splittedDate[1]);
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
                                isOutsideRange={() => false}
                                onDatesChange={({startDate, endDate}) => {
                                    this.setState({
                                        startDate: startDate,
                                        endDate: endDate,
                                        currentBalance: getBalance(startDate._d, spendings),
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
                <PieChart width={800} height={400}>
                    <Pie data={getPieChart(spendings)} startAngle={360} endAngle={0} cx={200} cy={200} fill="#8884d8" label/>
                    <Tooltip/>
                </PieChart>

            </div>
        )
    }
}

export default Diagrams