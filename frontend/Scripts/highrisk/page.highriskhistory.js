define(function () {
    var class_share_services = null;
    var global_config = {
        template: null,
        btn: null,
        sr_list: null
    };
    function using(callback) {
        require(["share_services", "jquery", "common", "jextend", "web_global"], function (s1, s2) {
            class_share_services = s1;
            if (callback != null && callback != undefined)
                callback();
        });
    }
    function config() {
        global_config.template = webglobal.templates.mod_highriskhistory;
        global_config.sr_list = webglobal.services.ListHighRiskReason;
    }
    function show(options) {
        using(function () {
            global_config = options;
            config();
            $(function () {
                var web_list_callback = function (data) {
                    if (data == null || data == undefined) return;
                    if (data.result == webglobal.enum_const.service_result_success) {
                        class_share_services.bindToolTip(global_config.template, global_config.btn, data.info, init);
                    }
                };

                //获取参数
                var _req = myrequest.getrequest();

                var dictionary = new myextend.Dictionary();
                _req.todic(dictionary);

                //myextend.ajaxPost_simple(global_config.sr_list, dictionary, web_list_callback, true);
                myextend.ajaxGet_simple(global_config.sr_list, dictionary, web_list_callback, true);
            });
        });
    }
    function init(data) {
        //        if (data != null && data != undefined) {
        //            $.each(data, function (index, item) {
        //                item = class_share_labcheck.initView(item);
        //                data[index] = item;
        //            });
        //        }
        //if (data == null || data == undefined) data = [{"index":1}];
    }
    return {
        show: show
    }
});

