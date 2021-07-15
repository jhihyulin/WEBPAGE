function forgot_password() {
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