function change_password() {
    // html 要有一個 <input id="old-password" type="password"> 讓使用者輸入舊密碼
    // html 要有一個 <input id="new-password" type="password"> 讓使用者輸入新密碼
    // 取得新密碼
    var newPassword = document.getElementById('new-password').value;
    // 更新密碼
    reAuth('old-password')
        .then(function (user) {
            user.updatePassword(newPassword).then(function () {
                swal('密碼更新完成，請重新登入',"","success");
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