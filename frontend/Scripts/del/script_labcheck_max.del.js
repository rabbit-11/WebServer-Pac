require(['jquery', 'cookie'], function () {
    $(function () {
        var vismode = $.cookie('vismode') == "max" ? "max" : "min";
        var url = "../Templates/template_mod_labcheck_" + vismode + ".htm";

        $("#labcheck_wrapper").removeClass();
        $("#list_visitrecord_wrapper").removeClass();
        if (vismode == "max") {
            $("#labcheck_wrapper").addClass("visitrecord_left_max");
            $("#list_visitrecord_wrapper").addClass("visitrecord_right_max");
        }
        else {
            $("#labcheck_wrapper").addClass("visitrecord_left_min");
            $("#list_visitrecord_wrapper").addClass("visitrecord_right_min");
        }
        $("#labcheck_wrapper").load(url, function (response) {
            $.get("../Templates/template_labcheck_28_before.htm", { stamp: Math.random() }, function (template) {
                require(['tmpl'], function () {
                    //datasource
                    var data = [
                        { "eblood": "血常规" }
                    ];

                    $.template("myTemplate", template);
                    //render
                    $("#labcheck_28_before_wrapper").html($.tmpl("myTemplate", data));
                });
            });
            $.get("../Templates/template_labcheck_28_36.htm", { stamp: Math.random() }, function (template) {
                require(['tmpl'], function () {
                    //datasource
                    var data = [
                        { "eblood": "血常规" }
                    ];

                    $.template("myTemplate", template);
                    //render
                    $("#labcheck_28_36_wrapper").html($.tmpl("myTemplate", data));
                });
            });
            $.get("../Templates/template_labcheck_36_after.htm", { stamp: Math.random() }, function (template) {
                require(['tmpl'], function () {
                    //datasource
                    var data = [
                        { "eblood": "血常规" }
                    ];

                    $.template("myTemplate", template);
                    //render
                    $("#labcheck_36_after_wrapper").html($.tmpl("myTemplate", data));
                });
            });
        });
    });
});
