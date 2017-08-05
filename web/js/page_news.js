$(document).ready(function () {
    $("#refresh_news").click(function () {
        window.parent.document.getElementById("iframe").contentWindow.location.reload();
    });
    var nama;
    var kordinator;
    var jabatan;
    var all_news;
    console.log(kordinator);
    $.post("getSession", function (returnedData) {
        var obj = JSON.parse(returnedData);

        console.log(returnedData);
        jQuery.each(obj, function (i, val) {
            nama = obj[i]["nama"];
            kordinator = obj[i]["nik"];
            jabatan = obj[i]["jabatan"];

            if (jabatan === 'client') {
                $("#berita").hide();
            }
        });
    });
    $.post('helper_news', {code: "0"},
            function (returnedData) {
                var obj = JSON.parse(returnedData);
                console.log(returnedData);
                jQuery.each(obj, function (i, val) {
                    nik = obj[i]["id_kordinator"];
                    all_news = obj[i]["id_news"];
                    var img;


                    console.log(img);
                    var $response = " <div style='margin-top: 35px; margin-bottom: 10px'>" +
                            "<div class='form-row'>" +
                            " <div  class='[ col-xs-12  col-sm-12 col-md-12]'>" +
                            "<div style='margin-top: 20px;' class='[ panel panel-default ] panel-google-plus'>" +
                            "<div class='dropdown'>" +
                            "<span class='dropdown-toggle' type='button' data-toggle='dropdown'>" +
                            " <span class='[ glyphicon glyphicon-chevron-down ]'></span>" +
                            "</span>" +
                            "<ul class='dropdown-menu' role='menu'>" +
                            "<li role='presentation'><a role='menuitem' tabindex='-1' href='#'>info</a></li>" +
                            " </ul>" +
                            "  </div>" +
                            " <div class='panel-heading'>" +
                            " <img class='[ img-circle pull-left ]' src='data:image/png;base64," + img + "' id='img" + obj[i]["id_news"] + "' alt='Mouse0270' />" +
                            " <h3>" + obj[i]["subject"] + "</h3>" +
                            "<h5><span>" + obj[i]["nama"] + "</span>      <span>" + obj[i]["tanggal"] + "</span> </h5>" +
                            " </div>" +
                            " <div class='panel-body'>" +
                            " <p>" + obj[i]["deskripsi"] + "</p>" +
                            " </div>" +
                            "  </div>" +
                            "  </div>" +
                            "  </div>" +
                            "</div>";
                    $('#dashboards').append($response);
                    getImage(obj[i]["id_kordinator"], obj[i]["id_news"]);
                });

            }).fail(function () {
        console.log("error");
    });



//    $.post('helper_pegawai', {code: "0"},
//            function (returnedData) {
//                var obj = JSON.parse(returnedData);
//
//                data_peg = obj;
//                console.log(data_peg);
////                jQuery.each(obj, function (i, val) {
////                    peg_nik = obj[i]["nik"];
//////                    console.log(obj[i]["id_masalah"]);
////                });
////                ;
//
//            }).fail(function () {
//        console.log("error");
//    });
//
//    $("#select_atm").click(function () {
//        var mesin = $("#select_atm").val();
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
//
//
//    $('#nik').autocomplete({
//
//        source: function (request, response) {
//            response($.map(data_peg, function (value) {
//                return {
//                    label: value.nik,
//                    ID: value.nik,
//                    Name: value.nama
//
//
//                }
//            }));
//
//        },
//
//        minLength: 2,
//
//        focus:
//                function (event, ui) {
//                    var nik = ui.item.ID;
//                    $(this).val(nik);
//                    event.preventDefault();
//                },
//
//        select:
//                function (event, ui) {
//                    var custody = ui.item.Name;
//                    $('#custody').val(custody);
//                    event.preventDefault();
//                }
//    }).data('ui-autocomplete')._renderItem = function (ul, item) {
//        return $("<li>")
//                .data("item.autocomplete", item)
//                .append("<a>" + item.ID + "</a>")
//                .append("<a style = 'float : right ;'>" + item.Name + "</a>")
//                .appendTo(ul);
//    };
//
//
//
//    $('#select_atm').autocomplete({
//        minLength: 2,
//        source: function (request, response) {
//            response($.map(data_atm, function (value, key) {
//                return {
//                    label: value.mesin,
//                    value: value.mesin
//                }
//            }));
//
//        }
//    });
//
//    $('#nik').on('autocompletechange change', function () {
//        var nik = this.value;
//        jQuery.each(data_peg, function (i, val) {
////            console.log(data_peg[i]["nik"]);
//            if (data_peg[i]["nik"].trim() === nik.trim()) {
//                //nih disini 
//                $('#custody').val(data_peg[i]["nama"]);
//            }
//
//        });
////   $('#custody').val(this.value);
//    }).change();
//
//
//    $("#buttons").click(function () {
//        var idatm = "";
//        var mesin = document.getElementById("select_atm").value;
//        jQuery.each(data_atm, function (i, val) {
////            console.log(data_atm[i]["id_atm"]);
//            if (data_atm[i]["mesin"] === mesin) {
//                idatm = data_atm[i]["id_atm"];
//            }
//
//        });
//        var idmasalah = document.getElementById("select_masalah").value;
//        var atm_name = document.getElementById("input_atm_name").value;
//        var atm_klien = document.getElementById("input_atm_loct").value;
//        var custody = document.getElementById("custody").value;
//
//        var niks = document.getElementById("nik").value;
//        console.log(idatm + " " + idmasalah + " " + atm_name + " " + atm_klien + " " + custody + " " + niks + " ");
//        $.post('helper_ticket', {code: "1", id_atm: idatm,
//            id_masalah: idmasalah,
//            atm_name: atm_name,
//            atm_klien: atm_klien,
//            custody: custody,
//            nik: niks,
//            satwal: "0",
//            kartu_tertelan: ""},
//                function (returnedData) {
//                    alert("transaksi anda berhasil");
//
//                    document.getElementById("select_atm").value = "";
//                    document.getElementById("select_masalah").value = "";
//                    document.getElementById("input_atm_name").value = "";
//                    document.getElementById("input_atm_loct").value = "";
//                    document.getElementById("custody").value = "";
//                    document.getElementById("nik").value = "";
////                parent.document.getElementById('iframe').contentWindow.location.reload();
//                }).fail(function () {
//            console.log("error");
//        });
//    });
    $("#post_news").click(function () {
        var subject = document.getElementById("input_subject").value;
        var deskripsi = document.getElementById("status_message").value;


        console.log(subject + " " + deskripsi + " " + kordinator);
        $.post('helper_news', {
            code: "1",
            deskripsi: deskripsi,
            subject: subject,
            nama: nama,
            kordinator: kordinator
        },
                function (returnedData) {
                    alert("berhasil" + returnedData);
                    document.getElementById("input_subject").value = "";
                    document.getElementById("status_message").value = "";
                    window.parent.document.getElementById("iframe").contentWindow.location.reload();
//                parent.document.getElementById('iframe').contentWindow.location.reload();
                }).fail(function () {
            console.log("error");
        });
    });


});
function getImage(nik, id) {
    $.post("helper_pegawai", {code: "3", nik: nik}, function (data) {
        var outputImg = document.getElementById('img' + id);
        outputImg.src = "data:image/png;base64," + data.toString();
        $('#img' + id).attr('width', '60px');
        $('#img' + id).attr('height', '60px');
        console.log(data.toString());
    });

}


;


