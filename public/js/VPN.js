function get_access_url(server_id, uid) {
    var data = {
        "firebase_uid": uid,
        "server_id": server_id
    };
    json_data = JSON.stringify(data)
    $.ajax({
        url: "https://webpage-vpn-backend.herokuapp.com/create_key",
        //url: "http://127.0.0.1:8000/create_key",
        method: "POST",
        data: json_data,
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            document.getElementById("access-url").value = data.access_url;
            document.getElementById("access-url-go-to-app-button").style.display = "initial";
            document.getElementById("access-url").style.display = "initial";
            document.getElementById("access-url-copy-button").style.display = "initial";
            var go_to_outlie_app_listener = document.getElementById("access-url-go-to-app-button");
            go_to_outlie_app_listener.addEventListener("click", (event) => {
                window.open(data.access_url, "_blank");
            });
            var copy_listner = document.getElementById("access-url-copy-button");
            copy_listner.addEventListener('click', () => {
                navigator.clipboard.writeText(data.access_url)
                .then(() => {
                    toastr.success("Copied to clipboard");
                });
        })
}
    })
}

function get_server_list(uid) {
    $.ajax({
        url: "https://webpage-vpn-backend.herokuapp.com/server_list",
        //url: "http://127.0.0.1:8000/server_list",
        method: "get",
        success: function (data) {
            console.log("�w���o���A���C��");
            console.log(data);
            $("#server-list-option").empty();
            $("#server-list-option").append($("<option/>", {
                text: "Please choose a server",
            }));
            for (var i = 0; i < data.server_amount; i++) {
                $("#server-list-option").append($("<option/>", {
                    value: data.server_list[i].server_id,
                    text: data.server_list[i].display_name
                }));
            }
        }
    });
    var selectElement = document.querySelector("#server-list-option");
    selectElement.addEventListener("change", (event) => {
        console.log("select " + event.target.value);
        get_access_url(event.target.value, uid);
    });
}

var reload_listner = document.getElementById("Reload-server-list-button");
reload_listner.addEventListener('click', function send() {
    var uid = firebase.auth().currentUser.uid
    get_server_list(uid)
    toastr.success("Reloaded successfully");
}, false)