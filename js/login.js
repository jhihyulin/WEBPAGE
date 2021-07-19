function change_password() {
    // html 要有一個 <input id="old-password" type="password"> 讓使用者輸入舊密碼
    // html 要有一個 <input id="new-password" type="password"> 讓使用者輸入新密碼
    // 取得新密碼
    var newPassword = document.getElementById('new-password').value;
    // 更新密碼
    reAuth('old-password')
        .then(function (user) {
            user.updatePassword(newPassword).then(function () {
                swal('密碼更新完成，請重新登入', "", "success");
                console.log("密碼更新成功");
                // 修改密碼完成後，強制登出並重整一次頁面
                firebase.auth().signOut().then(function () {
                    window.location.reload();
                });
            }).catch(function (error) {
                swal("密碼更新錯誤", error.message, "error");
                console.log("密碼更新錯誤");
                console.log(error.message);
            });
        }).catch(function (error) {
            swal("使用者驗證錯誤", error.message, "error");
            console.log("使用者驗證錯誤");
            console.log(error.message);
        });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // 使用者已登入，可以取得資料
        console.log("使用者已登入");
        var email = user.email;
        var uid = user.uid;
        console.log(email, uid);
        document.getElementById("login_statue").innerHTML = "已登入";
    } else {
        // 使用者未登入
        console.log("使用者尚未登入");
        document.getElementById("login_statue").innerHTML = "尚未登入";
    }
});

firebase.auth().onAuthStateChanged(function (user) {
    try {
        if (user.emailVerified == true) {
            console.log("電子郵件已驗證");
            document.getElementById("send_mail_verification").type = "hidden";
        } else if (user.emailVerified == false) {
            swal("電子郵件未驗證", "請前往信箱點擊連結進行認證", "error");
            console.log("電子郵件未驗證");
            document.getElementById("send_mail_verification").type = "button";
        }
    } catch (error) {
        console.log(error);
    }
});

function delete_account() {
    // html 要有一個 <input id="check-password" type="password"> 讓使用者輸入密碼
    // 刪除帳號
    reAuth('check-password')
        .then(function (user) {
            user.delete().then(function () {
                swal("帳號刪除成功", "", "success");
                console.log("帳號刪除成功");
                // 刪除帳號後，強制重整一次頁面
                window.location.reload();
            }).catch(function (error) {
                swal("帳號刪除錯誤", error.message, "error");
                console.log("帳號刪除錯誤");
                console.log(error.message);
            });
        }).catch(function (error) {
            swal("使用者驗證錯誤", error.message, "error");
            console.log("帳號刪除錯誤");
            console.log(error.message);
        })
}

function email_login() {
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(result => {
            swal("登入成功", "", "success");
            console.log("登入成功");
            console.log(result);
        })
        .catch(error => {
            swal("登入錯誤", error.message, "error");
            console.log("登入錯誤");
            console.log(error.message);
        });
}

function email_register() {
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
            swal("註冊成功", "", "success");
            console.log("註冊成功");
            console.log(result);
        }).catch(function (error) {
            swal("註冊錯誤", error.message, "error");
            console.log("註冊錯誤");
            console.log(error.message);
        });
}

function forget_password() {
    // html 要有一個 <input id="forgot" type="email"> 讓使用者 email
    // 執行發件
    const emailAddress = document.getElementById('forgot').value;
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(emailAddress).then(function () {
        window.alert('已發送信件至信箱，請按照信件說明重設密碼');
        window.location.reload(); // 送信後，強制頁面重整一次
    }).catch(function (error) {
        console.log(error.message)
    });
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

function reAuth(checkPassword) {
    return new Promise(function (resolve, reject) {
        var user = firebase.auth().currentUser;
        var password = document.getElementById(checkPassword).value;
        var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
        user.reauthenticateWithCredential(credential).then(function () {
            resolve(user)
        }).catch(function (error) {
            reject(error.message);
        });
    })
}

function send_mail_verification() {
    var user = firebase.auth().currentUser;
    user
        .sendEmailVerification()
        .then(function () {
            // 驗證信發送完成
            swal("認證信已發送到您的信箱", "請前往信箱點擊連結進行認證", "success");
        }).catch(error => {
            // 驗證信發送失敗
            swal("認證信發送失敗", error.message, "success");
            console.log(error.message);
        });
}

function google_login() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
    .signInWithRedirect(provider)
        .then((result) => {
            swal("登入成功","", "success");
            console.log(result);
            console.log("登入成功");
            var credential = result.credential;
            var token = credential.accessToken;
            var user = result.user;
            console.log(user,token);
            
        }).catch((error) => {
            swal("登入錯誤", error.message, "error");
            console.log("登入錯誤");
            console.log(error.message);
            console.log(error);
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });
}

function reCAPTCHA() {
    const appCheck = firebase.appCheck();
    // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
    // key is the counterpart to the secret key you set in the Firebase console.
    appCheck.activate("6LfXK5wbAAAAAGMIB8-8zSBuvXjYmj-FCITlYa9x");
}