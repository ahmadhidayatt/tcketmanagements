$(document).ready(function () {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    var code = getURLParameter(url, 'id_ticket');
    var id_ticket = code;
    var dataticket;
    console.log(id_ticket);
    var nik;
    var id_masalah;
    var id_atm;
    $('#infotiket').show();
    $('#iforeepen').hide();
//
    $.post("helper_ticket", {code: "3",
        id_ticket: id_ticket
    }, function (returnedData) {
        var obj = JSON.parse(returnedData);
        dataticket = JSON.parse(returnedData);
        console.log(returnedData);
        var tr = $('<tr/>');
        jQuery.each(obj, function (i, val) {
            console.log(obj[i]);
            $("#input_atm_name").val(obj[i]["id_ticket"]);
            $("#input_nama_atm").val(obj[i]["nama_atm"]);
            $("#input_nik").val(obj[i]["nik"]);
            $("#input_start").val(obj[i]["start_time"]);
            $("#input_end").val(obj[i]["end_time"]);
            $("#input_cuss").val(obj[i]["custody"]);
            $("#input_masalah").val(obj[i]["nama_masalah"]);
            $("#input_desk").val(obj[i]["deskripsi"]);
            $("#input_status").val(obj[i]["status"]);
            $("#input_satwal").val(obj[i]["satwal"]);
            $("#input_kartel").val(obj[i]["kartu_tertelan"]);
            id_atm = dataticket[i]["id_atm"];
            id_masalah = dataticket[i]["id_masalah"];
            $('.table-user-information').append(tr);
            alert(obj[i]["id_ticket"]);

        });

    });




    $("#reopen").click(function () {
//        alert("test");
        $('#infotiket').hide();
        $('#iforeepen').show();

        jQuery.each(dataticket, function (i, val) {
            alert(dataticket[i]["nama_atm"]);
            $("#input_atm_name2").val($("#input_atm_name").val());
            $("#input_nama_atm2").val($("#input_nama_atm").val());
            $("#input_nik2").val($("#input_nik").val());
            $("#input_start2").val($("#input_start").val());
            $("#input_end2").val($("#input_end").val());
            $("#input_cuss2").val($("#input_cuss").val());
            $("#input_masalah2").val($("#input_masalah").val());
            $("#input_desk2").val($("#input_desk").val());
            $("#input_status2").val($("#input_status").val());
            $("#input_satwal2").val($("#input_satwal").val());
//            $("#input_kartel2").value($("#input_kartel").value());
//
//
//            $('#preview_img2').attr('src', $("#input_kartel").src());
//            $('#preview_img2').attr('width', '250px');
//            $('#preview_img2').attr('height', '250px');
            id_atm = dataticket[i]["id_atm"];
            id_masalah = dataticket[i]["id_masalah"];
        });
    });


    $("#submitreopen").click(function () {
        var file = document.getElementById('input_kartel').files[0];
            var formElement = $("[name='myform']")[0];
            var fd = new FormData(formElement);
            var fileInput = $("#input_kartel")[0];
            fd.append('file', fileInput.files[0]);


            var fd = new FormData();
            fd.append("kartu_tertelan", file);
            fd.append("code", "2");
            fd.append("id_ticket", $("#input_atm_name").val());
            fd.append("id_atm", id_atm);
            fd.append("id_masalah", id_masalah);
            fd.append("nama_atm", $("#input_nama_atm2").val());
            fd.append("start_time", $("#input_start").val());
            fd.append("end_time", $("#input_end").val());
            fd.append("custody", $("#input_cuss").val());
            fd.append("nik", $("#input_nik").val());
            fd.append("satwal", $("#input_satwal").val());
            fd.append("deskripsi", $("#input_desk").val());
            fd.append("status", "reopen");

            console.log(fd);
            $.ajax({
                url: 'helper_ticket',
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                    alert(data);
                }
            });

    });
    $("#btn_close").click(function () {
        var file = document.getElementById('input_kartel').files[0];
            var formElement = $("[name='myform']")[0];
            var fd = new FormData(formElement);
            var fileInput = $("#input_kartel")[0];
            fd.append('file', fileInput.files[0]);


            var fd = new FormData();
            fd.append("kartu_tertelan", file);
            fd.append("code", "2");
            fd.append("id_ticket", $("#input_atm_name").val());
            fd.append("id_atm", id_atm);
            fd.append("id_masalah", id_masalah);
            fd.append("nama_atm", $("#input_nama_atm2").val());
            fd.append("start_time", $("#input_start").val());
            fd.append("end_time", $("#input_end").val());
            fd.append("custody", $("#input_cuss").val());
            fd.append("nik", $("#input_nik").val());
            fd.append("satwal", $("#input_satwal").val());
            fd.append("deskripsi", $("#input_desk").val());
            fd.append("status", "close");

            console.log(fd);
            $.ajax({
                url: 'helper_ticket',
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                    alert(data);
                }
            });
    });
    $('body').on("change", "#input_kartel", function (event) {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            console.log($("#input_kartel").val());
            reader.onload = function (e) {
                $('#preview_img').attr('src', e.target.result);
                $('#preview_img').attr('width', '250px');
                $('#preview_img').attr('height', '250px');

//                $("#input_kartel2").val($("#input_kartel").val());


                $('#preview_img2').attr('src', e.target.result);
                $('#preview_img2').attr('width', '250px');
                $('#preview_img2').attr('height', '250px');

            }
            reader.readAsDataURL(this.files[0]);
        }
    });

});
function getURLParameter(url, name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
}