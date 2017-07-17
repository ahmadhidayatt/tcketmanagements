$("#reopen").click(function () {
String id_ticket = request.getParameter("id_ticket");
//        String id_atm = request.getParameter("id_atm");
//        String id_masalah = request.getParameter("id_masalah");
//        String start_time = request.getParameter("start_time");
//        String end_time = request.getParameter("end_time");
//        String custody = request.getParameter("custody");
//        String nik = request.getParameter("nik");
//        String satwal = request.getParameter("satwal");
//        String kartu_tertelan = request.getParameter("kartu_tertelan");
//        String deskripsi = request.getParameter("deskripsi");
//        String status = request.getParameter("status");
        $.post('helper_ticket', {code: "2",
                id_ticket: "2",
                id_atm: "2",
                id_masalah: "2",
                start_time: "2",
                end_time: "2",
                custody: "2",
                nik: "2",
                satwal: "2",
                kartu_tertelan: "2",
                deskripsi: "2",
                status: "2"
                },
                function (returnedData) {
                var obj = JSON.parse(returnedData);
                        data_atm = JSON.parse(returnedData);
                        console.log(data_atm);
                        jQuery.each(obj, function (i, val) {
                        console.log(obj[i]["id_atm"]);
                                $('<option>').val(obj[i]["id_atm"]).text(obj[i]["id_atm"]).appendTo('#select_atm');
                        });
                        ;
                }).fail(function () {
console.log("error");
});
});