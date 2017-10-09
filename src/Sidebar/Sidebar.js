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
    MenuItem,
} from 'react-bootstrap'
import './Sidebar.css'
import moment from 'moment'

class Sidebar extends React.Component {

    state = {
        userName: 'Piotr',
        newSpendingCategory: 'Wybierz wydatek',
        isOneTimeUse: true,
        isCyclic: false,
        spendings: JSON.parse(localStorage.getItem('spendings')) || []

    }

    addSpendings = event => {
        const {spendings, isOneTimeUse, isCyclic, newSpendingName, newSpendingValue, newSpendingCategory} = this.state;

        event.preventDefault();

        let sendingObject = {
            id: 'Dodac numer id',
            spending: newSpendingName,
            spendingCategory: newSpendingCategory,
            value: newSpendingValue,
            isOneTimeUse,
            isCyclic,
            spendingDate: moment().format('L')
        }

        this.setState({
                newSpendingName: '',
                newSpendingValue: '',
                newSpendingCategory: 'Wybierz wydatek',
                spendings: spendings.concat(sendingObject)
            }, () => {
                localStorage.setItem('spendings', JSON.stringify(this.state.spendings));
                console.log(this.state.spendings);
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

    handleRadiusButtonValueChange = (event) => {
        console.log(this.event) //for tests aint logging
        this.setState({
            isCyclic: !this.state.isCyclic,
            isOneTimeUse: !this.state.isOneTimeUse

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
                        {this.state.newSpendingValue}
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
                            <Radio
                                checked
                                name="gender"
                                className="radio-btn"
                                readOnly
                                onChange={this.handleRadiusButtonValueChange}
                            >
                                Wydatek jednorazowy
                            </Radio>

                            <Radio
                                name="gender"
                                className="radio-btn"
                                readOnly
                                onChange={this.handleRadiusButtonValueChange}
                            >
                                Wydatek cykliczny
                            </Radio>
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

