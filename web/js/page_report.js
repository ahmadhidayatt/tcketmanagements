

$(document).ready(function () {

    var minDateFilter = "";
    var maxDateFilter = "";
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



        $.datetimepicker.setLocale('id');

        $("#datepicker").datetimepicker({value: 'now()',
            format: 'Y-m-d H:m:s',
            minDate: getFormattedDate(new Date()),
            "onSelect": function (date) {

                minDateFilter = new Date(date).getTime();
                dt.draw();
                console.log(document.getElementById('datepicker').value);
            }, onClose: function (selectedDate) {
                $("#datepicker2").datetimepicker("option", "minDate", selectedDate);
            }
        }).keyup(function () {
            minDateFilter = new Date(this.value).getTime();
            dt.draw();
            console.log(document.getElementById('datepicker').value);
        }).change(function () {
            minDateFilter = new Date(this.value).getTime();
            dt.draw();
        });


        console.log($('#datetimepicker_format').datetimepicker('getValue'));

        $("#datepicker2").datetimepicker({value: 'now()',
            format: 'Y-m-d H:m:s',
            minDate: getFormattedDate(new Date()),
            "onSelect": function (date) {
                maxDateFilter = new Date(date).getTime();
                dt.draw();
                console.log(document.getElementById('datepicker2').value);
            },
            onClose: function (selectedDate) {
                $("#datepicker").datetimepicker("option", "maxDate", selectedDate);
            }
        }).keyup(function () {
            maxDateFilter = new Date(this.value).getTime();
            dt.draw();
            console.log(document.getElementById('datepicker2').value);
        }).change(function () {
            maxDateFilter = new Date(this.value).getTime();
            dt.draw();
        });
        console.log($('#datetimepicker_format').datetimepicker('getValue'));



        function getFormattedDate(date) {
            var day = date.getDate();
            var month = date.getMonth() + 1;
            var year = date.getFullYear().toString().slice(2);
            return day + '-' + month + '-' + year;
        }



        $('#autoid').on('keyup', function () {

            dt.search(this.value).draw();
        });


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


    $.fn.dataTableExt.afnFiltering.push(
            function (oSettings, aData, iDataIndex) {
                var iFini = document.getElementById('datepicker').value;
                var iFfin = document.getElementById('datepicker2').value;
                var iStartDateCol = 7;
                var iEndDateCol = 8;
                console.log(document.getElementById('datepicker').value);
                console.log(document.getElementById('datepicker2').value);
                iFini = iFini.substring(0, 4) + iFini.substring(5, 7) + iFini.substring(8, 10);
                iFfin = iFfin.substring(0, 4) + iFfin.substring(5, 7) + iFfin.substring(8, 10);
                console.log("iFini " + iFini);
                console.log('iFfin ' + iFfin);
                var datofini = aData[iStartDateCol].substring(0, 4) + aData[iStartDateCol].substring(5, 7) + aData[iStartDateCol].substring(8, 10);
                var datoffin = aData[iEndDateCol].substring(0, 4) + aData[iEndDateCol].substring(5, 7) + aData[iEndDateCol].substring(8, 10);
                console.log("datofini " + datofini);
                console.log('datoffin ' + datoffin);
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
});

