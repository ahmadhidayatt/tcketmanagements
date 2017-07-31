$(document).ready(function () {
    $.post("getSession", function (returnedData) {
        var obj = JSON.parse(returnedData);
        console.log(returnedData);
        jQuery.each(obj, function (i, val) {
            $("#nama_prfl").val(obj[i]["nama"]);
            $("#alamat_prfl").val(obj[i]["alamat"]);
            $("#no_telp_prfl").val(obj[i]["no_telp"]);
            $("#nik_prfl").val(obj[i]["nik"]);

            $("#nama_img").alt = obj[i]["nama"];
            $("#nik").text(obj[i]["nik"]);
            $("#namas").text(obj[i]["nama"]);

        });
    });


    $("#submit").click(function () {
        var file = document.getElementById('input_file').files[0];
        var formElement = $("[name='myform']")[0];
        var fd = new FormData(formElement);
        var fileInput = $("#input_file")[0];
        fd.append('file', fileInput.files[0]);



        var fd = new FormData();
        fd.append("foto", file);
        fd.append("code", "2");
        fd.append("nama", $("#nama_prfl").val());
        fd.append("alamat", $("#alamat_prfl").val());
        fd.append("no_telp", $("#no_telp_prfl").val());
        fd.append("nik", $("#nik_prfl").val());



        console.log(fd);
        $.ajax({
            url: 'helper_pegawai',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                alert(data);
            }
        });

    });
});
