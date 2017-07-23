$(document).ready(function () {
    var dataticket;

    $("#reopen").click(function () {
        alert("test");
        $('#infotiket').hide();
        $('#iforeepen').show();

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
                        data_atm = JSON.parse(returnedData2);
                         dataticket = JSON.parse(returnedData2);
                        console.log(data_atm);
                        var tr = $('<tr/>');
                        jQuery.each(obj, function (i, val) {
//                            console.log(obj[i]["id_ticket"]);
                            alert(obj[i]["nama_atm"]);
                            $("#input_atm_name").val(obj[i]["id_ticket"]);
                            $("#input_nama_atm").val(obj[i]["nama_atm"]);
                            $("#input_nik").val(obj[i]["nik"]);
                            $("#input_start").val(obj[i]["start_time"]);
                            $("#input_end").val(obj[i]["end_time"]);
                            $("#input_nama").val(obj[i]["nama"]);
                            $("#input_masalah").val(obj[i]["nama_masalah"]);
                            $("#input_desk").val(obj[i]["deskripsi"]);
                            $("#input_status").val(obj[i]["status"]);
                            $("#input_satwal").val(obj[i]["satwal"]);
                            $("#input_kartel").val(obj[i]["kartu_tertelan"]);

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
});
