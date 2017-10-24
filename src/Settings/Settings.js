import React from 'react'
import firebase from "firebase"
import {
    Button,
    FormGroup,
    FormControl,
    ControlLabel
} from 'react-bootstrap'
import UploadProfilePhoto from "../UploadProfilePhoto";

class Settings extends React.Component {

    // reset hasła
    HunddleResetPass = () => {
        const email = firebase.auth().currentUser.email
        firebase.auth().sendPasswordResetEmail(email).then(
            () => alert('Sprawdź e-maila i kilknij w link')
        )
    }

    render() {
        return (
            <div>
                <UploadProfilePhoto />
                <Button bsSize="large" bsStyle="danger" onClick={this.HunddleResetPass}>Nadaj nowe hasło</Button>
            </div>


        )

    }


}

export default Settings