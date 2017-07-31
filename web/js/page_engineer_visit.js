$(document).ready(function () {
    $("#refresh_report").click(function () {
        window.parent.document.getElementById("iframe").contentWindow.location.reload();
    });

//
    $.post("helper_report", {code: "0"}, function (data) {
        console.log(data);

        $("#myTable").dataTable({
            data: JSON.parse(data),
            searching: false,
            retrieve: true,
            columns: [{
                    "data": "nik"
                }, {
                    "data": "custody"
                }, {
                    "data": "mesin"
                }, {
                    "data": "nama_atm"
                }, {
                    "data": "start_time"
                }, {
                    "data": "end_time"
                }, {
                    "data": "satwal"
                }, {
                    "data": "id_ticket"
                }, {
                    "data": "nama_masalah"
                }, {
                    "data": "deskripsi"
                }, {
                    "data": "status"
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
//            var tr = data;
//            alert(tr);
//            var tr = $('<tr/>');
//            // Indexing into data.report for each td element
//            $(tr).append("<td> Custody: " + dt.row(this).data().nama_atm + "</td>");
//            $(tr).append("<td> " + dt.row(this).data().nama_atm + "</td>");
//            $('.table-user-information').append(tr);
//
//            $.post('helper_ticket', {code: "3",
//                id_ticket: detailRows,
//            },
//                    function (returnedData2) {
//                        var obj = JSON.parse(returnedData2);
//                        dataticket = JSON.parse(returnedData2);
////                        console.log(data_atm);
//                        var tr = $('<tr/>');
//                        jQuery.each(obj, function (i, val) {
////                            console.log(obj[i]["id_ticket"]);
//                            $("#input_atm_name").val(obj[i]["id_ticket"]);
//                            $("#input_nama_atm").val(obj[i]["nama_atm"]);
//                            $("#input_nik").val(obj[i]["nik"]);
//                            $("#input_start").val(obj[i]["start_time"]);
//                            $("#input_end").val(obj[i]["end_time"]);
//                            $("#input_cuss").val(obj[i]["custody"]);
//                            $("#input_masalah").val(obj[i]["nama_masalah"]);
//                            $("#input_desk").val(obj[i]["deskripsi"]);
//                            $("#input_status").val(obj[i]["status"]);
//                            $("#input_satwal").val(obj[i]["satwal"]);
//                            $("#input_kartel").val(obj[i]["kartu_tertelan"]);
//                            id_atm = dataticket[i]["id_atm"];
//                            id_masalah = dataticket[i]["id_masalah"];
//                            $('.table-user-information').append(tr);
//                            alert(obj[i]["id_ticket"]);
//                        });
//                        ;
//                    }).fail(function () {
//                console.log("error");
//            });
//
        });
        // On each draw, loop over the `detailRows` array and show any child rows

    });
//    jQuery(function ($) {
//        oTable = $('#myTable').DataTable();   //pay attention to capital D, which is mandatory to retrieve "api" datatables' object, as @Lionel said
//        $('#myInputTextField').keyup(function () {
//            oTable.search($(this).val()).draw();
//        });
//    });
});
