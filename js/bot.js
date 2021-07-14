function clean() {
    document.querySelector("#name").value = "";
    document.querySelector("#message").value = "";
    document.querySelector("#choose_people").value = "";
    document.querySelector("#avatar_url").value = "";
}

function go() {
    var name = document.querySelector("#name").value;
    var message = document.querySelector("#message").value;
    var people = document.querySelector("#choose_people").value;
    var avatar_url = document.querySelector("#avatar_url").value;
    console.log(name);
    console.log(message);
    console.log(people);
    console.log(avatar_url);
    document.getElementById('button1').value = "傳送中...";
    document.getElementById('button1').disabled = true;
    $.post('https://script.google.com/macros/s/AKfycbwsBkPMi9CoIA0IagVLDIyE1QGWHEv5YuqtsxbRN22WWEXe-JjzbyFGdihmY6HoBf5-Dw/exec', {
        webpage_name: "bot"
    }, function (e) {
        if (e == "error") {
            console.log(e);
            document.getElementById('button1').value = "傳送";
            document.getElementById('button1').disabled = false;
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
                document.getElementById('button1').value = "傳送";
                document.getElementById('button1').disabled = false;
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
}