define(function () {
    var cache_data = null;
    var global_config = {
        template: null
    };
    var class_base = null;
    var class_share = null;
    var mod_list = null

    function using(callback) {
        require(["list_model", "share_services", "base_usercontrol", "tmpl", "jextend", "easyui", "web_global", 'jquery'], function (l, s, b) {
            mod_list = l;
            class_base = b;
            class_share = s;


            if (callback != null && callback != undefined) {
                callback();
            }
        });
    }
    //初始化界面
    function initstate(ctrl_wrapper) {}
    //数据载入
    function loaddata(data, mod, ctrl_wrapper) {
        if (ctrl_wrapper == null || ctrl_wrapper == undefined) return;
        var arr = [];
        arr.push(data);
        cache_data = data;
        $.get(global_config.template, { stamp: Math.random() + 1 }, function (template) {

            //template
            $.template("myTemplate", template);
            var newrow = $(ctrl_wrapper).html($.tmpl("myTemplate", arr));
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
    }
    //渲染后
    function afterrender(ctrl_wrapper, mod) {
//        $(ctrl_wrapper).find(".textbox-addon").hide();

        myextend.setCtrlWidth($(ctrl_wrapper));

        if (mod != webglobal.enum_mod.view)
            bindkeydown();

    }
    function bindkeydown() {
        mod_list.bindkeydown();
    }
    function show(data, mod, ctrl_wrapper, options) {
        using(function () {
            global_config = options;
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
        });
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


    return {
        show: show
    }
});