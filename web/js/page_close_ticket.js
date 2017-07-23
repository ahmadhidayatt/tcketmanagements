$(document).ready(function () {
    var dataticket;
    var id_atm;
    var id_masalah;
//
    $("#reopen").click(function () {
//        alert("test");
        $('#infotiket').hide();
        $('#iforeepen').show();
////        String id_ticket = request.getParameter("id_ticket");
////        String id_atm = request.getParameter("id_atm");
////        String id_masalah = request.getParameter("id_masalah");
////        String start_time = request.getParameter("start_time");
////        String end_time = request.getParameter("end_time");
////        String custody = request.getParameter("custody");
////        String nik = request.getParameter("nik");
////        String satwal = request.getParameter("satwal");
////        String kartu_tertelan = request.getParameter("kartu_tertelan");
////        String deskripsi = request.getParameter("deskripsi");
////        String status = request.getParameter("status");
//        $.post('helper_ticket', {code: "2",
//            id_ticket: $("#input_atm_name").val(),
//            id_atm: $("#input_nama_atm").val,
//            id_masalah: $("#input_masalah").val(),
//            start_time: $("#input_start").val(),
//            end_time:  $("#input_end").val(),
//            custody:  $("#input_nama").val(),
//            nik:  $("#input_masalah").val(),
//            satwal: $("#input_satwal").val(),
//            kartu_tertelan: $("#input_kartel").val(),
//            deskripsi:   $("#input_desk").val(),
//            status: $("#input_status").val()
//           
//        },
//                function (returnedData) {
//                    var obj = JSON.parse(returnedData);
//                    data_atm2 = JSON.parse(returnedData);
//                    console.log(data_atm2);
//                    jQuery.each(obj, function (i, val) {
//                        alert(data_atm2);
//                    });
//                    ;
//                }).fail(function () {
//            console.log("error");
//        });

        jQuery.each(dataticket, function (i, val) {
            alert(dataticket[i]["nama_atm"]);
            $("#input_atm_name2").val(dataticket[i]["id_ticket"]);
            $("#input_nama_atm2").val(dataticket[i]["nama_atm"]);
            $("#input_nik2").val(dataticket[i]["nik"]);
            $("#input_start2").val(dataticket[i]["start_time"]);
            $("#input_end2").val(dataticket[i]["end_time"]);
            $("#input_cuss2").val(dataticket[i]["custody"]);
            $("#input_masalah2").val(dataticket[i]["nama_masalah"]);
            $("#input_desk2").val(dataticket[i]["deskripsi"]);
            $("#input_status2").val(dataticket[i]["status"]);
            $("#input_satwal2").val(dataticket[i]["satwal"]);
            $("#input_kartel2").val(dataticket[i]["kartu_tertelan"]);
            id_atm = dataticket[i]["id_atm"];
            id_masalah = dataticket[i]["id_masalah"];
        });
    });
    $.post("helper_ticket", {code: "4", statuss: "close"}, function (data) {
        console.log(data);
        //  var response = jQuery.parseJSON(data);

        $("#myTable").dataTable({

            "data": JSON.parse(data),
            "columns": [{
                    "data": "id_ticket"
                }, {
                    "data": "nik"
                }, {
                    "data": "custody"
                }, {
                    "data": "nama_atm"
                }, {
                    "data": "nama_masalah"
                }, {
                    "data": "start_time"
                }, {
                    "data": "end_time"
                }, {
                    "data": "status"
                }

            ]
        });

        var detailRows = [];
        var dt = $("#myTable").DataTable();
       
        // On each draw, loop over the `detailRows` array and show any child rows

    });

    $("#submitreopen").click(function () {
        alert("kontol");
        $.post("helper_ticket", {code: "2",
            id_ticket: $("#input_atm_name").val(),
            id_atm: id_atm,
            id_masalah: id_masalah,
            nama_atm: $("#input_nama_atm2").val(),
            start_time: $("#input_start").val(),
            end_time: $("#input_end").val(),
            custody: $("#input_cuss").val(),
            nik: $("#input_nik").val(),
            satwal: $("#input_satwal").val(),
            kartu_tertelan: $("#input_kartel").val(),
            deskripsi: $("#input_desk").val(),
            status: $("#input_status").val()
        }, function (data) {
            alert(data);

        });
    });

});
