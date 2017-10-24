import React from 'react'
import firebase from "firebase"
import UploadProfilePhoto from "../UploadProfilePhoto";
import {
    Button,
    FormGroup,
    FormControl,
    HelpBlock,
    ControlLabel,
    InputGroup,
    Form,
    Col
} from 'react-bootstrap'

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

    print_current_page = () => window.print()
    // reset hasła
    HunddleResetPass = () => {
        const email = firebase.auth().currentUser.email
        firebase.auth().sendPasswordResetEmail(email).then(
            () => alert('Sprawdź swoją pocztę, został wysłany e-mail z linkiem do ustawienia nowego hasła')
        )
    }

    render() {

        return (
            <div>


                <UploadProfilePhoto/>
                <Button bsSize="large" bsStyle="danger" onClick={this.HunddleResetPass}>Nadaj nowe hasło</Button>

                <Form>
                    <h2>Dane do faktury</h2>
                    <Col sm={6}>
                        <FormGroup>
                            <InputGroup>
                                <InputGroup.Addon>Imię</InputGroup.Addon>
                                <FieldGroup
                                    id="formControlsText"
                                    type="text"
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
                                             controlId="formControlsTextarea"/>
                            </InputGroup>
                        </FormGroup>
                    </Col>

                    <Button onClick={this.print_current_page}
                            type="submit"
                            bsStyle="warning"
                    >
                        Zatwierdź
                    </Button>
                </Form>

            </div>


        )

    }


}

export default Settings