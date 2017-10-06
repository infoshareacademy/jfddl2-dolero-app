import React from 'react'
import './History.css';
import {
    Checkbox,
    ControlLabel,
    FormGroup,
    FormControl,
    Table,
    Grid,
    Col
} from 'react-bootstrap'


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

let categories = ['food', 'alcohol','culture','car' ]



class History extends React.Component {


    moreInfo = event => {
        console.log('jest')
    }

    render() {
        return (
            <Grid className='history'>

                <Col md={12}>
                    <h3>Filtrowanie</h3>
                </Col>
                <Col  md={4}>
                    <input type="text"/>
                </Col>


                <Col  md={1}>
                    <Checkbox>
                        Ulubione
                    </Checkbox>
                </Col>


                <Col  md={4} className='category'>
                    <FormGroup controlId="formControlsSelectMultiple">
                        <ControlLabel>Multiple select</ControlLabel>
                        <FormControl componentClass="select" multiple onChange={
                            event => console.log(
                                Array.from(event.target.options).filter(
                                    option => option.selected
                                ).map(option => option.value)
                            )
                        }>
                            {
                                categories.map (
                                    category => (
                                        <option value={category} active >{category}</option>
                                    )
                                )
                            }

                        </FormControl>
                    </FormGroup>
                </Col>




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


            </Grid>

        )
    }
}


export default History