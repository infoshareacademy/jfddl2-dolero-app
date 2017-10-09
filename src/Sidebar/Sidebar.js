import React from 'react'
import {
    Button,
    FormControl,
    FormGroup,
    Col,
    Form,
    ButtonGroup,
    ControlLabel,
    Radio,
    DropdownButton,
    MenuItem
} from 'react-bootstrap'
import './Sidebar.css'
import moment from 'moment'

class Sidebar extends React.Component {

    componentDidMount() {
        this.setState({
            userBalance: this.getUserBalance()
        })
    }

    state = {
        userName: 'Piotr',
        newSpendingCategory: 'Wybierz wydatek',
        userBalance: 0,
        isCyclic: false,
        spendings: JSON.parse(localStorage.getItem('spendings')) || []

    }

    getUserBalance = () => {
        const userBalance = JSON.parse(localStorage.getItem('spendings')) || []
        console.log(userBalance)
        return userBalance.reduce((result, nextValue) => (
            result -= parseInt(nextValue.value || 0, 10)
        ), 0)
    }

    addSpendings = event => {
        const {spendings, isCyclic, newSpendingName, newSpendingValue, newSpendingCategory} = this.state;

        event.preventDefault();

        let sendingObject = {
            id: 'Dodac numer id',
            spending: newSpendingName,
            spendingCategory: newSpendingCategory,
            value: newSpendingValue,
            isCyclic,
            spendingDate: moment().format('L')
        }

        this.setState({
                newSpendingName: '',
                newSpendingValue: '',
                newSpendingCategory: 'Wybierz wydatek',
                userBalance: this.state.userBalance - newSpendingValue,
                spendings: spendings.concat(sendingObject)
            }, () => {
                localStorage.setItem('spendings', JSON.stringify(this.state.spendings));
            }
        )
        console.log(sendingObject)
    }

    handleInputSpendingChange = event => {
        // ustawia mi NewSpendingName na wartość z inputa spending
        this.setState({
            newSpendingName: event.target.value
        })
    }

    handleInputValueChange = event => {
        // ustawia mi newSpendingValue na wartość z inputa value
        this.setState({
            newSpendingValue: event.target.value
        })
    }

    handleCategorySelect = eventKey => this.setState({
        newSpendingCategory: eventKey
    })

    handleRadiusButtonValueTrueChange = () => {
        this.setState({
            isCyclic: true

        })
    }

    handleRadiusButtonValueFalseChange = () => {
        this.setState({
            isCyclic: false

        })
    }

    render() {
        return (
            <div className="sidebar-bg">
                <div>
                    <h2>Witaj {this.state.userName}!</h2>
                    <p>Twój aktualny stan konta wynosi</p>
                    {/*// tutaj uzyc reduce*/}
                    <h3
                        style={{height: "40px"}}
                    >
                        {this.state.userBalance}
                    </h3>
                </div>
                <Form
                    horizontal
                    onSubmit={this.addSpendings}
                >
                    <FormGroup
                        controlId="formHorizontalText"
                    >
                        <Col smOffset={1} sm={10}>
                            <FormControl onChange={this.handleInputValueChange} type="number" step="0.01"
                                         placeholder="Wprowadź kwotę" value={this.state.newSpendingValue}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalNumber">
                        <Col smOffset={1} sm={10}>
                            <FormControl type="text" onChange={this.handleInputSpendingChange}
                                         placeholder="Opisz wprowadzaną kwotę" value={this.state.newSpendingName}/>
                        </Col>
                    </FormGroup>

                    <ButtonGroup sm={12}>
                        <Col smOffset={1} sm={4}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel className="control-label">Kategorie wydatków</ControlLabel>
                                <DropdownButton
                                    title={this.state.newSpendingCategory}
                                    id="bg-nested-dropdown"
                                    onSelect={this.handleCategorySelect}
                                    style={{width: '200px'}}
                                >
                                    <MenuItem eventKey="Jedzenie">Jedzenie</MenuItem>
                                    <MenuItem eventKey="Mieszkanie">Mieszkanie</MenuItem>
                                    <MenuItem eventKey="Inne opłaty i rachunki">Inne opłaty i rachunki</MenuItem>
                                    <MenuItem eventKey="Zdrowie, higiena i chemia">Zdrowie, higiena i chemia</MenuItem>
                                    <MenuItem eventKey="Ubranie">Ubranie</MenuItem>
                                    <MenuItem eventKey="Relaks">Relaks</MenuItem>
                                    <MenuItem eventKey="Transport">Transport</MenuItem>
                                    <MenuItem eventKey="Inne wydatki">Inne wydatki</MenuItem>
                                </DropdownButton>
                            </FormGroup>
                        </Col>

                        <Col
                            smOffset={1}
                            sm={6}
                            style={
                                {
                                    paddingTop: 20,
                                    paddingLeft: 30
                                }
                            }
                        >
                            <FormGroup>
                                <Radio
                                    checked={!this.state.isCyclic}
                                    name="gender"
                                    className="radio-btn"
                                    readOnly
                                    onClick={this.handleRadiusButtonValueFalseChange}
                                >
                                    Wydatek jednorazowy
                                </Radio>

                                <Radio
                                    checked={this.state.isCyclic}
                                    name="gender"
                                    className="radio-btn"
                                    readOnly
                                    onClick={this.handleRadiusButtonValueTrueChange}
                                >
                                    Wydatek cykliczny
                                </Radio>
                            </FormGroup>
                        </Col>

                    </ButtonGroup>

                    <FormGroup>
                        <Col smOffset={6} sm={5}>
                            <Button
                                type="submit"
                                bsSize="large"
                                bsStyle="warning"
                                className="sidebar-submit-btn"
                            >
                                Dodaj
                            </Button>
                        </Col>
                    </FormGroup>

                </Form>
                <p className="copyRights">Made by Dolero</p>
            </div>
        )
    }
}

export default Sidebar



