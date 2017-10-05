import React from 'react'
import './ShortHistory.css';
import {
Table
} from 'react-bootstrap'

class ShortHistory extends React.Component {

    render() {
        return(
            <div className="style">

                <h2>Ostatnie wydatki</h2>

            <Table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Zakup</th>
                    <th>Kwota</th>
                    <th>Data zakupu</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Bułki</td>
                    <td>5zł</td>
                    <td>15.07.2107</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Kasza</td>
                    <td>3zł</td>
                    <td>15.07.2107</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Ser biały</td>
                    <td>3zł</td>
                    <td>15.07.2107</td>
                </tr>
                    <tr>
                        <td>4</td>
                        <td>Tuńczyk</td>
                        <td>7zł</td>
                        <td>15.07.2107</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Ryż</td>
                        <td>3zł</td>
                        <td>15.07.2107</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Jogurt naturalny</td>
                        <td>4zł</td>
                        <td>15.07.2107</td>
                    </tr>
                </tbody>
            </Table>




    <h2>Ostatnie wpływy</h2>
    <Table>
        <thead>
        <tr>
            <th>#</th>
            <th>Wpłata tytułem</th>
            <th>Kwota wpłaty</th>
            <th>Data wpłaty</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>1</td>
            <td>Czesne od Piotrka</td>
            <td>5000zł</td>
            <td>05.10.2107</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Czesne od Jarka</td>
            <td>5000zł</td>
            <td>05.10.2107</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Czesne od Moniki</td>
            <td>5000zł</td>
            <td>05.10.2107</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Zwrot infoShare</td>
            <td>7000zł</td>
            <td>05.10.2107</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Dodatek</td>
            <td>3000zł</td>
            <td>05.10.2107</td>
        </tr>
        </tbody>
    </Table>

            </div>
        )
    }
}

export default ShortHistory