/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {


    $.post('helper_atm', {code: "0"},
            function (returnedData) {
             
                var arr = $.parseJSON(returnedData);
                  console.log(returnedData);
                for (var i = 0; i <= arr.length; i++) {
                    console.log(arr["id_atm"]);                    
                };

            }).fail(function () {
        console.log("error");
    });
});
