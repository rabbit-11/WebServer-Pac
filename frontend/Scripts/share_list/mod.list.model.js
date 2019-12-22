define(function () {
    var global_config = {
        data: null,
        btn_chufang: null,
        btn_examorder: null,
        btn_laborder: null,
        btn_weightheight: null,
        btn_save_top: null,
        btn_print: null,
        list_model_tbody_wrapper: null,
        btn_deletevr: null,
        btn_add: null,
        sr_list: null,
        sr_delete: null,
        sr_printtype: null,
        enum_printtype: null,
        template: null,
        event_initstate: null,
        event_change: null,
        win_chufang: null,
        win_examorder: null,
        win_laborder: null,
        win_weightheight: null,
        cf_onemodel: {
            sr_empty: [],
            sr_getone: null,
            sr_save: null,
            event_save: null,
            cf_detail: {
                diagnosis: {
                    tmpl_maindiagnosis: null,
                    tmpl_diagnosisinfo: null,
                    tmpl_secondarydiagnosis: null,
                    tmpl_diagnosisdic: null,
                    wrapper: null,
                    btn: null,
                    win: null
                },
                btn_save: null,
                list_wrapper: null,
                btn_examorder_import: null,
                btn_diagnosis_detail: null,
                btn_laborder_import: null,
                //                form_td_chiefcomplaint_wrapper: null,
                //                form_td_guide_wrapper: null,
                //                form_td_suggestion_wrapper: null,
                //                form_td_presenthistory_wrapper: null,
                //                tmpl_chiefcomplaint: null,
                //                tmpl_suggestion: null,
                //                tmpl_guide: null,
                //                tmpl_presenthistory: null,
                win_laborder_import: null,
                win_examorder_import: null,
                list_model_tbody_wrapper: null,
                table_wrapper: null,
                tmpl_guide: null,
                //                tmpl_othercommonexam: null,
                //tmpl_diagnosisdic: null,
                template: null,
                sr_defaultguide: null,
                data: null,
                enum_cachetype: null
            },
            cf_summary: { template: null },
            list_model_wrapper: null
        },
        enum_cachetype: null
    };

    var mod_onemodel = null;
    var class_share = null;
    var class_base = null;

    function using(callback) {
        require(["mod_onemodel", "share_services", "base_usercontrol", "tmpl", "jextend", "easyui", "web_global", 'jquery'], function (m, s, b) {
            mod_onemodel = m;
            class_base = b;
            class_share = s;

            if (callback != null && callback != undefined) {
                callback();
            }
        });
    }

    function initstate() {
        EventUtil.showOrHide($(global_config.btn_save_top), false);
        EventUtil.showOrHide($(global_config.btn_print), false);
        EventUtil.showOrHide($(global_config.btn_deletevr), false);
        EventUtil.showOrHide($(global_config.btn_add), false);

        //处方
        $(global_config.btn_chufang).unbind("click").on("click", function () {
            class_base.showwindow($(global_config.win_chufang));
            return false;
        });
        //检查
        $(global_config.btn_examorder).unbind("click").on("click", function () {
            class_base.showwindow($(global_config.win_examorder));
            return false;
        });
        //检验
        $(global_config.btn_laborder).unbind("click").on("click", function () {
            class_base.showwindow($(global_config.win_laborder));
            return false;
        });
        //身长体重图
        $(global_config.btn_weightheight).unbind("click").on("click", function () {
            class_base.showwindow($(global_config.win_weightheight));
            return false;
        });
        //保存
        $(global_config.btn_save_top).unbind("click").on("click", function (sender) {
            saveCurOpenedRow(sender.target);
            return false;
        });
        //打印
        $(global_config.btn_print).unbind("click").on("click", function (sender) {
            print();
            return false;
        });
        //删除
        $(global_config.btn_deletevr).unbind("click").on("click", function (sender) {
            deletevr();
            return false;
        });
        //新增
        $(global_config.btn_add).unbind("click").on("click", function (sender) {
            addvr();
            return false;
        });
        if (global_config.event_initstate != null && global_config.event_initstate != undefined) {
            global_config.event_initstate();
        }
    }
    function bind(autoadd, mustadd, options) {
        using(function () {
            global_config = options;

            initstate();
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
            _req.todic(dictionary);
            var mydic = global_config.data;
            if (mydic != null && mydic != undefined) {
                $.each(mydic, function (i, item) {
                    dictionary.set(i, item);
                });
            }
            myextend.ajaxPost_simple(global_config.sr_list, dictionary, web_list_callback, true);
          
        });
    }
    function loaddata(data) {
        if (data == null || data == undefined || data.length == 0) {
            $.get(webglobal.templates.norecord, { stamp: Math.random() + 1 }, function (res) {
                $(global_config.list_model_tbody_wrapper).find("td").html(res);
            });
            return;
        }
        $.each(data, function (i, item) {
            if (item != null && item != undefined) {
                item.index = i;
                item.rowclass = " " + (i % 2 == 0 ? "tr_even" : "tr_odd");
            }
        });

        var wrapper = $(global_config.list_model_tbody_wrapper);
        $.get(global_config.template, { stamp: Math.random() + 1 }, function (template) {
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
                    mod_onemodel.show(item, mod, row, isopen, global_config.cf_onemodel);
                }
            });
        });
        saveCache();
    }
    function autowidth() {
        $(global_config.list_model_tbody_wrapper).find("tr.form_tr_title").each(function (index, item) {
            mod_onemodel.autowidth($(item));
        });
    }
    function saveCurOpenedRow(sender) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            mod_onemodel.save_byrow($(row), global_config.cf_onemodel.event_save, sender, null);
        }
    }

    function save_CurOpenedRow() {
        saveCurOpenedRow(null);
    }
    function isChange_CurOpenedRow() {
        var row = getCurRow();
        var canedit = class_base.getattr(row, "data-canedit") == "true";
        if (row != null && row != undefined && canedit) {
            return mod_onemodel.isChange_CurOpenedRow($(row), class_base);
        }
        return false;
    }
    function getCurRow() {
        var curitem = null;
        $(global_config.list_model_tbody_wrapper).find("tr.form_tr_title.open").each(function (index, item) {
            curitem = item;
            return;
        });
        return curitem;
    }
    function getCurRowDetail() {
        return mod_onemodel.getDetail($(getCurRow()));
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
        $(global_config.list_model_tbody_wrapper).find("tr.form_tr_title").each(function (index, item) {
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
        PressUtil.bindkeydown($(global_config.list_model_tbody_wrapper), true, {btn_save:$(global_config.btn_save_top)});
    }
    function setLabOrder(data) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            mod_onemodel.setLabOrder($(row), data);
        }
    }
    function setExamOrder(data) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            mod_onemodel.setExamOrder($(row), data);
        }
    }
    function getDiagnosis(mod_onemodel, detail, base) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            return mod_onemodel.getDiagnosis($(row), detail, base);
        }
        return null;
    }
    function setDiagnosis(data) {
        var row = getCurRow();
        if (row != null && row != undefined) {
            mod_onemodel.setDiagnosis($(row), data);
        }
    }
    function change() {
        var currow = getCurRow();
        var canedit = class_base.getattr(currow, "data-canedit") == "true";
        var dataid = class_base.getattr(currow, "data-value");
        var vs = currow != null && currow != undefined;
        var id = parseInt(dataid, 10);
        var hasid = id > 0 && !isNaN(id);
        var _req = myrequest.getrequest();

        EventUtil.showOrHide($(global_config.btn_save_top), canedit && vs);
        EventUtil.showOrHide($(global_config.btn_print), hasid && vs);
        EventUtil.showOrHide($(global_config.btn_deletevr), hasid && vs && !_req.isInWhite() && _req.isCanEdit());
        EventUtil.showOrHide($(global_config.btn_add), !_req.isInWhite()&&_req.isCanEdit());

        if (global_config.event_change != null && global_config.event_change != undefined) {
            global_config.event_change();
        }
    }
    function print() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                class_share.print(getCurRowDataID(), data.info.type);
            }
        };

        //获取参数
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("q", global_config.enum_printtype);
        dictionary.set("jigoudm", _req.jigoudm);
        myextend.ajaxPost_simple(global_config.sr_printtype, dictionary, web_list_callback, true);
    }

    function deletevr() {
        var id = getCurRowDataID();
        if (id <= 0 || isNaN(id)) {
            $.messager.alert('错误', "请先选中记录");
            return;
        }

        //提示
        $.messager.confirm('提示', "确认删除 所选 记录？", function (r) {
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
                bind(!_req.isInWhite() && _req.isCanEdit(), false, global_config);
                require(["header"], function (a) { a.show(); });
            }
            else {
                $.messager.alert('提示', data.msg);
            }
        };
        var web_list_bef_callback = function (data) {
            MaskUtil.mask($(global_config.list_model_tbody_wrapper), "正在删除...");
        };
        var web_list_com_callback = function (data) {
            MaskUtil.unmask($(global_config.list_model_tbody_wrapper));
        };
        var web_list_err_callback = function (data) { };

        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("id", id);
        dictionary.set("jobnumber", _req.jobnumber);

        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
        if (dataparam == "" || dataparam == undefined)
            return;
        myextend.ajaxPost(global_config.sr_delete, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
    }
    function addvr() {
        bind(false, true, global_config);
    }
    //实时缓存
    function saveCache() {
        if (global_config.enum_cachetype == null || global_config.enum_cachetype == undefined) return;
        require(["thread"], function (a) {
            Concurrent.Thread.create(class_share.threadCacheRecord, global_config.enum_cachetype, ischange, guiddata, class_share.addCacheRecord);
        });
    }
    function guiddata() {
        return mod_onemodel.guiddata(getCurRow());
    }
    function ischange() {
        return isChange_CurOpenedRow();
    }

    return {
        bind: bind,
        autowidth: autowidth,
        setDiagnosis: setDiagnosis,
        bindkeydown: bindkeydown,
        change: change,
        getCurRowByDataID: getCurRowByDataID,
        isChange_CurOpenedRow: isChange_CurOpenedRow,
        save_CurOpenedRow: save_CurOpenedRow,
        setLabOrder: setLabOrder,
        setExamOrder: setExamOrder,
        getCurRow: getCurRow,
        getCurRowDetail: getCurRowDetail,
        getCurRowID: getCurRowDataID
    }
}); 
    