/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(document).ready(function () {


    $.post('helper_atm', {code: "0"},
            function (returnedData) {

                var data = JSON.parse(returnedData);
                    JSON.stringify(data);
                var index = data.indexOf('ddlViewBy');

                for (var i = 0; i < data.length(); i++) {
                    var x = document.createElement("OPTION");
                    x.setAttribute("value", "volvocar");
                    var t = document.createTextNode("Volvo");
                    x.appendChild(t);
                    document.getElementById("ddlViewBy").appendChild(x);
                   
                    console.log(i);
                }
            }).fail(function () {
        console.log("error");
    });
});
