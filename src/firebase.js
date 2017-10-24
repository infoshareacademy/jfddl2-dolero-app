import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyBMSumd73-xPohl05Fqb7J5pc8MAG6aO4I",
    authDomain: "dolero-e89e1.firebaseapp.com",
    databaseURL: "https://dolero-e89e1.firebaseio.com",
    projectId: "dolero-e89e1",
    storageBucket: "dolero-e89e1.appspot.com",
    messagingSenderId: "1026760190547"
};

let firebaseApp = firebase.initializeApp(config);

export const googleProvider= new firebase.auth.GoogleAuthProvider();
export const database = firebaseApp.database();
export const storage = firebaseApp.storage();
export const auth = firebaseApp.auth();

console.log('A')
database.ref('/Piotr/spendings').on('value', snapshot => console.log('x1: ', snapshot))
database.ref('/Piotr/spendings').on('value', snapshot => console.log('x2: ', snapshot))

export default firebaseApp;

