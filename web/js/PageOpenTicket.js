/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {
    var data_atm;
    var data_peg;
    var peg_nik;
    $.post('helper_atm', {code: "0"},
            function (returnedData) {
                var obj = JSON.parse(returnedData);
                data_atm = JSON.parse(returnedData);
                console.log(data_atm);
                jQuery.each(obj, function (i, val) {
                    console.log(obj[i]["mesin"]);
//                    $('<option>').val(obj[i]["id_atm"]).text(obj[i]["mesin"]).data-subtext(obj[i]["nama_atm"]).appendTo('#select_atm');
                });
//                ;

            }).fail(function () {
        console.log("error");
    });
    $.post('helper_masalah', {code: "0"},
            function (returnedData) {
                var obj = JSON.parse(returnedData);
                console.log(returnedData);
                jQuery.each(obj, function (i, val) {
                    console.log(obj[i]["id_masalah"]);
                    $('<option>').val(obj[i]["id_masalah"]).text(obj[i]["nama_masalah"]).appendTo('#select_masalah');
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
//                jQuery.each(obj, function (i, val) {
//                    peg_nik = obj[i]["nik"];
////                    console.log(obj[i]["id_masalah"]);
//                });
//                ;

            }).fail(function () {
        console.log("error");
    });

    $("#select_atm").click(function () {
        var mesin = $("#select_atm").val();
        jQuery.each(data_atm, function (i, val) {
//            console.log(data_atm[i]["id_atm"]);
            if (data_atm[i]["mesin"] === mesin) {
                //nih disini 
                $("#input_atm_name").val(data_atm[i]["nama_atm"]);
                $("#input_atm_loct").val(data_atm[i]["atm_klien"]);
                console.log(data_atm[i]["atm_klien"] + " " + data_atm[i]["atm_klien"] + " " + data_atm[i]["nama_atm"] + " " + data_atm[i]["atm_klien"]);
            }

        });
    });


    $('#nik').autocomplete({

        source: function (request, response) {
            response($.map(data_peg, function (value) {
                return {
                    label: value.nik,
                    ID: value.nik,
                    Name: value.nama


                }
            }));

        },

        minLength: 2,

        focus:
                function (event, ui) {
                    var nik = ui.item.ID;
                    $(this).val(nik);
                    event.preventDefault();
                },

        select:
                function (event, ui) {
                    var custody = ui.item.Name;
                    $('#custody').val(custody);
                    event.preventDefault();
                }
    }).data('ui-autocomplete')._renderItem = function (ul, item) {
        return $("<li>")
                .data("item.autocomplete", item)
                .append("<a>" + item.ID + "</a>")
                .append("<a style = 'float : right ;'>" + item.Name + "</a>")
                .appendTo(ul);
    };



    $('#select_atm').autocomplete({
        minLength: 2,
        source: function (request, response) {
            response($.map(data_atm, function (value, key) {
                return {
                    label: value.mesin,
                    value: value.mesin
                }
            }));

        }
    });

    $('#nik').on('autocompletechange change', function () {
        var nik = this.value;
        jQuery.each(data_peg, function (i, val) {
//            console.log(data_peg[i]["nik"]);
            if (data_peg[i]["nik"].trim() === nik.trim()) {
                //nih disini 
                $('#custody').val(data_peg[i]["nama"]);
            }

        });
//   $('#custody').val(this.value);
    }).change();


    $("#buttons").click(function () {
        var idatm = "";
        var mesin = document.getElementById("select_atm").value;
        jQuery.each(data_atm, function (i, val) {
//            console.log(data_atm[i]["id_atm"]);
            if (data_atm[i]["mesin"] === mesin) {
                idatm = data_atm[i]["id_atm"];
            }

        });
        var idmasalah = document.getElementById("select_masalah").value;
        var atm_name = document.getElementById("input_atm_name").value;
        var atm_klien = document.getElementById("input_atm_loct").value;
        var custody = document.getElementById("custody").value;

        var niks = document.getElementById("nik").value;
        console.log(idatm + " " + idmasalah + " " + atm_name + " " + atm_klien + " " + custody + " " + niks + " ");
        $.post('helper_ticket', {code: "1", id_atm: idatm,
            id_masalah: idmasalah,
            atm_name: atm_name,
            atm_klien: atm_klien,
            custody: custody,
            nik: niks,
            satwal: "0",
            kartu_tertelan: ""},
                function (returnedData) {
                    alert("transaksi anda berhasil");

                    document.getElementById("select_atm").value = "";
                    document.getElementById("select_masalah").value = "";
                    document.getElementById("input_atm_name").value = "";
                    document.getElementById("input_atm_loct").value = "";
                    document.getElementById("custody").value = "";
                    document.getElementById("nik").value = "";
//                parent.document.getElementById('iframe').contentWindow.location.reload();
                }).fail(function () {
            console.log("error");
        });
    });

});


