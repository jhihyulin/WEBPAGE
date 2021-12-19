var clean = document.getElementById("clean");
clean.addEventListener('click', function clean() {
  document.querySelector("#message").value = "";
}, false)

var send = document.getElementById("send");
send.addEventListener('click', function send() {
  go()
}, false)


function go() {
  try {
    var message = document.querySelector("#message").value;
    swal({
      icon: "info",
      title: "↓請確認輸入的內容↓",
      text: message,
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
        console.log("message:" + message);
        var system = navigator.userAgent;
        var today = new Date();
        var date = today.toLocaleDateString();
        var time = today.toTimeString();
        console.log(system);
        console.log(date);
        console.log(time);
        document.getElementById('send').value = "傳送中...";
        document.getElementById('send').disabled = true;
        $.ajax({
          url: "https://script.google.com/macros/s/AKfycbwsBkPMi9CoIA0IagVLDIyE1QGWHEv5YuqtsxbRN22WWEXe-JjzbyFGdihmY6HoBf5-Dw/exec",
          type: "POST",
          cache: false,
          data: {
            webpage_name: 'message'
          },
          crossDomain: true,
          success: function(response) {
            var apps_script_url = response;
            send_to_backend(apps_script_url, system, time, date, message);
          },
          error: function(xhr, status) {
            console.log(xhr + "\n" + status);
            swal("傳送失敗\n" + xhr + "\n" + status, time, "error");
            document.getElementById('send').value = "傳送";
            document.getElementById('send').disabled = false;
          }
        });
      }
    });
  } catch (error) {
    swal("錯誤", error, "error");
  }
}

function send_to_backend(apps_script_url, system, time, date, message) {
  try {
    $.ajax({
      url: apps_script_url,
      type: "POST",
      cache: false,
      data: {
        system: system,
        time: time,
        input1: message,
        date: date
      },
      crossDomain: true,
      success: function(response) {
        swal("傳送成功\n", time, "success", {
          timer: 1500
        });
        document.getElementById('send').value = "傳送";
        document.getElementById('send').disabled = false;
      },
      error: function(xhr, status) {
        console.log(xhr + "\n" + status);
        swal("傳送失敗\n" + xhr + "\n" + status, time, "error");
        document.getElementById('send').value = "傳送";
        document.getElementById('send').disabled = false;
      }
    });
  } catch (error) {
    swal("錯誤", error, "error");
  }
}