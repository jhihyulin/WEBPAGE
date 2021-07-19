function email_login() {
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(result => {
            swal("登入成功","", "success");
            console.log("登入成功");
            console.log(result);
        })
        .catch(error => {
            swal("登入錯誤", error.message, "error");
            console.log("登入錯誤");
            console.log(error.message);
        });
}