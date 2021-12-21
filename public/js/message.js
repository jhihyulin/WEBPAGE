var apps_script_url = "";

window.onload = function() {
  var db = firebase.firestore();
  console.log("firebase database init");
}

var clean = document.getElementById("clean");
clean.addEventListener('click', function clean() {
  document.querySelector("#message").value = "";
}, false)

var send = document.getElementById("send");
send.addEventListener('click', function send() {
  check_info();
}, false)

function check_info() {
  console.log("test--1");
  var message = document.querySelector("#message").value;
  swal({
    icon: "info",
    title: "↓請確認輸入的內容↓",
    text: message,
    buttons: {
      A: {
        text: "取消",
        value: "no"
      },
      B: {
        text: "傳送",
        value: "yes"
      }
    }
  }).then((value) => {
    console.log("test--2");
    if (value == "yes") {
      console.log("test--3");
      document.getElementById('send').value = "傳送中...";
      document.getElementById('send').disabled = true
      write_database(message);
      console.log("test--4");
    }
  });
}

function write_database(message) {
  try {
    var d = new Date();
    var system = navigator.userAgent;
    var timestamp = firebase.firestore.FieldValue.serverTimestamp();
    var timeString = d.getUTCFullYear() + "/" + (d.getUTCMonth() + 1) + "/" + d.getUTCDate() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + ":" + d.getUTCSeconds();
    //firebase user
    var user = firebase.auth().currentUser;
    if (user !== null) {
      var displayName = user.displayName;
      var email = user.email;
      var photoURL = user.photoURL;
      var emailVerified = user.emailVerified;
      var uid = user.uid;
    } else {
      var displayName = null;
      var email = null;
      var photoURL = null;
      var emailVerified = null;
      var uid = null;
    }
    var db = firebase.firestore();
    var ref = db.collection('message').doc();
    ref.set({
      message: message,
      uid: uid,
      displayName: displayName,
      email: email,
      photoURL: photoURL,
      publics: false,
      timestamp: timestamp,
      timeString: timeString,
      user_agent: system
    }).then(() => {
      console.log('set data successful');
      console.log(timestamp);
      swal("傳送成功", timeString, "success");
      document.getElementById('send').value = "傳送";
      document.getElementById('send').disabled = false;
    });
  } catch (error) {
    swal("錯誤", "", "error");
    console.log(error);
    document.getElementById('send').value = "傳送";
    document.getElementById('send').disabled = false;
  }
}