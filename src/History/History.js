import React from 'react'
import {
    Checkbox,
    FormGroup,
    FormControl,
    Table,
    Grid,
    Col,
    Form,
    Row
} from 'react-bootstrap'
import MultiSelectField from './Multiselect'
import 'react-select/dist/react-select.css';
import {DateRangePicker} from 'react-dates';
import 'react-select/dist/react-select.css';
import './History.css';


let historyRecordss =
    [
        {
            category: 'food',
            price: 3.2,
            describe: 'dinner food',
            isFavorite: false,
            id: 1

        },
        {
            category: 'car',
            price: 100,
            describe: 'tanking',
            isFavorite: false,
            id: 2

        },
        {
            category: 'culture',
            price: 15,
            describe: 'cinema',
            isFavorite: false,
            id: 3
        },
        {
            category: 'alcohol',
            price: 4.5,
            describe: 'evening time',
            isFavorite: false,
            id: 4

        }
    ]

let historyRecords = JSON.parse(localStorage.getItem('spendings') || '[]')
console.log(historyRecords)

class History extends React.Component {
    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        categories: [],
        currentSearchPhrase: '',
        currentMinPrice: 0,
        currentMaxPrice: 999999,
        isCyclic: true,
    }

    handleSearchPhraseChange = event => {
        this.setState({
            currentSearchPhrase: event.target.value
        })
    }
    handleMinPriceChange = event => {
        this.setState({
            currentMinPrice: event.target.value,

        })
        console.log(this.state.categories)

    }
    handleMaxPriceChange = event => {
        this.setState({
            currentMaxPrice: event.target.value,

        })
        console.log(this.state.value)
    }
    // handleCategoryChoice = event => {
    //     this.setState({
    //         categories: event.target.value
    //
    //     })
    // }

    render() {
        return (
            <Grid id='history' className='history'>
                <Row>

                    <Col md={5}>
                        <Row id='row'>
                            <Col md={3}>
                                <h4>Opis</h4>
                            </Col>
                            <Col md={2} mdOffset={7}>
                                <Checkbox>
                                    Cykliczne
                                </Checkbox>
                            </Col>
                            <Form>
                                <FormGroup controlId="formHorizontalText">
                                    <h1>{this.state.currentSearchPhrase}</h1>
                                    <FormControl placeholder="Opisz czego szukasz"
                                                 onChange={this.handleSearchPhraseChange}
                                                 value={this.state.currentSearchPhrase}
                                                 type="text"/>

                                </FormGroup>
                            </Form>
                        </Row>
                    </Col>


                    <Col md={5} mdOffset={1}>
                        <MultiSelectField/>
                    </Col>

                </Row>
                <Row>
                    <Col md={5}>
                        <h4>Zakres dat</h4>
                        <DateRangePicker
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onDatesChange={({startDate, endDate}) => {

                                this.setState({
                                    startDate,
                                    endDate,
                                })
                            }}
                            focusedInput={this.state.focusedInput}
                            onFocusChange={focusedInput => this.setState({focusedInput})}/>
                    </Col>
                    <Col md={5} mdOffset={1}>
                        <Form>
                            <h4>Zakres cen</h4>
                            <Row>

                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalText">

                                        <FormControl placeholder="Cena minimalna"
                                                     onChange={this.handleMinPriceChange}
                                                     value={this.state.currentMinPrice}
                                                     type="number"/>

                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup controlId="formHorizontalText">

                                        <FormControl placeholder="Cena maksymalna"
                                                     onChange={this.handleMaxPriceChange}
                                                     value={this.state.currentMaxPrice}
                                                     type="number"/>

                                    </FormGroup>
                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
                <Row>

                    <Col md={12}>
                        <h3 className="recordsList">Historia</h3>

                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>Kategoria</th>
                                <th>Kwota</th>
                                <th>Data</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                historyRecords && historyRecords.filter(
                                    record => record.spending.includes(this.state.currentSearchPhrase)
                                ).filter(
                                    record => parseInt(record.value) <= this.state.currentMaxPrice && parseInt(record.value) >= this.state.currentMinPrice
                                ).filter(
                                    record => record.isCyclic !== true
                                )
                                //     .filter(
                                //     record => record.spendingDate >= this.state.startDate && record.spendingDate <= this.state.endDate
                                // )
                                    .map(
                                        record => (
                                            <tr key={record.id} onClick={this.moreInfo}>
                                                <td>{record.spendingCategory}</td>
                                                <td>{record.value}</td>
                                                <td>{record.spendingDate}</td>

                                            </tr>
                                        )
                                    )}


                            </tbody>
                        </Table>
                    </Col>

                </Row>
            </Grid>

        )
    }
}


export default History