import React from 'react';
import {Panel} from 'react-bootstrap'
import {Grid, Row, Col} from 'react-bootstrap'
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {PieChart, Pie, Tooltip} from 'recharts'
import moment from 'moment'
import {database, auth} from '../firebase'

class   Diagrams extends React.Component {
    state = {
        startDate: moment().startOf('month'),
        endDate: moment(),
        currentBalance: 0,
        totalTransactions: 0,
        totalExpenses: 0,
        totalIncome: 0,
        chartData: []
    };

    componentDidMount() {
        this.getBalanceFromFirebase(moment().startOf('month'), moment())
        this.getTotalTransactionFromFirebase(moment().startOf('month'), moment())
        this.getExpensesFromFirebase(moment().startOf('month'), moment())
        this.getIncomeFromFirebase(moment().startOf('month'), moment())
        this.getPieChart();
    }

    getBalanceFromFirebase(startDate, endDate){
        database.ref(`/users/${auth.currentUser.uid}/incomings`).on('value', (incomingsSnapshot) => {
            database.ref(`/users/${auth.currentUser.uid}/spendings`).on('value', (spendingsSnapshot) => {
                this.getBalance(startDate, endDate,
                    Object.values(spendingsSnapshot.val() || []),
                    Object.values(incomingsSnapshot.val() || []))
            })
        })
    }

//paramatetry w funkcji pełnią rolę elementów przekazanych z zewnątrz do funkcji i są wymagane przez funkcje//
    getBalance(startDate, endDate, spendings, incomings) {
        const income = incomings.filter(function (incoming) {
            let spendingDate = moment(incoming.incomingDate, "DD-MM-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).reduce((result, income) => {
            return result + parseInt(income.value,10)
        }, 0);
        const expenses = spendings.filter(function (spending) {
            let spendingDate = moment(spending.spendingDate, "DD-MM-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).reduce((result, spending) => {
            return (result - parseInt(spending.value,10))
        }, 0);
        this.setState({currentBalance: income + expenses})
    }

    getTotalTransactionFromFirebase(startDate, endDate){
        database.ref(`/users/${auth.currentUser.uid}/incomings`).on('value', (incomingsSnapshot) => {
            database.ref(`/users/${auth.currentUser.uid}/spendings`).on('value', (spendingsSnapshot) => {
                this.getTotalTransaction(startDate, endDate, Object.values(spendingsSnapshot.val() || []), Object.values(incomingsSnapshot.val() || []))
            })
        })
    }

    getTotalTransaction(startDate, endDate, spendings, incomings) {
        const spendingsCount = spendings.filter(function (spending) {
            const spendingDate = moment(spending.spendingDate, "DD-MM-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).length;
        const incomingsCount = incomings.filter(function (incoming) {
            const spendingDate = moment(incoming.incomingDate, "DD-MM-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).length;
        this.setState({totalTransactions: incomingsCount + spendingsCount})
    }

    getExpensesFromFirebase(startDate, endDate){
            database.ref(`/users/${auth.currentUser.uid}/spendings`).on('value', (spendingsSnapshot) => {
                this.getExpenses(startDate, endDate, Object.values(spendingsSnapshot.val() || []))
            })
    }

    getExpenses(startDate, endDate, spendings) {
        const expenses = spendings.filter(function (spending) {
            const spendingDate = moment(spending.spendingDate, "DD-MM-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).reduce((result, spending) => {
            return (result - parseInt(spending.value, 10))
        }, 0);
        this.setState({totalExpenses: expenses})
    }

    getIncomeFromFirebase(startDate, endDate){
        database.ref(`/users/${auth.currentUser.uid}/incomings`).on('value', (incomingsSnapshot) => {
            this.getIncome(startDate, endDate, Object.values(incomingsSnapshot.val() || []))
        })
    }

    getIncome(startDate, endDate, incomings) {
        const income = incomings.filter(function (incoming) {
            const spendingDate = moment(incoming.incomingDate, "DD-MM-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).reduce((result, income) => {
            return result + parseInt(income.value,10)
        }, 0);
        this.setState({totalIncome: income})
    }

    getPieChart() {
        database.ref(`/users/${auth.currentUser.uid}/spendings`).on('value', (spendingsSnapshot) => {
            let byCategories = new Map();
            Object.values(spendingsSnapshot.val() || []).forEach(function (spending) {
                if (byCategories.has(spending.spendingCategory)) {
                    let newVal = byCategories.get(spending.spendingCategory) + parseInt(spending.value,10);
                    byCategories.set(spending.spendingCategory, newVal);
                } else {
                    byCategories.set(spending.spendingCategory, parseInt(spending.value,10))
                }
            });
            this.setState({chartData: Array.from(byCategories).map(array => {
                return {name: array[0], value: Number(array[1])};
            })})
        })
    }

    render() {
        return (
            <div style={{marginLeft: 15 + "px"}}>
                <h1>Diagramy</h1>
                <Grid>
                    <Row className="show-grid" style={{marginRight: -90 + "px"}}>
                        <Col md={2} mdOffset={6}>
                            {<DateRangePicker
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                isOutsideRange={() => false}
                                onDatesChange={({startDate, endDate}) => {
                                    this.getBalanceFromFirebase(startDate, endDate)
                                    this.getTotalTransactionFromFirebase(startDate, endDate)
                                    this.getExpensesFromFirebase(startDate, endDate)
                                    this.getIncomeFromFirebase(startDate, endDate)
                                    this.setState({
                                        startDate: startDate,
                                        endDate: endDate,
                                    })
                                }}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({focusedInput})}/>}
                        </Col>
                    </Row>

                    <Row className="show-grid" style={{marginRight: -90 + "px"}}>
                        <Col md={2}>
                            <Panel header="Balans">
                                <span>{this.state.currentBalance}</span>
                            </Panel>
                        </Col>
                        <Col md={2}>
                            <Panel header="Ilość transakcji">
                                <div>
                                    <span>{this.state.totalTransactions}</span>
                                </div>
                            </Panel>
                        </Col>
                        <Col md={2}>
                            <Panel header="Suma wydatków">
                                <div>
                                    <span>{this.state.totalExpenses}</span>
                                </div>
                            </Panel>
                        </Col>
                        <Col md={2}>
                            <Panel header="Suma przychodów">
                                <div>
                                    <span>{this.state.totalIncome}</span>
                                </div>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
                <PieChart width={800} height={400}>
                    <Pie data={this.state.chartData} startAngle={360} endAngle={0} cx={200} cy={200}
                         fill="#8884d8"
                         label/>
                    <Tooltip/>
                </PieChart>

            </div>
        )
    }
}

export default Diagrams