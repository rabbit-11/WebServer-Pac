define(function () {
    var globalwrapper = null;
    var group = "pregnanthistory"; //默认组别
    var globalmod = "";

    //初始化界面
    function initstate() { }
    //数据载入
    function loaddata(data, mod) {
        if (globalwrapper == null || globalwrapper == undefined) return;
        require(["tmpl", 'jquery', "jextend", "easyui"], function () {
            if (mod != webglobal.enum_mod.view) {
                //初始化数据
                if (myextend.isNull(data)) {
                    data = [{ "index": 1}];
                }
            }
            if (myextend.isNull(data))
                return;

            //加入组号
            $.map(data, function (d) {
                d.group = group;
            });
            $.get(webglobal.templates.mod_pregnanthistory, { stamp: Math.random() + 1 }, function (template) {
                $.template("myTemplate", template);
                $(globalwrapper).parent().find(".tr_pregnanthistory").remove();
                $(globalwrapper).after($.tmpl("myTemplate", data));
                require(["base_usercontrol"], function (a) {
                    $.each(data, function (index, item) {
                        var myrow = $(globalwrapper).parent().find("tr.tr_pregnanthistory[data-index=" + item.index + "]");
                        a.drawcontrol(myrow, mod, item, prerender, afterrender);
                        if (mod == webglobal.enum_mod.view) {
                            myrow.find("a.plus").hide();
                            myrow.find("a.minus").hide();
                        }
                        else {
                            myrow.find("a.plus").show();
                            myrow.find("a.minus").show();
                        }
                        myrow.find("a.plus").unbind("click").on("click", function () {
                            add($(myrow));
                        });
                        myrow.find("a.minus").unbind("click").on("click", function () {
                            del($(myrow));
                        });
                    });
                });

            });
        });
    }
    //新增
    function loadadd(ctrl_wrapper, data) {
        globalwrapper = ctrl_wrapper;
        globalmod = webglobal.enum_mod.add;
        loaddata(data, globalmod);
    }
    //编辑
    function loadedit(ctrl_wrapper, data) {
        globalwrapper = ctrl_wrapper;
        globalmod = webglobal.enum_mod.edit;
        loaddata(data, globalmod);
    }
    //只读
    function loadview(ctrl_wrapper, data) {
        globalwrapper = ctrl_wrapper;
        globalmod = webglobal.enum_mod.view;
        loaddata(data, globalmod);
    }
    //渲染前
    function prerender(ctrl_wrapper) {

    }
    //渲染后
    function afterrender() {
        if (globalmod != webglobal.enum_mod.view) {
            autowidth();
            bindkeydown();
        }
    }
    function bindkeydown() {
        require(["common", "jquery"], function () {
            PressUtil.bindkeydown($("#mod_wrapper"), true, { btn_save: $("#mod_wrapper").find("#btn_save") });
        });
    }
    //添加
    function add(ctrl_wrapper) {
        require(["tmpl", "base_usercontrol", 'jquery', "jextend", "easyui"], function () {
            $.get(webglobal.templates.mod_pregnanthistory, { stamp: Math.random() + 1 }, function (template) {
                var myrow = $(ctrl_wrapper);
                var data = [{ "index": myrow.parent().find("tr.tr_pregnanthistory").length + 1, "group": group}];
                //template
                $.template("myTemplate", template);
                var newrow = myrow.after($.tmpl("myTemplate", data));
                require(["base_usercontrol"], function (a) {
                    $.each(data, function (index, item) {
                        if (!myextend.isNull(item))
                            item.index = index;
                        newrow = $(newrow).next();
                        a.drawcontrol(newrow, webglobal.enum_mod.edit, item, prerender, afterrender);
                        newrow.find("a.plus").unbind("click").on("click", function () {
                            add($(newrow));
                        });
                        newrow.find("a.minus").unbind("click").on("click", function () {
                            del($(newrow));
                        });
                    });
                });
            });
        });
    }
    //删除
    function del(ctrl_wrapper) {
        require(["jquery"], function () {
            var myrow = $(ctrl_wrapper);
            if (myrow.parent().find("tr.tr_pregnanthistory").length > 1) {
                myrow.remove();
                afterrender();
            }
        });
    }
    function autowidth() {
        var mod_wrapper = $("#mod_wrapper");
        require(["jextend"], function () {
            $(document).ready(function () {
                //自适应宽度
                var w = $(mod_wrapper).width() * 0.96;
                var td_w = $(mod_wrapper).find(".form_td_widthflag").find("span").width();
                myextend.setCustomTable(parseInt(w, 10), parseInt(td_w, 10) <= 0 ? 74 : parseInt(td_w, 10), mod_wrapper);
            });
        });
    }

    return {
        loadadd: loadadd,
        loadview: loadview,
        loadedit: loadedit
    }
});