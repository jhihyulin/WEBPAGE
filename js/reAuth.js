function reAuth(checkPassword) {
    return new Promise(function (resolve, reject) {
        var user = firebase.auth().currentUser;
        var password = document.getElementById(checkPassword).value;
        var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
        user.reauthenticateWithCredential(credential).then(function () {
            resolve(user)
        }).catch(function (error) {
            reject(error.message);
        });
    })
}