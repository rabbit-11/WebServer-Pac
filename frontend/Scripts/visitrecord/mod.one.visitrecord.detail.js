define(function () {

    var mydia = null;
    var dia_class = null;

    var myhighrisk = null;
    var highrisk_class = null;

    var base = null;
    var share = null;

    function getCtrlByDataid(ctrl_wrapper, dataid) {
        return $(ctrl_wrapper).find("[data-id='" + dataid + "']");
    }
    function getCtrl(ctrl_wrapper, selector) {
        return $(ctrl_wrapper).find(selector);
    }

    //初始化界面
    function initstate(ctrl_wrapper, base) {
        //保存
        EventUtil.bindclick(getCtrl(ctrl_wrapper, ".btn_detail_save"), save);
        //诊断
        dia_class.init(mydia, base, share);
        //高危
        highrisk_class.myinit(myhighrisk, base, share);
    }

    //数据载入
    function loaddata(data, mod, ctrl_wrapper) {
        if (ctrl_wrapper == null || ctrl_wrapper == undefined) return;
        var arr = [];
        arr.push(data);
        $.get(webglobal.templates.one_visitrecord_detail, { stamp: Math.random() + 1 }, function (template) {
            mydia = {
                tmpl_maindiagnosis: "tmpl_maindiagnosis",
                tmpl_diagnosisinfo: "tmpl_diagnosisinfo",
                tmpl_secondarydiagnosis: "tmpl_secondarydiagnosis",
                tmpl_diagnosisdic: "tmpl_diagnosisdic",
                wrapper: ctrl_wrapper,
                btn: ".btn_diagnosis_detail",
                win: "#win_diagnosis"
            };
            myhighrisk = {
                tmpl_highrisklevel: "tmpl_highrisklevel",
                tmpl_highriskreason: "tmpl_highriskreason",
                tmpl_highrisklevel_text: "tmpl_highrisklevel_text",
                tmpl_highriskdic: "tmpl_highriskdic",
                wrapper: ctrl_wrapper,
                btn: ".btn_highrisk_detail",
                win: "#win_highrisk"
            };
            require(["share_diagnosis", "share_highrisk", "base_usercontrol", "share_services", "tmpl", 'jquery', "jextend", "easyui", "common"], function (dia, high, b, s) {
                dia_class = dia;
                highrisk_class = high;
                base = b;
                share = s;

                $.template("myTemplate", template);
                $(ctrl_wrapper).html($.tmpl("myTemplate", arr));

                initstate(ctrl_wrapper, base);
                base.drawcontrol($(ctrl_wrapper), mod, true, prerender, afterrender);
            });
        });
    }
    //新增
    function loadadd(data, ctrl_wrapper) {
        loaddata(data, webglobal.enum_mod.add, ctrl_wrapper);
    }
    //编辑
    function loadedit(data, ctrl_wrapper) {
        loaddata(data, webglobal.enum_mod.edit, ctrl_wrapper);
    }
    //只读
    function loadview(data, ctrl_wrapper) {
        loaddata(data, webglobal.enum_mod.view, ctrl_wrapper);
    }
    //渲染前
    function prerender() {
        MaskUtil.mask($("#list_visitrecord_wrapper"), "正在加载，请稍候...");
    }
    //渲染后
    function afterrender(ctrl_wrapper, mod) {
        MaskUtil.unmask($("#list_visitrecord_wrapper"));
        autowidth(ctrl_wrapper);
        HideOnView(ctrl_wrapper, ".btn_detail_save", mod != webglobal.enum_mod.view);
        HideOnView(ctrl_wrapper, ".btn_highrisk_detail", mod != webglobal.enum_mod.view);
        HideOnView(ctrl_wrapper, ".btn_diagnosis_detail", mod != webglobal.enum_mod.view);
        HideOnView(ctrl_wrapper, ".btn_laborder_import", mod != webglobal.enum_mod.view);
        HideOnView(ctrl_wrapper, ".btn_examorder_import", mod != webglobal.enum_mod.view);
        HideOnView(ctrl_wrapper, ".btn_today_req_import", mod != webglobal.enum_mod.view);

        if (mod != webglobal.enum_mod.view) {
            var _req = myrequest.getrequest();
            var _jobnumber = _req.jobnumber;
            var wrapperid = $(ctrl_wrapper).find("#form_td_chiefcomplaint_wrapper");
            var _stage = base.getattr($(wrapperid), "data-stage");
            var _type = base.getattr($(wrapperid), "data-type");
            share.loadmodel("tmpl_chiefcomplaint", wrapperid, _stage, _type, _jobnumber);

            wrapperid = $(ctrl_wrapper).find("#form_td_suggestion_wrapper");
            _stage = base.getattr($(wrapperid), "data-stage");
            _type = base.getattr($(wrapperid), "data-type");
            share.loadmodel("tmpl_suggestion", wrapperid, _stage, _type, _jobnumber);

            wrapperid = $(ctrl_wrapper).find("#form_td_guide_wrapper");
            _stage = base.getattr($(wrapperid), "data-stage");
            _type = base.getattr($(wrapperid), "data-type");
            share.loadmodel("tmpl_guide", wrapperid, _stage, _type, _jobnumber);

            wrapperid = $(ctrl_wrapper).find("#form_td_presenthistory_wrapper");
            _stage = base.getattr($(wrapperid), "data-stage");
            _type = base.getattr($(wrapperid), "data-type");
            share.loadmodel("tmpl_presenthistory", wrapperid, _stage, _type, _jobnumber);

            wrapperid = $(ctrl_wrapper).find("#form_td_othercommonexam_wrapper");
            _stage = base.getattr($(wrapperid), "data-stage");
            _type = base.getattr($(wrapperid), "data-type");
            share.loadmodel("tmpl_othercommonexam", wrapperid, _stage, _type, _jobnumber);

        }
        if (mod == webglobal.enum_mod.edit) {
            dia_class.refresh(ctrl_wrapper,save);
        }
        if (mod == webglobal.enum_mod.add) {

            //默认宣教内容
            loaddelfaultmodel(ctrl_wrapper);
        }
        //检验导入
        $(ctrl_wrapper).find(".btn_laborder_import").unbind("click").on("click", function () {
            require(["base_usercontrol", "easyui"], function (a) {
                a.showwindow($("#win_laborder_import"));
            });

            return false;
        });
        //检查导入
        $(ctrl_wrapper).find(".btn_examorder_import").unbind("click").on("click", function () {
            require(["base_usercontrol", "easyui"], function (a) {
                a.showwindow($("#win_examorder_import"));
            });

            return false;
        });
        //导入今日开单
        $(ctrl_wrapper).find(".btn_today_req_import").unbind("click").on("click", function () {
            share.getSuggestion(function (info) {
                if (!myextend.isNull(info)) {
                    setSuggestion(ctrl_wrapper, info);
                }
                else {
                    TipUtil.ShowFailure("未查询到当天开单信息");
                }
            });

            return false;
        });

        if (mod != webglobal.enum_mod.view) {
            require(["list_visitrecord", "base_usercontrol"], function (list, base) {
                LeaveCheckUtil.leave("list_visitrecord_tbody_wrapper", "离开前是否保存？", list.save_CurOpenedRow, list.isChange_CurOpenedRow, clearCache);
            });
            bindkeydown();
        }
    }
    function clearCache(callback) {
        share.clearCacheRecord(webglobal.enum_cachetype.visitrecord, callback);
    }
    function bindkeydown() {
        require(["list_visitrecord"], function (list) {
            list.bindkeydown();
        });
    }
    function autowidth(ctrl_wrapper) {
        //自适应宽度
        var w = $(ctrl_wrapper).parents("#list_visitrecord_wrapper").width() * 0.96;
        var td_w = $(ctrl_wrapper).find(".form_td_widthflag").find("span").width();
        myextend.setCustomTable(parseInt(w, 10), parseInt(td_w, 10) <= 0 ? 74 : parseInt(td_w, 10), '.customtable');
    }
    function loaddelfaultmodel(ctrl_wrapper) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                base.setVal("tmpl_guide", data.info.guide, ctrl_wrapper);
            }
        };

        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("bingrenid", _req.bingrenid);
        dictionary.set("shenfenzh", _req.shenfenzh);
        dictionary.set("jobnumber", _req.jobnumber);
        dictionary.set("jigoudm", _req.jigoudm);

        myextend.ajaxPost_simple(webglobal.services.GetDefaultGuide, dictionary, web_list_callback, true);
    }

    function show(data, mod, ctrl_wrapper) {
        //新增
        if (mod == webglobal.enum_mod.add || data.id <= 0 || isNaN(data.id)) {
            loadadd(data, ctrl_wrapper);
        }
        //编辑
        else if (mod == webglobal.enum_mod.edit) {
            loadedit(data, ctrl_wrapper);
        }
        //只读
        else if (mod == webglobal.enum_mod.view) {
            loadview(data, ctrl_wrapper);
        }
    }
    function save(ctrl_wrapper) {
        require(["mod_onevisitrecord"], function (a) {
            a.save(ctrl_wrapper);
        });
    }

    function getMultifetal(ctrl_wrapper) {
        var t = getCtrlByDataid(ctrl_wrapper, "tmpl_multifetal");
        var val = t.val();
        if (myextend.isNull(val))
            return null;
        return JSON.parse(val);
    }
    function setMultifetal(ctrl_wrapper, data) {
        var t = getCtrlByDataid(ctrl_wrapper, "tmpl_multifetal");
        t.val(JSON.stringify(data));
    }

    function getHighRisk(ctrl_wrapper) {
        return highrisk_class.get();
    }
    function setHighRisk(ctrl_wrapper, data, callback) {
        highrisk_class.set(data, callback);
    }
    function setLabOrder(ctrl_wrapper, data) {
        if (data != null && data != undefined) {
            require(["jextend"], function () {
                var s = base.getVal("tmpl_othercommonexam", ctrl_wrapper);
                //                var news = "检验：" + data;
                base.setVal("tmpl_othercommonexam", s == "" || s == null || s == undefined ? data : s + "\r\n" + data, ctrl_wrapper);
                //                $(ctrl_wrapper).find("#tmpl_othercommonexam").iAddField("检验：" + data); //ie不兼容
            });
        }
    }
    function setExamOrder(ctrl_wrapper, data) {
        if (data != null && data != undefined) {
            require(["jextend"], function () {
                var s = base.getVal("tmpl_othercommonexam", ctrl_wrapper);
                //                var news = "检查：" + data;
                base.setVal("tmpl_othercommonexam", s == "" || s == null || s == undefined ? data : s + "\r\n" + data, ctrl_wrapper);
                //                $(ctrl_wrapper).find("#tmpl_othercommonexam").iAddField("检验：" + data); //ie不兼容
            });
        }
    }
    function setSuggestion(ctrl_wrapper, data) {
        if (data != null && data != undefined) {
            require(["jextend"], function () {
                var s = base.getVal("tmpl_suggestion", ctrl_wrapper);
                var news = data;
                base.setVal("tmpl_suggestion", s == "" || s == null || s == undefined ? news : s + "\r\n" + news, ctrl_wrapper);
            });
        }
    }

    function setDiagnosis(ctrl_wrapper, data) {
        dia_class.set(data, ctrl_wrapper);
    }

    function getDiagnosis(ctrl_wrapper, base) {
        return dia_class.get(ctrl_wrapper);
    }

    function onsave(ctrl_wrapper, base) {
        var d = getDiagnosis(ctrl_wrapper, base);
        base.setVal("tmpl_diagnosisdic", JSON.stringify(d), ctrl_wrapper);
    }
    function HideOnView(ctrl_wrapper, selector, canshow) {
        //设置可视化控件
        var t = $(ctrl_wrapper).find(selector);
        if (t != null && t != undefined) {
            if (!canshow)
                t.hide();
            else
                t.show();
        }
    }
    function linkage_Dateofprenatal(ctrl_wrapper, base, data) {
        if (data == null || data == undefined) return;
        var weeks = data.checkweek;
        var days = data.checkday;
        base.setVal("tmpl_checkweek", weeks, ctrl_wrapper);
        base.setVal("tmpl_checkday", days, ctrl_wrapper);

        base.setVal("tmpl_chiefcomplaint", refresh_weekday(data, base.getVal("tmpl_chiefcomplaint", ctrl_wrapper)), ctrl_wrapper);
        base.setVal("tmpl_presenthistory", refresh_weekday(data, base.getVal("tmpl_presenthistory", ctrl_wrapper)), ctrl_wrapper);

        var t = getDiagnosis(ctrl_wrapper, base)
        $.map(t, function (item) {
            if (item.t + "" == "1") {
                item.i = refresh_weekday(data, item.i);
            }
        });
        setDiagnosis(ctrl_wrapper, t);
    }
    function refresh_weekday(data, info) {
        var weeks = data.checkweek;
        var days = data.checkday;
        var _info = info + "";
        _info = _info.replace(/孕(\w+)\+(\w+)周/, "孕" + weeks + "+" + days + "周");
        _info = _info.replace(/孕(\w+)周(\w+)天/, "孕" + weeks + "周" + days + "天");
        return _info;
    }
    function followupappointment_selected(date) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                if (data.info != null && data.info != undefined && data.info.count != undefined && data.info.count > 0) {
                    require(["common"], function () {
                        TipUtil.ShowMsg("当天已预约人数：" + data.info.count + "人");
                    });
                }
            }
        };
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("jigoudm", _req.jigoudm);
        dictionary.set("mydate", date);

        myextend.ajaxPost_simple(webglobal.services.GetFollowupCount, dictionary, web_list_callback, true);
    }
    function refresh(ctrl_wrapper, data) {
        require(["base_usercontrol"], function (base) {
            base.reload_reverse(ctrl_wrapper, data);
        });
    }
    function save() {
        require(["list_visitrecord"], function (list) {
            list.save_CurOpenedRow();
        });
    }
    //    function confirmSaveDiagnosis(save) {
    //        //提示
    //        $.messager.confirm({
    //            ok: '是',
    //            cancel: '否',
    //            title: '提示',
    //            msg: "诊断有修改，是否立即保存",
    //            fn: function (r) {
    //                if (r) {
    //                    require(["list_visitrecord"], function (list) {
    //                        list.save_CurOpenedRow();
    //                    });
    //                }
    //            }
    //        });
    //    }
    return {
        loadadd: loadadd,
        loadview: loadview,
        loadedit: loadedit,
        show: show,
        autowidth: autowidth,
        getMultifetal: getMultifetal,
        setMultifetal: setMultifetal,
        getHighRisk: getHighRisk,
        setHighRisk: setHighRisk,
        getDiagnosis: getDiagnosis,
        setDiagnosis: setDiagnosis,
        onsave: onsave,
        setLabOrder: setLabOrder,
        setExamOrder: setExamOrder,
        linkage_Dateofprenatal: linkage_Dateofprenatal,
        followupappointment_selected: followupappointment_selected,
        refresh: refresh
    }
});