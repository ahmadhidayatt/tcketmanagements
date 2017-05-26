/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {
    var data_atm;

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

    $("#select_atm").click(function () {
        var id_atm = $("#select_atm").val();
        jQuery.each(data_atm, function (i, val) {
            console.log(data_atm[i]["id_atm"]);
            if (data_atm[i]["id_atm"]=== id_atm){
                //nih disini 
                   console.log(data_atm[i]["nama_lokasi"]+" "+ data_atm[i]["p_terakhir"]+" "+data_atm[i]["nama_atm"]+" "+ data_atm[i]["kordinator"]);
            }

        });
    });
});
