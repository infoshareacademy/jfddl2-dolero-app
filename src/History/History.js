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


let historyRecords =
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

let categories = ['food', 'alcohol', 'culture', 'car']


class History extends React.Component {
    state = {
        startDate: this.props.startDate,
        endDate: this.props.endDate,
        bankHistory:[]
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
                            <Col md={2} mdOffset={7}>
                                <Checkbox>
                                    Ulubione
                                </Checkbox>
                            </Col>
                            <Form>
                                <FormGroup controlId="formHorizontalText">

                                    <FormControl placeholder="Opisz czego szukasz"/>

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
                    <Col>

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
                                <th>Opis</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                historyRecords
                                //     .filter(
                                //     record => record.category === 'food'
                                // )
                                    .map(
                                        record => (
                                            <tr key={record.id} onClick={this.moreInfo}>
                                                <td>{record.category}</td>
                                                <td>{record.price}</td>
                                                <td>{record.describe}</td>
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