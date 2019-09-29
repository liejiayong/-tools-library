/**
 * Created by Administrator on 2017/5/20.
 */

window.onload = function () {

    function calenders() {
        var clickFlag = true;
        var btnId = '#change';
        var btn = document.querySelector(btnId);
        var show = document.querySelector("#show");
        btn.onclick= function () {
            if (clickFlag) {
                var request = false;
                try {
                    request = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (msxml2) {
                    try {
                        request = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (microsoft) {
                        request = false;
                    }
                }

                if (!request && typeof XMLHttpRequest != 'undefined') {
                    request = new XMLHttpRequest();
                }
                    // console.log(request);
                clickFlag = false;
                var url = 'calendar.php';
                request.open('GET', url, true);
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        if (request.status == 200) {

                            show.innerHTML = request.responseText;

                        }
                    }
                }
                request.send(null);
            } else {
                clickFlag = true;
                show.innerHTML = '';
            }
        }

    }
    calenders();
}
