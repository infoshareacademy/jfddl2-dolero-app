import React from 'react'
import {
    Button,
    FormControl,
    FormGroup,
    Col,
    Form,
    ButtonGroup,
    ControlLabel,
    DropdownButton,
    MenuItem,
    Radio
} from 'react-bootstrap'
import './Sidebar.css'

class Sidebar extends React.Component {

    state = {
        userName: 'Piotr',
        spendings: JSON.parse(localStorage.getItem('spendings')) || []
    }

    addSpendings = event => {
        const {spendings, newSpendingName, newSpendingValue} = this.state;

        event.preventDefault();

        let sendingObject = {
            id: 'Dodac numer id',
            spending: newSpendingName,
            value: newSpendingValue,
            isCyclic: false,
            spendingDate: "Dodac datę"
        }

        this.setState({
                newSpendingName: '',
                newSpendingValue: '',
                spendings: spendings.concat(sendingObject)
            }, () => {
                localStorage.setItem('spendings', JSON.stringify(this.state.spendings));
                console.log(this.state.spendings);
            }
        )
    }

    handleInputSpendingChange = event => {
        this.setState({
            newSpendingName: event.target.value
        })
    }

    handleInputValueChange = event => {
        this.setState({
            newSpendingValue: event.target.value
        })
    }


    render() {
        return (
            <div className="sidebar-bg">
                <div>
                    <h2>Witaj {this.state.userName}!</h2>
                    <p>Twój aktualny stan konta wynosi</p>
                    {/*// tutaj uzyc reduce*/}
                    <h3>{this.state.newSpendingValue}</h3>
                </div>
                <Form
                    horizontal
                    onSubmit={this.addSpendings}
                >
                    <FormGroup controlId="formHorizontalText">
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
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="Jedzenie">Jedzenie</option>
                                    <option value="Mieszkanie">Mieszkanie</option>
                                    <option value="Inne opłaty i rachunki">Inne opłaty i rachunki</option>
                                    <option value="Zdrowie, higiena i chemia">Zdrowie, higiena i chemia</option>
                                    <option value="Ubranie">Ubranie</option>
                                    <option value="Relaks">Relaks</option>
                                    <option value="Transport">Transport</option>
                                    <option value="Inne wydatki">Inne wydatki</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col smOffset={1} sm={6} style={{paddingTop: 10}}>
                            <Radio checked name="gender" className="radio-btn" readOnly
                                   onChange={event => console.log(event.target.value)}>
                                Wydatek jednorazowy
                            </Radio>

                            <Radio name="gender" className="radio-btn" readOnly>
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

