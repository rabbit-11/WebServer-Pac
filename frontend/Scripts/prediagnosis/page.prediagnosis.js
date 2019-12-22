define(function () {
    var globalwrapper = null;
    var sharedata_info = null;
    var count_info = 0;
    var allcount_info = 0;

    var sharedata_input = null;
    var count_input = 0;
    var allcount_input = 0;


    var class_base = null;
    var class_share = null;

    //控件
    var page_config = {
        win_prediagnosis_mod_wrapper: "#win_prediagnosis_mod_wrapper",
        btn_prediagnosis_save: "#btn_prediagnosis_save",
        baseinfo_wrapper: "#baseinfo_wrapper",
        input_wrapper: "#input_wrapper",
        link_detailinfo: "#link_detailinfo",
        baseinfo_template: "#baseinfo_template",
        color_template: "#color_template",
        input_template: "#input_template",
        form_tr_wrapper_multifetal: "#form_tr_wrapper_multifetal_prediagnosis",
        form_td_chiefcomplaint_wrapper: "#form_td_chiefcomplaint_wrapper",
        btn_print: "#btn_prediagnosis_print",
        btn_prediagnosis_close: "#btn_prediagnosis_close",
        preg_wrapper: ".preg_wrapper",
        pred_wrapper: ".pred_wrapper",
        wrapper_button: ".wrapper_button"
    };
    function geturl() {
        var form = $(page_config.win_prediagnosis_mod_wrapper).parents("form");
        return form.attr("action");
    }
    function geturlparam(name) {
        var url = geturl();
        return myextend.getBaseUrlParam(name, url, true);
    }
    function using(callback) {
        require(["base_usercontrol", "share_services", "easyui", "locale", "web_global", 'jquery', "jextend", "common", "tmpl"], function (b, s) {
            class_base = b;
            class_share = s;
            if (callback != null && callback != undefined) {
                callback();
            }
        });
    }
    function show() {
        using(function () {
            $(function () {
                $.get(webglobal.templates.mod_prediagnosis, { stamp: Math.random() + 1 }, function (response) {
                    $(page_config.win_prediagnosis_mod_wrapper).append(response);

                    setwin("");

                    ReadData_Info();
                });
            });
        });
    }
    function ReadData_Info() {
        count_info = 0;
        allcount_info = 2;
        sharedata_info = null;
        ReadData(webglobal.services.GetOneGuaHaoXX, end_info);
        ReadData(webglobal.services.GetOnePregnantInfo, end_info);
    }
    function ReadData_Input() {
        count_input = 0;
        allcount_input = 2;
        sharedata_input = null;
        ReadData(webglobal.services.GetOnePreDiagnosis, end_input);
        ReadData(webglobal.services.QueryKcal, end_input);
    }
    function ReadData(url, callback) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                if (callback != undefined && callback != undefined) {
                    callback(data.info);
                }
            }
        };

        //获取参数
        var dictionary = new myextend.Dictionary();
        var _req = myrequest.getrequest(geturl());
        _req.todic(dictionary);
        myextend.ajaxPost_simple(url, dictionary, web_list_callback, true);
    }
    function end_info(data) {
        count_info++;
        sharedata_info = $.extend(true, sharedata_info, data);
        if (count_info == allcount_info) {
            SetInfo(sharedata_info);
            ReadData_Input();
        }
    }
    function end_input(data) {
        count_input++;
        sharedata_input = $.extend(true, sharedata_input, data);
        if (count_input == allcount_info) {
            SetInput($(page_config.input_wrapper), sharedata_input);
        }
    }

    function SetInfo(data) {
        SetOneGuaHaoXX($(page_config.baseinfo_wrapper), data);
        //查看详情
        var _req = myrequest.getrequest(geturl());
        _req.shenfenzh = data.zhengjianhm;
        _req.jiuzhenid = data.jiuzhenid;
        _req.bingrenid = data.bingrenid;
        _req.bingrenxm = data.xingming;
        _req.departmentcode = data.keshidm;
        _req.departmentname = data.keshimc;
        $(page_config.link_detailinfo).attr("href", _req.tourl(webglobal.pages.YUNCHANFDL, true));
    }
    function SetOneGuaHaoXX(wrapper, data) {
        if (data == null || data == undefined) return;
        var dataObj = [];
        dataObj.push(data);

        //template
        var baseinfo_template = $(page_config.baseinfo_template).html();
        $.template("myTemplate", baseinfo_template);
        var data_html = $.tmpl("myTemplate", dataObj);
        //render
        $(wrapper).append(data_html);

        //template
        var color_template = $(page_config.color_template).html();
        $.template("myTemplate1", color_template);
        //render
        $(wrapper).find(".highriskcolor_wrapper").html($.tmpl("myTemplate1", data.highrisk));
    }
    function SetInput(wrapper, data) {
        if (data == null || data == undefined) return;
        var dataObj = [];
        dataObj.push(data);

        //template
        var input_template = $(page_config.input_template).html();
        $.template("myTemplate", input_template);
        var data_html = $.tmpl("myTemplate", dataObj);
        globalwrapper = wrapper;
        //render
        $(wrapper).append(data_html);
        var mod = data.id > 0 && !isNaN(data.id) ? webglobal.enum_mod.edit : webglobal.enum_mod.add;
        class_base.drawcontrol($(wrapper), mod, true, prerender, afterrender);

        var multifetal = [];
        if (data.multifetal != null && data.multifetal != undefined)
            multifetal = JSON.parse(data.multifetal);
        loadmultifetal(mod, multifetal, $(page_config.form_tr_wrapper_multifetal));
    }

    function initstate() {
        var pid = getPregnantInfoID();
        var hasid = pid > 0 && !isNaN(pid);
        //保存
        EventUtil.bindclick($(page_config.btn_prediagnosis_save), save);
        //打印
        EventUtil.bindclick($(page_config.btn_print), savebuilt);
        //关闭
        EventUtil.bindclick($(page_config.btn_prediagnosis_close), myclose);

        SetColor($(page_config.baseinfo_wrapper));

        if (pid > 0) {
            $(globalwrapper).find("[data-group='group-builtkcal']").removeClass("hidden");
        } else {
            $(globalwrapper).find("[data-group='group-builtkcal']").addClass("hidden");
        }
        $(page_config.win_prediagnosis_mod_wrapper).find(page_config.wrapper_button).removeClass("hidden");
    }
    function SetColor(wrapper) {
        var data = {};
        data.pregnantinfoid = getPregnantInfoID();
        data.id = getID();
        data.kcalid = getKCalID();

        if (data.pregnantinfoid == undefined || data.pregnantinfoid == null || data.pregnantinfoid <= 0 || isNaN(data.pregnantinfoid)) {
            data.color_preg = "orange";
            data.text_preg = "未建小卡";
        }
        else if (data.kcalid == undefined || data.kcalid == null || data.kcalid <= 0 || isNaN(data.kcalid)) {
            data.color_preg = "orange";
            data.text_preg = "未建大卡";
        }
        else {
            data.color_preg = "green";
            data.text_preg = "已建大卡"; //data.filenumber == undefined || data.filenumber == null || data.filenumber == "" ? "已建大卡" : "已建大卡[" + data.filenumber + "]";
        }

        $(wrapper).find(page_config.preg_wrapper).removeClass("orange");
        $(wrapper).find(page_config.preg_wrapper).removeClass("green");
        $(wrapper).find(page_config.preg_wrapper).addClass(data.color_preg);
        $(wrapper).find(page_config.preg_wrapper).html(data.text_preg);

        if (data.id == undefined || data.id == null || data.id <= 0 || isNaN(data.id)) {
            data.color_pred = "orange";
            data.text_pred = "未预诊";
        }
        else {
            data.color_pred = "green";
            data.text_pred = "已预诊";
        }

        $(wrapper).find(page_config.pred_wrapper).removeClass("orange");
        $(wrapper).find(page_config.pred_wrapper).removeClass("green");
        $(wrapper).find(page_config.pred_wrapper).addClass(data.color_pred);
        $(wrapper).find(page_config.pred_wrapper).html(data.text_pred);
    }

    //渲染前
    function prerender() { }
    //渲染后
    function afterrender(wrapper) {
        initstate();
        autowidth(wrapper);
        bindmodel();
        //LeaveCheckUtil.leave($(".prediagnosis_wrapper:visible"), "离开前是否保存？", save, null, null);
    }
    function autowidth(wrapper) {
        $(document).ready(function () {
            //自适应宽度
            var w = $(wrapper).width() * 0.96;
            var td_w = $(wrapper).find(".form_td_widthflag").find("span").width();
            myextend.setCustomTable(parseInt(w, 10), parseInt(td_w, 10) <= 0 ? 74 : parseInt(td_w, 10), '.customtable');
        });
    }
    function loadmultifetal(mod, data, ctrl_wrapper) {
        require(["mod_multifetal_prediagnosis"], function (a) {
            var options = { btn_save: $(ctrl_wrapper).parents(".prediagnosis_wrapper:first").find("#btn_prediagnosis_save") };
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
    function bindmodel() {
        var _req = myrequest.getrequest();
        var _jobnumber = _req.userid;
        var wrapperid = $(globalwrapper).find("#form_td_remark_wrapper");
        var _stage = class_base.getattr($(wrapperid), "data-stage");
        var _type = class_base.getattr($(wrapperid), "data-type");

        class_share.loadmodel("tmpl_remark", wrapperid, _stage, _type, _jobnumber);
    }
    function getwin() {
        return $(page_config.win_prediagnosis_mod_wrapper).parents(".mywindow");
    }
    function setwin(val) {
        var win = getwin();
        if (win != null && win != undefined) {
            class_base.setattr(win, "data-back", val);
        }
    }
    //保存
    function save(sender, success_callback, e) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                TipUtil.ShowSuccess("保存成功");
                setID(data.info.id);
                class_base.reload(globalwrapper);

                setwin("saved");
                initstate();
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

        var d = class_base.getFormDic(globalwrapper, getID() <= 0 || isNaN(getID()));
        var _req = myrequest.getrequest(geturl());
        _req.todata(d);
        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(d));
        if (dataparam == "" || dataparam == undefined)
            return;
        myextend.ajaxPost(webglobal.services.SavePreDiagnosis, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
    }

    function getPregnantInfoID() {
        return parseInt(class_base.getVal("tmpl_pregnantinfoid", globalwrapper), 10);
    }
    function getID() {
        return parseInt(class_base.getVal("tmpl_id", globalwrapper), 10);
    }
    function setID(id) {
        return class_base.setVal("tmpl_id", id, globalwrapper);
    }
    function getKCalID() {
        return class_base.getVal("tmpl_builtkcal_id", globalwrapper);
    }
    function getNumber() {
        return class_base.getVal("tmpl_builtkcal_number", globalwrapper);
    }
    function print(id) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                class_share.print(id, data.info.type);
            }
        };

        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("q", webglobal.enum_printtype.builtkcal);
        dictionary.set("jigoudm", _req.jigoudm);
        myextend.ajaxPost_simple(webglobal.services.GetPrintType, dictionary, web_list_callback, true);
    }
    //建大卡
    function builtkcal(sender) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                TipUtil.ShowSuccess("建大卡成功");
                class_base.reload_reverse(globalwrapper, data.info, false);
                class_base.reload(globalwrapper);
                initstate();
            }
            else {
                if ((data.msg + "").indexOf("失败") != -1) {
                    $.messager.alert('错误', data.msg);
                }
                else {
                    TipUtil.ShowFailure(data.msg);
                }
            }
            var _isprint = class_base.getVal("tmpl_print", globalwrapper);
            if (_isprint == "1")
                print(data.info.builtkcal_id);
        };
        var web_list_bef_callback = function (data) {
            EventUtil.setVisible(sender, false);
        };
        var web_list_com_callback = function (data) {
            EventUtil.setVisible(sender, true);
        };
        var web_list_err_callback = function (data) { };
        //获取参数
        var _req = myrequest.getrequest(geturl());

        var dictionary = new myextend.Dictionary();
        _req.pid = getPregnantInfoID();
        _req.todic(dictionary);

        //建大卡号验证
        var _builtkcal_num_y = class_base.getVal("tmpl_builtkcal_num_y", globalwrapper);
        var _builtkcal_num_m = class_base.getVal("tmpl_builtkcal_num_m", globalwrapper);
        var _builtkcal_num_index = class_base.getVal("tmpl_builtkcal_num_index", globalwrapper);
        var ispass = true;
        var _max_num_y = parseInt(class_base.getattr(class_base.getCtrl(globalwrapper, "tmpl_builtkcal_num_y"), "maxlength"), 10);
        var _max_num_m = parseInt(class_base.getattr(class_base.getCtrl(globalwrapper, "tmpl_builtkcal_num_m"), "maxlength"), 10);
        var _max_num_index = parseInt(class_base.getattr(class_base.getCtrl(globalwrapper, "tmpl_builtkcal_num_index"), "maxlength"), 10);
        if (_max_num_y < 4||isNaN( _max_num_y)) _max_num_y = 4;
        if (_max_num_m < 2 || isNaN(_max_num_m)) _max_num_m = 2;
        if (_max_num_index < 3 || isNaN(_max_num_index)) _max_num_index = 3;
        ispass = ispass && (_builtkcal_num_y != null && _builtkcal_num_y != undefined && (_builtkcal_num_y + "").length == _max_num_y);
        ispass = ispass && (_builtkcal_num_m != null && _builtkcal_num_m != undefined && (_builtkcal_num_m + "").length == _max_num_m);
        ispass = ispass && (_builtkcal_num_index != null && _builtkcal_num_index != undefined && (_builtkcal_num_index + "").length == _max_num_index);

        var _isauto = class_base.getVal("tmpl_auto", globalwrapper) == "1";
        if (!ispass && !_isauto) {
            TipUtil.ShowFailure("请输入完整的档案号");
            return;
        }
        dictionary.set("builtkcal_num_y", _builtkcal_num_y);
        dictionary.set("builtkcal_num_m", _builtkcal_num_m);
        dictionary.set("builtkcal_num_index", _builtkcal_num_index);
        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));

        if (dataparam == "" || dataparam == undefined)
            return;
        myextend.ajaxPost(webglobal.services.BulitKcal, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
    }
    function bindkeydown() {
        PressUtil.bindkeydown($(page_config.input_wrapper), false, null);
    }
    function savebuilt(sender) {
        save(sender, function () { builtkcal(sender) }, null);
    }
    function saveclose(sender) {
        save(sender, closewin, null);
    }
    function myclose() {
        if (!LeaveCheckUtil.share_leave($(page_config.input_wrapper), "离开时前是否保存？", saveclose, null, closewin, class_base)) { }
    }

    function closewin() {
        var mywindow = $(page_config.win_prediagnosis_mod_wrapper).parents(".mywindow");
        if (mywindow != null && mywindow != undefined) {
            mywindow.window('close');
        }
    }
    return {
        show: show
    }
});

