$(document).ready(function () {
    $("#refresh_report").click(function () {
        window.parent.document.getElementById("iframe").contentWindow.location.reload();
    });


    $.post("helper_report", {code: "0"}, function (data) {
        console.log(data);

        $("#myTable").dataTable({
            data: JSON.parse(data),
            retrieve: true,
            columns: [{
                    "data": "id_ticket"
                }, {
                    "data": "nik"
                }, {
                    "data": "nama"
                }, {
                    "data": "mesin"
                }, {
                    "data": "nama_atm"
                }, {
                    "data": "nama_masalah"
                }, {
                    "data": "deskripsi"
                }, {
                    "data": "start_time"
                }, {
                    "data": "end_time"
                }, {
                    "data": "status"
                }
            ], "dom": 'lBfrtip',
            "buttons": [
                {
                    extend: 'collection',
                    text: 'Export',
                    buttons: [
                        'copy',
                        'excel',
                        'csv',
                        'pdf',
                        'print'
                    ]
                }
            ]
        });

        var detailRows = [];
        var dt = $("#myTable").DataTable();
        $('#datepicker').on('keyup', function () {
            dt.draw();
        });
        $('#datepicker2').on('keyup', function () {
            dt.draw();
        });
          $('#autoid').on('keyup', function () {
           
            dt.search(this.value).draw();
        });
        $.fn.dataTableExt.afnFiltering.push(
                function (oSettings, aData, iDataIndex) {
                    var iFini = document.getElementById('datepicker').value;
                    var iFfin = document.getElementById('datepicker2').value;
                    var iStartDateCol = 6;
                    var iEndDateCol = 7;

                    iFini = iFini.substring(6, 10) + iFini.substring(3, 5) + iFini.substring(0, 2);
                    iFfin = iFfin.substring(6, 10) + iFfin.substring(3, 5) + iFfin.substring(0, 2);

                    var datofini = aData[iStartDateCol].substring(6, 10) + aData[iStartDateCol].substring(3, 5) + aData[iStartDateCol].substring(0, 2);
                    var datoffin = aData[iEndDateCol].substring(6, 10) + aData[iEndDateCol].substring(3, 5) + aData[iEndDateCol].substring(0, 2);

                    if (iFini === "" && iFfin === "")
                    {
                        return true;
                    } else if (iFini <= datofini && iFfin === "")
                    {
                        return true;
                    } else if (iFfin >= datoffin && iFini === "")
                    {
                        return true;
                    } else if (iFini <= datofini && iFfin >= datoffin)
                    {
                        return true;
                    }
                    return false;
                }
        );

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
