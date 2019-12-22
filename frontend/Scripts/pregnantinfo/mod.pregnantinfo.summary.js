define(function () {
    var globalwrapper = null;
    var share = null;
    var ctrl = {
        form_tr_wrapper_pregnanthistory: "#form_tr_wrapper_pregnanthistory",
        btn_edit: "#btn_edit",
        btn_print: "#btn_print"
    };
    function getCtrl(id) {
        return $(globalwrapper).find(id);
    }
    function getID() {
        var t = getCtrl("[data-id='tmpl_id']");
        if (t != null && t != undefined) {
            return parseInt(t.val(), 10);
        }
    }
    //初始化界面
    function initstate() {
        var btn_edit = $(globalwrapper).find(ctrl.btn_edit);
        if (!myextend.isNull(btn_edit)) {
            btn_edit.attr("href", myextend.UrlUpdateParams(window.location.href, "initmod", webglobal.enum_mod.edit, false));
        }
        //打印
        var btn_print = $(globalwrapper).find(ctrl.btn_print);
        if (!myextend.isNull(btn_print)) {
            EventUtil.bindclick(btn_print, print);
        }
    }
    //数据载入
    function loaddata(data, mod) {
        if (globalwrapper == null || globalwrapper == undefined) return;
        $.get(webglobal.templates.mod_pregnantinfo_summary, { stamp: Math.random() + 1 }, function (template) {
            var arr = [];
            arr.push(data);
            //template
            $.template("myTemplate", template);
            var newrow = $(globalwrapper).append($.tmpl("myTemplate", arr));
            initstate();
            loadpregnanthistory(mod, data.pregnanthistory, $(ctrl.form_tr_wrapper_pregnanthistory));
        });
    }
    //只读
    function loadview(data) {
        loaddata(data, webglobal.enum_mod.view);
    }
    function loadpregnanthistory(mod, data, ctrl_wrapper) {
        require(["mod_pregnanthistory"], function (a) {
            a.loadview(ctrl_wrapper, data);
        });
    }
    function show(ctrl_wrapper) {
        if (myextend.isNull(ctrl_wrapper)) return;
        globalwrapper = ctrl_wrapper;
        require(["share_services", "tmpl", "jquery", "common", "jextend", "web_global", "easyui"], function (s) {
            share = s;
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    loadview(data.info);
                }
            };
            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            dictionary.set("bingrenid", _req.bingrenid);
            dictionary.set("shenfenzh", _req.shenfenzh);
            dictionary.set("pid", _req.pid);
            dictionary.set("summary", true);

            myextend.ajaxPost_simple(webglobal.services.GetPregnantInfo, dictionary, web_list_callback, true);
           
        });
    }

    function print() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                share.print(getID(), data.info.type);
            }
        };
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("q", webglobal.enum_printtype.pregnantinfo);

        myextend.ajaxPost_simple(webglobal.services.GetPrintType, dictionary, web_list_callback, true);
        
    }
    return {
        show: show
    }
});
