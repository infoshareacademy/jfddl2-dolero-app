import React from 'react'
import HistoryMore from './HistoryMore'
import {
    Checkbox,
    FormGroup,
    FormControl,
    Table,
    Grid,
    Col,
    Form,
    Row,
    Button

} from 'react-bootstrap'
import {DateRangePicker} from 'react-dates';
import MultiSelectField from './Multiselect'
import 'react-select/dist/react-select.css';
import './History.css';
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import {
    Route,
} from 'react-router-dom'
import {database} from "../firebase";

var moment = require('moment');


const categories = [
    {
        label: 'Jedzenie',
        value: 'Jedzenie'
    },
    {
        label: 'Mieszkanie',
        value: 'Mieszkanie'
    },
    {
        label: 'Inne opłaty i rachunki',
        value: 'Inne opłaty i rachunki'
    },
    {
        label: 'Zdrowie, higiena i chemia',
        value: 'Zdrowie higiena i chemia'
    },
    {
        label: 'Ubranie',
        value: 'Ubranie'
    },
    {
        label: 'Relaks',
        value: 'Relaks'
    },
    {
        label: 'Transport',
        value: 'Transport'
    },
    {
        label: 'Inne wydatki',
        value: 'Inne wydatki'
    },
]




class History extends React.Component {



    state = {
        startDate: moment().startOf('month'),
        endDate: moment(),
        selectedCategories: [],
        records: [],
        currentSearchPhrase: '',
        isCyclic: false,
        value: {min: 0, max: 100},
        link: 0
    }

    componentDidMount() {

        database.ref('/Piotr/spendings').on('value', (snapshot) => {
            this.setState({
                records: Object.values(snapshot.val()) || []
            }, () => this.setState({
                value: {min:0, max: this.getMaxValue()}
            }))
            console.log('records', this.state.records)

        })
    }

    getMaxValue = () => (
        this.state.records.reduce((max, next) =>
            Math.max(max, parseInt(next.value))

            , 0

        ))

    urlChangeByRow = (record) => {

        window.history.pushState('page2', 'Title', '/history/'+record)
        this.setState({
            link: record
        })

    }
    handleSelectedCategoriesChange = value => {
        this.setState({
            selectedCategories: value
        })
    }


    handleSearchPhraseChange = event => {
        this.setState({
            currentSearchPhrase: event.target.value
        })
    }




    handleRemoveRecord = event => {
        const recordId = event.target.dataset.recordId

        this.setState({
            records: this.state.records.filter(
                record =>record.id != recordId
            )
        })
        //     () => {
        //     localStorage.setItem('spendings', JSON.stringify(this.state.records))
        // })
    }


    handleIsCyclicChange = event => {
        this.state.isCyclic === false ?
            (this.setState({
                isCyclic: true
            })) : (this.setState({
                isCyclic: false
            }))
    }


    render() {

        return (
            <Grid id='history' className='history'>
                <Row>

                    <Col md={5}>
                        <Row id='row'>
                            <Col md={3}>
                                <h4>Opis</h4>
                            </Col>
                            <Col md={2} mdOffset={6}>
                                <Checkbox onChange={this.handleIsCyclicChange}>
                                    Cykliczne
                                </Checkbox>
                            </Col>
                            <Form>
                                <FormGroup controlId="formHorizontalText">
                                    <FormControl placeholder="Opisz czego szukasz"
                                                 onChange={this.handleSearchPhraseChange}
                                                 value={this.state.currentSearchPhrase}
                                                 type="text"/>

                                </FormGroup>

                            </Form>

                        </Row>
                    </Col>


                    <Col md={5} mdOffset={1}>
                        <h4>Zakres cen</h4>

                        <FormGroup className='slider' controlId="formHorizontalText">
                            <InputRange
                                maxValue={this.getMaxValue()}
                                minValue={0}
                                value={this.state.value }
                                onChange={value => this.setState({value})}/>

                        </FormGroup>

                    </Col>

                </Row>
                <Row>
                    <Col md={5}>
                        <h4>Zakres dat</h4>
                        <DateRangePicker
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}

                            isOutsideRange={() => false}
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

                            <Row>

                                <Col md={12}>


                                    <MultiSelectField
                                        value={this.state.selectedCategories}
                                        onChange={this.handleSelectedCategoriesChange}
                                        options={categories}

                                    />


                                </Col>
                            </Row>

                        </Form>
                    </Col>
                </Row>
                <Row>

                    <Col md={12}>
                        <h3 className="recordsList">Historia wydatków</h3>

                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>Kategoria</th>
                                <th>Kwota</th>
                                <th>Data</th>

                            </tr>
                            </thead>

                            {
                                this.state.records.filter(
                                    record =>
                                        this.state.selectedCategories.length === 0 ?
                                            true :
                                            this.state.selectedCategories.some(
                                                category => category.value === record.spendingCategory
                                            )
                                )
                                    .filter(
                                    record => this.state.isCyclic === false ? true : (record.isCyclic === true)
                                ).filter(
                                    record => record.spending.includes(this.state.currentSearchPhrase)
                                ).filter(
                                    record => parseInt(record.value, 10) <= this.state.value.max && parseInt(record.value, 10) >= this.state.value.min
                                ).filter(
                                    record => Date.parse(record.spendingDate) >= (Date.parse(this.state.startDate) - 43200000)
                                        && Date.parse(record.spendingDate) <= (Date.parse(this.state.endDate) + 43200000)
                                )
                                    .map(
                                        (record, index) => (
                                            <tbody>

                                            <tr key={record.id} data-href='/asd'
                                                onClick={() =>{this.urlChangeByRow(record.id)}}>
                                                <td>{record.spendingCategory}</td>
                                                <td>{record.value}</td>
                                                <td>{record.spendingDate}</td>
                                                <td style={{width:'3vw'}}
                                                ><Button onClick={this.handleRemoveRecord}
                                                            data-record-id={record.id} bsStyle="danger"
                                                            bsSize="xsmall"

                                                >Usuń</Button></td>

                                            </tr>
                                            { this.state.link===record.id &&
                                            <Route path="/history/:recordId" render={() => {
                                                return <HistoryMore record={record}/>
                                            }}/>
                                            }

                                            </tbody>

                                )
                                )}


                        </Table>
                    </Col>

                </Row>
            </Grid>

        )
    }
}


export default History


