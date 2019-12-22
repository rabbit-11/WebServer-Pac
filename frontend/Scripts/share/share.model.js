define(function () {
    var global_config = {
        btn_save: null,
        btn_print: null,
        btn_chufang: null,
        btn_examorder: null,
        btn_laborder: null,
        btn_mydelete: null,
        btn_diff: null,
        wrapper: null,
        form: null,
        template: null,
        sr_getone: null,
        sr_delete: null,
        sr_save: null,
        sr_print: null,
        en_printtype: null,
        en_difftype: null,
        event_initstate: null,
        event_save: null,
        win_chufang: null,
        win_examorder: null,
        win_laborder: null,
        table_wrapper: null,
        en_cachetype: null
    };

    var global_id = "tmpl_id";
    var global_wrapper = global_config.wrapper;
    var global_mod = null;
    var class_share = null;
    var class_base = null;

    function getCtrl(id) {
        return $(global_wrapper).find(id);
    }
    function getID() {
        var t = getCtrl("[data-id='" + global_id + "']");
        if (t != null && t != undefined) {
            return parseInt(t.val(), 10);
        }
    }
    function setID(id) {
        var t = getCtrl("[data-id='" + global_id + "']");
        if (t != null && t != undefined) {
            t.val(id);
        }
    }

    //初始化界面
    function initstate() {
        autowidth($(global_wrapper));
        $(global_wrapper).find(".panel-htop").remove();
        reload();

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
        if (global_config.event_initstate != null && global_config.event_initstate != undefined) {
            global_config.event_initstate(global_mod);
        }
    }
    function reload() {
        var hasfile = getID() > 0;
        var _req = myrequest.getrequest();
        //保存
        var btn_save = getCtrl(global_config.btn_save);
        EventUtil.showOrHide(btn_save, global_mod != webglobal.enum_mod.view && !_req.isInWhite());
        EventUtil.bindclick(btn_save, save);
        //打印
        var btn_print = getCtrl(global_config.btn_print);
        EventUtil.showOrHide(btn_print, hasfile);
        EventUtil.bindclick(btn_print, print);
        //删除
        var btn_mydelete = getCtrl(global_config.btn_mydelete);
        EventUtil.showOrHide(btn_mydelete, hasfile);
        EventUtil.bindclick(btn_mydelete, mydelete);
        //痕迹
        var btn_diff = getCtrl(global_config.btn_diff);
        EventUtil.showOrHide(btn_diff, hasfile);
        if (!myextend.isNull(btn_diff)) {
            var baseurl = webglobal.pages.Page_DiffList;
            var _req = myrequest.getrequest();
            baseurl = myextend.UrlUpdateParams(baseurl, "attachedid", getID());
            baseurl = myextend.UrlUpdateParams(baseurl, "attachedtype", global_config.en_difftype);
            baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", _req.jigoudm);
            btn_diff.attr("href", baseurl);
        }
    }
    function geturl() {
        var t = $(global_config.wrapper).parents(".window-body").attr("data-url");
        if (myextend.isNull(t)) return window.location.href;
        return t;
    }
    //数据载入
    function loaddata(data) {
        if (global_wrapper == null || global_wrapper == undefined) return;
        $.get(global_config.template, { stamp: Math.random() + 1 }, function (template) {
            var arr = [];
            arr.push(data);
            //template
            $.template("myTemplate", template);
            var newrow = $(global_wrapper).html($.tmpl("myTemplate", arr));
            initstate();
            class_base.drawcontrol($(global_wrapper), global_mod, true, prerender, afterrender);
        });
    }
    //新增
    function loadadd(data) {
        global_mod = webglobal.enum_mod.add;
        loaddata(data);
    }
    //编辑
    function loadedit(data) {
        global_mod = webglobal.enum_mod.edit;
        loaddata(data);
    }
    //只读
    function loadview(data) {
        global_mod = webglobal.enum_mod.view;
        loaddata(data);
    }
    //渲染前
    function prerender() {
        MaskUtil.mask($(global_wrapper), "正在加载，请稍候...");
    }
    //渲染后
    function afterrender(data) {
        MaskUtil.unmask($(global_wrapper));
        bindkeydown();
        autowidth();

        if (global_mod != webglobal.enum_mod.view) {
            LeaveCheckUtil.leave(global_config.form, "离开前是否保存？", save, null, clearCache);

            bathloadmodel();
            saveCache();
        }
        if (global_config.event_afterrender != null && global_config.event_afterrender != undefined) {
            global_config.event_afterrender(global_mod);
        }
    }
    function bathloadmodel() {
        var _req = myrequest.getrequest();
        var _jobnumber = _req.jobnumber;
        $(global_wrapper).find(".form_personnalmodel").each(function (index, item) {
            var wrapperid = item;
            var _relatectrl = class_base.getattr($(wrapperid), "data-relatectrl");
            var _stage = class_base.getattr($(wrapperid), "data-stage");
            var _type = class_base.getattr($(wrapperid), "data-type");
            class_share.loadmodel(_relatectrl, wrapperid, _stage, _type, _jobnumber);
        });
    }

    function clearCache(callback) {
        class_share.clearCacheRecord(global_config.en_cachetype, callback);
    }
    function bindkeydown() {
        PressUtil.bindkeydown($(global_wrapper), true, { btn_save: $(global_wrapper).find(global_config.btn_save) });
    }
    //保存
    function save(sender, success_callback, e) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                TipUtil.ShowSuccess("保存成功");

                setID(data.info.id);
                reload();
                class_base.reload(global_wrapper);

                if (success_callback != null) {
                    success_callback(sender, e);
                }
                if (global_config.event_save != null && global_config.event_save != undefined) {
                    global_config.event_save(data.info.id);
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

        var data = class_base.getFormDic(global_wrapper, global_mod == webglobal.enum_mod.add);
        if (data == null || data == undefined) return;

        //获取参数
        var _req = myrequest.getrequest();
        _req.todata(data);
        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(data));
        if (dataparam == "" || dataparam == undefined)
            return;
        myextend.ajaxPost(global_config.sr_save, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
    }
    function mydelete() {
        var id = getID();
        if (id <= 0 || isNaN(id)) {
            $.messager.alert('错误', "记录不存在");
            return;
        }

        //提示
        $.messager.confirm('提示', "确认删除 所选 记录？", function (r) {
            if (r) {
                do_mydelete(id);
            }
        });
    }
    function do_mydelete(id) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                setID(0);
                reload();
            }
            else {
                $.messager.alert('提示', data.msg);
            }
        };
        var web_list_bef_callback = function (data) {
            MaskUtil.mask($(global_wrapper), "正在删除...");
        };
        var web_list_com_callback = function (data) {
            MaskUtil.unmask($(global_wrapper));
        };
        var web_list_err_callback = function (data) { };

        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("id", id);
        _req.todic(dictionary);

        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
        if (dataparam == "" || dataparam == undefined)
            return;
        myextend.ajaxPost(global_config.sr_delete, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
    }

    function autowidth() {
        require(["jextend"], function () {
            $(document).ready(function () {
                //自适应宽度
                var w = $(global_wrapper).width() * 0.96;
                var td_w = $(global_wrapper).find(".form_td_widthflag").find("span").width();
                myextend.setCustomTable(parseInt(w, 10), parseInt(td_w, 10) <= 0 ? 74 : parseInt(td_w, 10), global_config.table_wrapper);
            });
        });
    }
    function using(callback) {
        require(["share_services", "base_usercontrol", "tmpl", "jquery", "common", "jextend", "web_global", "easyui"], function (s, b) {
            class_base = b;
            class_share = s;

            if (callback != null && callback != undefined) {
                callback();
            }
        });
    }
    function loadone(callback) {
        //获取参数
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        _req.todic(dictionary);

        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                if (data.info.mod == webglobal.enum_mod.add && _req.isInWhite()) {
                    global_config.template = webglobal.templates.norecord;
                }
                if (callback == undefined || callback == null || data.info.mod != webglobal.enum_mod.add)
                    show(data.info, data.info.mod, global_config);
                else {
                    callback(data.info, function (d) {
                        show(d, data.info.mod, global_config);
                    });
                }
            }
        };


        myextend.ajaxPost_simple(global_config.sr_getone, dictionary, web_list_callback, true);
        
    }
    function show_1(options, callback) {
        using(function () {
            global_config = options;
            loadone(callback);
        });
    }
    function show(data, mod, options) {
        using(function () {
            global_config = options;
            global_wrapper = global_config.wrapper;
            //新增
            if (mod == webglobal.enum_mod.add) {
                loadadd(data);
            }
            //编辑
            else if (mod == webglobal.enum_mod.edit) {
                loadedit(data);
            }
            //只读
            else if (mod == webglobal.enum_mod.view) {
                loadview(data);
            }
        });
    }
    function print() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                class_share.print(getID(), data.info.type);
            }
        };
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("q", global_config.en_printtype);
        dictionary.set("jigoudm", _req.jigoudm);

        myextend.ajaxPost_simple(global_config.sr_print, dictionary, web_list_callback, true);
    }
    //实时缓存
    function saveCache() {
        if (global_config.en_cachetype == null || global_config.en_cachetype == undefined) return;
        require(["thread"], function (a) {
            Concurrent.Thread.create(class_share.threadCacheRecord, global_config.en_cachetype, ischange, guiddata, class_share.addCacheRecord);
        });
    }
    function ischange() {
        return class_base.isChange($(global_wrapper));
    }
    function guiddata() {
        return class_base.getFormDic(global_wrapper, global_mod == webglobal.enum_mod.add);
    }
    function clearCache(callback) {
        class_share.clearCacheRecord(global_config.en_cachetype, callback);
    }
    return {
        show: show,
        getID: getID,
        global_mod: global_mod,
        getCtrl: getCtrl,
        save: save,
        geturl: geturl,
        show_1: show_1
    }
});
