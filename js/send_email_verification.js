function send_mail_verification() {
    var user = firebase.auth().currentUser;

    user
        .sendEmailVerification()
        .then(function () {
            // 驗證信發送完成
            swal("認證信已發送到您的信箱", "請前往信箱點擊連結進行認證","success");
        }).catch(error => {
            // 驗證信發送失敗
            swal("認證信發送失敗", error.message, "success");
            console.log(error.message);
        });
}