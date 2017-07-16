$(document).ready(function () {
    $("#login").click(function () {
        console.log("click");
        var username = $("#username").val();
        var password = $("#password").val();

        $.post("login",{
                    username: username,
                    password: password
                },function (data, status) {
                    alert("Data: " + data.length + data  + "\nStatus: " + status);
                  var result = $.trim(data);
                    //belom bener if nya
              
                    if(result === "admin"){
                         alert("welcome admin");
                          window.location.href="index.html?code="+result;
                    }
                    else if(result ==="client"){
                         alert("welcome client");
                          window.location.href="index.html?code="+result;
                    }
                    else{
                        
                    };
                });
    });

});
