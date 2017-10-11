import React from 'react'
import './ShortHistory.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
Table
} from 'react-bootstrap'

const sHistory = JSON.parse(localStorage.getItem('spendings') || '[]')
console.log(sHistory)

var products = [{
    id: 1,
    name: "Item name 1",
    price: 120
}, {
    id: 2,
    name: "Item name 2",
    price: 100
}, {
    id: 3,
    name: "Item name 3",
    price: 100
}, {
    id: 4,
    name: "Item name 4",
    price: 100
}, {
    id: 5,
    name: "Item name 5",
    price: 100
}, {
    id: 6,
    name: "Item name 5",
    price: 100

}];


class ShortHistory extends React.Component {

    state = {
        products: []
    }

    componentDidMount() {
        // interwał tutaj jest obejściem do momentu wprowadzenia reduksa
        this.intervalId = setInterval(
            () => {
                this.setState({
                    products: JSON.parse(localStorage.getItem('spendings') || '[]')
                })
            }, 100
        )
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    createCustomClearButton = (onClick) => {
        return (
            <button className='btn btn-warning' onClick={ onClick }>Wyczyść</button>
        );
    }
    render() {
        const options = {
            clearSearch: true,
            clearSearchBtn: this.createCustomClearButton
        };


        return(
            <div>

                <h2>Ostatnie Wydatki</h2>
                <BootstrapTable data={this.state.products.slice(-10).reverse()} hover={true} options={ options } search={ true } multiColumnSearch={ true }>
                    <TableHeaderColumn dataField="spendingDate" isKey={true} dataSort={true} text-align="center" searchable={ false }>Data</TableHeaderColumn>
                    <TableHeaderColumn dataField="value" dataAlign="center" dataSort={true}>Kwota wydatku</TableHeaderColumn>
                    <TableHeaderColumn dataField="spendingCategory" dataSort={true} dataAlign="center">Kategoria wydatku</TableHeaderColumn>
                    <TableHeaderColumn dataField="spending" dataSort={true} dataAlign="center">Opis wydatku</TableHeaderColumn>
                </BootstrapTable>

                <h2>Ostatnie  Przychody</h2>
                <BootstrapTable data={ products }>
                    <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='price' dataSort>Product Price</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default ShortHistory