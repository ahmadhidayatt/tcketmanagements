$(document).ready(function () {

    $.get("index", function (data, status) {
        var result = $.trim(data);
        if (result === "true") {
            return;
        } else {
            alert(result);
            window.location.href = "pages-login.html";
        }
        ;
    });

    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    var code = getURLParameter(url, 'code');
    console.log(code);
    alert(code);

    $("#logout").click(function () {
        $.post("logout", function (data, status) {
            alert("Data: " + data.length + data + "\nStatus: " + status);
            var result = $.trim(data);
            if (result === "true") {
                alert(result);
                window.location.href = "pages-login.html";
            } else {
                 alert("try again logout");
                return;
            }
            ;
        });
    });


});

function getURLParameter(url, name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
}
