function logout() {
    firebase.auth().signOut()
        .then(function () {
            swal("登出成功","", "success");
            console.log("登出成功");
            // 登出後強制重整一次頁面
            window.location.reload();
        }).catch(function (error) {
            swal("登出錯誤", error.message, "error");
            console.log("登出錯誤");
            console.log(error.message)
        });
}