$(document).ready(function () {
    var dataticket;
    var id_atm;
    var id_masalah;
    var nik ;

    $.post("getSession", function (returnedData) {
        var obj = JSON.parse(returnedData);
        console.log(returnedData);
        jQuery.each(obj, function (i, val) {
            nik = obj[i]["nik"];
        });
    });
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
            $("#input_atm_name2").val($("#input_atm_name").val());
            $("#input_nama_atm2").val($("#input_nama_atm").val());
            $("#input_nik2").val($("#input_nik").val());
            $("#input_start2").val($("#input_start").val());
            $("#input_end2").val($("#input_end").val());
            $("#input_cuss2").val($("#input_cuss").val());
            $("#input_masalah2").val($("#input_masalah").val());
            $("#input_desk2").val($("#input_desk").val());
            $("#input_status2").val($("#input_status").val());
            $("#input_satwal2").val($("#input_satwal").val());
//            $("#input_kartel2").value($("#input_kartel").value());
//
//
//            $('#preview_img2').attr('src', $("#input_kartel").src());
//            $('#preview_img2').attr('width', '250px');
//            $('#preview_img2').attr('height', '250px');
            id_atm = dataticket[i]["id_atm"];
            id_masalah = dataticket[i]["id_masalah"];
        });
    });
    $.post("helper_ticket", {code: "4", statuss: "reopen"}, function (data) {
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
                }

            ]
        });

        var detailRows = [];
        var dt = $("#myTable").DataTable();
        $('#myTable tbody').on('click', 'tr ', function () {
            console.log(dt.row(this).data());
            alert('You clicked on ' + dt.row(this).data().nama_atm + '\'s row');
            if(dt.row(this).data().nik !== nik){
                return;
            }
            detailRows = dt.row(this).data().id_ticket;
            alert(detailRows.toString());
            $('#table').hide();
            $('#infotiket').show();
//            var tr = data;
//            alert(tr);
//            var tr = $('<tr/>');
//            // Indexing into data.report for each td element
//            $(tr).append("<td> Custody: " + dt.row(this).data().nama_atm + "</td>");
//            $(tr).append("<td> " + dt.row(this).data().nama_atm + "</td>");
//            $('.table-user-information').append(tr);

            $.post('helper_ticket', {code: "3",
                id_ticket: detailRows,
            },
                    function (returnedData2) {
                        var obj = JSON.parse(returnedData2);
                        dataticket = JSON.parse(returnedData2);
//                        console.log(data_atm);
                        var tr = $('<tr/>');
                        jQuery.each(obj, function (i, val) {
//                            console.log(obj[i]["id_ticket"]);
                            $("#input_atm_name").val(obj[i]["id_ticket"]);
                            $("#input_nama_atm").val(obj[i]["nama_atm"]);
                            $("#input_nik").val(obj[i]["nik"]);
                            $("#input_start").val(obj[i]["start_time"]);
                            $("#input_end").val(obj[i]["end_time"]);
                            $("#input_cuss").val(obj[i]["custody"]);
                            $("#input_masalah").val(obj[i]["nama_masalah"]);
                            $("#input_desk").val(obj[i]["deskripsi"]);
                            $("#input_status").val(obj[i]["status"]);
                            $("#input_satwal").val(obj[i]["satwal"]);
                            $("#input_kartel").val(obj[i]["kartu_tertelan"]);
                            id_atm = dataticket[i]["id_atm"];
                            id_masalah = dataticket[i]["id_masalah"];
                            $('.table-user-information').append(tr);
                            alert(obj[i]["id_ticket"]);
                        });
                        ;
                    }).fail(function () {
                console.log("error");
            });


        });
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
            status: "reopen"
        }, function (data) {
            alert(data);

        });
    });
    $("#btn_close").click(function () {
        alert("aaaa");
        $.post("helper_ticket", {code: "2",
            id_ticket: $("#input_atm_name").val(),
            id_atm: id_atm,
            id_masalah: id_masalah,
            nama_atm: $("#input_nama_atm").val(),
            start_time: $("#input_start").val(),
            end_time: $("#input_end").val(),
            custody: $("#input_cuss").val(),
            nik: $("#input_nik").val(),
            satwal: $("#input_satwal").val(),
            kartu_tertelan: $("#input_kartel").val(),
            deskripsi: $("#input_desk").val(),
            status: "close"
        }, function (data) {
            alert(data);

        });
    });
    $('body').on("change", "#input_kartel", function (event) {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            console.log($("#input_kartel").val());
            reader.onload = function (e) {
                $('#preview_img').attr('src', e.target.result);
                $('#preview_img').attr('width', '250px');
                $('#preview_img').attr('height', '250px');

//                $("#input_kartel2").val($("#input_kartel").val());


                $('#preview_img2').attr('src', e.target.result);
                $('#preview_img2').attr('width', '250px');
                $('#preview_img2').attr('height', '250px');

            }
            reader.readAsDataURL(this.files[0]);
        }
    });

});
