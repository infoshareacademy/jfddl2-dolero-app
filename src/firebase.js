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

// export const googleProvider= new firebase.auth.GoogleAuthProvider();
export const database = firebaseApp.database();
// export const auth= firebaseApp.auth();

export default firebaseApp;

