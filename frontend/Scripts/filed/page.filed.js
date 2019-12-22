define(function () {
    var ctrl = {
        win_filed_mod_wrapper: "#win_filed_mod_wrapper",
        filedtime: "#filedtime",
        link_save: "#link_save"
    };
    function show() {
        require(["web_global", "common", "jextend", "jquery", "locale", "easyui"], function () {
            $.get(webglobal.templates.mod_one_filed, { stamp: Math.random() + 1 }, function (response) {
                var web_list_callback = function (data) {
                    if (data == null || data == undefined) return;
                    if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                        $(ctrl.win_filed_mod_wrapper).append(response);
                        $(ctrl.link_save).linkbutton(
                            {
                                onClick: function () {
                                    save();
                                }
                            });
                        $(ctrl.filedtime).datebox({
                            panelWidth: 180, panelHeight: 186,
                            required: true,
                            value: myextend.myformatter(data.info.filedtime)
                        });
                    }
                    else {
                        $.get(webglobal.templates.norecord, { stamp: Math.random() + 1 }, function (res) {
                            $(ctrl.win_filed_mod_wrapper).append(res);
                        });
                    }
                };
                myextend.ajaxPost_simple(webglobal.services.GetFiledTime, getparam(), web_list_callback, true);

            });
        });
    }
    function save() {
        require(["web_global", "common", "jextend", "jquery"], function () {
            //获取参数
            var _req = myrequest.getrequest();

            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    $.messager.alert('提示', "设置完成");
                }
                else if (data.msg != null && data.msg != undefined && data.msg.length > 0) {
                    $.messager.alert('错误', data.msg);
                }
            };
            var dictionary = getparam();
            var filedtime = $(ctrl.filedtime).datebox("getValue");
            dictionary.set("filedtime", filedtime);
            myextend.ajaxPost_simple(webglobal.services.SaveFiledTime, dictionary, web_list_callback, true);
        });
    }
    function getparam() {
        var dictionary = new myextend.Dictionary();
        dictionary.set("id", myextend.getUrlParam("id"));
        dictionary.set("type", myextend.getUrlParam("type"));
        dictionary.set("username", myextend.getUrlParam("username", true));

        return dictionary;
    }
    return {
        show: show
    }
});

