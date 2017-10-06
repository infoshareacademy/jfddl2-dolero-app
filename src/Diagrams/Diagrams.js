import React from 'react';
import {Panel} from 'react-bootstrap'
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Diagrams extends React.Component {
    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        currentBalance: 0,
        totalTransations: 0,
        totalExpences: 0,
        totalIncome: 0,
        bankHistory: [
            {currentBalance: 2100, totalIncome:2100, totalTransations: 1, data: 1},
            {currentBalance: 2200, totalIncome:100, data: 2},
            {currentBalance: 2300, totalIncome:100, data: 3},
            {currentBalance: 2400, totalIncome:100, data: 4}
        ],
    };
    render() {
        return (
            <div>
                <h1>Overview/charts</h1>
                <DateRangePicker
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDatesChange={({startDate, endDate}) => {
                        const element = this.state.bankHistory.filter(function (element) {
                            return element.data === 1
                        })[0];
                        console.log(element);
                        this.setState({
                            currentBalance: element.currentBalance,
                            totalIncome: element.totalIncome
                        })
                    }}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => this.setState({focusedInput})}
                />
                <div>
                    <Panel header="Panel heading without title">
                        <div>
                            Current balance: {this.state.currentBalance}
                        </div>
                    </Panel>
                </div>
                <div>
                    <Panel header="Panel heading without title">
                        <div>
                            Total transations: {this.state.totalTransations}
                        </div>
                    </Panel>
                </div>
                <div>
                    <Panel header="Panel heading without title">
                        <div>
                            Total expences: {this.state.totalExpences}
                        </div>
                    </Panel>
                </div>
                <div>
                    <Panel header="Panel heading without title">
                        <div>
                            Total income: {this.state.totalIncome}
                        </div>
                    </Panel>
                </div>
            </div>
        )
    }
}

export default Diagrams