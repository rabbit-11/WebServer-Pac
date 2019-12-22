define(function () {
    var level_data = null;
    var config = {
        tmpl_highrisklevel: null, //高危等级
        tmpl_highriskreason: null, //高危因素文本
        tmpl_highrisklevel_text: null, //高危五色等级
        tmpl_highriskscore: null, //高危分数
        tmpl_highriskdic: null, //高危字典字典
        wrapper: null, //主容器
        btn: null, //窗口触发器
        win: null //窗口
    };
    var mybase = null;
    var myshare = null;

    function getCtrlByDataid(ctrl_wrapper, dataid) {
        return $(ctrl_wrapper).find("[data-id='" + dataid + "']");
    }
    function myinit(c, base, share) {
        config = c;
        mybase = base;
        myshare = share;
        //高危评估
        $(config.wrapper).find(".btn_highrisk_detail").unbind("click").on("click", function () {
            require(["base_usercontrol", "jextend", "jquery", "easyui"], function (base) {
                var win = $(config.win); //父页面控件
                var baseurl = win.attr("data-url");

                baseurl = myextend.UrlUpdateParams(baseurl, "s", JSON.stringify(get()), true);
                win.attr("data-url", baseurl);
                base.showwindow(win);
            });
            return false;
        });
    }
    function get() {
        var t = getCtrlByDataid(config.wrapper, config.tmpl_highriskdic);
        var val = t.val();
        if (myextend.isNull(val))
            return null;
        return JSON.parse(val);
    }
    function set(data, callback) {
        var t = getCtrlByDataid(config.wrapper, config.tmpl_highriskdic);
        t.val(JSON.stringify(data));
        //        var highrisk = myshare.getHighRiskDic(data);
        //        if (highrisk != null && highrisk != undefined) {
        //            mybase.setVal(config.tmpl_highriskreason, highrisk.text, config.wrapper);
        //            mybase.setVal(config.tmpl_highrisklevel, highrisk.level, config.wrapper);
        trans(JSON.stringify(data), callback);
        //        }
    }
    function trans(highrisk, callback) {
        if (highrisk == null || highrisk == undefined) return;
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                mybase.setVal(config.tmpl_highrisklevel_text, data.info.highrisklevel_text, config.wrapper);
                mybase.setVal(config.tmpl_highriskreason, data.info.highriskreason, config.wrapper);
                mybase.setVal(config.tmpl_highrisklevel, data.info.highrisklevel, config.wrapper);
                if (callback != undefined && callback != undefined) {
                    callback();
                }
            }
        };

        var dictionary = new myextend.Dictionary();
        //        dictionary.set("highrisklevel", highrisk.level);
        //        dictionary.set("highriskreason", highrisk.text);
        dictionary.set("highriskdic", highrisk);

       // myextend.ajaxPost_simple(webglobal.services.GetTransferHighRisk, dictionary, web_list_callback, true);
       myextend.ajaxGet_simple(webglobal.services.GetTransferHighRisk, dictionary, web_list_callback, true);
    }

    function init(callback) {
        require(["share_services", "web_global"], function (share) {
            share.getScenemapData(webglobal.jsons.highrisklevel, function (data2) {
                level_data = data2;
                if (callback) callback();
            });
        });
    }
    function unitFormatter_level(value, rowData, rowIndex) {
        return unitFormatter(value, rowData, rowIndex, level_data);
    }
    function unitFormatter(value, rowData, rowIndex, data) {
        if (value == 0) {
            return "";
        }
        var unitJSON = data;
        if (unitJSON == null || unitJSON == undefined) return "";

        for (var i = 0; i < unitJSON.length; i++) {
            if (unitJSON[i].value == value) {
                return unitJSON[i].text;
            }
        }
        return value;
    }
    return {
        init: init,
        myinit: myinit,
        set: set,
        get: get,
        unitFormatter_level: unitFormatter_level
    }
});

