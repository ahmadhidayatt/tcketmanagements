$(document).ready(function () {
    $("#dashboard").click(function () {
        $('#iframe').attr('src', 'pages-dashboard.html');
    });
    $("#enginer").click(function () {
        $('#iframe').attr('src', 'pages-enginerr-visit.html');
    });
    $("#news").click(function () {
        $('#iframe').attr('src', 'page-news-form.html');
    });
    $("#open_ticket").click(function () {
        $('#iframe').attr('src', 'page-opentiket-form');
    });
    
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


    $.post("retrieve_ticket", function (data) {
        var response = jQuery.parseJSON(data);
        console.log(data);
        $("#myTable").dataTable({
            "processing": true,
            "data": JSON.parse(data),
            "columns": [{
                    "data": "code"
                }, {
                    "data": "transname"
                }, {
                    "data": "cusname"
                }, {
                    "data": "date"
                }, {
                    "data": "addres"
                }, {
                    "data": "id"
                }

            ]
        });
    });

});

function getURLParameter(url, name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
}
