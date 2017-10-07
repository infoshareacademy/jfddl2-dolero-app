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
        spendings: []
    }

    addSpendings = spending => {
        const {spendings} = this.state

        this.setState({
                spendings: spendings.concat({
                    id: 'Dodac numer id',
                    spending: 'Dodać opis wpisywanej wartości',
                    value: 'Dodać wartość inputa z wartością',
                    isCyclic: false,
                    spendingDate: "Dodac datę"
                })
            }, () => {
                localStorage.setItem('spending', JSON.stringify(this.state))
            }
        )
    }

    // changeAccountBalance = event => {
    //     console.log('change');
    //     this.setState({accountBalance: this.state.accountBalance + event.target.value})
    // }

    // handleCategorySelect = eventKey => this.setState({
    // //     selectedCategory: eventKey
    // })

    render() {
        return (
            <div className="sidebar-bg">
                <div>
                    <h2>Witaj {this.state.userName}!</h2>
                    <p>Twój aktualny stan konta wynosi</p>
                    {/*// tutaj uzyc reduce*/}
                    <h3>{this.state.accountBalance}</h3>
                </div>
                <Form
                    horizontal
                    onSubmit={this.addSpendings}
                >
                    <FormGroup controlId="formHorizontalText">
                        <Col smOffset={1} sm={10}>
                            <FormControl onChange={this.changeAccountBalance} type="number"
                                         placeholder="Wprowadź kwotę"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalNumber">
                        <Col smOffset={1} sm={10}>
                            <FormControl type="text" placeholder="Opisz wprowadzaną kwotę"/>
                        </Col>
                    </FormGroup>

                    <ButtonGroup sm={12}>
                        <Col smOffset={1} sm={4}>
                            {/*<DropdownButton*/}
                            {/*title={this.state.selectedCategory}*/}
                            {/*id="bg-nested-dropdown"*/}
                            {/*onSelect={this.handleCategorySelect}*/}
                            {/*>*/}
                            {/*<MenuItem eventKey="Jedzenie">Jedzenie</MenuItem>*/}
                            {/*<MenuItem eventKey="Mieszkanie">Mieszkanie</MenuItem>*/}
                            {/*<MenuItem eventKey="Inne opłaty i rachunki">Inne opłaty i rachunki</MenuItem>*/}
                            {/*<MenuItem eventKey="Zdrowie, higiena i chemia">Zdrowie, higiena i chemia</MenuItem>*/}
                            {/*<MenuItem eventKey="Ubranie">Ubranie</MenuItem>*/}
                            {/*<MenuItem eventKey="Relaks">Relaks</MenuItem>*/}
                            {/*<MenuItem eventKey="Transport">Transport</MenuItem>*/}
                            {/*<MenuItem eventKey="Inne wydatki">Inne wydatki</MenuItem>*/}
                            {/*</DropdownButton>*/}

                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel className="control-label">Kategorie wydatków</ControlLabel>
                                <FormControl componentClass="select" placeholder="select">
                                    <option value="select">Jedzenie</option>
                                    <option value="other">Mieszkanie</option>
                                    <option value="other">Inne opłaty i rachunki</option>
                                    <option value="other">Zdrowie, higiena i chemia</option>
                                    <option value="other">Ubranie</option>
                                    <option value="other">Relaks</option>
                                    <option value="other">Transport</option>
                                    <option value="other">Inne wydatki</option>
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