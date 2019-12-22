define(function () {
    //用于新增--开始
    var sharedata = null;
    var count = 0;
    var allcount = 0;
    //用于新增--结束

    var models_cache = [];
    var global_config = {
        data: null,
        sr_empty: [],
        sr_getone: null,
        sr_save: null,
        cf_detail: {},
        cf_summary: {},
        list_model_wrapper: null,
        event_save: null,
    };
    var mod_detail = null;
    var mod_summary = null;
    var mod_list = null;
    var class_share = null;
    var class_base = null;


    //初始化界面
    function initstate() { }
    function getdetail(ctrl_wrapper) {
        if (ctrl_wrapper == null || ctrl_wrapper == undefined) return null;
        var next = ctrl_wrapper.next();
        if (next == null || next == undefined) return null;
        return next.find(".td_detail_template");
    }
    //数据载入
    function loaddata(ctrl_wrapper, data, mod, open) {
        if (ctrl_wrapper == null || ctrl_wrapper == undefined) return;
        ctrl_wrapper.unbind("dblclick").on("dblclick", function () {
            change(ctrl_wrapper, data);
            setCache(ctrl_wrapper);
            $(ctrl_wrapper).parent().find("tr.form_tr_title.open").not(ctrl_wrapper).each(function (index, item) {
                change(item, null);
                setCache($(item));
            });
        });

        var data_cache = getCache(ctrl_wrapper, mod);
        if (data_cache != null && data_cache != undefined) {
            data = data_cache;
        }
        var td_detail = getdetail(ctrl_wrapper);

        mod_summary.show(data, mod, ctrl_wrapper, global_config.cf_summary);
        if (open) {
            $(ctrl_wrapper).addClass("open");
            td_detail.show();
            if (td_detail.children().length <= 0) mod_detail.show(data, mod, td_detail, global_config.cf_detail);
        }
        else {
            $(ctrl_wrapper).removeClass("open");
            td_detail.hide();
        }
        mod_list.change();
    }
    function setCache(ctrl_wrapper) {
        if (getCanEdit(ctrl_wrapper) && !$(ctrl_wrapper).hasClass("open")) {
            getRowData($(ctrl_wrapper), function (data) {
                var td_detail_1 = getdetail(ctrl_wrapper);
                $.map(models_cache, function (item) {
                    if (item != undefined && item != null && item.id == getID(td_detail_1)) {
                        models_cache.remove(item);
                    }
                });
                models_cache.push(data);
            })
        }
    }
    function getCache(ctrl_wrapper, mod) {
        var td_detail = getdetail(ctrl_wrapper);
        var data_cache = $.grep(models_cache, function (item) {
            return item.id == getID(td_detail);
        });
        if (data_cache != null && data_cache != undefined && data_cache.length > 0) {
            if (mod == webglobal.enum_mod.view) {
                return data_cache[0].allitems_text;
            }
            return data_cache[0].allitems_value;
        }
        return null;
    }
    function getCanEdit(ctrl_wrapper) {
        var id = $(ctrl_wrapper).attr("data-value");
        var _floatid = parseInt(id, 10);
        var canedit = $(ctrl_wrapper).attr("data-canedit") == "true" || _floatid <= 0;
        return canedit;
    }
    function change(ctrl_wrapper, data) {
        $(ctrl_wrapper).toggleClass("open");
        var open = $(ctrl_wrapper).hasClass("open");
        var id = $(ctrl_wrapper).attr("data-value");
        var _floatid = parseInt(id, 10);
        var canedit = getCanEdit(ctrl_wrapper);
        var mod = canedit && open ? webglobal.enum_mod.edit : webglobal.enum_mod.view;

        if (canedit || data == null)
            toggle($(ctrl_wrapper), id, mod, open);
        else
            show(data, mod, ctrl_wrapper, open);
    }
    //新增
    function loadadd(ctrl_wrapper, _data, open) {

        count = 0;
        allcount = myextend.isNull(global_config.sr_empty) ? 0 : global_config.sr_empty.length;
        sharedata = null;
        if (!myextend.isNull(global_config.sr_empty)) {
            $.map(global_config.sr_empty, function (i) {
                loadadd_empty(ctrl_wrapper, open, i, _data, end);
            });
        }
    }
    function loadadd_empty(ctrl_wrapper, open, ws_url, _data, success_callback) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null && data.info != undefined) {
                data.info.id = _data.id;
                var data_1 = sharedata;
                var data_2 = data.info;
                sharedata = $.extend(true, data_1, data_2);
            }

            if (success_callback != null && success_callback != undefined)
                success_callback(ctrl_wrapper, open);
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
        myextend.ajaxPost_simple(ws_url, dictionary, web_list_callback, true);
    }

    function end(ctrl_wrapper, open) {
        count++;
        if (count == allcount) {
            loaddata(ctrl_wrapper, sharedata, webglobal.enum_mod.add, open);
        }
    }
    //编辑
    function loadedit(ctrl_wrapper, data, open) {
        getonemodel(ctrl_wrapper, data.id, webglobal.enum_mod.edit, open, _callback);
        function _callback(tr, id, mod, open, _data) {
            loaddata(ctrl_wrapper, _data, mod, open);
        }
    }
    //只读
    function loadview(ctrl_wrapper, data, open) {
        loaddata(ctrl_wrapper, data, webglobal.enum_mod.view, open);
    }
    function afterrender() { }

    function using(callback) {
        require(["mod_onemodel_detail", "mod_onemodel_summary", "list_model", "share_services", "base_usercontrol", "tmpl", "jextend", "easyui", "web_global", 'jquery'], function (d, sm, l, s, b) {
            mod_detail = d;
            mod_summary = sm;
            mod_list = l;

            class_base = b;
            class_share = s;

            if (callback != null && callback != undefined) {
                callback();
            }
        });
    }
    function show(data, mod, ctrl_wrapper, open, options) {
        using(function () {
            if (options) global_config = options;

            //新增
            if (mod == webglobal.enum_mod.add) {
                loadadd(ctrl_wrapper, data, open);
            }
            //编辑
            else if (mod == webglobal.enum_mod.edit) {
                loadedit(ctrl_wrapper, data, open);
            }
            //只读
            else if (mod == webglobal.enum_mod.view) {
                loadview(ctrl_wrapper, data, open);
            }
        });
    }
    function toggle(tr, id, mod, open) {
        getonemodel(tr, id, mod, open, _callback);
        function _callback(tr, id, mod, open, data) {
            show(data, mod, tr, open);
        }
    }
    function getonemodel(tr, id, mod, open, success_callback) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                if (success_callback != null && success_callback != undefined) {
                    success_callback(tr, id, mod, open, data.info);
                }
            }
        };
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("id", id);
        dictionary.set("mod", mod);
        dictionary.set("jobnumber", _req.jobnumber);
        myextend.ajaxPost_simple(global_config.sr_getone, dictionary, web_list_callback, true);
    }
    function autowidth(ctrl_wrapper) {
        var td_detail = ctrl_wrapper.next().find(".td_detail_template");
        if (td_detail.children().length > 0) mod_detail.autowidth(td_detail);
    }
    function save_bydetail(sender, success_callback, e) {
        if (sender == null || sender == undefined) return;
        var td_detail = $(sender).parents("tr");
        var tr_row = $(td_detail).prev();
        save_byrow(tr_row, success_callback, sender, e);
    }

    function getRowData(tr_row, success_callback) {
        if (tr_row == null || tr_row == undefined) return;
        var td_detail = getdetail(tr_row);

        mod_detail.onsave(td_detail, class_base);

        var id = getID(td_detail);
        var isadd = id <= 0 || isNaN(id);
        var data_1 = class_base.getFormDic($(tr_row), isadd);
        var data_2 = class_base.getFormDic($(td_detail), isadd);
        var data = $.extend(true, data_1, data_2);
        if (success_callback != null && success_callback != null) {
            success_callback(data);
        }
    }
    function guiddata(tr_row)
    {
        if (tr_row == null || tr_row == undefined) return;

        var td_detail = $(tr_row).next().find(".td_detail_template");

        var table_wrapper = $(global_config.list_model_wrapper);
        var id = getID(td_detail);
        var isadd = id <= 0 || isNaN(id);
        var data_1 = class_base.getFormDic($(tr_row), isadd);
        var data_2 = class_base.getFormDic($(td_detail), isadd);
        var data = $.extend(true, data_1, data_2);
        return data;
    }
    function save_byrow(tr_row, success_callback, sender, e) {
        if (tr_row == null || tr_row == undefined) return;
        var td_detail = $(tr_row).next().find(".td_detail_template");
        var table_wrapper = $(global_config.list_model_wrapper);
//        var id = getID(td_detail);
//        var isadd = id <= 0 || isNaN(id);
//        var data_1 = class_base.getFormDic($(tr_row), isadd);
//        var data_2 = class_base.getFormDic($(td_detail), isadd);
//        var data = $.extend(true, data_1, data_2);

        var data=guiddata(tr_row);

        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                TipUtil.ShowSuccess("保存成功");
                setID(tr_row, td_detail, data.info.id);
                class_base.reload(tr_row);
                class_base.reload(td_detail);

                if (success_callback != null) {
                    success_callback(sender, e,data.info);
                }
            }
            else {
                $.messager.alert('错误', data.msg);
            }
        };
        var web_list_bef_callback = function (data) {
            EventUtil.setVisible(sender, false);
            MaskUtil.mask($(table_wrapper), "正在保存，请稍候...");
        };
        var web_list_com_callback = function (data) {
            EventUtil.setVisible(sender, true);
            MaskUtil.unmask($(table_wrapper));
        };
        var web_list_err_callback = function (data) { };
        var _req = myrequest.getrequest();

        if (data == null || data == undefined) data = {};
//        data.shenfenzh = _req.shenfenzh;
//        data.bingrenid = _req.bingrenid;
//        data.doctorname = _req.doctorname;
//        data.jobnumber = _req.jobnumber;
//        data.jigoudm = _req.jigoudm;
        _req.todata(data);

        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(data));
        if (dataparam == "" || dataparam == undefined)
            return;

        myextend.ajaxPost(global_config.sr_save, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);

    }
    function getCtrl(wrapper, id) {
        return $(wrapper).find(id);
    }
    function getID(wrapper) {
        var t = getCtrl(wrapper, "input[data-id='tmpl_id']");
        if (t != null && t != undefined) {
            return parseFloat(t.val(), 10);
        }
    }
    function setID(tr_row, td_detail, id) {
        if (tr_row == null || tr_row == undefined || td_detail == null || td_detail == undefined) return;
        var t = getCtrl(td_detail, "input[data-id='tmpl_id']");
        if (t != null && t != undefined) {
            t.val(id);
        }
        tr_row.attr("data-value", id);
        tr_row.attr("id", id);
        mod_list.change();
    }
    function setLabOrder(ctrl_wrapper, data) {
        mod_detail.setLabOrder(getdetail(ctrl_wrapper), data);
    }
    function setExamOrder(ctrl_wrapper, data) {
        mod_detail.setExamOrder(getdetail(ctrl_wrapper), data);
    }

    function getDiagnosis(ctrl_wrapper, detail, base) {
        if (detail == null || detail == undefined) return null;
        return detail.getDiagnosis(getdetail(ctrl_wrapper), base);
    }
    function setDiagnosis(ctrl_wrapper, data) {
        mod_detail.setDiagnosis(getdetail(ctrl_wrapper), data);
    }
    function isChange_CurOpenedRow(ctrl_wrapper, base) {
        if (ctrl_wrapper != null && ctrl_wrapper != undefined) {
            var t = false;
            t = t || base.isChange($(ctrl_wrapper));
            t = t || base.isChange(getdetail(ctrl_wrapper));
            return t;
        }
        return false;
    }
    return {
        show: show,
        autowidth: autowidth,
        save: save_bydetail,
        save_byrow: save_byrow,
        getDiagnosis: getDiagnosis,
        setDiagnosis: setDiagnosis,
        isChange_CurOpenedRow: isChange_CurOpenedRow,
        setLabOrder: setLabOrder,
        setExamOrder: setExamOrder,
        getDetail: getdetail,
        guiddata:guiddata
    }
}); 
    
