define(function () {
    function getPreDiagnosis(ctrl_wrapper, success_callback) {
        if (ctrl_wrapper == null || ctrl_wrapper == undefined) return;

        require(["base_usercontrol", "jquery", "common", "jextend", "web_global"], function (base) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    if (success_callback != null && success_callback != undefined) {
                        success_callback(ctrl_wrapper, data.info);
                    }
                }
            };

            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            dictionary.set("bingrenid", _req.bingrenid);
            dictionary.set("shenfenzh", _req.shenfenzh);
            dictionary.set("jiuzhenid", _req.jiuzhenid);
            dictionary.set("jigoudm", _req.jigoudm);

            //myextend.ajaxPost_simple(webglobal.services.GetTodayPreDiagnosis, dictionary, web_list_callback, true);
            myextend.ajaxGet_simple(webglobal.services.GetTodayPreDiagnosis, dictionary, web_list_callback, true);
       
        });
    }
    function getHighRiskDic(data) {
        if (data == null || data == undefined)
            return null;
        var highrisk = {};

        var text = "";
        var level = "";
        $.map(data, function (item) {
            if (item != null) {
                if (text != null && text != undefined && text != "") {
                    text += "；";
                }
                text += (item.t + "");
                if (level == null || level == undefined || level == "")
                    level = (item.l + "");
                else if (item.l != null && item.l != undefined && level < (item.l + "") && item.l != "z" && item.l != "Z") {
                    level = (item.l + "");
                }
            }
        });
        highrisk.text = text;
        highrisk.level = level;
        highrisk.dic = data;
        return highrisk;
    }
    function position_changed(sender) {
        require(["base_usercontrol", "jquery"], function (base) {

            if (sender != null && sender != null) {
                var tr = $(sender).parents("tr");
                if (tr != null && tr != undefined) {

                    var positiontext_1 = base.getText("tmpl_position", tr) + "";
                    var positiontext_2 = base.getText("tmpl_fetalpositions", tr) + "";
                    var positiontext = positiontext_1 != null && positiontext_1 != undefined && positiontext_1 != "" ? positiontext_1 : positiontext_2;
                    var presentval = "";
                    if (positiontext.indexOf("枕") != -1 || positiontext.indexOf("颏") != -1) {
                        presentval = "1";
                    }
                    else if (positiontext.indexOf("肩") != -1) {
                        presentval = "3";
                    }
                    else if (positiontext.indexOf("骶") != -1) {
                        presentval = "2";
                    }
                    else {
                        presentval = "9";
                    }
                    base.setVal("tmpl_presentposition", presentval, tr);
                    base.setVal("tmpl_presentpositions", presentval, tr);
                }
            }
        });
    }
    function print(attachedid, attachedtype) {
        require(["lodop_extend", "jquery", "web_global", "jextend", "common"], function (lodop) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    lodop.print(data.info.pagesize, data.info.title, data.info.filename, data.info.preview);
                }
                else {
                    require(["easyui"], function () {
                        $.messager.alert('错误', data.msg);
                    });
                }
            };
            var web_list_bef_callback = function (data) {
                MaskUtil.mask(document.body, "正在打印，请稍候...");
            };
            var web_list_com_callback = function (data) {
                MaskUtil.unmask(document.body);
            };
            var web_list_err_callback = function (data) { };

            //获取参数
            var _req = myrequest.getrequest();
            var dictionary = new myextend.Dictionary();
            dictionary.set("attachedid", attachedid);
            dictionary.set("attachedtype", attachedtype);
            dictionary.set("jigoudm", _req.jigoudm);
            _req.todic(dictionary);

            var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
            if (dataparam == "" || dataparam == undefined)
                return false;

            myextend.ajaxPost(webglobal.services.Print, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
        });
    }
    function getparam(synctype) {
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("bingrenid", _req.bingrenid);
        dictionary.set("shenfenzh", _req.shenfenzh);
        dictionary.set("jigoudm", _req.jigoudm);
        dictionary.set("type", synctype);

        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
        if (dataparam == "" || dataparam == undefined)
            return null;
        return dataparam;
    }
    function synconetype(synctype, success_callback, url) {
        var dataparam = getparam(synctype);
        if (dataparam == null || dataparam == undefined || dataparam == "")
            return;
        if (url == undefined || url == null || url == "") url = webglobal.services.SyncOneType;
        myextend.ajaxPost(url, dataparam, success_callback, null, null, null, true);
    }
    function SaveMonitorData(newitems) {
        require(["jquery", "common", "jextend", "web_global"], function () {
            var web_list_callback = function (data) { };

            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            dictionary.set("bingrenxm", _req.bingrenxm);
            dictionary.set("shenfenzh", _req.shenfenzh);
            dictionary.set("newitems", newitems);

            myextend.ajaxPost_simple(webglobal.services.SaveMonitorData, dictionary, web_list_callback, true);
        });
    }
    function getScenemapData(jsonfile, callback) {
        var jsondata = {};
        $.getJSON(jsonfile, function (data, status) {
            if (status == 'success') {
                if (callback != null && callback != undefined) {
                    callback(data);
                }
            }
        });
    }
    /*个性化模板*/
    function loadmodel(textboxid, wrapperid, _stage, _type, _jobnumber) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                $(wrapperid).html("");
                $.each(data.info, function (index, item) {
                    $(wrapperid).append("<a href=\"#\" data-index=\"" + index + "\" class=\"modellink\" >" + item.title + "</a>");
                    $(wrapperid).find("[data-index='" + index + "']").unbind("click").on("click", function () {
                        $(wrapperid).parents("tr").prev().find("#" + textboxid + "").iAddField("" + item.guide + "");
                        return false;
                    });
                });
            }
        };
        //获取参数
        var dictionary = new myextend.Dictionary();
        dictionary.set("jobnumber", _jobnumber);
        dictionary.set("stage", _stage);
        dictionary.set("type", _type);

        myextend.ajaxPost_simple(webglobal.services.GetPersonalGuide, dictionary, web_list_callback, true);
        
    }
    function bindToolTip(template, ctrl_btn, data, callback) {
        require(["tmpl", "easyui", "jquery"], function () {
            var _random = Math.random() + Math.random() + 10;
            var int_randowm = parseInt(_random, 10);
            var template_name = ctrl_btn + int_randowm;
            $.get(template, { stamp: _random }, function (template) {
                $.template(template_name, template);
                $(ctrl_btn).tooltip({
                    position: "right",
                    valign: "top",
                    content: function () {
                        if (callback != null && callback != undefined) {
                            callback(data);
                        }
                        return $.tmpl(template_name, data);
                    }
                });
            });
        });
    }
    function getSuggestion(success_callback) {
        require(["jquery", "common", "jextend", "web_global"], function () {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    if (success_callback != null && success_callback != undefined) {
                        success_callback(data.info);
                    }
                }
            };

            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            dictionary.set("bingrenid", _req.bingrenid);
            dictionary.set("shenfenzh", _req.shenfenzh);
            dictionary.set("jobnumber", _req.jobnumber);
            dictionary.set("jigoudm", _req.jigoudm);

            myextend.ajaxPost_simple(webglobal.services.GetTodaySuggestion, dictionary, web_list_callback, true);
        });
    }
    /*开始 添加缓存*/
    function uploadCacheRecord(data, cachetype, success_callback) {
        require(["jquery", "common", "jextend", "web_global"], function () {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    if (success_callback != null && success_callback != undefined) {
                        success_callback(data.info);
                    }
                }
            };

            //获取参数
            var _req = myrequest.getrequest();
            var dictionary = new myextend.Dictionary();
            _req.todic(dictionary);
            dictionary.set("data", JSON.stringify(data));
            dictionary.set("cachetype", cachetype);

            myextend.ajaxPost_simple(webglobal.services.AddCacheRecord, dictionary, web_list_callback, true);
        });
    }
    function getCacheType(cachetype, callback) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                if (callback != null && callback != undefined) {
                    callback(data.info.type);
                }
            }
        };

        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("q", cachetype);
        myextend.ajaxPost_simple(webglobal.services.GetCacheType, dictionary, web_list_callback, true);
    }
    function addCacheRecord(cachetype, cachedata) {
        getCacheType(cachetype, function (ct) {
            uploadCacheRecord(cachedata, ct, null);
        });
    }
    function threadCacheRecord(cachetype, func_ischange, func_guiddata, func_addcacherecord) {
        if (func_addcacherecord == null || func_addcacherecord == undefined) return;
        if (func_guiddata == null || func_guiddata == undefined) return;
        if (func_ischange == null || func_ischange == undefined) return;

        var t = true;
        var cache = null;
        var index = 0;
        setInterval(function () {
            if (!t) {
                t = true;
                var b = func_ischange();
                if (b) {
                    tmp = func_guiddata();
                    if (cache == null || !ObjectUtil.Compare(cache.newitems, tmp.newitems)) {
                        if (index > 0) func_addcacherecord(cachetype, tmp);
                        cache = tmp;
                        index++;
                    }
                }
            }
            t = false;
        }, 1000);
    }
    function clearCacheRecord(cachetype, callback) {
        getCacheType(cachetype, function (ct) {
            deleteCacheRecord(ct, callback);
        });
    }
    function deleteCacheRecord(cachetype, callback) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (callback != null && callback != undefined) {
                callback();
            }
        };

        //获取参数
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("cachetype", cachetype);
        _req.todic(dictionary);
        myextend.ajaxPost_simple(webglobal.services.ClearCacheRecord, dictionary, web_list_callback, true);
    }
    /*结束 添加缓存*/

    return {
        getPreDiagnosis: getPreDiagnosis,
        getHighRiskDic: getHighRiskDic,
        position_changed: position_changed,
        print: print,
        synconetype: synconetype,
        SaveMonitorData: SaveMonitorData,
        getScenemapData: getScenemapData,
        loadmodel: loadmodel,
        bindToolTip: bindToolTip,
        getSuggestion: getSuggestion,
        uploadCacheRecord: uploadCacheRecord,
        addCacheRecord: addCacheRecord,
        threadCacheRecord: threadCacheRecord,
        clearCacheRecord: clearCacheRecord
    }
});

