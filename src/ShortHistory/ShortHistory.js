import React from 'react'
import './ShortHistory.css';
import { BootstrapTable, TableHeaderColumn, priceFormatter} from 'react-bootstrap-table';
// import 'node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
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

    render() {
        return(
            <div className="style">

                <h2>Ostatnie Wydatki</h2>
                <BootstrapTable data={this.state.products} striped={true} hover={true} search={ true } multiColumnSearch={ true }>
                    <TableHeaderColumn dataField="spendingDate" isKey={true} dataSort={true} text-align="center" searchable={ false }>Data</TableHeaderColumn>
                    <TableHeaderColumn dataField="value" dataAlign="center" dataSort={true}>Kwota wydatku</TableHeaderColumn>
                    <TableHeaderColumn dataField="spendingCategory" dataSort={true} dataAlign="center">Kategoria wydatku</TableHeaderColumn>
                    <TableHeaderColumn dataField="spending" dataSort={true} dataAlign="center">Opis wydatku</TableHeaderColumn>
                </BootstrapTable>

                <h2>Ostatnie  Przychody</h2>
                <BootstrapTable data={products} striped={true} hover={true}>
                    <TableHeaderColumn dataField="id" isKey={true}  dataSort={true}>Data</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={true} dataAlign="center">Nazwa produktu</TableHeaderColumn>
                    <TableHeaderColumn dataField="price" dataFormat={priceFormatter} dataAlign="center">Cena</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default ShortHistory