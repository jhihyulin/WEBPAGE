function AndroidOpenApp(access_url) {
    var before = new Date().valueOf();
    setTimeout(function () {
        var after = new Date().valueOf();
        if (after - before > 200) { return; }
        window.location = ('market://details?id=org.outline.android.client');
    }, 50);
    window.location = (access_url);
}

function iOSOpenApp(access_url) {
    window.location = (access_url);
    toastr.info("<a href='https://apps.apple.com/us/app/outline-app/id1356177741'>Install</a>",
        'App didn\'t open? Please install the app first',
        {
            "timeOut": "10000",
            "closeButton": true,
            "extendedTimeOut": "10000"
        });
}

function MacosOpenApp(access_url) {
    window.location = (access_url);
    toastr.info("<a href='https://apps.apple.com/us/app/outline-app/id1356178125'>Install</a>",
        'App didn\'t open? Please install the app first',
        {
            "timeOut": "10000",
            "closeButton": true,
            "extendedTimeOut": "10000"
        });
}

function WindowsAndLinuxOpenApp(access_url) {
    window.location = (access_url);
    toastr.info("<a href='https://getoutline.org/zh-TW/get-started/#step-3'>Install</a>",
        'App didn\'t open? Please install the app first',
        {
            "timeOut": "10000",
            "closeButton": true,
            "extendedTimeOut": "10000"
        });
}

function which_system() {
    var u = navigator.userAgent;
    return {
        // android
        android: u.indexOf('Android') > -1,
        // �O�_��ios
        ios: u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1,
        // �O�_��windows
        windows: u.indexOf('Windows') > -1,
        // �O�_��linux
        linux: u.indexOf('linux') > -1 || u.indexOf('ubuntu') > -1,
        // �O�_��mac
        macos: u.indexOf('Mac')
    };
}

function go_to_outlie_app(access_url) {
    if (which_system().android) {
        AndroidOpenApp(access_url);
    } else if (which_system().ios) {
        iOSOpenApp(access_url);
    } else if (which_system().windows || which_system().linux) {
        WindowsAndLinuxOpenApp(access_url);
    } else if (which_system().macos) {
        MacosOpenApp(access_url);
    } else {
        toastr.warning("Pleasee add the access url by yourself", "Unknown system");
    }
}


function get_access_url(server_id, uid) {
    if (server_id == "none") {
        document.getElementById("access-url").value = "none";
        document.getElementById("access-url-go-to-app-button").style.display = "none";
        document.getElementById("access-url").style.display = "none";
        document.getElementById("access-url-copy-button").style.display = "none";
        document.getElementById("data-usage-bar").style.display = "none";
        return;
    }
    document.getElementById("access-url").value = "Loading access url...";
    document.getElementById("access-url").style.display = "initial";
    document.getElementById("access-url-go-to-app-button").style.display = "none";
    document.getElementById("access-url-copy-button").style.display = "none";
    document.getElementById("data-usage-bar").style.display = "none";
    var data = {
        "firebase_uid": uid,
        "server_id": server_id
    };
    json_data = JSON.stringify(data)
    $.ajax({
        url: "https://vpn.jhihyulin.live/get_key",
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
            document.getElementById("data-usage-bar").style.display = "initial";
            document.getElementById("data-usage-bar").value = data.used_bytes_visualization + "/" + data.use_bytes_limit_visualization + " " + data.data_used_percentage + "%";
            var access_url = data.access_url + "#" + data.display_name
            console.log(access_url);
            var go_to_outlie_app_listener = document.getElementById("access-url-go-to-app-button");
            go_to_outlie_app_listener.addEventListener("click", function () {
                go_to_outlie_app(access_url);
            }, false);

            const copy_listner = document.getElementById("access-url-copy-button");
            copy_listner.addEventListener("click", function () {
                navigator.clipboard.writeText(access_url);
                toastr.success("Copied to clipboard");
            }, false)
        }
    })
}

function get_server_list(uid) {
    $.ajax({
        url: "https://vpn.jhihyulin.live/server_list",
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
