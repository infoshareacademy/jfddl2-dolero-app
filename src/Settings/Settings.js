import React from 'react'
import firebase from "firebase"
import {Button} from 'react-bootstrap'

class Settings extends React.Component {


            // reset hasła
                HunddleResetPass=() => {
                    const email = firebase.auth().currentUser.email
                    firebase.auth().sendPasswordResetEmail(email).then(
                        () => alert('Sprawdź e-maila i kilknij w link')
                    )
                }


render(){
    return(
        <div>
            {/*reset hasła*/}

            <form>
                <input
                    type="file"
                />

                <Button
                    type="submit"
                    bsSize="large"
                    bsStyle="warning"
                >
                    Dodaj zdjęcie profilowe
                </Button>
            </form>
            <Button bsSize="large" bsStyle="danger" onClick={this.HunddleResetPass}>Nadaj nowe hasło</Button>
        </div>


    )

}



}

export default Settings