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
import {database, auth} from "../firebase";
import {connect} from 'react-redux'
import moment from 'moment'
import 'moment/locale/pl';


class History extends React.Component {


    state = {
        startDate: moment().startOf('month'),
        endDate: moment(),
        selectedCategories: [],
        records: [],
        currentSearchPhrase: '',
        isCyclic: false,
        value: {min: 0, max: 100},
        link: 0,
        categories: [],
    }

    componentDidMount() {
        const uid = auth.currentUser.uid


        database.ref(`users/${uid}/spendingCategories`).on('value', (snapshot) => {
            this.setState({
                    value: {min: 0, max: this.getMaxValue()},
                    categories: snapshot.val() === null ? ["Jedzenie", "Mieszkanie", "Inne opłaty i rachunki", "Ubranie", "Relaks", "Transport", "Inne wydatki"]
                        .map(snapshot => ({
                            value: snapshot,
                            label: snapshot
                        })) : snapshot.val().map(snapshot => ({
                        value: snapshot,
                        label: snapshot
                    }))
                }
            )
        })
    }

    getMaxValue = () => (

        this.props.records.reduce((max, next) =>
                Math.max(max, parseInt(next.value, 10))

            , 0
        ))

    urlChangeByRow = (record) => {

        this.props.history.push('/history/' + record)
        this.setState({
            link: record
        })

    }
    urlChangeBackByRow = () => {
        this.setState({
            link: ''
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
        const uid = auth.currentUser.uid
        database.ref(`/users/${uid}/spendings/${recordId}`).set(null)
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
                                maxValue={this.getMaxValue() || 1}
                                minValue={0}
                                value={this.state.value}
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
                                        options={this.state.categories}

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
                                this.props.records
                                    .filter(
                                        record =>
                                            this.state.selectedCategories.length === 0 ?
                                                true :
                                                this.state.selectedCategories.some(
                                                    category => category.value === record.spendingCategory
                                                )
                                    )
                                    .filter(
                                        record => this.state.isCyclic === false ? true : (record.isCyclic === true))
                                    .filter(
                                        record => record.spending.toLowerCase().includes(this.state.currentSearchPhrase.toLowerCase()))
                                    .filter(
                                        record => parseInt(record.value, 10) <= this.state.value.max && parseInt(record.value, 10) >= this.state.value.min)
                                    .filter(
                                        record => record.spendingDate >= this.state.startDate.format('DD.MM.YYYY') && record.spendingDate <= this.state.endDate.format('DD.MM.YYYY'))
                                    .map(
                                        (record, index) => (
                                            <tbody>

                                            <tr key={record.id}
                                                onClick={() => {
                                                    this.urlChangeByRow(record.id)
                                                }}>

                                                <td>{record.spendingCategory}</td>
                                                <td>{record.value}</td>
                                                <td>{record.spendingDate}</td>
                                                <td style={{width: '3vw'}}
                                                ><Button onClick={this.handleRemoveRecord}
                                                         data-record-id={record.id} bsStyle="danger"
                                                         bsSize="xsmall"
                                                         key={record.id + 6}

                                                >Usuń</Button></td>

                                            </tr>
                                            {this.state.link === record.id &&
                                            <Route path={"/history/" + record.id} render={() => {
                                                return <HistoryMore
                                                    record={record}
                                                    changeBackUrl={this.urlChangeBackByRow}
                                                />
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
)(History)


