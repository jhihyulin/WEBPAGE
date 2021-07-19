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