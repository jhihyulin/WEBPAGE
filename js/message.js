function clean() {
    document.querySelector("#input1").value = "";
}

function go() {
    var input1 = document.querySelector("#input1").value;
    swal({
        icon: "info",
        title: "↓請確認輸入的內容↓",
        text: input1,
        buttons: {
            A: {
                text: "取消",
                value: "no"
            },
            B: {
                text: "傳送",
                value: "yes"
            }
        }
    }).then((value) => {
        if (value == "yes") {
            console.log("input1:" + input1);
            var system = navigator.userAgent;
            var today = new Date();
            var date = today.toLocaleDateString();
            var time = today.toTimeString();
            console.log(system);
            console.log(date);
            console.log(time);
            document.getElementById('button1').value = "傳送中...";
            document.getElementById('button1').disabled = true;
            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbwsBkPMi9CoIA0IagVLDIyE1QGWHEv5YuqtsxbRN22WWEXe-JjzbyFGdihmY6HoBf5-Dw/exec",
                type: "POST",
                cache: false,
                data: {
                    webpage_name: 'message'
                },
                crossDomain: true,
                success: function (response) {
                    var apps_script_url = response;
                    send(apps_script_url, system, time, date, input1);
                },
                error: function (xhr, status) {
                    console.log(xhr + "\n" + status);
                    swal("傳送失敗\n" + xhr + "\n" + status, time, "error");
                    document.getElementById('button1').value = "傳送";
                    document.getElementById('button1').disabled = false;
                }
            });
        }
    });
}

function send(apps_script_url, system, time, date, input1) {
    $.ajax({
        url: apps_script_url,
        type: "POST",
        cache: false,
        data: {
            system: system,
            time: time,
            input1: input1,
            date: date
        },
        crossDomain: true,
        success: function (response) {
            swal("傳送成功\n", time, "success", {
                timer: 1500
            });
            document.getElementById('button1').value = "傳送";
            document.getElementById('button1').disabled = false;
        },
        error: function (xhr, status) {
            console.log(xhr + "\n" + status);
            swal("傳送失敗\n" + xhr + "\n" + status, time, "error");
            document.getElementById('button1').value = "傳送";
            document.getElementById('button1').disabled = false;
        }
    });
}