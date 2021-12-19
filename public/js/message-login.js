firebase_ui_web()

function firebase_ui_web() {
  var uiConfig = {
    signInSuccessUrl: 'message.html', //登入後導向哪裡
    signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
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

function delete_account() {
  // html 要有一個 <input id="check-password" type="password"> 讓使用者輸入密碼
  // 刪除帳號
  reAuth('check-password')
    .then(function(user) {
      user.delete().then(function() {
        swal("帳號刪除成功", "", "success"); // 刪除帳號後，強制重整一次頁面
        window.location.reload();
      }).catch(function(error) {
        swal("帳號刪除錯誤", error.message, "error");
        console.log("帳號刪除錯誤");
        console.log(error.message);
      });
    }).catch(function(error) {
      swal("使用者驗證錯誤", error.message, "error");
      console.log("帳號刪除錯誤");
      console.log(error.message);
    })

  /*
  swal({
          title: "Are you sure?",
          text: "You will not be able to recover this imaginary file!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel plx!",
          closeOnConfirm: false,
          closeOnCancel: false
      },
      function (isConfirm) {
          if (isConfirm) {
              swal("Deleted!", "Your imaginary file has been deleted.", "success");
          } else {
              swal("Cancelled", "Your imaginary file is safe :)", "error");
          }
      });
  */
}

function change_password() {
  // html 要有一個 <input id="old-password" type="password"> 讓使用者輸入舊密碼
  // html 要有一個 <input id="new-password" type="password"> 讓使用者輸入新密碼
  // 取得新密碼
  var newPassword = document.getElementById('new-password').value;
  // 更新密碼
  reAuth('old-password')
    .then(function(user) {
      user.updatePassword(newPassword).then(function() {
        swal('密碼更新完成，請重新登入', "", "success");
        console.log("密碼更新成功");
        // 修改密碼完成後，強制登出並重整一次頁面
        firebase.auth().signOut().then(function() {
          window.location.reload();
        });
      }).catch(function(error) {
        swal("密碼更新錯誤", error.message, "error");
        console.log("密碼更新錯誤");
        console.log(error.message);
      });
    }).catch(function(error) {
      swal("使用者驗證錯誤", error.message, "error");
      console.log("使用者驗證錯誤");
      console.log(error.message);
    });
}

/*
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // 使用者已登入，可以取得資料
        console.log("使用者已登入");
        var email = user.email;
        var uid = user.uid;
        console.log(email, uid);
        if (user.emailVerified == true && user.email != null) {
            document.getElementById("login_statue").innerHTML = "已登入";
        } else if (user.emailVerified == false && user.email != null) {
            document.getElementById("login_statue").innerHTML = "已登入 尚未驗證電子郵件";
        } else if (user.email == null) {
            document.getElementById("login_statue").innerHTML = "已匿名登入";
        }
    } else {
        // 使用者未登入
        console.log("使用者尚未登入");
        document.getElementById("login_statue").innerHTML = "尚未登入";
    }
});
*/

firebase.auth().onAuthStateChanged(function(user) {
  console.log("登入狀態改變");
  if (firebase.auth().currentUser) {
    console.log("已登入");
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
    document.getElementById("login-state").innerHTML = "已由" + display + "登入";
    document.getElementById("firebase-ui-case").style.display = "none";
    document.getElementById("logout-case").style.display = "";
  } else {
    console.log("未登入");
    document.getElementById("login-state").innerHTML = "請先登入";
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