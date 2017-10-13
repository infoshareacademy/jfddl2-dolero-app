import React from 'react';
import {Panel} from 'react-bootstrap'
import {Grid, Row, Col} from 'react-bootstrap'
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import {PieChart, Pie, Tooltip} from 'recharts'


class Diagrams extends React.Component {
    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        currentBalance: this.getBalance(new Date(), JSON.parse(localStorage.getItem('spendings') || '[]')),
        // wartość zwrócona z this.getBalance(new Date()) jest przypisana jako wartość inicjalna currentBalance
        totalTransactions: JSON.parse(localStorage.getItem('spendings') || '[]').length,
        totalExpenses: this.getExpenses(new Date(), JSON.parse(localStorage.getItem('spendings') || '[]')),
        totalIncome: this.getIncome(new Date(), JSON.parse(localStorage.getItem('spendings') || '[]')),
        spendings: JSON.parse(localStorage.getItem('spendings') || '[]')
    };

//paramatetry w funkcji pełnią rolę elementów przekazanych z zewnątrz do funkcji i są wymagane przez funkcje//
   getBalance(date, spendings) {
        return spendings.filter(function (spending) {
            let splittedDate = spending.spendingDate.split('/');
            let dateFromTransaction = new Date(splittedDate[2], splittedDate[0] - 1, splittedDate[1]);
            return dateFromTransaction.getDate() <= date.getDate()
        }).reduce((result, spending) => {
            return result + parseInt(spending.value)
        }, 0)
    }

    getTotalTransaction() {
        return JSON.parse(localStorage.getItem('spendings') || '[]').length
    }

    getExpenses(date, spendings) {
        return spendings.filter(function (spending) {
            let splittedDate = spending.spendingDate.split('/');
            let dateFromTransaction = new Date(splittedDate[2], splittedDate[0] - 1, splittedDate[1]);
            return dateFromTransaction.getDate() === date.getDate() && parseInt(spending.value) < 0
        }).reduce((result, spending) => {
            return result + parseInt(spending.value)
        }, 0)
    }

    getIncome(date,spendings) {
        return spendings.filter(function (spending) {
            let splittedDate = spending.spendingDate.split('/');
            let dateFromTransaction = new Date(splittedDate[2], splittedDate[0] - 1, splittedDate[1]);
            return dateFromTransaction.getDate() === date.getDate() && parseInt(spending.value) > 0
        }).reduce((result, spending) => {
            return result + parseInt(spending.value)
        }, 0)
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
                                        currentBalance: this.getBalance(startDate._d, this.state.spendings),
                                        //wartość currentBalance zostaje zmieniona na date
                                        totalIncome: this.getIncome(startDate._d, this.state.spendings),
                                        // totalTransactions: getTotalTransaction(startDate._d, transactions),
                                         totalExpenses: this.getExpenses(startDate._d, this.state.spendings)
                                    })
                                }}
                                focusedInput={this.state.focusedInput}
                                onFocusChange={focusedInput => this.setState({focusedInput})}/>
                        </Col>
                    </Row>

                    <Row className="show-grid" style={{marginRight: -90 + "px"}}>
                        <Col md={2}>
                            <Panel header="Current balance">
                                <span>{this.state.currentBalance}</span>
                            </Panel>
                        </Col>
                        <Col md={2}>
                            <Panel header="Total transactions">
                                <div>
                                    <span>{this.state.totalTransactions}</span>
                                </div>
                            </Panel>
                        </Col>
                        <Col md={2}>
                            <Panel header="Total expenses">
                                <div>
                                    <span>{this.state.totalExpenses}</span>
                                </div>
                            </Panel>
                        </Col>
                        <Col md={2}>
                            <Panel header="Total income">
                                <div>
                                    <span>{this.state.totalIncome}</span>
                                </div>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
                <PieChart width={800} height={400}>
                    <Pie data={this.getPieChart(this.state.spendings)} startAngle={360} endAngle={0} cx={200} cy={200} fill="#8884d8"
                         label/>
                    <Tooltip/>
                </PieChart>

            </div>
        )
    }
}

export default Diagrams