define(function () {
    var globalwrapper = null;
    var globalmod = null;
    var mydia = null;
    var dia_class = null;
    var base = null;
    var share = null;
    var ctrl = {
        btn_save: "#btn_save",
        btn_print: "#btn_print",
        btn_chufang: "#btn_chufang",
        btn_examorder: "#btn_examorder",
        btn_laborder: "#btn_laborder",
        btn_deletevr: "#btn_deletevr",
        btn_diff: "#btn_diff",
        btn_refresh: "#btn_refresh"
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
    function setID(id) {
        var t = getCtrl("[data-id='tmpl_id']");
        if (t != null && t != undefined) {
            t.val(id);
        }
    }
    function reload() {
        var id = parseInt(getID(), 10);
        var hasfile = id > 0;
        var _req = myrequest.getrequest();
        //保存
        var btn_save = getCtrl(ctrl.btn_save);
        EventUtil.showOrHide(btn_save, globalmod != webglobal.enum_mod.view);
        EventUtil.bindclick(btn_save, save);
        //打印
        var btn_print = getCtrl(ctrl.btn_print);
        EventUtil.showOrHide(btn_print, hasfile);
        EventUtil.bindclick(btn_print, print);
        //删除
        var btn_deletevr = getCtrl(ctrl.btn_deletevr);
        EventUtil.showOrHide(btn_deletevr, hasfile && _req.isCanEdit());
        EventUtil.bindclick(btn_deletevr, deletevr);
        //刷新
        var btn_refresh = getCtrl(ctrl.btn_refresh);
        EventUtil.showOrHide(btn_refresh,  globalmod != webglobal.enum_mod.view && _req.isCanEdit());
        EventUtil.bindclick(btn_refresh, refresh);
        //痕迹
        var btn_diff = getCtrl(ctrl.btn_diff);
        EventUtil.showOrHide(btn_diff, hasfile);
        if (!myextend.isNull(btn_diff)) {
            var baseurl = webglobal.pages.Page_DiffList;
            var _req = myrequest.getrequest();
            baseurl = myextend.UrlUpdateParams(baseurl, "attachedid", id);
            baseurl = myextend.UrlUpdateParams(baseurl, "attachedtype", webglobal.enum_difftype.postnatalrecord);
            baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", _req.jigoudm);
            btn_diff.attr("href", baseurl);
        }
    }
    //初始化界面
    function initstate() {
        autowidth($(globalwrapper));
        $(".panel-htop").remove();
        reload();
        //诊断
        dia_class.init(mydia, base, share);
        //处方
        $(ctrl.btn_chufang).unbind("click").on("click", function () {
            require(["base_usercontrol", "jquery", "easyui"], function (a) {
                a.showwindow($("#win_chufang"));
            });
            return false;
        });
        //检查
        $(ctrl.btn_examorder).unbind("click").on("click", function () {
            require(["base_usercontrol", "jquery", "easyui"], function (a) {
                a.showwindow($("#win_examorder"));
            });
            return false;
        });
        //检验
        $(ctrl.btn_laborder).unbind("click").on("click", function () {
            require(["base_usercontrol", "easyui"], function (a) {
                a.showwindow($("#win_laborder"));
            });
            return false;
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
        dictionary.set("q", webglobal.enum_printtype.postnatalvisitrecord);
        dictionary.set("jigoudm", _req.jigoudm);
        myextend.ajaxPost_simple(webglobal.services.GetPrintType, dictionary, web_list_callback, true);
    }
    //数据载入
    function loaddata(data) {
        if (globalwrapper == null || globalwrapper == undefined) return;
        $.get(webglobal.templates.mod_postnatalrecord, { stamp: Math.random() + 1 }, function (template) {
            var arr = [];
            arr.push(data);
            //template
            $.template("myTemplate", template);
            $(globalwrapper).html($.tmpl("myTemplate", arr));
            initstate();
            require(["base_usercontrol"], function (a) {
                a.drawcontrol($(globalwrapper), globalmod, true, prerender, afterrender);
            });
        });
    }
    //新增
    function loadadd(data) {
        globalmod = webglobal.enum_mod.add;
        loaddata(data);
    }
    //编辑
    function loadedit(data) {
        globalmod = webglobal.enum_mod.edit;
        loaddata(data);
    }
    //只读
    function loadview(data) {
        globalmod = webglobal.enum_mod.view;
        loaddata(data);
    }
    //渲染前
    function prerender() {
        MaskUtil.mask($(globalwrapper), "正在加载，请稍候...");
    }
    //渲染后
    function afterrender() {
        MaskUtil.unmask($(globalwrapper));
        bindkeydown();
        autowidth();

        if (globalmod == webglobal.enum_mod.add) {
            getPredignosis($(globalwrapper));
        }
        if (globalmod != webglobal.enum_mod.view) {
            LeaveCheckUtil.leave("form_wrapper", "离开前是否保存？", save, null, clearCache);
            saveCache();
        }
        if (globalmod == webglobal.enum_mod.edit) {        
            dia_class.refresh(globalwrapper, save);
        }
        EventUtil.HideOnView(globalwrapper, ".btn_diagnosis_detail", globalmod != webglobal.enum_mod.view);
        EventUtil.HideOnView(globalwrapper, ".btn_laborder_import", globalmod != webglobal.enum_mod.view);
        EventUtil.HideOnView(globalwrapper, ".btn_examorder_import", globalmod != webglobal.enum_mod.view);
        //检验导入
        $(globalwrapper).find(".btn_laborder_import").unbind("click").on("click", function () {
            require(["base_usercontrol", "easyui"], function (a) {
                a.showwindow($("#win_laborder_import"));
            });
            return false;
        });
        //检查导入
        $(globalwrapper).find(".btn_examorder_import").unbind("click").on("click", function () {
            require(["base_usercontrol", "easyui"], function (a) {
                a.showwindow($("#win_examorder_import"));
            });
            return false;
        });
    }
    function autowidth() {
        require(["jextend"], function () {
            $(document).ready(function () {
                //自适应宽度
                var w = $(globalwrapper).width() * 0.96;
                var td_w = $(globalwrapper).find(".form_td_widthflag").find("span").width();
                myextend.setCustomTable(parseInt(w, 10), parseInt(td_w, 10) <= 0 ? 74 : parseInt(td_w, 10), '.customtable');
            });
        });
    }
    function bindkeydown() {
        require(["common", "jquery"], function () {
            PressUtil.bindkeydown($(globalwrapper), true, { btn_save: $(ctrl.btn_save) });
        });
    }
    function show(ctrl_wrapper, data, mod) {

        require(["share_diagnosis", "base_usercontrol", "share_services", "tmpl", 'jquery', "jextend", "easyui", "common"], function (dia, b, s) {
            dia_class = dia;
            base = b;
            share = s;
            if (myextend.isNull(ctrl_wrapper)) return;
            globalwrapper = ctrl_wrapper;
            globalmod = mod;
            mydia = {
                tmpl_maindiagnosis: "tmpl_maindiagnosis",
                tmpl_diagnosisinfo: "tmpl_diagnosisinfo",
                tmpl_secondarydiagnosis: "tmpl_secondarydiagnosis",
                tmpl_diagnosisdic: "tmpl_diagnosisdic",
                wrapper: globalwrapper,
                btn: ".btn_diagnosis_detail",
                win: "#win_diagnosis"
            };
            switch (mod) {
                case webglobal.enum_mod.add:
                    loadadd(data);
                    break;
                case webglobal.enum_mod.edit:
                    loadedit(data);
                    break;
                case webglobal.enum_mod.view:
                    loadview(data);
                    break;
            }
        });
    }
    //预诊
    function getPredignosis(ctrl_wrapper) {
        require(["share_services", "base_usercontrol"], function (share, base) {
            share.getPreDiagnosis(ctrl_wrapper, function (ctrl_wrapper, data) {
                if (data == null || data == undefined) return;
                if (data.sbp > 0 && !isNaN(data.sbp)) {
                    base.setVal("tmpl_constriction", data.sbp, ctrl_wrapper);
                }
                if (data.dbp > 0 && !isNaN(data.dbp)) {
                    base.setVal("tmpl_diastolic", data.dbp, ctrl_wrapper);
                }
                if (data.weight > 0 && !isNaN(data.weight)) {
                    base.setVal("tmpl_weight", data.weight, ctrl_wrapper);
                }
                if (data.heartrate > 0 && !isNaN(data.heartrate)) {
                    base.setVal("tmpl_pulse", data.heartrate, ctrl_wrapper);
                }
                if (data.temperature > 0 && !isNaN(data.temperature)) {
                    base.setVal("tmpl_temperature", data.temperature, ctrl_wrapper);
                }
            });
        });
    }
    //保存
    function save(sender) {
        require(["page_postnatalrecord"], function (page) {

            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    TipUtil.ShowSuccess("保存成功");
                    setID(data.info.id);
                    //initstate();
                    reload();
                    page.reload(false, false);
                    base.reload(globalwrapper);
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

            var d = getDiagnosis();
            base.setVal("tmpl_diagnosisdic", JSON.stringify(d), globalwrapper);

            var data = guiddata();
            if (data == null || data == undefined) return;

            var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(data));
            if (dataparam == "" || dataparam == undefined)
                return;

            myextend.ajaxPost(webglobal.services.SavePostnaltalVisitRecord, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);

        });
    }
    function setDiagnosis(data) {
        dia_class.set(data);
    }
    function getDiagnosis() {
        return dia_class.get();
    }
    function deletevr() {
        var id = getID();
        if (id <= 0 || isNaN(id)) {
            $.messager.alert('错误', "请先选中行");
            return;
        }

        //提示
        $.messager.confirm('提示', "确认删除 所选 产后记录？", function (r) {
            if (r) {
                do_deletevr(id);
            }
        });
    }
    function do_deletevr(id) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                require(["page_postnatalrecord"], function (page) {
                    page.reload(true, true);
                });
            }
            else {
                $.messager.alert('提示', data.msg);
            }
        };
        var web_list_bef_callback = function (data) {
            MaskUtil.mask($(ctrl.list_visitrecord_tbody_wrapper), "正在删除...");
        };
        var web_list_com_callback = function (data) {
            MaskUtil.unmask($(ctrl.list_visitrecord_tbody_wrapper));
        };
        var web_list_err_callback = function (data) { };

        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("id", id);
        dictionary.set("jobnumber", _req.jobnumber);

        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
        if (dataparam == "" || dataparam == undefined)
            return;
        myextend.ajaxPost(webglobal.services.DelPostnatal42dayRecord, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
    }
    function childbirth_selected(date) {
        var ctrl = "tmpl_checkdate";
        var checkdate = base.getVal(ctrl);
        if (myextend.isNull(checkdate) || myextend.isNull(date)) return;

        var TotalMilliseconds = myextend.myparser(checkdate) - date;
        if (TotalMilliseconds < 0 || TotalMilliseconds == NaN)
            return;
        var timespan = {};
        var days = parseInt(TotalMilliseconds / 1000 / 60 / 60 / 24, 10);

        if (!isNaN(days) && days > 0) {
            base.setVal("tmpl_postnataldays", days);
            var chiefcomplaint = base.getVal("tmpl_chiefcomplaint");
            var presenthistory = base.getVal("tmpl_presenthistory");

//            var i_yun = chiefcomplaint.indexOf("产后");
//            var i_zhou = chiefcomplaint.indexOf("天，要求随访");
//            if (i_yun != -1 && i_zhou - i_yun > 0) {
//                var oldstr = chiefcomplaint.substring(i_yun, i_zhou);
//                base.setVal("tmpl_chiefcomplaint", chiefcomplaint.replace(oldstr, "产后" + days));
//            }
//            else {
//                base.setVal("tmpl_chiefcomplaint", "产后" + days + "天，要求随访");
//            }

//            var i_yun1 = presenthistory.indexOf("产后");
//            var i_zhou1 = presenthistory.indexOf("天");
//            if (i_yun1 != -1 && i_zhou1 - i_yun1 > 0) {
//                var oldstr1 = presenthistory.substring(0, i_zhou1);
//                base.setVal("tmpl_presenthistory", presenthistory.replace(oldstr1, "产后" + days));
//            }
//            else {
//                base.setVal("tmpl_presenthistory", "产后" + days + "天");
//            }


            var data = { "checkday": days };
            base.setVal("tmpl_chiefcomplaint", refresh_day(data, base.getVal("tmpl_chiefcomplaint", globalwrapper)), globalwrapper);
            base.setVal("tmpl_presenthistory", refresh_day(data, base.getVal("tmpl_presenthistory", globalwrapper)), globalwrapper);
            
            var t = getDiagnosis()
            $.map(t, function (item) {
                if (item.t + "" == "1") {
                    item.i = refresh_day(data, item.i);
                }
            });
            setDiagnosis(t); 
        }
    } 
    function refresh_day(data, info) {
        var days = data.checkday;
        var _info = info + "";
        _info = _info.replace(/产后([\w\W]*)天/, "产后" + days + "天");
        return _info;
    }
    function setLabOrder(data) {
        if (data != null && data != undefined) {
            require(["jextend"], function () {
                var s = base.getVal("tmpl_othercommonexam", globalwrapper);
                //var news = "检验：" + data;
                //base.setVal("tmpl_othercommonexam", s == "" || s == null || s == undefined ? news : s + "\r\n" + news, globalwrapper);

                base.setVal("tmpl_othercommonexam", s == "" || s == null || s == undefined ? data : s + "\r\n" + data, globalwrapper);
            });
        }
    }
    function setExamOrder(data) {
        if (data != null && data != undefined) {
            require(["jextend"], function () {
                var s = base.getVal("tmpl_othercommonexam", globalwrapper);

                base.setVal("tmpl_othercommonexam", s == "" || s == null || s == undefined ? data : s + "\r\n" + data, globalwrapper);
                //var news = "检查：" + data;
                //base.setVal("tmpl_othercommonexam", s == "" || s == null || s == undefined ? news : s + "\r\n" + news, globalwrapper);
            });
        }
    }
    //实时缓存 
    function ischange() {
        return base.isChange($(globalwrapper));
    }
    function guiddata() {
        var data = base.getFormDic(globalwrapper, globalmod == webglobal.enum_mod.add);
        if (data == null || data == undefined) data = {};
        var _req = myrequest.getrequest();
        //        data.jigoudm = _req.jigoudm;
        //        data.doctorname = _req.username;
        _req.todata(data);
        return data;
    }
    function saveCache() {
        var enum_cachetype = webglobal.enum_cachetype.postnatalrecord;
        if (enum_cachetype == null || enum_cachetype == undefined) return;
        require(["thread"], function (a) {
            Concurrent.Thread.create(share.threadCacheRecord, enum_cachetype, ischange, guiddata, share.addCacheRecord);
        });
    }
    function clearCache(callback) {
        share.clearCacheRecord(webglobal.enum_cachetype.postnatalrecord, callback);
    }

    //刷新实时信息
    function refresh() {
        require(["jquery", "common", "jextend", "web_global"], function () {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    base.reload_reverse(globalwrapper, data.info);
                    TipUtil.ShowMsg("完成刷新");
                }
            };

            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            _req.todic(dictionary);

            myextend.ajaxPost_simple(webglobal.services.GetPostnatal42dayRecord_RealTimeData, dictionary, web_list_callback, true);
        });
    }
    return {
        show: show,
        setDiagnosis: setDiagnosis,
        childbirth_selected: childbirth_selected,
        setLabOrder: setLabOrder,
        setExamOrder: setExamOrder
    }
});
