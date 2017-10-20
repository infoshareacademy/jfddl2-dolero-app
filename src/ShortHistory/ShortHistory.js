import React from 'react'
import './ShortHistory.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {database, auth} from "../firebase";
import {
Grid
} from 'react-bootstrap'
const sHistory = JSON.parse(localStorage.getItem('spendings') || '[]')
console.log(sHistory)
const Data = JSON.parse(localStorage.getItem('incomings') || '[]')
console.log(Data)

// var products = [{
//     id: 1,
//     name: "Item name 1",
//     price: 120
// }, {
//     id: 2,
//     name: "Item name 2",
//     price: 100
// }, {
//     id: 3,
//     name: "Item name 3",
//     price: 100
// }, {
//     id: 4,
//     name: "Item name 4",
//     price: 100
// }, {
//     id: 5,
//     name: "Item name 5",
//     price: 100
// }, {
//     id: 6,
//     name: "Item name 5",
//     price: 100
//
// }];



class ShortHistory extends React.Component {

    state = {
        products: [],
        incomings: []
    }

    componentDidMount() {

        database.ref('/Piotr/spendings').on('value', (snapshot) => {
            this.setState({ products: Object.values(snapshot.val()) || []})
            console.log(this.state.products)
        })
        database.ref('/Piotr/incomings').on('value', (snapshot) => {
            this.setState({ incomings: Object.values(snapshot.val()) || []})
            console.log(this.state.incomings)
    })
    }

    // componentWillUnmount() {
    //     clearInterval(this.intervalId)
    // }

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
            <Grid id='style' className='style'>

                <h2>Ostatnie Wydatki</h2>
                <BootstrapTable data={this.state.products.slice(-10).reverse()} hover={true} options={ options } search={ true } multiColumnSearch={ true }>
                    <TableHeaderColumn dataField="spendingDate" isKey={true} dataSort={true} text-align="center" searchable={ false } width='150'>Data</TableHeaderColumn>
                    <TableHeaderColumn dataField="value" dataAlign="center" dataSort={true} width='200' zero={true}>Kwota wydatku</TableHeaderColumn>
                    <TableHeaderColumn dataField="spendingCategory" dataSort={true} dataAlign="center">Kategoria wydatku</TableHeaderColumn>
                    <TableHeaderColumn dataField="spending" dataSort={true} dataAlign="center">Opis wydatku</TableHeaderColumn>

                </BootstrapTable>


                <h2>Ostatnie  Przychody</h2>
                <BootstrapTable data={this.state.incomings.slice(-7).reverse()} options={ options }>
                    <TableHeaderColumn dataField="incomingDate" isKey={true} dataSort={true} text-align="center" searchable={ false }width='150'>Data</TableHeaderColumn>
                    <TableHeaderColumn dataField="value" dataAlign="center" dataSort={true} width='200' zero>Kwota przychodu</TableHeaderColumn>
                    <TableHeaderColumn dataField="incomingCategory" dataSort={true} dataAlign="center">Kategoria przychodu</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={true} dataAlign="center">Opis przychodu</TableHeaderColumn>

                </BootstrapTable>
            </Grid>
        )
    }
}

export default ShortHistory