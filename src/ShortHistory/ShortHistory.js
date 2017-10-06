import React from 'react'
import './ShortHistory.css';
import { BootstrapTable, TableHeaderColumn, priceFormatter} from 'react-bootstrap-table';
import {
Table
} from 'react-bootstrap'

var products = [{
    id: 1,
    name: "Item name 1",
    price: 100
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
    name: "Item name 6",
    price: 100
}, {
    id: 7,
    name: "Item name 7",
    price: 100
}];


class ShortHistory extends React.Component {

    render() {
        return(
            <div className="style">

                <h2>Ostatnie Przychody</h2>


                <BootstrapTable data={products} striped={true} hover={true}>
                    <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Income</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={true} dataAlign="center">Income From</TableHeaderColumn>
                    <TableHeaderColumn dataField="price" dataFormat={priceFormatter} dataAlign="center">Product Price</TableHeaderColumn>
                </BootstrapTable>

                <h2>Ostatnie Wydatki</h2>

                <BootstrapTable data={products} striped={true} hover={true}>
                    <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Outcome</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={true} dataAlign="center">Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField="price" dataFormat={priceFormatter} dataAlign="center">Product Price</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default ShortHistory