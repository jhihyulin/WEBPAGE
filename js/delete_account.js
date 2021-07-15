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