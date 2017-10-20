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
        // resret hasła
        <Button onClick={this.HunddleResetPass}>Nadaj nowe hasło</Button>
    )

}



}

export default Settings