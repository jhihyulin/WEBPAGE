const firebaseConfig = {
  apiKey: "AIzaSyCD9r1BoMkQ7_lzschLnh-rYaMsA7LpEQs",
  authDomain: "auth.jhihyulin.live",
  databaseURL: "https://webpage-349c7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webpage-349c7",
  storageBucket: "webpage-349c7.appspot.com",
  messagingSenderId: "897798864282",
  appId: "1:897798864282:web:4ee8989435b61290f10e23",
  measurementId: "G-JDZTQWRMLT"
};

try {
    firebase.initializeApp(firebaseConfig);
    var perf = firebase.performance();
} catch (e) {
    console.log(e);
}
