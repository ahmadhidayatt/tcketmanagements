/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    $.post("helper_ticket", {code: "4", statuss: "reopen"}, function (data) {
        console.log(data);
        //  var response = jQuery.parseJSON(data);

        $("#myTable2").dataTable({
            "processing": true,
            "data": JSON.parse(data),
            "columns": [{
                    "data": "dx e3"
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
        $('#myTable2 tbody').on('click', 'tr ', function () {
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