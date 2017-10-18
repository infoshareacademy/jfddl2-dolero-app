export const signIn = (email, password) => dispatch => {
     auth().signInWithEmailAndPassword(email, password)
    }

const initialState = {
    user: null
}