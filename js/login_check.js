firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // 使用者已登入，可以取得資料
        console.log("使用者已登入");
        var email = user.email;
        var uid = user.uid;
        console.log(email, uid);
        document.getElementById("login_statue").innerHTML="已登入";
    } else {
        // 使用者未登入
        console.log("使用者尚未登入");
        document.getElementById("login_statue").innerHTML="尚未登入";
    }
});