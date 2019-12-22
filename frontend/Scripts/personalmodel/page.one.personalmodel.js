define(function () {
    var wrapper_name = "#win_mod_one_personalmodel_wrapper";
    function show() {
        var id = geturlparam("id");

        ReadOnePersonalModel();
    }
    function geturlparam(name) {
        var form = $(wrapper_name).parents("form");
        var url = form.attr("action");
        return myextend.getBaseUrlParam(name, url, true);
    }
    //数据载入
    function loaddata(data, mod, ctrl_wrapper) {
        if (ctrl_wrapper == null || ctrl_wrapper == undefined) return;
        var arr = [];
        arr.push(data); 
        $(ctrl_wrapper).html("");
        $.get(webglobal.templates.mod_one_personalmodel, { stamp: Math.random() + 1 }, function (template) {
            require(["base_usercontrol", "tmpl", 'jquery', "jextend", "easyui"], function (base) {
                //template
                $.template("myTemplate", template);
                var newrow = $(ctrl_wrapper).html($.tmpl("myTemplate", arr));

                initstate(ctrl_wrapper, base, data);

                base.drawcontrol($(ctrl_wrapper), mod, true, prerender, afterrender);
            });
        });
    }
    //初始化界面
    function initstate(ctrl_wrapper, base, data) {
        //保存
        EventUtil.bindclick(getCtrl(ctrl_wrapper, ".btn_model_save"), save);

        var ispregweek = data.ispregweek;
        if (ispregweek != undefined && ispregweek != null && ispregweek) {
            setPlaceHolder($(wrapper_name));
        }

        var canshare = data.canshare;
        if (canshare != undefined && canshare != null && canshare) {
            $(ctrl_wrapper).find(".tr_share_wrapper").show();
        }
        else {
            $(ctrl_wrapper).find(".tr_share_wrapper").hide();
        }
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
        autowidth(ctrl_wrapper);
    }
    function autowidth(ctrl_wrapper) {
        //自适应宽度
        var w = $(ctrl_wrapper).width() * 0.96;
        var td_w = $(ctrl_wrapper).find(".form_td_widthflag").find("span").width();
        myextend.setCustomTable(parseInt(w, 10), parseInt(td_w, 10) <= 0 ? 74 : parseInt(td_w, 10), '.customtable');
    }
    function ReadOnePersonalModel() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {

                if (data.info.id > 0 && !isNaN(data.info.id)) {
                    loadedit(data.info, $(wrapper_name));
                }
                else {
                    loadadd(data.info, $(wrapper_name));
                }
            }
        };

        var dictionary = new myextend.Dictionary();
        dictionary.set("id", geturlparam("id"));
        dictionary.set("modeltypeid", geturlparam("modeltypeid"));
        dictionary.set("doctorid", geturlparam("doctorid"));
        dictionary.set("doctorname", geturlparam("doctorname"));
        dictionary.set("jigoudm", geturlparam("jigoudm"));

       // myextend.ajaxPost_simple(webglobal.services.GetOnePersonalGuide, dictionary, web_list_callback, true);
        myextend.ajaxGet_simple(webglobal.services.GetOnePersonalGuide, dictionary, web_list_callback, true);

    }
    function getCtrl(ctrl_wrapper, selector) {
        return $(ctrl_wrapper).find(selector);
    }
    function getID(wrapper) {
        var t = getCtrl(wrapper, "input[data-id='tmpl_id']");
        if (t != null && t != undefined) {
            return parseInt(t.val(), 10);
        }
    }
    function getModelTypeID(wrapper) {
        var t = getCtrl(wrapper, "input[data-id='tmpl_modeltypeid']");
        if (t != null && t != undefined) {
            return parseInt(t.val(), 10);
        }
    }
    function setPlaceHolder(wrapper) {
        var t = getCtrl(wrapper, ".td_textbox[data-id='tmpl_diseasename']");
        if (t != null && t != undefined) {
            return t.attr("data-placeholder", "[开始孕周]-[结束孕周]，如 1-45 ");
        }
    }
    function setID(wrapper, id) {
        if (wrapper == null || wrapper == undefined) return;
        var t = getCtrl(wrapper, "input[data-id='tmpl_id']");
        if (t != null && t != undefined) {
            t.val(id);
            t.attr("data-value", id);
        }
    }
    function save(sender) {
        require(["base_usercontrol", "jquery", "common", "jextend", "web_global", "easyui"], function (base) {
            var id = getID($(wrapper_name));
            var data_in = base.getFormDic($(wrapper_name), true); //id <= 0 || isNaN(id)编辑或新增，都全部提交，忽略是否修改
            if (data_in != null && data_in != undefined) {
                data_in.modeltypeid = getModelTypeID($(wrapper_name));
            }
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    //                    TipUtil.ShowSuccess("保存成功");
                    //                    setID($(wrapper_name), data.info.id);
                    //                    base.reload($(wrapper_name));

                    //                    setTimeout(function () {
                    var json = "";
                    if (data != null && data != undefined)
                        json = JSON.stringify(data);
                    var mywindow = $(wrapper_name).parents(".mywindow");
                    if (mywindow != null && mywindow != undefined) {
                        base.setattr(mywindow, "data-back", json);
                        mywindow.window('close');
                    }
                    //                    }, 2000);
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

            var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(data_in));
            if (dataparam == "" || dataparam == undefined)
                return;
            myextend.ajaxPost(webglobal.services.SavePersonalModel, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);

        });
    }
    return { show: show }
});

