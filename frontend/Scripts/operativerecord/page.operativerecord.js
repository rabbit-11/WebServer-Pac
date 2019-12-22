define(function () {
    var ctrl = {
        mod_wrapper: "#mod_wrapper"
    };
    function show() {
        require(['jquery', "jextend", "common", "web_global"], function () {
           
            $(function () {
                var globalwrapper = $(ctrl.mod_wrapper);
                //获取参数
                var _req = myrequest.getrequest();
                var web_list_callback = function (data) {
                    if (data == null || data == undefined) return;
                    if (data.result == webglobal.enum_const.service_result_success) {
                        var hasfile = data.info.hasfile;
                        var initmod = myextend.getUrlParam("initmod");

                        /*
                        *存在有效的孕妇档案 且 模式为只读或空：显示表格模式
                        *否则显示编辑模式
                        */
                        require(["mod_operativerecord_detail"], function (detail) {
                            detail.show(globalwrapper);
                        });
                    }

                };
                
                var dictionary = new myextend.Dictionary();
                dictionary.set("bingrenid", _req.bingrenid);
                dictionary.set("shenfenzh", _req.shenfenzh);
                dictionary.set("pid", _req.pid);

                //myextend.ajaxPost_simple(webglobal.services.ExistPregnantInfo, dictionary, web_list_callback, true);
                myextend.ajaxGet_simple(webglobal.services.ExistOperativeRecord, dictionary, web_list_callback, true);
            });
        });
    }
    return { show: show }
});


