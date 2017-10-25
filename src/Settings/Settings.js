import React from 'react'
import UploadProfilePhoto from "../UploadProfilePhoto"
import firebase from "firebase"
import {
    Button,
    FormGroup,
    FormControl,
    HelpBlock,
    ControlLabel,
    InputGroup,
    Form,
    Col,
    Modal
} from 'react-bootstrap'
import './style.css';

function FieldGroup({id, label, help, ...props}) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}




class Settings extends React.Component {

    state = {
        nip: '',
        address: '',
        kwota: '',
        company: '',
        lastName: '',
        name: '',
        adress: ''
    }



    componentWillMount() {
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/invoiceData`).once('value')
            .then((snapshot) => {
                this.setState({
                    ...snapshot.val()
                })
            })
    }

    handleInputChange = (event, whatIsChanging) => {
        let newState = {}
        newState[whatIsChanging] = event.target.value
        this.setState(newState, () => {
            console.log('newState', this.state)
        })
    }

    saveInvoice = (event) => {
        event.preventDefault()
        firebase.database().ref(`users/${firebase.auth().currentUser.uid}/invoiceData`).set(this.state)
            .then(() => {
                console.log('Invoice Data Saved')
            })
        console.log(event.target)
    }

    // reset hasła
    HunddleResetPass = () => {
        const email = firebase.auth().currentUser.email
        firebase.auth().sendPasswordResetEmail(email).then(
            () => alert('Sprawdź swoją pocztę, został wysłany e-mail z linkiem do ustawienia nowego hasła')
        )
    }

    render() {
        const wellStyles = { maxWidth: 200, margin: '0 auto' };
        return (
            <div>


<UploadProfilePhoto/>
                <div style={wellStyles}>
                <Button bsSize="large" bsStyle="danger" onClick={this.HunddleResetPass}>Nadaj nowe hasło</Button>
                </div>


                <Form onSubmit={this.saveInvoice}>
                    <h2>Dane do faktury</h2>
                    <div className='shadow'>
                    <Col sm={6}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>Imię</InputGroup.Addon>
                                <FieldGroup
                                    id="formControlsText"
                                    type="text"
                                    onChange={(event) => {
                                        this.handleInputChange(event, 'name')
                                    }}
                                    value={this.state.name}
                                    label=""
                                    placeholder="Wprowadz dane"
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col sm={6}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>Nazwisko</InputGroup.Addon>
                                <FieldGroup
                                    id="formControlsText"
                                    type="text"
                                    onChange={(event) => {
                                        this.handleInputChange(event, 'lastName')
                                    }}
                                    value={this.state.lastName}
                                    label=""
                                    placeholder="Wprowadź dane"
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col sm={8}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>Nazwa firmy</InputGroup.Addon>
                                <FieldGroup
                                    id="formControlsText"
                                    type="text"
                                    onChange={(event) => {
                                        this.handleInputChange(event, 'company')
                                    }}
                                    value={this.state.company}
                                    label=""
                                    placeholder="Wprowadź dane"
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col sm={4}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>NIP</InputGroup.Addon>
                                <FieldGroup
                                    id="formControlsText"
                                    type="text"
                                    onChange={(event) => {
                                        this.handleInputChange(event, 'nip')
                                    }}
                                    value={this.state.nip}
                                    label=""
                                    placeholder="Wprowadź dane"
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col sm={6}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>Kwota</InputGroup.Addon>
                                <FieldGroup
                                    id="formControlsText"
                                    type="number"
                                    onChange={(event) => {
                                        this.handleInputChange(event, 'kwota')
                                    }}
                                    value={this.state.kwota}
                                    label=""
                                    placeholder="Podaj wartość"
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Col sm={6}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>Adres</InputGroup.Addon>
                                <FormControl componentClass="textarea" placeholder="podaj dane adresowe"
                                             controlId="formControlsTextarea"
                                             onChange={(event) => {
                                                 this.handleInputChange(event, 'adress')
                                             }}
                                             value={this.state.adress}
                                />
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Button className="btn-dom"
                        type="submit" bsStyle="warning"
                    >
                        Zatwierdź
                    </Button>

                    </div>
                </Form>


            </div>


)

    }


}

export default Settings