firebase.auth().onAuthStateChanged(function (user) {
    try {
        if (user.emailVerified == true) {
            console.log("電子郵件已驗證");
            document.getElementById("send_mail_verification").type = "hidden";
        } else if (user.emailVerified == false) {
            swal("電子郵件未驗證", "請前往信箱點擊連結進行認證","error");
            console.log("電子郵件未驗證");
            document.getElementById("send_mail_verification").type = "button";
        }
    }catch (error){
        console.log(error);
    }
});