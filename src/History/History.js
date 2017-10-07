import React from 'react'
import './History.css';
import {
    Checkbox,
    ControlLabel,
    FormGroup,
    FormControl
} from 'react-bootstrap'
import MultiSelectField from './Multiselect'
import 'react-select/dist/react-select.css';


class History extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <h3>Wprowadź słowo kluczowe</h3>
                    <input type="text"/>
                </div>
                <div>
                    <Checkbox>
                        Ulubione
                    </Checkbox>
                </div>
                <MultiSelectField/>
                <div className='category'>
                    <FormGroup controlId="formControlsSelectMultiple">
                        <ControlLabel>Multiple select</ControlLabel>
                        <FormControl componentClass="select" multiple>
                            <option value="select">pierwsza</option>
                            <option value="other">druga</option>
                            <option value="other">trzecia</option>
                        </FormControl>
                    </FormGroup>
                </div>
                <h3 className="recordsList">Lista rekordów</h3>
                <ul>
                </ul>
            </div>


        )
    }
}


export default History