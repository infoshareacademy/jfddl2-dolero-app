import React from 'react'
import {
    Button,
    FormControl,
    FormGroup,
    Col,
    Form,
    ButtonGroup,
    InputGroup,
    ControlLabel,
    Radio,
    DropdownButton,
    MenuItem,
    Popover,
    ButtonToolbar,
    OverlayTrigger
} from 'react-bootstrap'
import './Sidebar.css'
import moment from 'moment'

class Sidebar extends React.Component {
    state = {
        userName: 'Piotr',
        newSpendingCategory: 'Wybierz wydatek',
        newIncomingCategory: 'Wybierz przychód',
        userBalance: 0,
        IncommingValue: 0,
        isCyclic: false,
        spendings: JSON.parse(localStorage.getItem('spendings')) || [],
        incomings: JSON.parse(localStorage.getItem('incomings')) || [],
        spendingFormVisible: true
    }

    componentDidMount() {
        this.setState({
            userBalance: this.getUserBalance()
        })
    }

    getUserBalance = () => {
        const userBalance = JSON.parse(localStorage.getItem('spendings')) || []
        return userBalance.reduce((result, nextValue) => (
            result -= parseInt(nextValue.value || 0, 10)
        ), 0)
    }

    addSpendings = event => {
        const {spendings, isCyclic, newSpendingName, newSpendingValue, newSpendingCategory} = this.state;

        event.preventDefault();

        let sendingObject = {
<<<<<<< HEAD
            id: this.state.spendings.reduce(
                (maxId, next) => Math.max(maxId, next.id),
                0
            ) + 1,
=======
            id: Date.now(),
>>>>>>> develop
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
        this.setState({
            newSpendingName: event.target.value
        })
    }

    handleInputValueChange = event => {
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
    // ---------------------------------------------------

    handleSpendingFormVisible = () => {
        this.setState({
            spendingFormVisible: !this.state.spendingFormVisible
        })
    }

    // ---------------------------------------------------

    handleIncomingValueChange = event => {
        this.setState({
            newIncomeValue: event.target.value
        })
    }

    handleInputIncomingChange = event => {
        this.setState({
            newIncomeName: event.target.value
        })
    }

    handleCategoryIncomingSelect = eventKey => this.setState({
        newIncomingCategory: eventKey
    })

    addIncomings = event => {
        event.preventDefault()

        const {newIncomeName, newIncomeValue, incomings, userBalance, newIncomingCategory} = this.state;


        let sendingIncomingObject = {
            id: Date.now(),
            name: newIncomeName,
            value: newIncomeValue,
            incomingDate: moment().format('L'),
            incomingCategory: newIncomingCategory
        }

        this.setState({
                newIncomeName: '',
                newIncomeValue: '',
                newIncomingCategory: 'Wybierz przychód',
                userBalance: userBalance + parseInt(newIncomeValue, 10),
                incomings: incomings.concat(sendingIncomingObject)
            }, () => {
                localStorage.setItem('incomings', JSON.stringify(this.state.incomings));
            }
        )
    }

    render() {


        const spendingForm = (
            <Form
                horizontal
                onSubmit={this.addSpendings}
            >


                <Col smOffset={1} sm={10}>
                    <FormGroup
                        controlId="formHorizontalText"
                    >
                        <InputGroup>
                            <InputGroup.Addon
                                style={{
                                    backgroundColor: 'orange'
                                }}

                            >
                                $
                            </InputGroup.Addon>
                            <FormControl
                                onChange={this.handleInputValueChange}
                                type="number" step="0.01"
                                placeholder="Wprowadź kwotę wydatku"
                                value={this.state.newSpendingValue}
                            />

                        </InputGroup>
                    </FormGroup>
                </Col>


                <Col smOffset={1} sm={10}>
                    <FormGroup
                        controlId="formHorizontalNumber"
                    >
                        <InputGroup>
                            <InputGroup.Addon
                                style={{backgroundColor: 'orange'}}
                            >
                                A
                            </InputGroup.Addon>
                            <FormControl
                                type="text"
                                placeholder="Opisz wprowadzaną kwotę"
                                value={this.state.newSpendingName}
                                onChange={this.handleInputSpendingChange}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>


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
        )

        const incomeForm = (
            <Form
                horizontal
                onSubmit={this.addIncomings}
            >
                <Col smOffset={1} sm={10}>
                    <FormGroup
                    >
                        <InputGroup>
                            <InputGroup.Addon
                                style={{
                                    backgroundColor: 'orange'
                                }}

                            >
                                $
                            </InputGroup.Addon>
                            <FormControl

                                type="number" step="0.01"
                                placeholder="Wprowadź kwotę przychodu"
                                value={this.state.newIncomeValue}
                                onChange={this.handleIncomingValueChange}


                            />

                        </InputGroup>
                    </FormGroup>
                </Col>


                <Col smOffset={1} sm={10}>
                    <FormGroup
                    >
                        <InputGroup>
                            <InputGroup.Addon
                                style={{backgroundColor: 'orange'}}
                            >
                                A
                            </InputGroup.Addon>
                            <FormControl
                                type="text"
                                placeholder="Opisz wprowadzaną kwotę"
                                value={this.state.newIncomeName}
                                onChange={this.handleInputIncomingChange}
                            />
                        </InputGroup>
                    </FormGroup>
                </Col>

                <ButtonGroup sm={12}>
                    <Col smOffset={1} sm={4}>
                        <FormGroup>
                            <ControlLabel className="control-label">Kategorie przychodów</ControlLabel>
                            <DropdownButton
                                title={this.state.newIncomingCategory}
                                id="bg-nested-dropdown"
                                onSelect={this.handleCategoryIncomingSelect}
                                style={{width: '200px'}}
                            >
                                <MenuItem eventKey="Wypłata">Wypłata</MenuItem>
                                <MenuItem eventKey="Premia">Premia</MenuItem>
                                <MenuItem eventKey="Zasiłek">Zasiłek</MenuItem>
                                <MenuItem eventKey="Emerytura/Renta">Emerytura/Renta</MenuItem>
                            </DropdownButton>
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
        )


        return (
            <div className="sidebar-bg">
                <div>
                    <h2>Witaj {this.state.userName}!</h2>
                    <p>Twój aktualny stan konta wynosi</p>
                    <h3
                        style={{height: "40px"}}
                    >
                        {this.state.userBalance}
                    </h3>
                    <ButtonToolbar
                        style={{
                            position: 'absolute',
                            top: '23%',
                            left: '80%'
                        }}
                    >
                        <Button
                            bsStyle="warning"
                            style={{
                                borderRadius: '20%'
                            }}
                            onClick={this.handleSpendingFormVisible}
                        >
                            {this.state.spendingFormVisible ? '+' : '-'}
                        </Button>
                    </ButtonToolbar>
                </div>

                {this.state.spendingFormVisible ? spendingForm : incomeForm}

                <p className="copyRights">Made by Dolero</p>
            </div>
        )
    }
}

export default Sidebar
