function get_access_url(server_id, uid){
    $.ajax({
        url: 'https://webpage-vpn-backend.herokuapp.com/create_key',
        //url: 'http://127.0.0.1:8000/create_key',
        method: 'POST',
        data: {
            firebase_uid: uid,
            server_id: server_id
        },
        success: function(data){
            console.log(data);
            $('#access_url').value = data.access_url;
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
            for (var i = 0; i < data.server_amount; i++) {
                $('#server-list-option').append($("<option/>", {
                    value: data.server_list[i].server_id,
                    text: data.server_list[i].display_name
                }));
            }
        }
    });
    var selectElement = document.querySelector('#server-list-option');
    selectElement.addEventListener('change', (event) => {
        console.log('select ' + event.target.value);
        get_access_url(event.target.value, uid);
    });
}