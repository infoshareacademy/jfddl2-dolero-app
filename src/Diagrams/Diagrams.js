import React from 'react';
import {Panel} from 'react-bootstrap'
import {Grid, Row, Col} from 'react-bootstrap'
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {PieChart, Pie, Tooltip, LineChart, XAxis, YAxis, CartesianGrid, Legend, Line, Cell} from 'recharts'
import moment from 'moment'
import {connect} from 'react-redux'
import {database, auth} from '../firebase'
import './style.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00F86A', '#FC840D'];

class Diagrams extends React.Component {
    state = {
        startDate: moment().startOf('month'),
        endDate: moment(),
        currentBalance: 0,
        totalTransactions: 0,
        totalExpenses: 0,
        totalIncome: 0,
        chartData: [],
        dailyBalance: []
    };

    componentDidMount() {
        this.getBalanceFromFirebase(moment().startOf('month'), moment())
        this.getTotalTransactionFromFirebase(moment().startOf('month'), moment())
        this.getExpensesFromFirebase(moment().startOf('month'), moment())
        this.getIncomeFromFirebase(moment().startOf('month'), moment())
        this.getPieChart();
        this.getDailyBalanceFromFirebase(moment().startOf('month'), moment())
        console.log(this.state.records)
    }

    getBalanceFromFirebase(startDate, endDate) {
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
            return result + parseInt(income.value, 10)
        }, 0);
        const expenses = spendings.filter(function (spending) {
            let spendingDate = moment(spending.spendingDate, "DD-MM-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).reduce((result, spending) => {
            return (result - parseInt(spending.value, 10))
        }, 0);
        this.setState({currentBalance: income + expenses})
    }

    getTotalTransactionFromFirebase(startDate, endDate) {
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

    getExpensesFromFirebase(startDate, endDate) {
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

    getIncomeFromFirebase(startDate, endDate) {
        database.ref(`/users/${auth.currentUser.uid}/incomings`).on('value', (incomingsSnapshot) => {
            this.getIncome(startDate, endDate, Object.values(incomingsSnapshot.val() || []))
        })
    }

    getIncome(startDate, endDate, incomings) {
        const income = incomings.filter(function (incoming) {
            const spendingDate = moment(incoming.incomingDate, "DD-MM-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).reduce((result, income) => {
            return result + parseInt(income.value, 10)
        }, 0);
        this.setState({totalIncome: income})
    }


    getDailyBalanceFromFirebase(startDate, endDate) {
        database.ref(`/users/${auth.currentUser.uid}/incomings`).on('value', (incomingsSnapshot) => {
            database.ref(`/users/${auth.currentUser.uid}/spendings`).on('value', (spendingsSnapshot) => {

                let transformedSpendings = Object.values(spendingsSnapshot.val() || []).filter(spending => {
                    const spendingDate = moment(spending.spendingDate, "DD-MM-YYYY");
                    return spendingDate.isBetween(startDate, endDate)
                }).map(function (spending) {
                    return {
                        category: spending.spendingCategory,
                        date: spending.spendingDate,
                        value: "-" + spending.value
                    };
                })
                let transformedIncomings = Object.values(incomingsSnapshot.val() || []).filter(incoming => {
                    const incomingDate = moment(incoming.incomingDate, "DD-MM-YYYY");
                    return incomingDate.isBetween(startDate, endDate)
                }).map(function (incoming) {
                    return {
                        category: incoming.incomingCategory,
                        date: incoming.incomingDate,
                        value: incoming.value
                    };
                })

                let balanceByDay = new Map();

                let transformedAll = transformedSpendings.concat(transformedIncomings)
                if (transformedAll.length > 0) {
                    transformedAll = transformedAll.sort((transformA, transformB) => {
                        return moment(transformA.date, "DD-MM-YYYY").diff(moment(transformB.date, "DD-MM-YYYY"))
                    })

                    let previousDate = moment(transformedAll[0].date, "DD-MM-YYYY");

                    transformedAll.forEach(function (transformed) {

                        let actualDate = transformed.date;
                        let actualValue = transformed.value;

                        if (balanceByDay.has(actualDate)) {
                            let newVal = balanceByDay.get(actualDate) + parseInt(actualValue, 10);
                            balanceByDay.set(actualDate, newVal);
                        } else {
                            let previousValue = 0;
                            let actualMoment = moment(actualDate, "DD-MM-YYYY");
                            if (!previousDate.isSame(actualMoment)) {
                                let dateInBalanceByDayKeyFormat = moment(previousDate).format('DD.MM.YYYY');
                                previousValue = balanceByDay.get(dateInBalanceByDayKeyFormat)
                                previousDate = actualMoment
                            }
                            balanceByDay.set(actualDate, parseInt(actualValue, 10) + previousValue)
                        }
                    })
                }
                this.setState({
                    dailyBalance: Array.from(balanceByDay).map(array => {
                        return {name: array[0], value: Number(array[1])};
                    })
                })

            })
        })
    }


    getPieChart() {
        database.ref(`/users/${auth.currentUser.uid}/spendings`).on('value', (spendingsSnapshot) => {
            let byCategories = new Map();
            Object.values(spendingsSnapshot.val() || []).forEach(function (spending) {
                if (byCategories.has(spending.spendingCategory)) {
                    let newVal = byCategories.get(spending.spendingCategory) + parseInt(spending.value, 10);
                    byCategories.set(spending.spendingCategory, newVal);
                } else {
                    byCategories.set(spending.spendingCategory, parseInt(spending.value, 10))
                }
            });
            this.setState({
                chartData: Array.from(byCategories).map(array => {
                    return {name: array[0], value: Number(array[1])};
                })
            })
        })
    }

    render() {
        return (
            <div className='diagrams' style={{marginLeft: 15 + "px"}}>
                <Grid>
                    <Row className="show-grid">
                        <Col md={6} mdOffset={9}>
                             <h4 className="header">Zakres dat</h4>
                            {<DateRangePicker md={6}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                isOutsideRange={() => false}
                                onDatesChange={({startDate, endDate}) => {
                                    this.getBalanceFromFirebase(startDate, endDate)
                                    this.getTotalTransactionFromFirebase(startDate, endDate)
                                    this.getExpensesFromFirebase(startDate, endDate)
                                    this.getIncomeFromFirebase(startDate, endDate)
                                    this.getDailyBalanceFromFirebase(startDate, endDate)
                                    this.setState({
                                        startDate: startDate,
                                        endDate: endDate,
                                    })
                                }}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({focusedInput})}/>}
                        </Col>
                    </Row>
                        <br/>
                    <Row>
                        <Col md={3}>
                            <Panel header="Balans">
                                <span>{this.state.currentBalance}</span>
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="Ilość transakcji">
                                <div>
                                    <span>{this.state.totalTransactions}</span>
                                </div>
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="Suma wydatków">
                                <div>
                                    <span>{this.state.totalExpenses}</span>
                                </div>
                            </Panel>
                        </Col>
                        <Col md={3}>
                            <Panel header="Suma przychodów">
                                <div>
                                    <span>{this.state.totalIncome}</span>
                                </div>
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Panel header="Bilans">
                                <LineChart width={500} height={400} data={this.state.dailyBalance}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <Tooltip/>
                                    <Legend/>
                                    <Line type="monotone" dataKey="value" stroke="#82ca9d"/>
                                </LineChart>
                            </Panel>
                        </Col>
                        <Col md={6}>
                            <Panel header="Suma wydatków">
                                <PieChart width={450} height={400}>
                                    <Pie data={this.state.chartData} startAngle={360} endAngle={0} cx={200} cy={200}
                                         fill="#8884d8"
                                         label>{
                                    this.state.chartData.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                                } </Pie>
                                    <Tooltip/>
                                </PieChart>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>


            </div>
        )
    }
}

const mapStateToProps = state => {
    let records = Object.entries(state.history.spendings || {}).map(([key, val]) => ({
        test: 'test',
        ...val,
        id: key
    })) || []
    return {
        records,
    }
}

export default connect(
    mapStateToProps
)(Diagrams)