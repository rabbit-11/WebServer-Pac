define(function () {
    var cache_data = null;
    //初始化界面
    function initstate(ctrl_wrapper) {

    }
    //数据载入
    function loaddata(data, mod, ctrl_wrapper) {
        if (ctrl_wrapper == null || ctrl_wrapper == undefined) return;
        var arr = [];
        arr.push(data);
        cache_data = data;
        require(["base_usercontrol", "tmpl", 'jquery', "jextend", "easyui"], function (base) {
            $.get(webglobal.templates.one_visitrecord_summary, { stamp: Math.random() + 1 }, function (template) {

                //template
                $.template("myTemplate", template);
                var newrow = $(ctrl_wrapper).html($.tmpl("myTemplate", arr));
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
    }
    //渲染后
    function afterrender(ctrl_wrapper, mod) {

        var refreshMultifetal = cache_data.refreshMultifetal; //;sharebase.getattr(ctrl_wrapper, "data-refreshMultifetal") == "true";

        var ctrl = getCtrl(ctrl_wrapper, "[data-id='cache_multifetal']");
        var m = ctrl != null && ctrl != undefined ? ctrl.attr("data-value") : "";
        var tmp = null;
        if (!myextend.isNull(m))
            tmp = JSON.parse(m);
        else tmp = [];
        if (tmp != null && tmp != undefined && tmp.length > 1 && (mod != webglobal.enum_mod.view || refreshMultifetal)) {
            setMultifetal(ctrl_wrapper, tmp);
        }
        if (mod == webglobal.enum_mod.add) {
            getPredignosis(ctrl_wrapper);
        }
        //$(ctrl_wrapper).find(".textbox-addon").hide();

        myextend.setCtrlWidth($(ctrl_wrapper));
        if (mod != webglobal.enum_mod.view)
            bindkeydown();
    }
    function bindkeydown() {
        require(["list_visitrecord"], function (list) {
            list.bindkeydown();
        });
    }
    function show(data, mod, ctrl_wrapper) {
        //新增
        if (mod == webglobal.enum_mod.add) {
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

    function getCtrl(ctrl_wrapper, selector) {
        return $(ctrl_wrapper).find(selector);
    }
    function getCtrl_Label(ctrl_wrapper, dataid) {
        return $(ctrl_wrapper).find("[data-id='" + dataid + "']").next(".td_label");
    }
    function editOrView(ctrl_wrapper, dataid, edit) {
        var ctrl = getCtrl(ctrl_wrapper, "[data-id='" + dataid + "']");
        if (ctrl != null && ctrl != undefined) {
            ctrl.next(".td_label").width($(ctrl).parent().width());
            if (!edit) {
                ctrl.addClass("hidden");
                ctrl.next(".td_label").removeClass("hidden");
            }
            else {
                ctrl.removeClass("hidden");
                ctrl.next(".td_label").addClass("hidden");
            }
        }
    }

    //获取多胎
    function getMultifetal(ctrl_wrapper, base) {
        if (base == null || base == undefined) return null;
        if (ctrl_wrapper == null || ctrl_wrapper == undefined) return null;

        var fetal = {};
        var tmpl_fetalheartrates = base.getVal("tmpl_fetalheartrates", ctrl_wrapper);
        var tmpl_fetalpositions = base.getVal("tmpl_fetalpositions", ctrl_wrapper);
        var tmpl_presentpositions = base.getVal("tmpl_presentpositions", ctrl_wrapper);
        var tmpl_fetalmoves = base.getVal("tmpl_fetalmoves", ctrl_wrapper);

        var ctrl_fetalheartrates = getCtrl(ctrl_wrapper, "[data-id='tmpl_fetalheartrates']");
        if (ctrl_fetalheartrates != null && ctrl_fetalheartrates != undefined) {
            if (ctrl_fetalheartrates.is(".hidden")) {
                return null;
            }
        }
        fetal.index = 0;
        fetal.position = tmpl_fetalpositions;
        fetal.heartrate = tmpl_fetalheartrates;
        fetal.presentposition = tmpl_presentpositions;
        fetal.fetalmove = tmpl_fetalmoves;

        var arr = [];
        arr.push(fetal);
        return arr;
    }
    //设置多胎
    function setMultifetal(ctrl_wrapper, data) {
        transMultifetal(ctrl_wrapper, data);
    }
    function transMultifetal(ctrl_wrapper, _data) {
        if (_data == null || _data == undefined || _data.length <= 0) return;
        require(["base_usercontrol", "jquery", "common", "jextend", "web_global"], function (base) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    var edit = _data == null || _data == undefined || _data.length <= 1;

                    editOrView(ctrl_wrapper, "tmpl_fetalheartrates", edit); //胎心
                    editOrView(ctrl_wrapper, "tmpl_fetalpositions", edit); //胎位
                    editOrView(ctrl_wrapper, "tmpl_presentpositions", edit); //先露
                    editOrView(ctrl_wrapper, "tmpl_fetalmoves", edit); //胎动

                    if (data.info != null && data.info != undefined) {
                        if (edit) {
                            base.setVal("tmpl_fetalheartrates", data.info.fetalheartrates, ctrl_wrapper);
                            base.setVal("tmpl_fetalpositions", data.info.fetalpositions, ctrl_wrapper);
                            base.setVal("tmpl_presentpositions", data.info.presentpositions, ctrl_wrapper);
                            base.setVal("tmpl_fetalmoves", data.info.fetalmoves, ctrl_wrapper);
                        }
                        else {
                            var c = getCtrl_Label(ctrl_wrapper, "tmpl_fetalheartrates");
                            if (c != null && c != undefined) {
                                c.html(data.info.fetalheartrates);
                            }
                            c = getCtrl_Label(ctrl_wrapper, "tmpl_fetalpositions");
                            if (c != null && c != undefined) {
                                c.html(data.info.fetalpositions);
                            }
                            c = getCtrl_Label(ctrl_wrapper, "tmpl_presentpositions");
                            if (c != null && c != undefined) {
                                c.html(data.info.presentpositions);
                            }
                            c = getCtrl_Label(ctrl_wrapper, "tmpl_fetalmoves");
                            if (c != null && c != undefined) {
                                c.html(data.info.fetalmoves);
                            }
                        }

                        bindkeydown();
                    }
                }
            };

            var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(_data));
            if (dataparam == "" || dataparam == undefined)
                return;

            myextend.ajaxPost(webglobal.services.GetMultiFetal, dataparam, web_list_callback, null, null, null, true);

        });
    }

    //预诊
    function getPredignosis(ctrl_wrapper) {
        require(["share_services", "base_usercontrol"], function (share, base) {
            share.getPreDiagnosis(ctrl_wrapper, function (ctrl_wrapper, data) {
                if (data == null || data == undefined) return;
                if (data.sbp > 0 && !isNaN(data.sbp)) {
                    base.setVal("tmpl_sbp", data.sbp, ctrl_wrapper);
                }
                if (data.dbp > 0 && !isNaN(data.dbp)) {
                    base.setVal("tmpl_dbp", data.dbp, ctrl_wrapper);
                }
                if (data.weight > 0 && !isNaN(data.weight)) {
                    base.setVal("tmpl_weight", data.weight, ctrl_wrapper);
                }
                if (data.heightfundusuterus > 0 && !isNaN(data.heightfundusuterus)) {
                    base.setVal("tmpl_heightfundusuterus", data.heightfundusuterus, ctrl_wrapper);
                }
                if (data.abdomencircumference > 0 && !isNaN(data.abdomencircumference)) {
                    base.setVal("tmpl_abdomencircumference", data.abdomencircumference, ctrl_wrapper);
                }
                if (data.heartrate > 0 && !isNaN(data.heartrate)) {
                    base.setVal("tmpl_heartrate", data.heartrate, ctrl_wrapper);
                }
                if (data.edemastatus != "" && data.edemastatus != undefined && data.edemastatus != null) {
                    base.setVal("tmpl_edemastatus", data.edemastatus, ctrl_wrapper);
                }
                if (data.xianjie != "" && data.xianjie != undefined && data.xianjie != null) {
                    base.setVal("tmpl_xianjie", data.xianjie, ctrl_wrapper);
                }
                if (data.followupappointment != "" && data.followupappointment != undefined && data.followupappointment != null) {
                    base.setVal("tmpl_followupappointment", data.followupappointment, ctrl_wrapper);
                }
                if (data.multifetal != null && data.multifetal != undefined && data.multifetal != "") {
                    require(["list_visitrecord"], function (a) {
                        a.setMultifetal(JSON.parse(data.multifetal));
                    });
                }
            });
        });
    }
    //检查日期
    function getVisitDate(ctrl_wrapper, base) {
        if (base == null || base == undefined) return null;
        if (ctrl_wrapper == null || ctrl_wrapper == undefined) return null;

        var tmpl_visitdate = base.getVal("tmpl_visitdate", ctrl_wrapper);
        return myextend.myparser(tmpl_visitdate);
    }
    function refresh(ctrl_wrapper, data) {
        require(["base_usercontrol"], function (base) {
            base.reload_reverse(ctrl_wrapper, data);
        });
    }
    return {
        loadadd: loadadd,
        loadview: loadview,
        loadedit: loadedit,
        show: show,
        getMultifetal: getMultifetal,
        setMultifetal: setMultifetal,
        getVisitDate: getVisitDate,
        refresh: refresh
    }
});