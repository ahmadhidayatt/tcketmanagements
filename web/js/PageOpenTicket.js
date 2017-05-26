/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {
    var data_atm;
    var data_peg;
    $.post('helper_atm', {code: "0"},
            function (returnedData) {
                var obj = JSON.parse(returnedData);
                data_atm = JSON.parse(returnedData);
                console.log(returnedData);
                jQuery.each(obj, function (i, val) {
                    console.log(obj[i]["id_atm"]);
                    $('<option>').val(obj[i]["id_atm"]).text(obj[i]["id_atm"]).appendTo('#select_atm');
                });
                ;

            }).fail(function () {
        console.log("error");
    });
    $.post('helper_masalah', {code: "0"},
            function (returnedData) {
                var obj = JSON.parse(returnedData);
                console.log(returnedData);
                jQuery.each(obj, function (i, val) {
                    console.log(obj[i]["id_masalah"]);
                    $('<option>').val(obj[i]["nama_masalah"]).text(obj[i]["nama_masalah"]).appendTo('#select_masalah');
                });
                ;

            }).fail(function () {
        console.log("error");
    });
    $.post('helper_pegawai', {code: "0"},
            function (returnedData) {
                var obj = JSON.parse(returnedData);
                console.log(returnedData);
                data_peg = obj;
                ;

            }).fail(function () {
        console.log("error");
    });

    $("#select_atm").click(function () {
        var id_atm = $("#select_atm").val();
        jQuery.each(data_atm, function (i, val) {
            console.log(data_atm[i]["id_atm"]);
            if (data_atm[i]["id_atm"] === id_atm) {
                //nih disini 
                $("#input_atm_name").val(data_atm[i]["nama_atm"]);
                $("#input_atm_loct").val(data_atm[i]["nama_lokasi"]);
                console.log(data_atm[i]["nama_lokasi"] + " " + data_atm[i]["p_terakhir"] + " " + data_atm[i]["nama_atm"] + " " + data_atm[i]["kordinator"]);
            }

        });
    });

    $('#nik').autocomplete({
        // This shows the min length of charcters that must be typed before the autocomplete looks for a match.
        minLength: 0,
        source: function (request, response) {
            response($.map(data_peg, function (value, key) {
                return {
                    label: value.nik,
                    value: value.nama
                }
            }));

        },
        focus: function (event, ui) {
            $('#nik').val(ui.item.first_name);
            return false;
        },
        // Once a value in the drop down list is selected, do the following:
        select: function (event, ui) {
            // place the person.given_name value into the textfield called 'select_origin'...
            $('#nik').val(ui.item.first_name);
            // and place the person.id into the hidden textfield called 'link_origin_id'. 
            $('#link_origin_id').val(ui.item.id);
            return false;
        }
    });


});
