function email_register() {
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(result => {
            swal("註冊成功","", "success");
            console.log("註冊成功");
            console.log(result);
        }).catch(function (error) {
            swal("註冊錯誤", error.message, "error");
            console.log("註冊錯誤");
            console.log(error.message);
        });
}