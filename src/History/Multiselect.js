import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


let Categories = [
    { label: 'Jedzenie', value: 'Jedzenie' },
    { label: 'Mieszkanie', value: 'Mieszkanie' },
    { label: 'Inne opłaty i rachunki', value: 'Inne opłaty' },
    { label: 'Zdrowie, higiena i chemia', value: 'Zdrowie' },
    { label: 'Ubrania', value: 'Ubrania' },
    { label: 'Ralax', value: 'Ralax' },
    { label: 'Transport', value: 'Transport' },
    { label: 'Inne wydatki', value: 'Inne wydatki' },
];



const MultiSelectField = createClass({

    getInitialState () {
        return {
            stayOpen: true,
            value: [],
        };
    },

    handleSelectChange (value) {
        console.log('You\'ve selected:', value);
        this.setState({ value });
    },

    render () {
        const { stayOpen, value } = this.state;
        return (
            <div className="section">
                <h4 >Kategoria</h4>
                <Select
                    closeOnSelect={!stayOpen}
                    multi
                    onChange={this.handleSelectChange}
                    options={Categories}
                    placeholder="Wybierz kategorie"
                    // simpleValue
                    value={value}
                />


            </div>
        );
    }
});


export default MultiSelectField;