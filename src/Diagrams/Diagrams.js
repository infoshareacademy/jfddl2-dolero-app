import React from 'react';
import {Panel} from 'react-bootstrap'
import {Grid, Row, Col} from 'react-bootstrap'
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {PieChart, Pie, Tooltip} from 'recharts'
import moment from 'moment'

const spendings = JSON.parse(localStorage.getItem('spendings') || '[]');
const incomings = JSON.parse(localStorage.getItem('incomings') || '[]');

class Diagrams extends React.Component {
    state = {
        startDate: moment().startOf('month'),
        endDate: moment(),
        currentBalance: this.getBalance(moment().startOf('month'), moment(), spendings, incomings),
        totalTransactions: this.getTotalTransaction(moment().startOf('month'), moment(), spendings, incomings),
        totalExpenses: this.getExpenses(moment().startOf('month'), moment(), spendings),
        totalIncome: this.getIncome(moment().startOf('month'), moment(), incomings)
    };

//paramatetry w funkcji pełnią rolę elementów przekazanych z zewnątrz do funkcji i są wymagane przez funkcje//
    getBalance(startDate, endDate, spendings, incomings) {
        const income = incomings.filter(function (incoming) {
            let spendingDate = moment(incoming.incomingDate, "MM-DD-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).reduce((result, income) => {
            return result + parseInt(income.value)
        }, 0);
        const expenses = spendings.filter(function (spending) {
            let spendingDate = moment(spending.spendingDate, "MM-DD-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).reduce((result, spending) => {
            return (result - parseInt(spending.value))
        }, 0);
        return income + expenses
    }

    getTotalTransaction(startDate, endDate, spendings, incomings) {
        const spendingsCount = spendings.filter(function (spending) {
            const spendingDate = moment(spending.spendingDate, "MM-DD-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).length;
        const incomingsCount = incomings.filter(function (incoming) {
            const spendingDate = moment(incoming.incomingDate, "MM-DD-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).length;
        return spendingsCount + incomingsCount
    }

    getExpenses(startDate, endDate, spendings) {
        const expenses = spendings.filter(function (spending) {
            const spendingDate = moment(spending.spendingDate, "MM-DD-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).reduce((result, spending) => {
            return (result - parseInt(spending.value))
        }, 0);
        return expenses
    }

    getIncome(startDate, endDate, incomings) {
        const income = incomings.filter(function (incoming) {
            const spendingDate = moment(incoming.incomingDate, "MM-DD-YYYY");
            return spendingDate.isBetween(startDate, endDate)
        }).reduce((result, income) => {
            return result + parseInt(income.value)
        }, 0);
        return income
    }


    getPieChart(spendings) {
        let byCategories = new Map();
        spendings.forEach(function (spending) {
            if (byCategories.has(spending.spendingCategory)) {
                let newVal = byCategories.get(spending.spendingCategory) + parseInt(spending.value);
                byCategories.set(spending.spendingCategory, newVal);
            } else {
                byCategories.set(spending.spendingCategory, parseInt(spending.value))
            }
        });
        return Array.from(byCategories).map(array => {
            return {name: array[0], value: Number(array[1])};
        });
    }

    render() {
        return (
            <div style={{marginLeft: 15 + "px"}}>
                <h1>Diagramy</h1>
                <Grid>
                    <Row className="show-grid" style={{marginRight: -90 + "px"}}>
                        <Col md={2} mdOffset={6}>
                            {/*<DateRangePicker
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                isOutsideRange={() => false}
                                onDatesChange={({startDate, endDate}) => {
                                    this.setState({
                                        startDate: startDate,
                                        endDate: endDate,
                                        currentBalance: this.getBalance(startDate, endDate, spendings, incomings),
                                        totalTransactions: this.getTotalTransaction(startDate, endDate, spendings, incomings),
                                        totalExpenses: this.getExpenses(startDate, endDate, spendings),
                                        totalIncome: this.getIncome(startDate, endDate, incomings)
                                    })
                                }}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({focusedInput})}/>*/}
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
                    <Pie data={this.getPieChart(spendings)} startAngle={360} endAngle={0} cx={200} cy={200}
                         fill="#8884d8"
                         label/>
                    <Tooltip/>
                </PieChart>

            </div>
        )
    }
}

export default Diagrams