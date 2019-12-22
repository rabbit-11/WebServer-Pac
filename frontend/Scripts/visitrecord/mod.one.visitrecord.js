define(function () {
    //用于新增--开始
    var sharedata = null;
    var count = 0;
    var allcount = 0;
    //用于新增--结束
    var visitrecords_cache = [];

    //初始化界面
    function initstate() { }
    function getdetail(ctrl_wrapper) {
        return ctrl_wrapper.next().find(".td_detail_template");
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

        require(["mod_onevisitrecord_detail", "mod_onevisitrecord_summary", "list_visitrecord"], function (detail, summary, list) {
            var data_cache = getCache(ctrl_wrapper, mod);
            if (data_cache != null && data_cache != undefined) {
                data = data_cache;
                data.refreshMultifetal = true;
            }
            var td_detail = getdetail(ctrl_wrapper);

            summary.show(data, mod, ctrl_wrapper);
            if (open) {
                $(ctrl_wrapper).addClass("open");
                td_detail.show();
                if (td_detail.children().length <= 0) detail.show(data, mod, td_detail);
            }
            else {
                $(ctrl_wrapper).removeClass("open");
                td_detail.hide();
            }
            list.change();
        });
    }
    function setCache(ctrl_wrapper) {
        if (getCanEdit(ctrl_wrapper) && !$(ctrl_wrapper).hasClass("open")) {
            getRowData($(ctrl_wrapper), function (data) {
                var td_detail_1 = getdetail(ctrl_wrapper);
                $.map(visitrecords_cache, function (item) {
                    if (item != undefined && item != null && item.id == getID(td_detail_1)) {
                        visitrecords_cache.remove(item);
                    }
                });
                visitrecords_cache.push(data);
            })
        }
    }
    function getCache(ctrl_wrapper, mod) {
        var td_detail = getdetail(ctrl_wrapper);
        var data_cache = $.grep(visitrecords_cache, function (item) {
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
        require(["jquery", "common", "jextend", "web_global"], function () {
            count = 0;
            allcount = 6;
            sharedata = null;
            loadadd_empty(ctrl_wrapper, open, webglobal.services.GetEmptyVisitRecord_Normal, _data, end);
            loadadd_empty(ctrl_wrapper, open, webglobal.services.GetEmptyVisitRecord_Diagnosis, _data, end);
            loadadd_empty(ctrl_wrapper, open, webglobal.services.GetEmptyVisitRecord_HighRisk, _data, end);
            loadadd_empty(ctrl_wrapper, open, webglobal.services.GetEmptyVisitRecord_LabOrder, _data, end);
            loadadd_empty(ctrl_wrapper, open, webglobal.services.GetEmptyVisitRecord_ExamOrder, _data, end);
            loadadd_empty(ctrl_wrapper, open, webglobal.services.GetEmptyVisitRecord_ChuFang, _data, end);
        });
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
        getonevisitrecord(ctrl_wrapper, data.id, webglobal.enum_mod.edit, open, _callback);
        function _callback(tr, id, mod, open, _data) {
            loaddata(ctrl_wrapper, _data, mod, open);
        }
    }
    //只读
    function loadview(ctrl_wrapper, data, open) {
        loaddata(ctrl_wrapper, data, webglobal.enum_mod.view, open);
    }
    function afterrender() {

    }
    function show(data, mod, ctrl_wrapper, open) {
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
    }
    function toggle(tr, id, mod, open) {
        getonevisitrecord(tr, id, mod, open, _callback);
        function _callback(tr, id, mod, open, data) {
            show(data, mod, tr, open);
        }
    }
    function getonevisitrecord(tr, id, mod, open, success_callback) {
        require(["jquery", "common", "jextend", "web_global"], function () {
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
            _req.todic(dictionary);
            myextend.ajaxPost_simple(webglobal.services.GetOneVisitRecord, dictionary, web_list_callback, true);
        });
    }
    function autowidth(ctrl_wrapper) {
        require(["mod_onevisitrecord_detail", "mod_onevisitrecord_summary"], function (detail) {
            var td_detail = ctrl_wrapper.next().find(".td_detail_template");
            if (td_detail.children().length > 0) detail.autowidth(td_detail);
        });
    }
    function save_bydetail(sender, success_callback, e) {
        if (sender == null || sender == undefined) return;
        var td_detail = $(sender).parents("tr");
        var tr_row = $(td_detail).prev();
        save_byrow(tr_row, success_callback, sender, e);
    }

    function getRowData(tr_row, success_callback) {
        if (tr_row == null || tr_row == undefined) return;
        require(["mod_onevisitrecord_detail", "mod_onevisitrecord_summary", "base_usercontrol", "jquery", "common", "jextend", "easyui"], function (detail, summary, base, share) {

            var td_detail = getdetail(tr_row); 

            //设置多胎
            detail.setMultifetal(td_detail, getMultifetal(tr_row, summary, detail, base));
            detail.onsave(td_detail, base);

            var id = getID(td_detail);
            var isadd = id <= 0 || isNaN(id);
            var data_1 = base.getFormDic($(tr_row), isadd);
            var data_2 = base.getFormDic($(td_detail), isadd);
            var data = $.extend(true, data_1, data_2);
            if (success_callback != null && success_callback != null) {
                success_callback(data);
            }
        });
    }
    function guiddata(tr_row, base) {
        if (tr_row == null || tr_row == undefined) return null;
        var td_detail = $(tr_row).next().find(".td_detail_template");

        var id = getID(td_detail);
        var isadd = id <= 0 || isNaN(id);
        var data_1 = base.getFormDic($(tr_row), isadd);
        var data_2 = base.getFormDic($(td_detail), isadd);
        var data = $.extend(true, data_1, data_2);
        var _req = myrequest.getrequest();

        if (data == null || data == undefined) data = {};
        data.shenfenzh = _req.shenfenzh;
        data.bingrenid = _req.bingrenid;
        data.doctorname = _req.doctorname;
        data.jigoudm = _req.jigoudm;
        return data;
    }
    function save_byrow(tr_row, success_callback, sender, e) {
        if (tr_row == null || tr_row == undefined) return;

        require(["mod_onevisitrecord_detail", "mod_onevisitrecord_summary", "base_usercontrol", "share_services", "jquery", "common", "jextend", "web_global", "easyui"], function (detail, summary, base, share) {

            var td_detail = $(tr_row).next().find(".td_detail_template");

            //设置多胎
            detail.setMultifetal(td_detail, getMultifetal(tr_row, summary, detail, base));
            detail.onsave(td_detail, base);

            var table_wrapper = $("#list_visitrecord_wrapper");
            var data = guiddata(tr_row, base);

            share.SaveMonitorData(data.newitems);

            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    TipUtil.ShowSuccess("保存成功");
                    setID(tr_row, td_detail, data.info.id);
                    base.reload(tr_row);
                    base.reload(td_detail);
                    save_highrisk(data.info.id);

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
                MaskUtil.mask($(table_wrapper), "正在保存，请稍候...");
            };
            var web_list_com_callback = function (data) {
                EventUtil.setVisible(sender, true);
                MaskUtil.unmask($(table_wrapper));
            };
            var web_list_err_callback = function (data) { };

            var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(data));
            if (dataparam == "" || dataparam == undefined)
                return;

            myextend.ajaxPost(webglobal.services.SaveVisitRecord, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
        });
    }

    function save_highrisk(id) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                reloadHighRisk(data.info);
            }
        };
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("bingrenid", _req.bingrenid);
        dictionary.set("shenfenzh", _req.shenfenzh);
        dictionary.set("jigoudm", _req.jigoudm);
        dictionary.set("id", id);

        myextend.ajaxPost_simple(webglobal.services.UpdateHighRisk, dictionary, web_list_callback, true);
    }
    function highriskreport() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                require(["list_visitrecord"], function (list) {
                    list.showHighRiskReport(webglobal.enum_rc_ptype.reportcard_highrisk_simple);
                });
            }
        };
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        _req.todic(dictionary);

        myextend.ajaxPost_simple(webglobal.services.NeedHighRiskReport, dictionary, web_list_callback, true);
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
        require(["list_visitrecord"], function (list) {
            list.change();
        });
    }

    function getMultifetal(ctrl_wrapper, summary, detail, base) {
        if (summary == null || summary == undefined) return null;
        if (detail == null || detail == undefined) return null;
        var multifetal_summary = summary.getMultifetal($(ctrl_wrapper), base);
        var multifetal_detail = detail.getMultifetal(getdetail(ctrl_wrapper), base);
        if (multifetal_summary == null || multifetal_summary == undefined)
            return multifetal_detail;
        return multifetal_summary;
    }
    function setMultifetal(ctrl_wrapper, data) {
        require(["mod_onevisitrecord_summary", "mod_onevisitrecord_detail"], function (summary, detail) {
            summary.setMultifetal($(ctrl_wrapper), data);
            detail.setMultifetal(getdetail(ctrl_wrapper), data);
        });
    }

    function getHighRisk(ctrl_wrapper, detail, base) {
        if (detail == null || detail == undefined) return null;
        return detail.getHighRisk(getdetail(ctrl_wrapper), base);
    }
    function setHighRisk(ctrl_wrapper, data, callback) {
        require(["mod_onevisitrecord_detail"], function (detail) {
            detail.setHighRisk(getdetail(ctrl_wrapper), data, callback);
        });
    }
    function setLabOrder(ctrl_wrapper, data) {
        require(["mod_onevisitrecord_detail"], function (detail) {
            detail.setLabOrder(getdetail(ctrl_wrapper), data);
        });
    }
    function setExamOrder(ctrl_wrapper, data) {
        require(["mod_onevisitrecord_detail"], function (detail) {
            detail.setExamOrder(getdetail(ctrl_wrapper), data);
        });
    }

    function getDiagnosis(ctrl_wrapper, detail, base) {
        if (detail == null || detail == undefined) return null;
        return detail.getDiagnosis(getdetail(ctrl_wrapper), base);
    }
    function setDiagnosis(ctrl_wrapper, data) {
        require(["mod_onevisitrecord_detail"], function (detail) {
            detail.setDiagnosis(getdetail(ctrl_wrapper), data);
        });
    }
    function reloadHighRisk(data) {
        require(["list_visitrecord"], function (list) {
            var td_summary = list.getCurRowByDataID(data.id);
            if (td_summary != null && td_summary != undefined) {
                var t = data.highriskdic == "" || data.highriskdic == undefined || data.highriskdic == null ? [] : JSON.parse(data.highriskdic);
                setHighRisk($(td_summary), t);
                highriskreport();
            }
        });
        require(["header"], function (a) { a.show(); });
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
    function getVisitDate(ctrl_wrapper, summary, base) {
        if (summary == null || summary == undefined) return null;
        return summary.getVisitDate($(ctrl_wrapper), base);
    }
    function linkage_Dateofprenatal(ctrl_wrapper, base, data) {
        require(["mod_onevisitrecord_detail"], function (detail) {
            detail.linkage_Dateofprenatal(getdetail(ctrl_wrapper), base, data);
        });
    }
    function refesh(row, data) {
        if (row == undefined || row == null) return;
        if (data == undefined || data == null) return;
        require(["mod_onevisitrecord_detail", "mod_onevisitrecord_summary"], function (detail, summary) {
            summary.refresh(row, data);
            detail.refresh(getdetail($(row)), data);
            setMultifetal($(row), JSON.parse(data.multifetal));
        });
    }
    return {
        loadadd: loadadd,
        loadview: loadview,
        loadedit: loadedit,
        show: show,
        autowidth: autowidth,
        save: save_bydetail,
        save_byrow: save_byrow,
        getMultifetal: getMultifetal,
        setMultifetal: setMultifetal,
        getHighRisk: getHighRisk,
        setHighRisk: setHighRisk,
        getDiagnosis: getDiagnosis,
        setDiagnosis: setDiagnosis,
        isChange_CurOpenedRow: isChange_CurOpenedRow,
        setLabOrder: setLabOrder,
        setExamOrder: setExamOrder,
        getVisitDate: getVisitDate,
        linkage_Dateofprenatal: linkage_Dateofprenatal,
        guiddata: guiddata,
        refesh: refesh
    }
}); 
    
