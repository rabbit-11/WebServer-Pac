define(function () {
    var ctrl = {
        btn_multifetal: "#btn_multifetal",
        btn_chufang: "#btn_chufang",
        btn_bscan: "#btn_bscan",
        btn_examorder: "#btn_examorder",
        btn_laborder: "#btn_laborder",
        btn_highrisk: "#btn_highrisk",
        btn_save_top: "#btn_save_top",
        btn_print: "#btn_print",
        list_visitrecord_tbody_wrapper: "#list_visitrecord_tbody_wrapper",
        win_highrisk: "#win_highrisk",
        win_bscan: "#win_bscan",
        btn_deletevr: "#btn_deletevr",
        btn_add: "#btn_add",
        win_highriskreport: "#win_highriskreport",
        btn_highriskreport: "#btn_highriskreport",
        win_highriskreporthistory: "#win_highriskreporthistory",
        btn_diff: "#btn_diff",
        btn_refresh: "#btn_refresh"
    };

    var share_mod_onevisitrecord = null;
    var share_base = null;
    var share_service = null;
    function initstate() {
        EventUtil.showOrHide($(ctrl.btn_highrisk), false);
        EventUtil.showOrHide($(ctrl.btn_save_top), false);
        EventUtil.showOrHide($(ctrl.btn_multifetal), false);
        EventUtil.showOrHide($(ctrl.btn_print), false);
        EventUtil.showOrHide($(ctrl.btn_deletevr), false);
        EventUtil.showOrHide($(ctrl.btn_add), false);
        EventUtil.showOrHide($(ctrl.btn_highriskreport), false);
        EventUtil.showOrHide($(ctrl.btn_diff), false);
        EventUtil.showOrHide($(ctrl.btn_refresh), false);
        EventUtil.showOrHide($(ctrl.btn_bscan), false); 

        //多胎
        $(ctrl.btn_multifetal).unbind("click").on("click", function () {

            require(["mod_onevisitrecord", "mod_onevisitrecord_summary", "mod_onevisitrecord_detail", "base_usercontrol", "jextend", "jquery", "easyui"], function (mod_onevisitrecord, summary, detail, base) {
                var win = $("#win_multifetal");
                //多胎弹窗
                var baseurl = win.attr("data-url");
                baseurl = myextend.UrlUpdateParams(baseurl, "s", JSON.stringify(getMultifetal(mod_onevisitrecord, summary, detail, base)));
                win.attr("data-url", baseurl);
                base.showwindow(win);
            });
            return false;
        });
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

        //高危评估
        $(ctrl.btn_highrisk).unbind("click").on("click", function () {
            require(["mod_onevisitrecord", "mod_onevisitrecord_detail", "base_usercontrol", "jextend", "jquery", "easyui"], function (mod_onevisitrecord, detail, base) {
                var win = $(ctrl.win_highrisk);
                var baseurl = win.attr("data-url");
                baseurl = myextend.UrlUpdateParams(baseurl, "s", JSON.stringify(getHighRisk(mod_onevisitrecord, detail, base)), true);
                win.attr("data-url", baseurl);
                base.showwindow(win);
            });
            return false;
        });

        //保存
        $(ctrl.btn_save_top).unbind("click").on("click", function (sender) {
            require(["jquery", "mod_onevisitrecord"], function ($, a) {
                saveCurOpenedRow(sender.target);
            });
            return false;
        });
        //打印
        $(ctrl.btn_print).unbind("click").on("click", function (sender) {
            if (isChange_CurOpenedRow())
                saveCurOpenedRow(sender.target, print);
            else
                print();
            return false;
        });
        //删除
        $(ctrl.btn_deletevr).unbind("click").on("click", function (sender) {
            deletevr();
            return false;
        });
        //胎儿生长
        $(ctrl.btn_bscan).unbind("click").on("click", function () {
            require(["base_usercontrol", "jquery", "easyui"], function (a) {
                a.showwindow($(ctrl.win_bscan));
            });
            return false;
        });
        $(ctrl.btn_add).unbind("click").on("click", function () {
            bind(false, true);
        });
        //危重报告单
        $(ctrl.btn_highriskreport).unbind("click").on("click", function () {
            showHighRiskReport_Share(webglobal.enum_rc_ptype.reportcard_highrisk_more, ctrl.win_highriskreporthistory);
            return false;
        });
        //刷新
        $(ctrl.btn_refresh).unbind("click").on("click", function (sender) {
            refresh();
            return false;
        });
    }
    function bind(autoadd, mustadd) {
        initstate();
        require(["jquery", "common", "jextend", "web_global"], function () {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                var arr = [];
                if (data.result == webglobal.enum_const.service_result_success) {
                    arr = data.info;
                }
                if ((mustadd || autoadd && (data.attr != null && data.attr != undefined && (data.attr.todayid <= 0 || isNaN(data.attr.todayid))))) {
                    arr.unshift({ "id": Math.random() * -1, "canedit": true });
                }
                loaddata(arr);
            };

            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            dictionary.set("bingrenid", _req.bingrenid);
            dictionary.set("shenfenzh", _req.shenfenzh);
            dictionary.set("jobnumber", _req.jobnumber);
            dictionary.set("jigoudm", _req.jigoudm);
            dictionary.set("pid", _req.pid);

            myextend.ajaxPost_simple(webglobal.services.GetVisitRecordList, dictionary, web_list_callback, true);
        });
    }
    function loaddata(data) {
        require(["mod_onevisitrecord", "base_usercontrol", "share_services", "tmpl", "jextend", "easyui", "web_global", 'jquery'], function (mod_onevisitrecord, b, s) {
            share_mod_onevisitrecord = mod_onevisitrecord;
            share_base = b;
            share_service = s;
            if (data == null || data == undefined || data.length == 0) {
                $.get(webglobal.templates.norecord, { stamp: Math.random() + 1 }, function (res) {
                    $(ctrl.list_visitrecord_tbody_wrapper).find("td").html(res);
                });
                return;
            }
            $.each(data, function (i, item) {
                if (item != null && item != undefined) {
                    item.index = i;
                    item.rowclass = " " + (i % 2 == 0 ? "tr_even" : "tr_odd");
                }
            });

            var wrapper = $(ctrl.list_visitrecord_tbody_wrapper);
            $.get(webglobal.templates.one_visitrecord, { stamp: Math.random() + 1 }, function (template) {
                //template
                $.template("myTemplate", template);
                var newrow = wrapper.html($.tmpl("myTemplate", data));
                var hasopened = false;
                $.each(data, function (index, item) {
                    if (item != null) {
                        var row = $(wrapper).find("[data-value='" + item.id + "']");
                        var isedit = item.istoday;
                        var isadd = item.id <= 0 || isNaN(item.id);
                        var isopen = ((isedit && item.canedit) || isadd) && !hasopened;
                        var mod = item.canedit && isopen ? (!isadd ? webglobal.enum_mod.edit : webglobal.enum_mod.add) : webglobal.enum_mod.view;
                        if (isopen) hasopened = true;
                        mod_onevisitrecord.show(item, mod, row, isopen);
                    }
                });
            });
            saveCache();
        });
    }
    function autowidth() {
        $(ctrl.list_visitrecord_tbody_wrapper).find("tr.form_tr_title").each(function (index, item) {
            require(["mod_onevisitrecord"], function (mod_onevisitrecord) {
                mod_onevisitrecord.autowidth($(item));
            });
        });
    }
    function saveCurOpenedRow(sender, callback) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            require(["mod_onevisitrecord"], function (mod_onevisitrecord) {
                mod_onevisitrecord.save_byrow($(row), callback, sender, null);
            });
        }
    }
    function save_CurOpenedRow() {
        saveCurOpenedRow(null);
    }
    function isChange_CurOpenedRow() {
        var row = getCurRow();
        var canedit = share_base.getattr(row, "data-canedit") == "true";
        if (row != null && row != undefined && canedit) {
            return share_mod_onevisitrecord.isChange_CurOpenedRow($(row), share_base);
        }
        return false;
    }
    function getCurRow() {
        var curitem = null;
        $(ctrl.list_visitrecord_tbody_wrapper).find("tr.form_tr_title.open").each(function (index, item) {
            curitem = item;
            return;
        });
        return curitem;
    }
    function getCurRowDataID() {
        var curitem = getCurRow();
        if (curitem == null) return -1;
        var t = $(curitem).attr("data-value");
        var i = parseInt(t, 10);
        if (i <= 0 || isNaN(i)) return -1;
        return i;
    }
    function getCurRowByDataID(id) {
        var curitem = null;
        $(ctrl.list_visitrecord_tbody_wrapper).find("tr.form_tr_title").each(function (index, item) {
            var t = $(item).attr("data-value");
            var i = parseInt(t, 10);
            if (i == id) {
                curitem = item;
                return;
            }
        });
        return curitem;
    }
    function bindkeydown() {
        require(["common", "jquery"], function () {
            PressUtil.bindkeydown($(ctrl.list_visitrecord_tbody_wrapper), true, { btn_save: $(ctrl.btn_save_top) });
        });
    }
    function getMultifetal(mod_onevisitrecord, summary, detail, base) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            return mod_onevisitrecord.getMultifetal($(row), summary, detail, base);
        }
        return null;
    }
    function setMultifetal(data) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            require(["mod_onevisitrecord"], function (mod_onevisitrecord) {
                mod_onevisitrecord.setMultifetal($(row), data);
            });
        }
    }

    function getHighRisk(mod_onevisitrecord, detail, base) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            return mod_onevisitrecord.getHighRisk($(row), detail, base);
        }
        return null;
    }
    function setHighRisk(data, callback) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            require(["mod_onevisitrecord"], function (mod_onevisitrecord) {
                mod_onevisitrecord.setHighRisk($(row), data, callback);
            });
        }
    }
    function setLabOrder(data) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            require(["mod_onevisitrecord"], function (mod_onevisitrecord) {
                mod_onevisitrecord.setLabOrder($(row), data);
            });
        }
    }
    function setExamOrder(data) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            require(["mod_onevisitrecord"], function (mod_onevisitrecord) {
                mod_onevisitrecord.setExamOrder($(row), data);
            });
        }
    }
    function getDiagnosis(mod_onevisitrecord, detail, base) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            return mod_onevisitrecord.getDiagnosis($(row), detail, base);
        }
        return null;
    }
    function setDiagnosis(data) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            require(["mod_onevisitrecord"], function (mod_onevisitrecord) {
                mod_onevisitrecord.setDiagnosis($(row), data);
            });
        }
    }
    function change() {
        require(["base_usercontrol", "jquery", "common"], function (base) {
            var currow = getCurRow();
            var canedit = base.getattr(currow, "data-canedit") == "true";
            var dataid = base.getattr(currow, "data-value");
            var vs = currow != null && currow != undefined;
            var id = parseInt(dataid, 10);
            var hasid = id > 0 && !isNaN(id);
            var _req = myrequest.getrequest();

            EventUtil.showOrHide($(ctrl.btn_highriskreport), canedit && vs);
            EventUtil.showOrHide($(ctrl.btn_highrisk), canedit && vs);
            EventUtil.showOrHide($(ctrl.btn_save_top), canedit && vs);
            EventUtil.showOrHide($(ctrl.btn_multifetal), canedit && vs);
            EventUtil.showOrHide($(ctrl.btn_print), hasid && vs);
            EventUtil.showOrHide($(ctrl.btn_diff), hasid && vs);
            EventUtil.showOrHide($(ctrl.btn_deletevr), hasid && vs && !_req.isInWhite() && _req.isCanEdit());
            EventUtil.showOrHide($(ctrl.btn_add), !_req.isInWhite() && _req.isCanEdit());
            EventUtil.showOrHide($(ctrl.btn_refresh), canedit && vs);
            EventUtil.showOrHide($(ctrl.btn_bscan), !_req.isInWhite() && _req.isCanEdit());

            //痕迹
            var btn_diff = $(ctrl.btn_diff)
            if (!myextend.isNull(btn_diff)) {
                var baseurl = webglobal.pages.Page_DiffList;
                var _req = myrequest.getrequest();
                baseurl = myextend.UrlUpdateParams(baseurl, "attachedid", getCurRowDataID());
                baseurl = myextend.UrlUpdateParams(baseurl, "attachedtype", webglobal.enum_difftype.visitrecord);
                baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", _req.jigoudm);
                btn_diff.attr("href", baseurl);
            }
        });
    }
    function print() {
        require(["share_services"], function (a) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    a.print(getCurRowDataID(), data.info.type);
                }
            };

            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            dictionary.set("q", webglobal.enum_printtype.visitrecord);
            dictionary.set("jigoudm", _req.jigoudm);
            myextend.ajaxPost_simple(webglobal.services.GetPrintType, dictionary, web_list_callback, true);
        });
    }
    function getVisitDate(mod_onevisitrecord, summary, base) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            return mod_onevisitrecord.getVisitDate($(row), summary, base);
        }
        return null;
    }
    /*检查时间与预产期联动*/
    function linkage_Dateofprenatal(dateofprenatal) {
        require(["mod_onevisitrecord", "mod_onevisitrecord_summary", "mod_onevisitrecord_detail", "base_usercontrol"], function (mod_onevisitrecord, summary, detail, base) {
            var lastmenstrualperiod = null;
            var visitdate = getVisitDate(mod_onevisitrecord, summary, base);

            var weeks = myextend.getpregweekorday(lastmenstrualperiod, dateofprenatal, visitdate, 2, 1);
            var days = myextend.getpregweekorday(lastmenstrualperiod, dateofprenatal, visitdate, 2, 2);

            if (!isNaN(weeks) && !isNaN(days) && weeks > 0) {
                var row = getCurRow();
                var data = { "checkweek": weeks, "checkday": days };
                if (row != null && row != undefined) {
                    mod_onevisitrecord.linkage_Dateofprenatal($(row), base, data);
                }
            }
        });
    }
    function deletevr() {
        var id = getCurRowDataID();
        if (id <= 0 || isNaN(id)) {
            $.messager.alert('错误', "请先选中记录");
            return;
        }

        //提示
        $.messager.confirm('提示', "确认删除 所选 产检记录？", function (r) {
            if (r) {
                do_deletevr(id);
            }
        });
    }
    function do_deletevr(id) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                var _req = myrequest.getrequest();
                bind(!_req.isInWhite() && _req.isCanEdit(), false);
                require(["header"], function (a) { a.show(); });
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
        myextend.ajaxPost(webglobal.services.DelVisitRecord, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
    }
    function showHighRiskReport(ptype) {
        showHighRiskReport_Share(ptype, ctrl.win_highriskreport);
    }
    function showHighRiskReport_Share(ptype, winname) {
        require(["base_usercontrol", "easyui"], function (a) {
            var win = $(winname); //父页面控件
            var baseurl = webglobal.pages.RC_YUNCHANFDL;
            baseurl = myextend.UrlUpdateParams(baseurl, "ptype", "'" + ptype + "'", true);
            //win.attr("data-transto", baseurl);
            var _req = myrequest.getrequest();
            //_req.pid=webglobal.enum_rc_ptype.reportcard_highrisk_simple;

            baseurl = _req.tourl(baseurl, true);

            var iframeurl = webglobal.pages.Page_Iframe;
            baseurl = myextend.UrlUpdateParams(iframeurl, "url", "'" + baseurl + "'", true);

            win.attr("data-url", baseurl);
            a.showwindow(win);
        });
    }

    //实时缓存
    function ischange() {
        return isChange_CurOpenedRow();
    }
    function guiddata() {
        return share_mod_onevisitrecord.guiddata(getCurRow(), share_base);
    }
    function saveCache() {
        var enum_cachetype = webglobal.enum_cachetype.visitrecord;
        if (enum_cachetype == null || enum_cachetype == undefined) return;
        require(["thread"], function (a) {
            Concurrent.Thread.create(share_service.threadCacheRecord, enum_cachetype, ischange, guiddata, share_service.addCacheRecord);

        });
    }
    //刷新实时信息
    function refresh() {
        require(["jquery", "common", "jextend", "web_global"], function () {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    require(["mod_onevisitrecord"], function (mod_onevisitrecord) {
                        mod_onevisitrecord.refesh(getCurRow(), data.info);
                        TipUtil.ShowMsg("完成刷新");
                    });
                }
            };

            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            _req.todic(dictionary);

            myextend.ajaxPost_simple(webglobal.services.GetVisitRecord_RealTimeData, dictionary, web_list_callback, true);
        });
    }
    return {
        bind: bind,
        autowidth: autowidth,
        setMultifetal: setMultifetal,
        setHighRisk: setHighRisk,
        setDiagnosis: setDiagnosis,
        bindkeydown: bindkeydown,
        change: change,
        getCurRowByDataID: getCurRowByDataID,
        isChange_CurOpenedRow: isChange_CurOpenedRow,
        save_CurOpenedRow: save_CurOpenedRow,
        setLabOrder: setLabOrder,
        setExamOrder: setExamOrder,
        getVisitDate: getVisitDate,
        linkage_Dateofprenatal: linkage_Dateofprenatal,
        showHighRiskReport: showHighRiskReport,
        getCurRow: getCurRow
    }
}); 
    