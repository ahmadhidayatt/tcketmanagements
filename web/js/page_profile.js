$(document).ready(function () {
    $("#refresh_profile").click(function () {
        window.parent.document.getElementById("iframe").contentWindow.location.reload();
    });
    var nik;
    $.post("getSession", function (returnedData) {
        var obj = JSON.parse(returnedData);
        console.log(returnedData);
        jQuery.each(obj, function (i, val) {
            $("#nama_prfl").val(obj[i]["nama"]);
            $("#alamat_prfl").val(obj[i]["alamat"]);
            $("#no_telp_prfl").val(obj[i]["no_telp"]);
            $("#nik_prfl").val(obj[i]["nik"]);
            nik = obj[i]["nik"];
            $("#nama_img").alt = obj[i]["nama"];
            $("#nik").text(obj[i]["nik"]);
            $("#namas").text(obj[i]["nama"]);
            getImage(nik);
        });
    });




    $("#submit").click(function () {
        var file = document.getElementById('input_file').files[0];
        var formElement = $("[name='myform']")[0];
    
       



        var fd = new FormData(formElement);
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
function getImage(nik) {
    var fd = new FormData();
    fd.append("code", "3");
    fd.append("nik", nik);
    $.ajax({
        url: 'helper_pegawai',
        data: fd,
        processData: false,
        contentType: false,

        type: 'POST',
        success: function (data) {
            var arrayBufferView = new ArrayBuffer(this.response);
            var blob = new Blob([arrayBufferView], {type: "image/jpeg"});
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(blob);
            var img = document.querySelector("#image_avatar");
            img.src = imageUrl;
            alert(data);
        }
    });
}
function encode(input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
        chr1 = input[i++];
        chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
        chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
}
