window.onload = startTime;
function startTime() {
    var today = new Date();
    var yyyy = today.getFullYear()
    var mo = today.getMonth() + 1;
    var dd = today.getDate();
    var hh = today.getHours();
    var mm = today.getMinutes();
    var ss = today.getSeconds();
    mm = checkTime(mm);
    ss = checkTime(ss);
    document.getElementById('clock').innerHTML = yyyy + "/" + mo + "/" + dd + " " + hh + ":" + mm + ":" + ss;
    var timeoutId = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var go_index_listner = document.getElementById("container");
if (go_index_listner) {
    go_index_listner.addEventListener('click', function go_index() {
        window.location.href = 'index.html';
    }, false)
}
