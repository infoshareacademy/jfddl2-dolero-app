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
    ButtonToolbar,
    OverlayTrigger,
    Popover
} from 'react-bootstrap'
import './Sidebar.css'
import moment from 'moment'
import {database, auth} from '../firebase'

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
        spendingFormVisible: true,
        addedSpendingCategory: '',
        addedIncomeCategory: '',
        spendingCategories: ["Jedzenie", "Mieszkanie", "Inne opłaty i rachunki", "Ubranie", "Relaks", "Transport", "Inne wydatki"],
        incomeCategories: ["Wypłata", "Premia", "Zasiłek", "Emerytura/Renta"]
    }

    componentDidMount() {

        // userBalance: this.getUserBalance(),

        database.ref('/Piotr/spendingCategories').on('value', (snapshot) => {
            this.setState({spendingCategories: snapshot.val() || ["Jedzenie", "Mieszkanie", "Inne opłaty i rachunki", "Ubranie", "Relaks", "Transport", "Inne wydatki"]})
        })

        database.ref('/Piotr/incomeCategories').on('value', (snapshot) => {
            this.setState({incomeCategories: snapshot.val() || ["Wypłata", "Premia", "Zasiłek", "Emerytura/Renta"]})
        })


        // incomeCategories: database.ref('/Piotr/incomeCategories').on('value', (snapshot) => {
        //     this.setState({ records: Object.values(snapshot.val()) || []})
        //     console.log(this.state.records)
        // }) || ["Wypłata", "Premia", "Zasiłek", "Emerytura/Renta"]

    }

    // getUserBalance = () => {
    //     const userBalance = JSON.parse(localStorage.getItem('spendings')) || []
    //     const value1 = userBalance.reduce((result, nextValue) => (
    //         result -= parseFloat(nextValue.value || 0, 10)
    //     ), 0)
    //
    //     const userBalance2 = JSON.parse(localStorage.getItem('incomings')) || []
    //     const value2 = userBalance2.reduce((result, nextValue) => (
    //         result -= parseFloat(nextValue.value || 0, 10)
    //     ), 0)
    //
    //     return value1 - value2;
    //
    // }

    addSpendings = event => {
        const {spendings, isCyclic, newSpendingName, newSpendingValue, newSpendingCategory} = this.state;

        event.preventDefault();

        let sendingObject = {
            id: Date.now(),
            spending: newSpendingName || ' ',
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
                spendings: sendingObject
            }, () => {

                database.ref(`/${auth.currentUser == null ? 'Piotr' : auth.currentUser.uid}/spendings`).push(this.state.spendings)
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
            name: newIncomeName || ' ',
            value: newIncomeValue,
            incomingDate: moment().format('L'),
            incomingCategory: newIncomingCategory
        }

        this.setState({
                newIncomeName: '',
                newIncomeValue: '',
                newIncomingCategory: 'Wybierz przychód',
                userBalance: userBalance + parseFloat(newIncomeValue, 10),
                incomings: sendingIncomingObject
            }, () => {
                database.ref(`${auth.currentUser == null ? 'Piotr' : auth.currentUser.uid}/incomings`).push(sendingIncomingObject)
            }
        )
    }

    CorrentInputValue = event => {
        event.preventDefault()
        alert('Poważnie chcesz wpisać ujemną wartość? CALL 911')
        this.setState({
            newSpendingValue: '',
            newIncomeValue: ''
        })
    }

    categorySelectAlert = event => {
        event.preventDefault()
        alert('Hej, chyba ktoś zapomniał o wybraniu kategorii?')
    }

    valueAlert = event => {
        event.preventDefault()
        alert('Hej, nie wysyłaj formularza bez wpisania kwoty!')
    }

    // ------ new Sprint -------

    newSpendingCategoryValue = event => {
        this.setState({
            addedSpendingCategory: event.target.value
        })
    }

    categoryAlert = () => {
        alert('Hola Hola, już masz taką kategorię!')
        this.setState({
            addedSpendingCategory: ''
        })
    }

    ifExistsSpendingCaregory = () => {
        return this.state.spendingCategories.includes(this.state.addedSpendingCategory)
    }


    addNewSpendingCategory = () => {

        this.setState({
            spendingCategories: this.state.spendingCategories.concat(this.state.addedSpendingCategory),
            addedSpendingCategory: ''
        }, () => {
            database.ref(`${auth.currentUser == null ? 'Piotr' : auth.currentUser.uid}/spendingCategories`).set(this.state.spendingCategories)
        })
    }

    newIncomeCategoryValue = event => {
        this.setState({
            addedIncomeCategory: event.target.value
        })
    }

    addNewIncomeCategory = () => {
        this.setState({
            incomeCategories: this.state.incomeCategories.concat(this.state.addedIncomeCategory),
            addedIncomeCategory: ''
        }, () => {
            database.ref(`${auth.currentUser == null ? 'Piotr' : auth.currentUser.uid}/incomeCategories`).set(this.state.incomeCategories)
        })
    }

    // ------ /new Sprint -------

    render() {

        const popoverRightInSpendingForm = (
            <Popover id="popover-positioned-right" title="Dodaj kategorię wydatku">

                <input
                    onChange={this.newSpendingCategoryValue}
                    value={this.state.addedSpendingCategory}
                    type="text"
                />
                <Button
                    bsSize="xsmall"
                    bsStyle="warning"
                    onClick={this.addNewSpendingCategory}
                >
                    Dodaj
                </Button>
            </Popover>
        )

        const popoverRightInIncomeForm = (
            <Popover id="popover-positioned-right" title="Dodaj kategorię przychodu">

                <input
                    onChange={this.newIncomeCategoryValue}
                    value={this.state.addedIncomeCategory}
                    type="text"
                />
                <Button
                    bsSize="xsmall"
                    bsStyle="warning"
                    onClick={this.addNewIncomeCategory}
                >
                    Dodaj
                </Button>
            </Popover>
        )

        const spendingForm = (
            <Form
                horizontal
                onSubmit={
                    this.state.newSpendingValue < 0 ? this.CorrentInputValue : this.addSpendings
                    && this.state.newSpendingCategory === 'Wybierz wydatek' ? this.categorySelectAlert : this.addSpendings
                    && this.state.newSpendingValue == null || this.state.newSpendingValue == "" ? this.valueAlert : this.addSpendings
                }
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
                                {
                                    this.state.spendingCategories.map(category => (
                                        <MenuItem eventKey={category}>{category}</MenuItem>
                                    ))
                                }
                            </DropdownButton>
                            <ButtonToolbar>
                                <OverlayTrigger trigger="click" placement="right"
                                                overlay={popoverRightInSpendingForm}>
                                    <Button
                                        bsSize="xsmall"
                                        bsStyle="warning"
                                        style={{width: '200px'}}
                                    >
                                        Dodaj swoją kategorię
                                    </Button>
                                </OverlayTrigger>
                            </ButtonToolbar>

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
                onSubmit={
                    this.state.newIncomeValue < 0 ? this.CorrentInputValue : this.addIncomings
                    && this.state.newIncomingCategory === 'Wybierz przychód' ? this.categorySelectAlert : this.addIncomings
                    && this.state.newIncomeValue == null || this.state.newIncomeValue == "" ? this.valueAlert : this.addIncomings
                }
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
                                {
                                    this.state.incomeCategories.map(category => (
                                        <MenuItem eventKey={category}>{category}</MenuItem>
                                    ))
                                }
                            </DropdownButton>
                            <ButtonToolbar>
                                <OverlayTrigger trigger="click" placement="right"
                                                overlay={popoverRightInIncomeForm}>
                                    <Button
                                        bsSize="xsmall"
                                        bsStyle="warning"
                                        style={{width: '200px'}}
                                    >
                                        Dodaj swoją kategorię
                                    </Button>
                                </OverlayTrigger>
                            </ButtonToolbar>
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
                    <h2>Witaj!</h2>
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

                {/*<div className="facebookBtn">*/}

                {/*<script>*/}
                {/*{(function (d, s, id) {*/}
                {/*var js, fjs = d.getElementsByTagName(s)[0];*/}
                {/*if (d.getElementById(id)) return;*/}
                {/*js = d.createElement(s);*/}
                {/*js.id = id;*/}
                {/*js.src = "//connect.facebook.net/pl_PL/sdk.js#xfbml=1&version=v2.10"*/}
                {/*fjs.parentNode.insertBefore(js, fjs)*/}
                {/*}(document, 'script', 'facebook-jssdk'))}*/}
                {/*</script>*/}
                {/*<div className="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/"*/}
                {/*data-layout="button_count"*/}
                {/*data-size="large" data-mobile-iframe="true"><a className="fb-xfbml-parse-ignore"*/}
                {/*target="_blank"*/}
                {/*href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Udostępnij</a>*/}
                {/*</div>*/}

                {/*</div>*/}

                <p className="copyRights">Made by Dolero</p>
            </div>
        )
    }
}

export default Sidebar

