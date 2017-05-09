$(document).ready(function() {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&'); 
    var code = getURLParameter(url,'code');
    console.log(code);
    alert(code);
    
});

function getURLParameter(url, name) {
    return (RegExp(name + '=' + '(.+?)(&|$)').exec(url)||[,null])[1];
}
