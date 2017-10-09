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
import {DateRangePicker} from 'react-dates';
import MultiSelectField from './Multiselect'
import 'react-select/dist/react-select.css';
import './History.css';

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


const historyRecords = JSON.parse(localStorage.getItem('spendings') || '[]')
console.log(historyRecords)

class History extends React.Component {
    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        selectedCategories: [],
        records: [],
        currentSearchPhrase: '',
        currentMinPrice: 0,
        currentMaxPrice: 999999,
        isCyclic: true,
    }

    handleSelectedCategoriesChange = value => {
        this.setState({
            selectedCategories: value
        })
    }

    componentDidMount() {
        this.setState({
            records: historyRecords
        })
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

    handleIsCyclicChange = event => {
        this.state.isCyclic === false ?
            (this.setState({
                isCyclic: true
            })) : (this.setState({
                isCyclic: false
            }))
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
                                <Checkbox onChange={this.handleIsCyclicChange}>
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
                        <MultiSelectField
                            value={this.state.selectedCategories}
                            onChange={this.handleSelectedCategoriesChange}
                            options={categories}

                        />
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
                                this.state.records.filter(
                                    record =>
                                        this.state.selectedCategories.length === 0 ?
                                            true :
                                            this.state.selectedCategories.some(
                                                category => category.value === record.category
                                            )
                                ).filter(
                                    record => this.state.isCyclic === false ? true :
                                        record => record.isCyclic === true
                                ).filter(
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


