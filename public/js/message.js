firebase_ui_web()

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
    privacyPolicyUrl: function() {
      window.location.assign('privacy_policy.html');
    }
  };
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
}
window.onload = function() {
  var logout_bton = document.getElementById("logout");
  logout_bton.addEventListener('click', function() {
    console.log("logout start")
    logout()
  }, false)
}

function logout() {
  firebase.auth().signOut()
    .then(function() {
      swal("登出成功", "", "success");
      console.log("登出成功");
      // 登出後強制重整一次頁面
      window.location.reload();
    }).catch(function(error) {
      swal("登出錯誤", error.message, "error");
      console.log("登出錯誤");
      console.log(error.message)
    });
}

firebase.auth().onAuthStateChanged(function(user) {
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
});

function send_mail_verification() {
  var user = firebase.auth().currentUser;
  user
    .sendEmailVerification()
    .then(function() {
      // 驗證信發送完成
      swal("認證信已發送到您的信箱", "請前往信箱點擊連結進行認證", "success");
    }).catch(error => {
      // 驗證信發送失敗
      swal("認證信發送失敗", error.message, "error");
      console.log(error.message);
    });
}

function forget_password() {
  // html 要有一個 <input id="forgot" type="email"> 讓使用者 email
  // 執行發件
  const emailAddress = document.getElementById('forgot').value;
  const auth = firebase.auth();
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    window.alert('已發送信件至信箱，請按照信件說明重設密碼');
    window.location.reload(); // 送信後，強制頁面重整一次
  }).catch(function(error) {
    console.log(error.message)
  });
}

function reAuth(checkPassword) {
  return new Promise(function(resolve, reject) {
    var user = firebase.auth().currentUser;
    var password = document.getElementById(checkPassword).value;
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
    user.reauthenticateWithCredential(credential).then(function() {
      resolve(user)
    }).catch(function(error) {
      reject(error.message);
    });
  })
}

var apps_script_url = "";

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