$("#reopen").click(function () {
//    String id_ticket = request.getParameter("id_ticket");
//        String id_atm = request.getParameter("id_atm");
//        String id_masalah = request.getParameter("id_masalah");
//        String start_time = request.getParameter("start_time");
//        String end_time = request.getParameter("end_time");
//        String custody = request.getParameter("custody");
//        String nik = request.getParameter("nik");
//        String satwal = request.getParameter("satwal");
//        String kartu_tertelan = request.getParameter("kartu_tertelan");
//        String deskripsi = request.getParameter("deskripsi");
//        String status = request.getParameter("status");
    $.post('helper_ticket', {code: "2",
        id_ticket: "2",
        id_atm: "2",
        id_masalah: "2",
        start_time: "2",
        end_time: "2",
        custody: "2",
        nik: "2",
        satwal: "2",
        kartu_tertelan: "2",
        deskripsi: "2",
        status: "2"
    },
            function (returnedData) {
                var obj = JSON.parse(returnedData);
                data_atm = JSON.parse(returnedData);
                console.log(data_atm);
                jQuery.each(obj, function (i, val) {
                    console.log(obj[i]["id_atm"]);
                    $('<option>').val(obj[i]["id_atm"]).text(obj[i]["id_atm"]).appendTo('#select_atm');
                });
                ;
            }).fail(function () {
        console.log("error");
    });
});
$(document).ready(function () {
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
            console.log(dt.row(this).data());
            alert('You clicked on ' + dt.row(this).data().nama_atm + '\'s row');
            detailRows = dt.row(this).data().id_ticket;
            alert(detailRows.toString());
            $('#table').hide();
            $('#infotiket').show();
            var tr = data;
            alert(tr);
            var tr = $('<tr/>');
            // Indexing into data.report for each td element
            $(tr).append("<td> Custody: " + dt.row(this).data().nama_atm + "</td>");
            $(tr).append("<td> " + dt.row(this).data().nama_atm + "</td>");
            $('.table-user-information').append(tr);
        });
        // On each draw, loop over the `detailRows` array and show any child rows

    });
});