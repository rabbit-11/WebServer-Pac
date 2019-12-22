define(function () {
    var myid = 0;
    var ctrl = {
        mod_pregnantinfo_simple_wrapper: "#mod_pregnantinfo_simple_wrapper",
        page_pregnantinfo_simple_wrapper: "#page_pregnantinfo_simple_wrapper",
        dateofprenatal_simple: "#dateofprenatal_simple",
        dateofprenatalmodifyreason_simple: "#dateofprenatalmodifyreason_simple",
        link_save: "#link_save",
        pregnantinfo_simple_wrapper: "#pregnantinfo_simple_wrapper"
    };
    function show() {
        require(["base_usercontrol", "web_global", "jquery", "easyui", "locale", "jextend", "tmpl", "common"], function (base) {

            $(ctrl.page_pregnantinfo_simple_wrapper).load(webglobal.templates.mod_pregnantinfo_simple, function (response) {
                var url = $(ctrl.page_pregnantinfo_simple_wrapper).parents(".window-body").attr("data-url");
                var data = {};
                if (url != "" && url != undefined && url != null) {
                    var para = myextend.getBaseUrlParam("s", url, false);
                    if (para != "" && para != undefined && para != null) {
                        data = JSON.parse(para);
                        myid = data.pid;
                    }
                }
                var mywindow = $(ctrl.page_pregnantinfo_simple_wrapper).parents(".mywindow");
                if (mywindow != null && mywindow != undefined) {
                    base.setattr(mywindow, "data-back", "");
                }
                loaddata();
                $(ctrl.link_save).linkbutton(
                    {
                        onClick: function () {
                            save();
                        }
                    });
            });
        });
    }
    function loaddata() {
        //        var _data = {
        //            "pid": myid,
        //            "shenfenzh":
        //        };
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                $(ctrl.dateofprenatal_simple).datebox({
                    panelWidth: 220, panelHeight: 226,
                    required: true,
                    value: (data != null && data != undefined ? myextend.myformatter(data.info.dateofprenatal) : null)
                });
                $(ctrl.dateofprenatalmodifyreason_simple).textbox({ value: data.info.dateofprenatalmodifyreason });
            }
        };
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        _req.todic(dictionary);
        dictionary.set("pid", myid);
        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
        if (dataparam == "" || dataparam == undefined)
            return;
        // myextend.ajaxPost(webglobal.services.GetPregnantInfo, dataparam, web_list_callback, null, null, null, true);
        myextend.ajaxGet(webglobal.services.GetPregnantInfo, dataparam, web_list_callback, null, null, null, true);
    }
    function save() {

        var dateofprenatal = $(ctrl.dateofprenatal_simple).datebox("getValue");
        var dateofprenatalmodifyreason = $(ctrl.dateofprenatalmodifyreason_simple).textbox("getText");
        var data = {
            "id": myid,
            "newitems": { "dateofprenatal": dateofprenatal, "dateofprenatalmodifyreason": dateofprenatalmodifyreason }
        };
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                //                var mywindow = $(ctrl.page_pregnantinfo_simple_wrapper).parents(".mywindow");
                //                if (mywindow != null && mywindow != undefined) {
                //                    mywindow.window('close');
                //                }
                require(["base_usercontrol"], function (base) {
                    var json = JSON.stringify({ "dateofprenatal": dateofprenatal });
                    var mywindow = $(ctrl.page_pregnantinfo_simple_wrapper).parents(".mywindow");
                    if (mywindow != null && mywindow != undefined) {
                        base.setattr(mywindow, "data-back", json);
                        mywindow.window('close');
                    }
                });
            }
        };
        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(data));
        if (dataparam == "" || dataparam == undefined)
            return;
        myextend.ajaxPost(webglobal.services.SavePregnantInfo, dataparam, web_list_callback, null, null, null, true);
    }
    return {
        show: show
    }
});