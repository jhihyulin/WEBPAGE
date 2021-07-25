var clean = document.getElementById("clean");
clean.addEventListener('click', function clean() {
    document.querySelector("#name").value = "";
    document.querySelector("#message").value = "";
    document.querySelector("#choose_people").value = "";
    document.querySelector("#avatar_url").value = "";
}, false)

var send = document.getElementById("send");
send.addEventListener('click', function send() {
    go()
}, false)

function go() {
    try {
        var name = document.querySelector("#name").value;
        var message = document.querySelector("#message").value;
        var people = document.querySelector("#choose_people").value;
        var avatar_url = document.querySelector("#avatar_url").value;
        console.log(name);
        console.log(message);
        console.log(people);
        console.log(avatar_url);
        document.getElementById('send').value = "傳送中...";
        document.getElementById('send').disabled = true;
        $.post('https://script.google.com/macros/s/AKfycbwsBkPMi9CoIA0IagVLDIyE1QGWHEv5YuqtsxbRN22WWEXe-JjzbyFGdihmY6HoBf5-Dw/exec', {
            webpage_name: "bot"
        }, function (e) {
            if (e == "error") {
                console.log(e);
                document.getElementById('send').value = "傳送";
                document.getElementById('send').disabled = false;
                swal("傳送失敗", "請聯絡開發人員", "error", {
                    timer: 2000,
                });
            } else {
                let apps_script_url = e;
                console.log(apps_script_url);
                $.post(apps_script_url, {
                    name: name,
                    message: message,
                    people: people,
                    avatar_url: avatar_url
                }, function (e) {
                    console.log(e);
                    document.getElementById('send').value = "傳送";
                    document.getElementById('send').disabled = false;
                    if (e == "send_success") {
                        swal("傳送成功\n", "", "success", {
                            timer: 1500,
                        });
                    } else {
                        swal("傳送失敗\n", e, "fail", {
                            timer: 1500,
                        });
                    }
                });
            }
        })
    } catch (error) {
        swal("錯誤", error, "error");
    }
}