function sl_url_init(uid) {
    var selectElement_2 = document.querySelector("#url-mode-option");
    document.getElementById("sl-url").style.display = "none";
    document.getElementById("sl-url-copy-button").style.display = "none";
    document.getElementById("sl-url-try-button").style.display = "none";
    selectElement_2.addEventListener("change", (event) => {
        if (event.target.value != "none") {
            document.getElementById("sl-url").style.display = "initial";
            document.getElementById("sl-url-copy-button").style.display = "initial";
            document.getElementById("sl-url-try-button").style.display = "initial";
        } else {
            document.getElementById("sl-url").style.display = "none";
            document.getElementById("sl-url-copy-button").style.display = "none";
            document.getElementById("sl-url-try-button").style.display = "none";
        }
    });
    var selectElement_1 = document.querySelector("#sl-url-submit-button");
    selectElement_1.addEventListener("click", (event) => {
        var choose_mode = document.querySelector("#url-mode-option").value;
        var original_url = document.querySelector("#url-input").value;
        if (choose_mode == "none") {
            toastr.error("Please choose a mode");
        } else if (original_url == "") {
            toastr.error("Please input a url");
        } else {
            var data = {
                "firebase_uid": uid,
                "original_url": original_url
            };
            json_data = JSON.stringify(data)
            if (choose_mode == "short") {
                server_address = "https://s.jhihyulin.live/create"
            } else if (choose_mode == "long") {
                server_address = "https://l.jhihyulin.live/create"
            }
            $.ajax({
                url: server_address,
                method: "POST",
                data: json_data,
                contentType: "application/json",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    document.getElementById("sl-url").value = data.url;
                    toastr.success("Success");
                    var try_listener = document.getElementById("sl-url-try-button");
                    try_listener.addEventListener("click", function () {
                        window.open(data.url, '_blank');
                    }, false);

                    const copy_listner = document.getElementById("sl-url-copy-button");
                    copy_listner.addEventListener("click", function () {
                        navigator.clipboard.writeText(data.url);
                        toastr.success("Copied to clipboard");
                    }, false)
                },
                error: function (data) {
                    console.log(data);
                    toastr.error(data.responseJSON.detail);
                }
            });
        }
    });
}