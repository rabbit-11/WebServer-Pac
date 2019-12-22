define(function () {
    var class_base = null;
    var class_share = null;
    var class_diagnosis = null;
    var global_config = {
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
        btn_laborder_import: null,
        //btn_diagnosis_detail: null,

        //        form_td_chiefcomplaint_wrapper: null,
        //        form_td_guide_wrapper: null,
        //        form_td_suggestion_wrapper: null,
        //        form_td_presenthistory_wrapper: null,
        //        tmpl_chiefcomplaint: null,
        //        tmpl_suggestion: null,
        //        tmpl_guide: null,
        //        tmpl_presenthistory: null,

        win_laborder_import: null,
        win_examorder_import: null,
        list_model_tbody_wrapper: null,
        table_wrapper: null,
        tmpl_guide: null,
        //        tmpl_othercommonexam: null,
        // tmpl_diagnosisdic: null,
        template: null,
        sr_defaultguide: null,
        mydic: null,
        enum_cachetype: null
    };
    var mod_onemodel = null;
    var mod_list = null;


    function using(callback) {
        require(["share_services", "list_model", "mod_onemodel", "share_diagnosis", "base_usercontrol", "tmpl", "jextend", "easyui", "web_global", 'jquery'], function (s, l, d, sd, b) {
            mod_list = l;
            mod_onemodel = d;

            class_diagnosis = sd;
            class_base = b;
            class_share = s;

            if (callback != null && callback != undefined) {
                callback();
            }
        });
    }

    function getCtrlByDataid(ctrl_wrapper, dataid) {
        return $(ctrl_wrapper).find("[data-id='" + dataid + "']");
    }
    function getCtrl(ctrl_wrapper, selector) {
        return $(ctrl_wrapper).find(selector);
    }

    //初始化界面
    function initstate(ctrl_wrapper, class_base) {
        //保存
        EventUtil.bindclick(getCtrl(ctrl_wrapper, global_config.btn_save), save);
        //诊断
        class_diagnosis.init(global_config.diagnosis, class_base, class_share);
    }

    //数据载入
    function loaddata(data, mod, ctrl_wrapper) {
        if (ctrl_wrapper == null || ctrl_wrapper == undefined) return;
        var arr = [];
        arr.push(data);
        $.get(global_config.template, { stamp: Math.random() + 1 }, function (template) {

            $.template("myTemplate", template);
            $(ctrl_wrapper).html($.tmpl("myTemplate", arr));

            initstate(ctrl_wrapper, class_base);
            class_base.drawcontrol($(ctrl_wrapper), mod, true, prerender, afterrender);
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
        MaskUtil.mask($(global_config.list_wrapper), "正在加载，请稍候...");
    }
    //渲染后
    function afterrender(ctrl_wrapper, mod) {
        MaskUtil.unmask($(global_config.list_wrapper));
        autowidth(ctrl_wrapper);
        HideOnView(ctrl_wrapper, global_config.btn_save, mod != webglobal.enum_mod.view);
        if (global_config.diagnosis != undefined && global_config.diagnosis != null) {
            HideOnView(ctrl_wrapper, global_config.diagnosis.btn, mod != webglobal.enum_mod.view);
        }
        HideOnView(ctrl_wrapper, global_config.btn_laborder_import, mod != webglobal.enum_mod.view);
        HideOnView(ctrl_wrapper, global_config.btn_examorder_import, mod != webglobal.enum_mod.view);

        if (mod != webglobal.enum_mod.view) {
            var _req = myrequest.getrequest();
            var _jobnumber = _req.jobnumber;
            $(ctrl_wrapper).find(".form_personnalmodel").each(function (index, item) {
                var wrapperid = item; //$(ctrl_wrapper).find(class_base.getattr($(wrapperid), "data-relatectrl"));
                var _relatectrl = class_base.getattr($(wrapperid), "data-relatectrl");
                var _stage = class_base.getattr($(wrapperid), "data-stage");
                var _type = class_base.getattr($(wrapperid), "data-type");
                class_share.loadmodel(_relatectrl, wrapperid, _stage, _type, _jobnumber);
            });
            //            var wrapperid = $(ctrl_wrapper).find(global_config.form_td_chiefcomplaint_wrapper);
            //            var _stage = class_base.getattr($(wrapperid), "data-stage");
            //            var _type = class_base.getattr($(wrapperid), "data-type");
            //            class_share.loadmodel(global_config.tmpl_chiefcomplaint, wrapperid, _stage, _type, _jobnumber);

            //            wrapperid = $(ctrl_wrapper).find(global_config.form_td_suggestion_wrapper);
            //            _stage = class_base.getattr($(wrapperid), "data-stage");
            //            _type = class_base.getattr($(wrapperid), "data-type");
            //            class_share.loadmodel(global_config.tmpl_suggestion, wrapperid, _stage, _type, _jobnumber);

            //            wrapperid = $(ctrl_wrapper).find(global_config.form_td_guide_wrapper);
            //            _stage = class_base.getattr($(wrapperid), "data-stage");
            //            _type = class_base.getattr($(wrapperid), "data-type");
            //            class_share.loadmodel(global_config.tmpl_guide, wrapperid, _stage, _type, _jobnumber);

            //            wrapperid = $(ctrl_wrapper).find(global_config.form_td_presenthistory_wrapper);
            //            _stage = class_base.getattr($(wrapperid), "data-stage");
            //            _type = class_base.getattr($(wrapperid), "data-type");
            //            class_share.loadmodel(global_config.tmpl_presenthistory, wrapperid, _stage, _type, _jobnumber);
        }
        if (mod == webglobal.enum_mod.add) {

            //默认宣教内容
            loaddelfaultmodel(ctrl_wrapper);
        }
        //检验导入
        $(ctrl_wrapper).find(global_config.btn_laborder_import).unbind("click").on("click", function () {
            class_base.showwindow($(global_config.win_laborder_import));

            return false;
        });
        //检查导入
        $(ctrl_wrapper).find(global_config.btn_examorder_import).unbind("click").on("click", function () {
            class_base.showwindow($(global_config.win_examorder_import));
            return false;
        });

        if (mod != webglobal.enum_mod.view) {
            LeaveCheckUtil.leave(global_config.list_wrapper, "离开前是否保存？", mod_list.save_CurOpenedRow, mod_list.isChange_CurOpenedRow, clearCache);

            bindkeydown();
        }
    }
    function clearCache(callback) {
        class_share.clearCacheRecord(global_config.enum_cachetype, callback);
    }
    function bindkeydown() {
        mod_list.bindkeydown();
    }
    function autowidth(ctrl_wrapper) {
        //自适应宽度
        var w = $(ctrl_wrapper).parents(global_config.list_model_wrapper).width() * 0.96;
        var td_w = $(ctrl_wrapper).find(".form_td_widthflag").find("span").width();
        myextend.setCustomTable(parseInt(w, 10), parseInt(td_w, 10) <= 0 ? 74 : parseInt(td_w, 10), global_config.table_wrapper);
    }

    function loaddelfaultmodel(ctrl_wrapper) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                class_base.setVal(global_config.tmpl_guide, data.info.guide, ctrl_wrapper);
            }
        };

        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        _req.todic(dictionary);

        myextend.ajaxPost_simple(global_config.sr_defaultguide, dictionary, web_list_callback, true);
    }

    function show(data, mod, ctrl_wrapper, options) {

        using(function () {
            global_config = options;

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
        });
    }
    function save(ctrl_wrapper) {
        mod_onemodel.save(ctrl_wrapper);
    }
    function setLabOrder(ctrl_wrapper, data) {
        if (data != null && data != undefined) {
            var wrapperid = $(ctrl_wrapper).find(global_config.btn_laborder_import);
            var _relatectrl = class_base.getattr($(wrapperid), "data-relatectrl");
            var s = class_base.getVal(_relatectrl, ctrl_wrapper);

            base.setVal(_relatectrl, s == "" || s == null || s == undefined ? data : s + "\r\n" + data, ctrl_wrapper);
            //            var news = "检验：" + data;
            //            class_base.setVal(_relatectrl, s == "" || s == null || s == undefined ? news : s + "\r\n" + news, ctrl_wrapper);
        }
    }
    function setExamOrder(ctrl_wrapper, data) {
        if (data != null && data != undefined) {
            var wrapperid = $(ctrl_wrapper).find(global_config.btn_examorder_import);
            var _relatectrl = class_base.getattr($(wrapperid), "data-relatectrl");
            var s = class_base.getVal(_relatectrl, ctrl_wrapper);
            base.setVal(_relatectrl, s == "" || s == null || s == undefined ? data : s + "\r\n" + data, ctrl_wrapper);
            //            var news = "检查：" + data;
            //            class_base.setVal(_relatectrl, s == "" || s == null || s == undefined ? news : s + "\r\n" + news, ctrl_wrapper);
        }
    }

    function setDiagnosis(ctrl_wrapper, data) {
        class_diagnosis.set(data);
    }

    function getDiagnosis(ctrl_wrapper, class_base) {
        return class_diagnosis.get();
    }

    function onsave(ctrl_wrapper, class_base) {
        if (global_config.diagnosis == undefined || global_config.diagnosis == null) return;
        var d = getDiagnosis(ctrl_wrapper, class_base);
        class_base.setVal(global_config.diagnosis.tmpl_diagnosisdic, JSON.stringify(d), ctrl_wrapper);
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


    return {
        show: show,
        autowidth: autowidth,
        getDiagnosis: getDiagnosis,
        setDiagnosis: setDiagnosis,
        onsave: onsave,
        setLabOrder: setLabOrder,
        setExamOrder: setExamOrder
    }
});