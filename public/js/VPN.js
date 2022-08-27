function get_access_url(server_id, uid) {
    if (server_id == "none") {
        document.getElementById("access-url").value = "none";
        document.getElementById("access-url-go-to-app-button").style.display = "none";
        document.getElementById("access-url").style.display = "none";
        document.getElementById("access-url-copy-button").style.display = "none";
        return;
    }
    document.getElementById("access-url").value = "Loading access url...";
    document.getElementById("access-url").style.display = "initial";
    document.getElementById("access-url-go-to-app-button").style.display = "none";
    document.getElementById("access-url-copy-button").style.display = "none";
    var data = {
        "firebase_uid": uid,
        "server_id": server_id
    };
    json_data = JSON.stringify(data)
    $.ajax({
        url: "https://webpage-vpn-backend.herokuapp.com/get_key",
        //url: "http://127.0.0.1:8000/get_key",
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
            var access_url = data.access_url + "#" + data.display_name
            console.log(access_url);
            go_to_outlie_app_listener.addEventListener("click", function () {
                window.open(access_url, "_blank");
            }, false);
            
            var copy_listner = document.getElementById("access-url-copy-button");
            copy_listner.addEventListener("click", function () {
                navigator.clipboard.writeText(access_url);
                toastr.success("Copied to clipboard");
            }, false)
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
                value: "none"
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