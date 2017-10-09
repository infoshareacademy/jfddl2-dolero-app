import React from 'react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

//
// let Categories = [
//     { label: 'Jedzenie', value: 'Jedzenie' },
//     { label: 'Mieszkanie', value: 'Mieszkanie' },
//     { label: 'Inne opłaty i rachunki', value: 'Inne opłaty' },
//     { label: 'Zdrowie, higiena i chemia', value: 'Zdrowie' },
//     { label: 'Ubrania', value: 'Ubrania' },
//     { label: 'Ralax', value: 'Ralax' },
//     { label: 'Transport', value: 'Transport' },
//     { label: 'Inne wydatki', value: 'Inne wydatki' },
// ];



class MultiSelectField extends React.Component{

    state = {
        stayOpen: true,
        value: [],
    }


    render () {
        const { stayOpen } = this.state;
        const { value, onChange, options } = this.props;

        return (
            <div className="section">
                <h4 >Kategoria</h4>
                <Select
                    closeOnSelect={!stayOpen}
                    multi
                    onChange={onChange}
                    options={options}
                    placeholder="Wybierz kategorie"
                    // simpleValue
                    value={value}
                />


            </div>
        );
    }
}


export default MultiSelectField;