$(document).ready(function () {
    $("#login").click(function () {
        console.log("click");
        var username = $("#username").val();
        var password = $("#password").val();

        $.post("login",
                {
                    username: username,
                    password: password
                },
                function (data, status) {
                    alert("Data: " + data.length + "\nStatus: " + status);
                    var datas = data;
                    //belom bener if nya
                    if(datas==="admin"){
                         alert("welcome admin");
                    }
                    else if(datas==="client"){
                         alert("welcome client");
                    }
                    else{
                        
                    };
                });
    });

});
