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
        $('#iframe').attr('src', 'page-opentiket-form.html');
    });
    $(".profile").click(function () {
        $('#iframe').attr('src', 'pages-profile.html');
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
        console.log(data);
        //  var response = jQuery.parseJSON(data);

        $("#myTable").dataTable({
            "processing": true,
            "data": JSON.parse(data),
            "columns": [{
                    "data": "id_ticket"
                }, {
                    "data": "nik"
                }, {
                    "data": "nama"
                }, {
                    "data": "id_atm"
                }, {
                    "data": "nama_atm"
                }, {
                    "data": "nama_masalah"
                }, {
                    "data": "start_time"
                }, {
                    "data": "end_time"
                }

            ]
        });
        var detailRows = [];
        var dt = $("#myTable").DataTable();
        $('#myTable tbody').on('click', 'tr ', function () {
          console.log( dt.row( this ).data() );
                  alert( 'You clicked on '+dt.row( this ).data().nama_atm+'\'s row' );
        });

        // On each draw, loop over the `detailRows` array and show any child rows
        
    });


    if (code !== null) {
        if (code === "admin") {
            return;
        } else if (code === "client") {
            document.getElementById("open_ticket").style.display = "none";
            return;
        } else {
            alert("tidak ada jabatan harap login dahulu");
            window.location.href = "pages-login.html";
        }
    }


});

function getURLParameter(url, name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
}
