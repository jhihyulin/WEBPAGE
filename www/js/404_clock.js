window.onload = startTime;
        function startTime() {
            var today = new Date();
            var yyyy = today.getFullYear()
            var mm = today.getMonth();
            var dd = today.getDate();
            var hh = today.getHours();
            var mm = today.getMinutes();
            var ss = today.getSeconds();
            mm = checkTime(mm);
            ss = checkTime(ss);
            document.getElementById('clock').innerHTML = yyyy + "/" + mm + "/" + dd + " " + hh + ":" + mm + ":" + ss;
            var timeoutId = setTimeout(startTime, 500);
        }

        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }