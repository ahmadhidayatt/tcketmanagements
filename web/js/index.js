$(document).ready(function () {
    var nik;
    $('#infotiket').hide();
    $('#iforeepen').hide();

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
    $("#pending").click(function () {
        $('#iframe').attr('src', 'pages-panding.html');
    });
    $("#monitor").click(function () {
        $('#iframe').attr('src', 'pages-report.html');
    });
    $("#pending_ticket").click(function () {
        $('#iframe').attr('src', 'page-pendingticket-form.html');
    });

    $("#close_ticket_ticket").click(function () {
        $('#iframe').attr('src', 'page-close-ticket.html');
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
    $.post("getSession", function (returnedData) {
        var obj = JSON.parse(returnedData);
        console.log(returnedData);
        jQuery.each(obj, function (i, val) {

            $("#nama_img").alt = obj[i]["nama"];
            $("#nik").text(obj[i]["nik"]);
            nik = obj[i]["nik"];
            getnotif(nik);
            $("#namas").text(obj[i]["nama"]);

        });
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
//    $.post("retrieve_ticket", function (data) {
//        console.log(data);
//        //  var response = jQuery.parseJSON(data);
//
//        $("#myTable").dataTable({
//            "processing": true,
//            "data": JSON.parse(data),
//            "columns": [{
//                    "data": "id_ticket"
//                }, {
//                    "data": "nik"
//                }, {
//                    "data": "nama"
//                }, {
//                    "data": "id_atm"
//                }, {
//                    "data": "nama_atm"
//                }, {
//                    "data": "nama_masalah"
//                }, {
//                    "data": "start_time"
//                }, {
//                    "data": "end_time"
//                }
//
//            ]
//        });
//        var detailRows = [];
//        var dt = $("#myTable").DataTable();
//        $('#myTable tbody').on('click', 'tr ', function () {
//            console.log(dt.row(this).data());
//            alert('You clicked on ' + dt.row(this).data().nama_atm + '\'s row');
//            detailRows = dt.row(this).data().id_ticket;
//            alert(detailRows.toString());
//            $('#table').hide();
//            $('#infotiket').show();
//
////            var tr = data;
////            alert(tr);
////           
////                var tr = $('<tr/>');
////
////                // Indexing into data.report for each td element
////                $(tr).append("<td> Custody: " + dt.row(this).data().nama_atm + "</td>");
////                $(tr).append("<td> " + dt.row(this).data().nama_atm + "</td>");
////                $('.table-user-information').append(tr);
//            
//        });
//
//        // On each draw, loop over the `detailRows` array and show any child rows
//
//    });


    if (code !== null) {
        if (code === "admin") {
            return;
        } else if (code === "client") {
            document.getElementById("open_ticket").style.display = "none";
            document.getElementById("enginer").style.display = "none";
            document.getElementById("monitor").style.display = "none";
            return;
        } else {
            alert("tidak ada jabatan harap login dahulu");
            window.location.href = "pages-login.html";
        }
    }

});
function getnotif(nik) {
    console.log(nik);
    $.post("helper_ticket", {code: "5",
        nik: nik
    }, function (returnedData) {
        var obj = JSON.parse(returnedData);
        console.log(returnedData);
        jQuery.each(obj, function (i, val) {
            console.log(obj[i]);
            var $response = "  <a class='list-group-item' id='notif_container" + obj[i]["id_ticket"] + "' style='cursor:pointer'>" +
                    "<div class='list-group-status status-online'></div>" +
                    "<img src='assets/images/users/user2.jpg' class='pull-left' alt='" + obj[i]["custody"] + "'>" +
                    "<span class='contacts-title'>" + obj[i]["id_ticket"] + "</span>" +
                    "<p>" + obj[i]["nama_atm"] + "</p>" +
                    "</a>";
            $('#mCSB_2_container').append($response);
            $('#counter').text(i + 1);
            $('#counter_container').text(i + 1 + " pemberitahuan");
            $('#notif_container' + obj[i]["id_ticket"]).click(function () {
                $('#iframe').attr('src', 'page_view_ticket.html?id_ticket=' + obj[i]["id_ticket"]);

            });

        });
        $('#mCSB_2').attr('style', 'overflow: scroll;');
    });
}
function getURLParameter(url, name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
}
