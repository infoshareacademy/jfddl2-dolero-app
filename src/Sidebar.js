import React from 'react'
import {
    Button,
    FormControl,
    FormGroup,
    Col,
    Form,
    ButtonGroup,
    DropdownButton,
    MenuItem,
    Radio
} from 'react-bootstrap'
import './Sidebar.css'

class Sidebar extends React.Component {

    state = {
        userName: 'Andrzej',
        accountBalance: 0
    }

    render() {
        return (
            <div className="sidebar-bg">
                <div>
                    <h2>Witaj {this.state.userName}!</h2>
                    <p>Twój aktualny stan konta wynosi</p>
                    <h3>{this.state.accountBalance}</h3>
                </div>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalText">
                        <Col smOffset={1} sm={10}>
                            <FormControl type="number" placeholder="Wprowadź kwotę"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalNumber">
                        <Col smOffset={1} sm={10}>
                            <FormControl type="text" placeholder="Opisz wprowadzaną kwotę"/>
                        </Col>
                    </FormGroup>

                    <ButtonGroup sm={12}>
                        <Col smOffset={1} sm={4}>
                            <DropdownButton title="Kategorie wydatków" id="bg-nested-dropdown">
                                <MenuItem eventKey="1">Jedzenie</MenuItem>
                                <MenuItem eventKey="2">Mieszkanie</MenuItem>
                                <MenuItem eventKey="3">Inne opłaty i rachunki</MenuItem>
                                <MenuItem eventKey="4">Zdrowie, higiena i chemia</MenuItem>
                                <MenuItem eventKey="5">Ubranie</MenuItem>
                                <MenuItem eventKey="6">Relaks</MenuItem>
                                <MenuItem eventKey="7">Transport</MenuItem>
                                <MenuItem eventKey="8">Inne wydatki</MenuItem>
                            </DropdownButton>
                        </Col>
                        <Col smOffset={1} sm={6}>
                            <Radio checked name="gender" className="radio-btn" readOnly>
                                Wydatek jednorazowy
                            </Radio>

                            <Radio name="gender" className="radio-btn" readOnly>
                                Wydatek cykliczny
                            </Radio>
                        </Col>
                    </ButtonGroup>

                    <FormGroup>
                        <Col smOffset={4} sm={6}>
                            <Button
                                type="submit"
                                bsSize="large"
                                bsStyle="warning"
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