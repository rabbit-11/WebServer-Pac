define(function () {
    var globalwrapper = null;
    var sharedata = null;
    var count = 0;
    var allcount = 0;
    var sharebase = null;
    var shareservices = null;
    //控件
    var ctrls = {
        win_emerprediagnosis_mod_wrapper: "#win_emerprediagnosis_mod_wrapper",
        emer_btn_prediagnosis_save: "#emer_btn_prediagnosis_save",
        emer_baseinfo_wrapper: "#emer_baseinfo_wrapper",
        emer_input_wrapper: "#emer_input_wrapper",
        emer_link_detailinfo: "#emer_link_detailinfo",
        emer_baseinfo_template: "#emer_baseinfo_template",
        emer_color_template: "#emer_color_template",
        emer_input_template: "#emer_input_template",
        form_tr_wrapper_emer_multifetal: "#form_tr_wrapper_emer_multifetal",
        form_td_emer_chiefcomplaint_wrapper: "#form_td_emer_chiefcomplaint_wrapper",
        emer_btn_print: "#emer_btn_print"
    };

    function geturlparam(name) {
        var form = $(ctrls.win_emerprediagnosis_mod_wrapper).parents("form");
        var url = form.attr("action");
        return myextend.getBaseUrlParam(name, url, true);
    }
    function initstate() {
        var id = getID();
        var hasid = id > 0 && !isNaN(id);

        EventUtil.showOrHide($(ctrls.emer_btn_print), hasid);

        //保存
        EventUtil.bindclick($(ctrls.emer_btn_prediagnosis_save), save);
        //打印
        EventUtil.bindclick($(ctrls.emer_btn_print), print);

    }
    function show() {
        require(["base_usercontrol", "share_services", "easyui", "locale", "web_global", 'jquery', "jextend", "common", "tmpl"], function (base, _shareservices) {
            sharebase = base;
            shareservices = _shareservices;
            $(function () {
                $.get(webglobal.templates.mod_emerprediagnosis, { stamp: Math.random() + 1 }, function (response) {
                    $(ctrls.win_emerprediagnosis_mod_wrapper).html(response);

                    count = 0;
                    allcount = 2;
                    sharedata = null;
                    ReadOneGuaHaoXX();
                    ReadOnePregnantInfo();
                    ReadOnePreDiagnosis();
                });
            });
        });
    }
    function ReadOneGuaHaoXX() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                var data_1 = sharedata;
                var data_2 = data.info;
                sharedata = $.extend(true, data_1, data_2);
                end();
            }
        };

        //获取参数
        var dictionary = new myextend.Dictionary();
        dictionary.set("jiuzhenid", geturlparam("jiuzhenid"));
        dictionary.set("jigoudm", geturlparam("jigoudm"));

        myextend.ajaxPost_simple(webglobal.services.GetOneGuaHaoXX, dictionary, web_list_callback, true);
    }
    function ReadOnePregnantInfo() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                var data_1 = sharedata;
                var data_2 = data.info;
                sharedata = $.extend(true, data_1, data_2);
                end();
            }
        };

        //获取参数
        var dictionary = new myextend.Dictionary();
        dictionary.set("bingrenid", geturlparam("bingrenid"));
        dictionary.set("shenfenzh", geturlparam("shenfenzh"));
        dictionary.set("jigoudm", geturlparam("jigoudm"));

        myextend.ajaxPost_simple(webglobal.services.GetOnePregnantInfo, dictionary, web_list_callback, true);
    }
    function end() {
        count++;
        if (count == allcount) {
            SetInfo(sharedata);
        }
    }
    function SetInfo(data) {
        SetOneGuaHaoXX($(ctrls.emer_baseinfo_wrapper), data);
        var baseurl = webglobal.pages.YUNCHANFDL;
        var jiuzhenid = data.jiuzhenid;
        var bingrenid = data.bingrenid;
        var bingrenxm = data.xingming;
        var shenfenzh = data.zhengjianhm;
        var _req = myrequest.getrequest();
        var lururcode = geturlparam("lururcode");
        var lururname = geturlparam("lururname");

        if (!myextend.isNull(jiuzhenid)) baseurl = myextend.UrlUpdateParams(baseurl, "jiuzhenid", "'" + jiuzhenid + "'", true);
        if (!myextend.isNull(shenfenzh)) baseurl = myextend.UrlUpdateParams(baseurl, "shenfenzh", "'" + shenfenzh + "'", true);
        if (!myextend.isNull(lururcode)) baseurl = myextend.UrlUpdateParams(baseurl, "lururcode", "'" + lururcode + "'", true);
        if (!myextend.isNull(lururname)) baseurl = myextend.UrlUpdateParams(baseurl, "lururname", "'" + lururname + "'", true);
        if (!myextend.isNull(bingrenid)) baseurl = myextend.UrlUpdateParams(baseurl, "bingrenid", "'" + bingrenid + "'", true);
        if (!myextend.isNull(bingrenxm)) baseurl = myextend.UrlUpdateParams(baseurl, "bingrenxm", "'" + bingrenxm + "'", true);
        if (!myextend.isNull(bingrenxm)) baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", "'" + _req.jigoudm + "'", true);

        $(ctrls.emer_link_detailinfo).attr("href", baseurl);
    }
    function ReadOnePreDiagnosis() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                if (data.info.id <= 0 || isNaN(data.info.id)) {
                    data.info.evacode = geturlparam("lururcode");
                    data.info.evaname = geturlparam("lururname");
                    data.info.jiuzhenid = geturlparam("jiuzhenid");
                }
                SetInput($(ctrls.emer_input_wrapper), data.info);
            }
        };

        //获取参数
        var dictionary = new myextend.Dictionary();
        dictionary.set("jiuzhenid", geturlparam("jiuzhenid"));
        dictionary.set("shenfenzh", geturlparam("shenfenzh"));
        dictionary.set("bingrenid", geturlparam("bingrenid"));
        dictionary.set("jigoudm", geturlparam("jigoudm"));

        myextend.ajaxPost_simple(webglobal.services.GetOneEmerPreDiagnosis, dictionary, web_list_callback, true);
    }
    function SetOneGuaHaoXX(wrapper, data) {
        if (data == null || data == undefined) return;
        var dataObj = [];
        dataObj.push(data);

        //template
        var baseinfo_template = $(ctrls.emer_baseinfo_template).html();
        $.template("myTemplate", baseinfo_template);
        var data_html = $.tmpl("myTemplate", dataObj);
        //render
        $(wrapper).append(data_html);

        //template
        var color_template = $(ctrls.emer_color_template).html();
        $.template("myTemplate1", color_template);
        //render
        $(wrapper).find(".highriskcolor_wrapper").html($.tmpl("myTemplate1", data.highrisk));
    }
    function SetInput(wrapper, data) {
        if (data == null || data == undefined) return;
        var dataObj = [];
        dataObj.push(data);

        //template
        var input_template = $(ctrls.emer_input_template).html();
        $.template("myTemplate", input_template);
        var data_html = $.tmpl("myTemplate", dataObj);
        globalwrapper = wrapper;
        //render
        $(wrapper).append(data_html);
        initstate();
        require(["base_usercontrol", "web_global"], function (base) {
            var mod = data.id > 0 && !isNaN(data.id) ? webglobal.enum_mod.edit : webglobal.enum_mod.add;
            base.drawcontrol($(wrapper), mod, true, prerender, afterrender);

            var multifetal = [];
            if (data.multifetal != null && data.multifetal != undefined)
                multifetal = JSON.parse(data.multifetal);
            loadmultifetal(mod, multifetal, $(ctrls.form_tr_wrapper_emer_multifetal));
        });
    }
    //渲染前
    function prerender() {
    }
    //渲染后
    function afterrender(wrapper) {
        autowidth(wrapper);
        var _req = myrequest.getrequest();
        var _jobnumber = _req.jobnumber;
        //个性化模板
        var wrapperid = $(wrapper).find(ctrls.form_td_emer_chiefcomplaint_wrapper);
        var _stage = sharebase.getattr($(wrapperid), "data-stage");
        var _type = sharebase.getattr($(wrapperid), "data-type");
        shareservices.loadmodel("tmpl_chiefcomplaint", wrapperid, _stage, _type, _jobnumber);

        //特殊人群评估
        $(wrapper).find(".btn_specialeva").unbind("click").on("click", function () {
            require(["base_usercontrol", "jextend", "jquery", "easyui"], function (base) {
                var tmp = $("#win_specialeva"); //父页面控件
                if (tmp != null && tmp.length > 0) {
                    var win = $(tmp[0]); //父页面控件
                    var baseurl = webglobal.pages.Page_SpecialEva; // win.attr("data-url");

                    baseurl = myextend.UrlUpdateParams(baseurl, "bingrenid", geturlparam("bingrenid"), true);
                    baseurl = myextend.UrlUpdateParams(baseurl, "shenfenzh", geturlparam("shenfenzh"), true);
                    baseurl = myextend.UrlUpdateParams(baseurl, "bingrenxm", geturlparam("bingrenxm", true), true);
                    baseurl = myextend.UrlUpdateParams(baseurl, "lururcode", geturlparam("lururcode"), true);
                    baseurl = myextend.UrlUpdateParams(baseurl, "lururname", geturlparam("lururname", true), true);
                    baseurl = myextend.UrlUpdateParams(baseurl, "id", base.getVal("tmpl_specialevaid", wrapper), true);

                    win.attr("data-url", baseurl);
                    base.showwindow(win);
                }
            });
            return false;
        });

//        bindkeydown(wrapper);
    }
//    function bindkeydown(wrapper) {
//        require(["common", "jquery"], function () {
//            PressUtil.bindkeydown($(wrapper), false);
//        });
//    }
    function autowidth(wrapper) {
        require(["jextend"], function () {
            $(document).ready(function () {
                //自适应宽度
                var w = $(wrapper).width();
                var td_w = $(wrapper).find(".form_td_widthflag").find("span").width();
                myextend.setCustomTable(parseInt(w, 10), parseInt(td_w, 10) <= 0 ? 74 : parseInt(td_w, 10), '.customtable');
            });
        });
    }
    function loadmultifetal(mod, data, ctrl_wrapper) {
        require(["mod_multifetal_emerprediagnosis", "jquery"], function (a) {
            var options = { btn_save: $(ctrl_wrapper).parents(".emerprediagnosis_wrapper:first").find("#emer_btn_prediagnosis_save") };
            //新增
            if (mod == webglobal.enum_mod.add) {
                a.loadadd(ctrl_wrapper, options);
            }
            //编辑
            else if (mod == webglobal.enum_mod.edit) {
                a.loadedit(ctrl_wrapper, data, options);
            }
            //只读
            else if (mod == webglobal.enum_mod.view) {
                a.loadview(ctrl_wrapper, data, options);
            }
        });
    }
    //保存
    function save(sender, success_callback, e) {
        require(["base_usercontrol", "jquery", "common", "jextend", "web_global", "easyui"], function (base) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    TipUtil.ShowSuccess("保存成功");
                    setID(data.info.id);
                    initstate();
                    base.reload(globalwrapper);

                    if (success_callback != null) {
                        success_callback(sender, e);
                    }
                }
                else {
                    $.messager.alert('错误', data.msg);
                }
            };
            var web_list_bef_callback = function (data) {
                EventUtil.setVisible(sender, false);
            };
            var web_list_com_callback = function (data) {
                EventUtil.setVisible(sender, true);
            };
            var web_list_err_callback = function (data) { };

            var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(base.getFormDic(globalwrapper, getID() <= 0 || isNaN(getID()))));
            if (dataparam == "" || dataparam == undefined)
                return;
            myextend.ajaxPost(webglobal.services.SaveEmerPreDiagnosis, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);

        });
    }
    function getCtrl(id) {
        return $(globalwrapper).find(id);
    }
    function getID() {
        var t = getCtrl("[data-id='tmpl_id']");
        if (t != null && t != undefined) {
            return parseInt(t.val(), 10);
        }
    }
    function setID(id) {
        var t = getCtrl("[data-id='tmpl_id']");
        if (t != null && t != undefined) {
            t.val(id);
        }
    }
    function GetOutComeTime(sender) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                sharebase.setVal("tmpl_outcometime", data.info.outcometime, ctrls.win_emerprediagnosis_mod_wrapper)
            }
        };

        //获取参数
        var dictionary = new myextend.Dictionary();
        dictionary.set("bingrenid", geturlparam("bingrenid"));
        dictionary.set("shenfenzh", geturlparam("shenfenzh"));
        dictionary.set("jigoudm", geturlparam("jigoudm"));
        dictionary.set("outcome", sharebase.getVal("tmpl_outcome", ctrls.win_emerprediagnosis_mod_wrapper));

        myextend.ajaxPost_simple(webglobal.services.GetOutComeTime, dictionary, web_list_callback, true);
    }
    function setSpecialEva(data, base) {
        if (base == null || base == undefined || data == null || data == undefined || data.info == null || data.info == undefined) return;
        base.setVal("tmpl_specialevaid", data.info.id);
        base.setVal("tmpl_specialeva", data.info.text);
    }
    function print() {
        require(["share_services"], function (a) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    a.print(getID(), data.info.type);
                }
            };

            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            dictionary.set("q", webglobal.enum_printtype.emerprediagnosis);
            dictionary.set("jigoudm", _req.jigoudm);
            myextend.ajaxPost_simple(webglobal.services.GetPrintType, dictionary, web_list_callback, true);
        });
    }
    return { show: show,
        GetOutComeTime: GetOutComeTime,
        setSpecialEva: setSpecialEva
    }
});

