function firebase_ui_web() {
  var uiConfig = {
    signInSuccessUrl: 'message.html', //登入後導向哪裡
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: 'TW'
      },
      firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
    // function.
    // Terms of service url/callback.
    tosUrl: 'information_security_policy.html',
    // Privacy policy url/callback.
    privacyPolicyUrl: function () {
      window.location.assign('privacy_policy.html');
    }
  };
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
}

function logout() {
  firebase.auth().signOut()
    .then(function () {
      swal("登出成功", "", "success");
      console.log("登出成功");
      // 登出後強制重整一次頁面
      window.location.reload();
    }).catch(function (error) {
      swal("登出錯誤", error.message, "error");
      console.log("登出錯誤");
      console.log(error.message)
    });
}

firebase.auth().onAuthStateChanged(function (user) {
  console.log("登入狀態改變");
  if (firebase.auth().currentUser) {
    console.log("已登入");
    swal("已登入", "本網站尚未完成\n如有錯誤請通知作者", "info");
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var uid = user.uid;
    var phoneNumber = user.phoneNumber;
    var providerData = user.providerData
    if (displayName != null) {
      var display = displayName;
    } else {
      if (email != null) {
        var display = eamil;
      } else {
        if (phoneNumber != null) {
          var display = phoneNumber;
        } else {
          var display = "訪客";
        }
      }
    }
    document.getElementById("login-state").innerHTML = display;
    document.getElementById("firebase-ui-case").style.display = "none";
    document.getElementById("logout-case").style.display = "";
    var db = firebase.firestore();
    var ref = db.collection("user").doc(uid);
    console.log("try update user");
    ref.update({
      uid: uid,
      displayName: displayName,
      emailVerified: emailVerified,
      email: email,
      photoURL: photoURL,
      phoneNumber: phoneNumber
    }).then(() => {
      console.log('update user data successful');
    })
      .catch(error => {
        console.log("try set user");
        ref.set({
          uid: uid,
          displayName: displayName,
          emailVerified: emailVerified,
          email: email,
          photoURL: photoURL,
          phoneNumber: phoneNumber
        }).then(() => {
          console.log('set user data successful');
        });
      }
      )
  } else {
    console.log("未登入");
    swal("未登入", "登入後即可管理留言", "info");
    document.getElementById("login-state").innerHTML = "未登入";
    document.getElementById("firebase-ui-case").style.display = "";
    document.getElementById("logout-case").style.display = "none";
  }
  try {
    if (user.emailVerified == true && user.email != null) {
      console.log("電子郵件已驗證");
      document.getElementById("send_mail_verification").type = "hidden";
    } else if (user.emailVerified == false && user.email != null) {
      swal("電子郵件未驗證", "請前往信箱點擊連結進行認證", "warning");
      console.log("電子郵件未驗證");
      document.getElementById("send_mail_verification").type = "button";
    } else if (user.email == null) {
      console.log("非電子郵件登入，不須驗證電子郵件");
    }
  } catch (error) {
    console.log(error);
  }
  try {
    var db = firebase.firestore();
    db.collection("user").doc(uid).onSnapshot(doc => {
      console.log(doc.data());
      if (doc.data().role == "admin") {
        document.getElementById("admin_case").style.display = "";
      } else {
        document.getElementById("admin_case").style.display = "none";
      }
    })
    .catch(error => {
      document.getElementById("admin_case").style.display = "none";
    });
  } catch (error) {
    document.getElementById("admin_case").style.display = "none";
  }
});

function get_data() {
  var db = firebase.firestore();
  db.collection("message").orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        //div
        var data_div = document.createElement('div');
        data_div.setAttribute('class', 'firestore_data');
        data_div.setAttribute('id', 'firestore_' + doc.id);
        document.getElementById('firestore_data').appendChild(data_div);
        //message
        var data_p = document.createElement('p');
        data_p.textContent = doc.data().message;
        data_p.setAttribute('class', 'firestore_data_p');
        data_p.setAttribute('id', 'firestore_' + doc.id + '_p');
        document.getElementById('firestore_' + doc.id).appendChild(data_p);
        //timestamp
        var data_timestamp = document.createElement('p');
        data_timestamp.textContent = doc.data().timeString;
        data_timestamp.setAttribute('class', 'firestore_data_timestamp');
        data_timestamp.setAttribute('id', 'firestore_' + doc.id + '_timestamp');
        document.getElementById('firestore_' + doc.id).appendChild(data_timestamp);
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

var get_data_listner = document.getElementById("firestore_get_data");
get_data_listner.addEventListener("click", function () {
  get_data();
}, false)

var clean_listner = document.getElementById("clean");
clean_listner.addEventListener('click', function clean() {
  document.querySelector("#message").value = "";
}, false)

var send_listner = document.getElementById("send");
send_listner.addEventListener('click', function send() {
  check_info();
}, false)

var logout_listner = document.getElementById("logout");
logout_listner.addEventListener('click', function () {
  console.log("logout start");
  logout();
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
      console.log('send data successful');
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

window.onload = function () {
  firebase_ui_web();
}