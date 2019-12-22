define(function () {
    var count = 0;
    var allcount = 0;
    var share = null;
    function getparam(synctype) {
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("bingrenid", _req.bingrenid);
        dictionary.set("shenfenzh", _req.shenfenzh);
        dictionary.set("type", synctype);

        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
        if (dataparam == "" || dataparam == undefined)
            return null;
        return dataparam;
    }
    function show() {
        require(["share_services", "jquery", "common", "jextend", "web_global"], function (s) {
            share = s;
            querylog(sync);
        });
    }
    function sync() {
        require(["easyui"], function () {
            allcount = 6;
            init(0);
            share.synconetype("patient", setprocess);
            share.synconetype("pregnant", setprocess);
            share.synconetype("laborder", setprocess);
            share.synconetype("examorder", setprocess);
            share.synconetype("chufang", setprocess);
            share.synconetype("labresult", setprocess);
            //share.synconetype("delivery", setprocess, webglobal.services.DRSync);            
        });
    }

    function init(val) {
        $('#p').progressbar({
            value: val
        });
    }
    function setprocess() {
        var value = $('#p').progressbar('getValue');
        if (value < 100) {
            value += Math.ceil(100 / allcount);
            $('#p').progressbar('setValue', value);
            count++;
        }
        if (count == allcount) {
            end();
        }
    }
    function end() {
        synclog(goto);
    }
    function goto() {
        // + "?" + window.location.search
        window.location = (window.location.href.replace(webglobal.pages.Page_PreLogin.replace("../", ""), webglobal.pages.Page_AfterLogin.replace("../", "")));       
    }
    function synclog(success_callback) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                if (success_callback != null && success_callback != undefined)
                    success_callback();
            }
        };
        var dataparam = getparam("");
        if (dataparam == null || dataparam == undefined || dataparam == "")
            return;
        myextend.ajaxPost(webglobal.services.SyncLog, dataparam, web_list_callback, null, null, null, true);
    }
    function querylog(success_callback) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                if (success_callback != null && success_callback != undefined)
                    success_callback();
            }
            else {
                end();
            }
        };
      
        var dataparam = getparam(15);
        if (dataparam == null || dataparam == undefined || dataparam == "")
            return;
        myextend.ajaxPost(webglobal.services.QueryLog, dataparam, web_list_callback, null, null, null, true);
    }
    return {
        show: show
    }
});