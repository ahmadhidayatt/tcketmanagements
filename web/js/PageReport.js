$(document).ready(function () {
    var data_atm;
    $.post('helper_atm', {code: "0"},
            function (returnedData) {
                var obj = JSON.parse(returnedData);
                data_atm = JSON.parse(returnedData);
                console.log(data_atm);
                jQuery.each(obj, function (i, val) {
                    console.log(obj[i]["id_atm"]);
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
//                data_peg = obj;
//                jQuery.each(obj, function (i, val) {
//                    peg_nik = obj[i]["nik"];
////                    console.log(obj[i]["id_masalah"]);
//                });
//                ;

            }).fail(function () {
        console.log("error");
    });

//    $("#autoid").click(function () {
//        var mesin = $("#autoid").val();
//        jQuery.each(data_atm, function (i, val) {
////            console.log(data_atm[i]["id_atm"]);
//            if (data_atm[i]["mesin"] === mesin) {
//                //nih disini 
//                $("#input_atm_name").val(data_atm[i]["nama_atm"]);
//                $("#input_atm_loct").val(data_atm[i]["atm_klien"]);
//                console.log(data_atm[i]["atm_klien"] + " " + data_atm[i]["atm_klien"] + " " + data_atm[i]["nama_atm"] + " " + data_atm[i]["atm_klien"]);
//            }
//
//        });
//    });


    $('#autoid').autocomplete({

        source: function (request, response) {
            response($.map(data_atm, function (value) {
                return {
                    label: value.id_atm,
                    ID: value.nama_atm,
//                    Name: value.atm_name


                };
            }));

        },

        minLength: 2
    }).data('ui-autocomplete')._renderItem = function (ul, item) {
        return $("<li>")
                .data("item.autocomplete", item)
                .append("<a>" + item.ID + "</a>")
                .append("<a style = 'float : right ;'>" + item.ID + "</a>")
                .appendTo(ul);
    };


});


