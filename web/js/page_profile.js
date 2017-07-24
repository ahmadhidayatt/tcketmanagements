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
});
