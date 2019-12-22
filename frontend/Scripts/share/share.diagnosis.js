define(function () {
    var mydiagsnosis = {
        tmpl_maindiagnosis: null, //主诊断容器
        tmpl_diagnosisinfo: null, //主诊断说明
        tmpl_secondarydiagnosis: null, //次诊断容器
        tmpl_diagnosisdic: null, //诊断字典
        wrapper: null, //主容器
        btn: null, //窗口触发器
        win: null //窗口
    };
    var mybase = null;
    var myshare = null;

    function getCtrlByDataid(ctrl_wrapper, dataid) {
        return $(ctrl_wrapper).find("[data-id='" + dataid + "']");
    }
    function init(dia, base, share) {
        if (dia == null || dia == undefined)
            mydiagsnosis = {};
        else
            mydiagsnosis = dia;
        mybase = base;
        myshare = share;
        setUrl();
        $(mydiagsnosis.wrapper).find(mydiagsnosis.btn).unbind("click").on("click", function () {

            var win = $(mydiagsnosis.win); //父页面控件
            var baseurl = win.attr("data-url");

            baseurl = myextend.UrlUpdateParams(baseurl, "s", JSON.stringify(get(mydiagsnosis.wrapper, mybase)));
            win.attr("data-url", baseurl);
            mybase.showwindow(win);
            return false;
        });
    }
    function set(data, ctrl_wrapper) {
        //var ctrl_wrapper = mydiagsnosis.wrapper;
        if (ctrl_wrapper == undefined || ctrl_wrapper == null) ctrl_wrapper = mydiagsnosis.wrapper;
        else mydiagsnosis.wrapper = ctrl_wrapper;
        var t = getCtrlByDataid(ctrl_wrapper, mydiagsnosis.tmpl_diagnosisdic);
        t.val(JSON.stringify(data));

        setUrl();
        reload(ctrl_wrapper, mybase, function (items_data) {
            var t_main = mybase.getCtrl(ctrl_wrapper, mydiagsnosis.tmpl_maindiagnosis);
            if (t_main != null && t_main != undefined) {
                t_main.find("input.easyui-combobox").combobox("loadData", items_data);
            }
            var t_sec = mybase.getCtrl(ctrl_wrapper, mydiagsnosis.tmpl_secondarydiagnosis);
            if (t_sec != null && t_sec != undefined) {
                t_sec.find("input.easyui-combobox").combobox("loadData", items_data);
            }

            var main = getMain(data);
            var sec = getSec(data);
            if (main != null && main != undefined) {
                mybase.setVal(mydiagsnosis.tmpl_diagnosisinfo, main.i, ctrl_wrapper);
                mybase.setVal(mydiagsnosis.tmpl_maindiagnosis, main.c, ctrl_wrapper);
            }
            if (sec != null && sec != undefined) {
                mybase.setVal(mydiagsnosis.tmpl_secondarydiagnosis, sec, ctrl_wrapper);
            }
        });
    }
    function reload(ctrl_wrapper, base, callback) {
        require(["jquery", "common", "jextend", "web_global"], function () {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (callback != null && callback != undefined) {
                    callback(data);
                }
            };
            var dataparam = "input=" + JSON.stringify(getDic());
            if (dataparam == "" || dataparam == undefined)
                return;
            myextend.ajaxPost(webglobal.services.GetNormalDiagnosis, dataparam, web_list_callback, null, null, null, true);
        });
    }
    function getDic() {
        var ctrl_wrapper = mydiagsnosis.wrapper;
        //获取参数
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("jobnumber", _req.jobnumber);
        dictionary.set("jigoudm", _req.jigoudm);

        var cachedic = mybase.getVal(mydiagsnosis.tmpl_diagnosisdic, ctrl_wrapper);
        dictionary.set("diagnosisdic", cachedic);

        return dictionary.getItems();
    }
    function get(ctrl_wrapper) {
        //var ctrl_wrapper = mydiagsnosis.wrapper;
        if (ctrl_wrapper == undefined || ctrl_wrapper == null) ctrl_wrapper = mydiagsnosis.wrapper;
        else mydiagsnosis.wrapper = ctrl_wrapper;
        var dictionary = new myextend.Dictionary();

        var cache = mybase.getVal(mydiagsnosis.tmpl_diagnosisdic, ctrl_wrapper);
        var cachedic = [];
        if (cache != null && cache != undefined && cache != "") {
            cachedic = JSON.parse(cache);
        }
        var maindic = {};
        var realtime = false;
        //主诊断
        var t_main = mybase.getCtrl(ctrl_wrapper, mydiagsnosis.tmpl_maindiagnosis);
        if (t_main != null && t_main != undefined) {
            var combo = t_main.find("input.easyui-combobox");
            if (combo != null && combo != undefined && combo.length > 0) {
                var val = combo.combobox("getValue");
                if (val == "" || val == null || val == undefined)
                    val = combo.combobox("getText");
                var t = combo.combobox("getData");
                if (t != null && t != undefined) {
                    $.map(t, function (item) {
                        if ((val + "" == item.text + "" || val + "" == item.value + "") && val != null && val != "" && val != undefined) {
                            maindic.z = item.value;
                            maindic.c = item.text;
                            if (item.attributes != null && item.attributes != undefined) {
                                maindic.icd10 = item.attributes.icd10;
                            }
                            maindic.i = mybase.getVal(mydiagsnosis.tmpl_diagnosisinfo, ctrl_wrapper);
                        }
                    });
                }
                realtime = true;
            }
        }
        //次诊断
        var secdic = [];
        var t_sec = mybase.getCtrl(ctrl_wrapper, mydiagsnosis.tmpl_secondarydiagnosis);
        if (t_sec != null && t_sec != undefined) {
            var combo = t_sec.find("input.easyui-combobox");
            if (combo != null && combo != undefined && combo.length > 0) {
                var val = combo.combobox("getValues");
                var t = combo.combobox("getData");
                if (t != null && t != undefined && val != null && val != undefined && val.length > 0) {
                    $.map(t, function (item) {
                        if (val.contains(item.value)) {
                            var tmp = {};
                            tmp.z = item.value;
                            tmp.c = item.text;

                            if (item.attributes != null && item.attributes != undefined) {
                                tmp.icd10 = item.attributes.icd10;
                            }
                            secdic.push(tmp);
                        }
                    });
                }

                realtime = true;
            }
        }
        return unionDic(maindic, secdic, cachedic);
    }

    function setUrl() {
        var baseurl = webglobal.services.GetNormalDiagnosis;
        baseurl = myextend.UrlUpdateParams(baseurl, "input", encodeURI(JSON.stringify(getDic()), "UTF-8"), false);

        mybase.setattr(mybase.getCtrl(mydiagsnosis.wrapper, mydiagsnosis.tmpl_maindiagnosis), 'data-url', baseurl);
        mybase.setattr(mybase.getCtrl(mydiagsnosis.wrapper, mydiagsnosis.tmpl_secondarydiagnosis), 'data-url', baseurl);
    }
    function getMain(data) {
        if (data == null || data == undefined)
            return;
        for (var i = 0; i < data.length; i++) {
            if (data[i].t == "1") {
                return data[i];
            }
        }
        return null;
    }
    function getSec(data) {
        if (data == null || data == undefined)
            return null;
        var datas = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].t != "1") {
                datas.push(data[i].z);
            }
        }
        return datas;
    }
    function unionDic(maindic, secdic, cachedic) {
        var dicArray = new Array();
        var isfinded = false;
        //主诊断
        if (maindic != null && maindic != undefined) {
            if (cachedic != null && cachedic != undefined && cachedic.length > 0) {
                $.map(cachedic, function (item) {
                    if (item.t + "" == "1") {
                        if (item.z + "" == maindic.z + "") {
                            maindic.t = item.t;
                            maindic.f = item.f;
                            maindic.d = item.d;
                            maindic.icd10 = item.icd10;
                            dicArray.push(maindic);
                            isfinded = true;
                        }
                    }
                });
            }

            if (!isfinded && maindic.z != "" && maindic.z != null && maindic.z != undefined) {
                maindic.t = 1;
                maindic.f = 1;
                dicArray.push(maindic);
            }
        }

        //次诊断
        if (secdic != null && secdic != undefined && secdic.length > 0) {
            if (cachedic != null && cachedic != undefined && cachedic.length > 0) {
                $.map(secdic, function (sec) {
                    isfinded = false;
                    $.map(cachedic, function (item) {
                        if (item.t + "" == "2" && item.z + "" == sec.z + "") {

                            sec.t = item.t;
                            sec.f = item.f;
                            sec.d = item.d;
                            sec.i = item.i;
                            dicArray.push(sec);
                            isfinded = true;
                        }
                    });
                    if (!isfinded) {
                        sec.t = "2";
                        sec.f = "1";
                        dicArray.push(sec);
                    }
                });
            }
            else {
                $.map(secdic, function (sec) {
                    sec.t = "2";
                    sec.f = "1";
                    dicArray.push(sec);
                });
            }
        }

        return dicArray;
    }
    function refresh(ctrl_wrapper, callback) {
        if (ctrl_wrapper == undefined || ctrl_wrapper == null) ctrl_wrapper = mydiagsnosis.wrapper;
        else mydiagsnosis.wrapper = ctrl_wrapper;

        if (callback == undefined || callback == null) return;

        var diagnosisdic = mybase.getVal(mydiagsnosis.tmpl_diagnosisdic, ctrl_wrapper);
        var diagnosisinfo = mybase.getVal(mydiagsnosis.tmpl_diagnosisinfo, ctrl_wrapper);

        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                if (data.info.change_dia) {
                    set(data.info.diagnosisdic, ctrl_wrapper);
                    //提示
                    $.messager.confirm({
                        ok: '是',
                        cancel: '否',
                        title: '提示',
                        msg: "诊断有修改，是否立即保存",
                        fn: function (r) {
                            if (r) {
                                callback();
                            }
                        }
                    });
                }
            }
        };

        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("diagnosisdic", diagnosisdic);
        dictionary.set("diagnosisinfo", diagnosisinfo);
        _req.todic(dictionary);

        myextend.ajaxPost_simple(webglobal.services.GetRefreshDiagnosis, dictionary, web_list_callback, true);

    }
    return {
        get: get,
        set: set,
        init: init,
        refresh: refresh
    }
});