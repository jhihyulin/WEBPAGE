var firebaseConfig = {
    apiKey: "AIzaSyCD9r1BoMkQ7_lzschLnh-rYaMsA7LpEQs",
    authDomain: "webpage-349c7.firebaseapp.com",
    databaseURL: "https://webpage-349c7-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "webpage-349c7",
    storageBucket: "webpage-349c7.appspot.com",
    messagingSenderId: "897798864282",
    appId: "1:897798864282:web:5508fd782851e7aaf10e23",
    measurementId: "G-57RJHE6TG1"
};

try {
    firebase.initializeApp(firebaseConfig);
    var perf = firebase.performance();
} catch (e) {
    console.log(e);
}