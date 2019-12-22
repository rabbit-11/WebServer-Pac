define(function () {
    /** 
    * 绘制控件，面对外层调用的入口
    * @param myform 控件载体
    * @param mod 模式，分为view，edit，add
    * @param append 绘制控件时，是否覆盖当前父节点的html
    * @param bef_callback 绘制前回调函数
    * @param com_callback 绘制后回调函数
    */
    function drawcontrol(myform, mod, append, bef_callback, com_callback) {
        if (bef_callback) {
            bef_callback();
        }
        if (mod == webglobal.enum_mod.view) {
            drawcontrol_view(myform, append, mod, com_callback);
            return;
        }
        if (mod == webglobal.enum_mod.edit) {
            drawcontrol_edit(myform, append, mod, com_callback);
            return;
        }
        if (mod == webglobal.enum_mod.add) {
            drawcontrol_edit(myform, append, mod, com_callback);
            return;
        }
    }
    /** 
    * 绘制控件，只读模式
    * @param myform 控件载体
    * @param append 绘制控件时，是否覆盖当前父节点的html
    * @param mod 模式，分为view，edit，add
    * @param com_callback 绘制后回调函数
    */
    function drawcontrol_view(myform, append, mod, com_callback) {
        require(["jquery"], function () {
            $(myform).find(".form_td_ctrl").not(".td_hidden").each(function (index, item) {
                var data_html = label.add(item);
                if (data_html == undefined) {
                    var t = data_html;
                }
                commonctrl.addhtml(item, data_html, append);

            });
            if (com_callback) {
                com_callback(myform, mod);
            }
        });
    }
    /** 
    * 绘制控件，编辑或新增模式
    * @param myform 控件载体
    * @param append 绘制控件时，是否覆盖当前父节点的html
    * @param mod 模式，分为view，edit，add
    * @param com_callback 绘制后回调函数
    */
    function drawcontrol_edit(myform, append, mod, com_callback) {
        require(["jquery", "jextend", "cookie", "easyui", "locale", "easyuiextend"], function () {
            //文本框
            $(myform).find(".form_td_ctrl").each(function (index, item) {
                var data_html = "";
                var adddefault = mod == webglobal.enum_mod.add;
                //文本框
                if ($(item).is(".td_textbox")) {
                    data_html = textbox.add(item);
                    var needbind = textbox.needbind(item);
                    commonctrl.addhtml(item, data_html, append);
                    if (needbind) textbox.bind(item);
                }
                else if ($(item).is(".td_combobox")) {
                    data_html = combobox.add(item);
                    commonctrl.addhtml(item, data_html, append);
                    combobox.bind(item, adddefault);
                }
                else if ($(item).is(".td_combogrid")) {
                    data_html = combogrid.add(item);
                    commonctrl.addhtml(item, data_html, append);
                    combogrid.bind(item, adddefault);
                }
                else if ($(item).is(".td_datepicker")) {
                    data_html = datepicker.add(item);
                    commonctrl.addhtml(item, data_html, append);
                    datepicker.bind(item);
                }
                else if ($(item).is(".td_datetimebox")) {
                    data_html = datetimebox.add(item);
                    commonctrl.addhtml(item, data_html, append);
                    datetimebox.bind(item);
                }
                else if ($(item).is(".td_dropdowntree")) {
                    data_html = combotree.add(item);
                    commonctrl.addhtml(item, data_html, append);
                    combotree.bind(item, adddefault);
                }
                else if ($(item).is(".td_dropdowntree_async")) {
                    data_html = combotree_async.add(item);
                    commonctrl.addhtml(item, data_html, append);
                    combotree_async.bind(item, adddefault);
                }
                else if ($(item).is(".td_label")) {
                    data_html = label.add(item);
                    commonctrl.addhtml(item, data_html, append);
                }
                else if ($(item).is(".td_checkbox")) {
                    data_html = checkbox.add(item);
                    commonctrl.addhtml(item, data_html, append, true);
                    checkbox.bind(item, adddefault);
                }
                else if ($(item).is(".td_numberbox")) {
                    data_html = numberbox.add(item);
                    commonctrl.addhtml(item, data_html, append);
                    numberbox.bind(item);
                }
            });
            //防止easyui控件溢出
            myextend.setCtrlWidth($(myform));
            textbox.bindAutoTextArea($(myform));
            if (com_callback) {
                com_callback(myform, mod);
            }
        });
    }

    /** 
    * 根据修改过的内容同步缓存data-value
    * @param myform 控件载体
    */
    function reload(myform) {
        $(myform).find(".form_td_ctrl").each(function (index, item) {
            var oldval = commonctrl.getattr(item, "data-value");
            var newrtn = getVal_1(item);
            if (newrtn != null && newrtn != undefined && newrtn.hasfinded == true) {
                var newval = newrtn.value;
                if ((oldval + "") != (newval + "")) {
                    $(item).attr("data-value", newrtn.value);
                }
            }
        });
    }
    /** 
    * 根据缓存的内容填入控件
    * @param myform 控件载体
    * @param data 数据
    */
    function reload_reverse(myform, data, cover) {
        $.each(data, function (i, val) {
            var item = getCtrlById(myform, i);
            if (item != null && item != undefined) {
                if (cover == undefined || cover == null) {
                    setValByCtrl(item, val, myform);
                }
                else {
                    if (!cover) {
                        var newrtn = getVal_1(item);
                        if (newrtn != null && newrtn != undefined && newrtn.hasfinded == true) {
                            if ((newrtn.value == undefined || newrtn.value == null || newrtn.value == "") && val != "" && val != null) {
                                setValByCtrl(item, val, myform);
                            }
                        }
                    }
                    else {
                        var newrtn = getVal_1(item);
                        if (newrtn != null && newrtn != undefined && newrtn.hasfinded == true) {
                            if (val != "" && val != null) {
                                setValByCtrl(item, val, myform);
                            }
                        }
                    }
                }
            }
        });
    }
    /** 
    * 收集当前控件下所有的被修改过的字典内容
    * @param myform 控件载体
    * @param ignoreedited 是否忽略是否变更
    * @return obj：newitems表示修改后的内容，olditems表示修改前的内容
    */
    function getFormDic(myform, ignoreedited) {
        var new_dic = new myextend.Dictionary();
        var old_dic = new myextend.Dictionary();
        var all_dic_value = new myextend.Dictionary();
        var all_dic_text = new myextend.Dictionary();
        var required_arr = [];

        $(myform).find(".form_td_ctrl").each(function (index, item) {
            var id = commonctrl.getid(commonctrl.getattr(item, "data-id"));
            var index = commonctrl.getattr(item, "data-index");
            var group = commonctrl.getattr(item, "data-group");
            var oldval = commonctrl.getattr(item, "data-value");
            var required = commonctrl.getattr(item, "data-required") == "true";

            var newrtn_text = getText_1(item);
            if (newrtn_text != null && newrtn_text != undefined && newrtn_text.hasfinded == true) {
                var newval = newrtn_text.text;
                all_dic_text.set(id, newval);
            }
            var newrtn = getVal_1(item);
            if (newrtn != null && newrtn != undefined && newrtn.hasfinded == true) {
                var newval = newrtn.value;

                /*
                * 例如孕产史或多胎这种需要多行的特殊处理
                * 忽略是否修改内容，直接收集控件字典
                */
                if (!myextend.isNull(group)) {
                    var arr = null;
                    if (new_dic.has(group))
                        arr = new_dic.get(group);
                    else
                        arr = [];

                    var finditem = getOneInList(group, index, new_dic);
                    var isfinded = !myextend.isNull(finditem);
                    if (!isfinded) {
                        finditem = new Object();
                        finditem.index = index;
                    }
                    finditem[id] = newval;
                    if (!isfinded) arr.push(finditem);
                    new_dic.set(group, arr);
                }
                else {
                    //检查是否修改，若无改动，则不予处理
                    if (!myextend.isNull(id) && (oldval + "") != (newval + "") || ignoreedited) {
                        old_dic.set(id, oldval);
                        new_dic.set(id, newval);
                    }
                    all_dic_value.set(id, newval);

                    //检查必填项
                    if (((newval + "") == "" || newval == null) && required) {
                        required_arr.push(id);
                    }
                }
            }
        });
        var rtn = new Object();
        rtn.newitems = new_dic.getItems();
        rtn.olditems = old_dic.getItems();
        rtn.allitems_value = all_dic_value.getItems();
        rtn.allitems_text = all_dic_text.getItems();
        rtn.id = getDataID(myform); //数据主键
        rtn.reqitems = required_arr;
        return rtn;
    }

    /** 
    * 整个表单是否有过修改
    * @param myform 控件载体
    * @return flag 是否修改过
    */
    function isChange(myform) {
        var flag = false;
        $(myform).find(".form_td_ctrl").each(function (i, item) {
            try {
                var id = commonctrl.getid(commonctrl.getattr(item, "data-id"));
                var index = commonctrl.getattr(item, "data-index");
                var group = commonctrl.getattr(item, "data-group");
                var oldval = commonctrl.getattr(item, "data-value");
                var newrtn = getVal_1(item,noformat);
                if (newrtn != null && newrtn != undefined && newrtn.hasfinded == true) {
                    var newval = newrtn.value;

                    //检查是否修改，若无改动，则不予处理
                    if (!myextend.isNull(id)) {
                        //由于49.5当成字符串时会与49.50不同，所以分析做数字和字符串的区别
                        if (isNumber(newval)) {
                            if (Number((oldval + "").trim()) != Number((newval + "").trim())) {
                                //console.log("old:" + oldval + ",new:" + newval + ",item:" + id);
                                flag = true;
                            }
                        }
                        else {
                            if ((oldval + "").trim() != (newval + "").trim()) {
                                //console.log("old:" + oldval + ",new:" + newval + ",item:" + id);
                                flag = true;
                            }
                        }
                    }
                }
            }
            catch (e) {
                var c = e;
            }
        });
        return flag;
    }
    function isNumber(value) {         //验证是否为数字
        var patrn = /^(-)?\d+(\.\d+)?$/;
        if (patrn.exec(value) == null || value == "") {
            return false;
        } else {
            return true;
        }
    }

    /** 
    * 查找数据字典集中是否存在group和index同时匹配上的项
    * @param group 组别
    * @param index 组号
    * @param new_dic 数据字典集
    * @return finditem 查找到的结果
    */
    function getOneInList(group, index, new_dic) {
        if (myextend.isNull(new_dic)) return;
        if (!new_dic.has(group)) return null;
        var arr = new_dic.get(group);
        var finditem = null;
        if (arr != null && arr != undefined && arr.length > 0) {
            $.map(arr, function (obj) {
                if (obj.index == index) { finditem = obj; }
            });
        }
        return finditem;
    }
    /** 
    * 获取指定控件的内容，text或value单独分析
    * @param item 控件外层
    * @return dic：value表示查找到的值，hasfinded表示是否找到有内容的控件
    */
    function getVal_1(item) {
        if (item == undefined || item == null)
            return;

        var val = "";
        var hasfinded = false;
        if ($(item).is(".td_textbox")) {
            val = textbox.getVal(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_datepicker")) {
            val = datepicker.getVal(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_datetimebox")) {
            val = datetimebox.getVal(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_combobox")) {
            val = combobox.getVal(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_combogrid")) {
            val = combogrid.getVal(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_dropdowntree")) {
            val = combotree.getVal(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_dropdowntree_async")) {
            val = combotree_async.getVal(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_checkbox")) {
            val = checkbox.getVal(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_numberbox")) {
            val = numberbox.getVal(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_hidden")) {
            val = $(item).val();
            hasfinded = true;
        } 
//        else if ($(item).is(".td_label")) {
//            val = $(item).val();
//            hasfinded = true;
//        }
        var dic = new Object();
        dic.value = val;
        dic.hasfinded = hasfinded;
        return dic;
    }
    /** 
    * 获取指定控件的内容text
    * @param item 控件外层
    * @return dic：value表示查找到的值，hasfinded表示是否找到有内容的控件
    */
    function getText_1(item) {
        if (item == undefined || item == null)
            return;

        var val = "";
        var hasfinded = false;
        if ($(item).is(".td_textbox")) {
            val = textbox.getText(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_datepicker")) {
            val = datepicker.getText(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_datetimebox")) {
            val = datetimebox.getText(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_combobox")) {
            val = combobox.getText(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_combogrid")) {
            val = combogrid.getText(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_dropdowntree")) {
            val = combotree.getText(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_dropdowntree_async")) {
            val = combotree_async.getText(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_checkbox")) {
            val = checkbox.getText(item);
            hasfinded = true;
        }
        else if ($(item).is(".td_hidden")) {
            val = $(item).val();
            hasfinded = true;
        }
        else if ($(item).is(".td_numberbox")) {
            val = numberbox.getText(item);
            hasfinded = true;
        }
        var dic = new Object();
        dic.text = val;
        dic.hasfinded = hasfinded;
        return dic;
    }
    /** 
    * 获取指定控件的内容text
    * @param dataid 控件外层的data-id属性
    * @return value表示查找到的值
    */
    function getText(dataid, wrapper) {
        var obj = null;
        if (wrapper != null && wrapper != undefined)
            obj = getText_1($(wrapper).find("[data-id='" + dataid + "']"));
        else
            obj = getText_1($("[data-id='" + dataid + "']"));
        if (obj == null || obj == undefined)
            return null;
        return obj.text;
    }
    /** 
    * 获取指定控件的内容，text或value单独分析
    * @param dataid 控件外层的data-id属性
    * @return value表示查找到的值
    */
    function getVal(dataid, wrapper) {
        var obj = null;
        if (wrapper != null && wrapper != undefined)
            obj = getVal_1($(wrapper).find("[data-id='" + dataid + "']"));
        else
            obj = getVal_1($("[data-id='" + dataid + "']"));
        if (obj == null || obj == undefined)
            return null;
        return obj.value;
    }
    function setValByCtrl(item, val, wrapper) {
        if (item == undefined || item == null)
            return;

        if ($(item).is(".td_textbox")) {
            textbox.setVal(item, val);
        }
        else if ($(item).is(".td_datepicker")) {
            datepicker.setVal(item, val);
        }
        else if ($(item).is(".td_datetimebox")) {
            datetimebox.setVal(item, val);
        }
        else if ($(item).is(".td_combobox")) {
            combobox.setVal(item, val);
        }
        else if ($(item).is(".td_combogrid")) {
            combogrid.setVal(item, val);
        }
        else if ($(item).is(".td_dropdowntree")) {
            combotree.setVal(item, val);
        }
        else if ($(item).is(".td_dropdowntree_async")) {
            combotree_async.setVal(item, val);
        }
        else if ($(item).is(".td_checkbox")) {
            checkbox.setVal(item, val);
        }
        else if ($(item).is(".td_hidden")) {
            $(item).val(val);
        }
        else if ($(item).is(".td_label")) {
            label.setVal(item, val);
        }
        else if ($(item).is(".td_numberbox")) {
            numberbox.setVal(item, val);
        }
    }
    /** 
    * 设置值
    * @param dataid 控件外层的data-id属性
    * @param val 值
    * @return dic：value表示查找到的值，hasfinded表示是否找到有内容的控件
    */
    function setVal(dataid, val, wrapper) {
        var item = null;
        if (wrapper != null && wrapper != undefined)
            item = $(wrapper).find("[data-id='" + dataid + "']");
        else
            item = $("[data-id='" + dataid + "']");
        setValByCtrl(item, val, wrapper);
    }

    /** 
    * 获取整个表单关联的数据表的唯一键ID
    * @param myform 表单
    * @return 查找到的ID
    */
    function getDataID(myform) {
        var t = $(myform).find("input[data-id='tmpl_id']");
        if (!myextend.isNull(t)) {
            var i = parseFloat(t.val(), 10);
            if (isNaN(i)) return 0;
            return i;
        }
        return 0;
    }
    function removeCtrl(myform, dataid) {
        var item = $(myform).find("[data-id='" + dataid + "']");
        if (item == undefined || item == null)
            return;
        item.html("");
        item.removeClass("td_textbox");
        item.removeClass("td_combobox");
        item.removeClass("td_dropdowntree");
        item.removeClass("td_datepicker");
        item.removeClass("td_datetimebox");
        item.removeClass("td_combogrid");
        item.removeClass("td_checkbox");
        item.removeClass("td_numberbox");
    }
    function getCtrl(myform, dataid) {
        return $(myform).find("[data-id='" + dataid + "']");
    }
    function getCtrlById(myform, id) {
        return $(myform).find("[data-id='tmpl_" + id + "']");
    }
    function add_label(myform, dataid) {
        var item = $(myform).find("[data-id='" + dataid + "']");
        if (item == undefined || item == null)
            return;
        item.addClass("td_label");
        item.html(label.add(item));
    }
    /** 
    * 响应键盘操作
    * @param item 控件外层
    * @param keytype 键盘操作类型
    */
    function keyHandler(item, keytype) {
        if (item == undefined || item == null)
            return;
        if ($(item).is(".td_datepicker")) {
        }
        else if ($(item).is(".td_datetimebox")) {
        }
        else if ($(item).is(".td_combobox")) {
            return combobox.keyHandler(item, keytype);
        }
        else if ($(item).is(".td_combogrid")) {
            return combogrid.keyHandler(item, keytype);
        }
        else if ($(item).is(".td_dropdowntree")) {
            return combotree.keyHandler(item, keytype);
        }
        else if ($(item).is(".td_dropdowntree_async")) {
            return combotree.keyHandler(item, keytype);
        }
    }
    /** 
    * 封装函数，开放pulic函数
    */
    return {
        drawcontrol: drawcontrol,
        getFormDic: getFormDic,
        showwindow: eu_win.showwindow,
        openwindow: eu_win.openwindow,
        getattr: commonctrl.getattr,
        isChange: isChange,
        getVal: getVal,
        getDataID: getDataID,
        setVal: setVal,
        getVal_1: getVal_1,
        reload: reload,
        add_label: add_label,
        removeCtrl: removeCtrl,
        setComboboxDefault: combobox.setdefault,
        getText: getText,
        setattr: commonctrl.setattr,
        getCtrl: getCtrl,
        reload_reverse: reload_reverse,
        keyHandler: keyHandler
    }
});


/***************通用***************/
var commonctrl = {
    //    /** 
    //    * 获取控件数据源地址，如果cookie里有记录，则直接获取cookie里的内容，否则实时读取url
    //    * @param url 数据源地址
    //    */
    //    get_json_cache: function (url) {
    //        if (myextend.isNull(url)) {
    //            return null;
    //        }
    //        //        var q = myextend.getBaseUrlParam("q", url);
    //        //        if (myextend.isNull(q)) {
    //        //            return url;
    //        //        }
    //        var cache = $.cookie(url);
    //        if (myextend.isNull(cache)) {
    //            return null;
    //        }
    //        return JSON.parse(cache); // "../Cache/" + q + ".json";
    //    },
    //    /** 
    //    * 记录json缓存cookie
    //    * @param url 数据源地址
    //    */
    //    set_json_cache: function (url,data) {
    ////        var q = myextend.getBaseUrlParam("q", url);
    //        $.cookie(url, JSON.stringify(data));
    //    },
    /** 
    * 添加html内容至页面
    * @param wrapper 数据源地址
    * @param data_html 数据源地址
    * @param append 数据源地址
    */
    addhtml: function (wrapper, data_html, append,nowrapper) {
        if (wrapper == null || wrapper == undefined || data_html == null || data_html == undefined) return;
        if (nowrapper == null || nowrapper == undefined || nowrapper == false)
        data_html = "<div class='form_td_ctrl_wrapper'>" + data_html + "</div>";
        if (!append)
            $(wrapper).html(data_html);
        else
            $(wrapper).append(data_html);
    },
    /** 
    * 获取控件唯一识别符
    * @param tmplid 临时控件识别符
    */
    getid: function (tmplid) {
        return (tmplid + "").replace("tmpl_", "");
    },
    /** 
    * 获取控件外层指定控件的属性
    * @param _ctrl 控件外层
    * @param _attr 属性名称
    */
    getattr: function (_ctrl, _attr) {
        var t = ($(_ctrl).attr(_attr) + "");
        if (t == undefined || t == null || t == 'undefined')
            return "";
        return t;
    },
    /** 
    * 设置控件外层指定控件的属性
    * @param _ctrl 控件外层
    * @param _attr 属性名称
    * @param _attrval 属性值
    */
    setattr: function (_ctrl, _attr, _attrval) {
        if (_ctrl == null || _ctrl == undefined) return;
        if (_attr == null || _attr == undefined) return;
        $(_ctrl).attr(_attr, _attrval);
    }
}

/***************弹窗***************/
var eu_win = {
    /** 
    * 显示弹窗
    * @param window_wrapper 控件外层
    */
    showwindow: function (window_wrapper) {
        var data_id = commonctrl.getattr(window_wrapper, "data-id");
        var data_url = commonctrl.getattr(window_wrapper, "data-url");
        var data_width = parseInt(commonctrl.getattr(window_wrapper, "data-width"), 10);
        var data_height = parseInt(commonctrl.getattr(window_wrapper, "data-height"), 10);
        var data_title = commonctrl.getattr(window_wrapper, "data-title");
        var data_modal = commonctrl.getattr(window_wrapper, "data-modal") == "true";
        var data_maximize = commonctrl.getattr(window_wrapper, "data-maximize") == "true";
        var data_minimizable = commonctrl.getattr(window_wrapper, "data-minimizable") == "true";
        var data_maximizable = commonctrl.getattr(window_wrapper, "data-maximizable") == "true";
        var data_collapsible = commonctrl.getattr(window_wrapper, "data-collapsible") == "true";
        var data_closable = commonctrl.getattr(window_wrapper, "data-closable") != "false";
        var onClose_callback = commonctrl.getattr(window_wrapper, "event-callback");
        var onBeforeClose_callback = commonctrl.getattr(window_wrapper, "event-onBeforeClose");

        //        var top = $(document).scrollTop()+(screen.height - data_height) / 2 - 30;
        //        var left = (screen.width - data_width) / 2;

        var top = ($(window).height() - data_height) / 2 + $(document).scrollTop();
        var left = ($(window).width() - data_width) / 2;

        var t = $(window_wrapper).window({
            width: data_width,
            height: data_height,
            modal: data_modal,
            href: data_url,
            maximized: data_maximize,
            title: data_title,
            minimizable: data_minimizable,
            maximizable: data_maximizable,
            collapsible: data_collapsible,
            closable: data_closable,
            top: top,
            left: left,
            shadow: false,
            modal: true,
            closed: true,
            cache: false,
            onClose: function () {
                if (onClose_callback != null && onClose_callback != undefined && onClose_callback != "") {
                    myextend.callFunc(onClose_callback, { "sender": $(window_wrapper) });
                }
            }
//            ,
//            onBeforeClose: function () {
//                if (onBeforeClose_callback != null && onBeforeClose_callback != undefined && onBeforeClose_callback != "") {
//                   // myextend.callFunc(onBeforeClose_callback, { "sender": $(window_wrapper),"ischange":});
//                }
//            }
        });
        t.window("open");
    },
    openwindow: function (wrap, url, title, w, h, min, max, col, modal, maxed, event_callback) {
        if (url == null || url == undefined) return;
        var data_url = url;
        var data_height = h == undefined || h == null ? 200 : h;
        var data_width = w == undefined || w == null ? 200 : w;
        var data_modal = modal == undefined || modal == null ? false : true;
        var data_maximize = maxed == undefined || maxed == null ? true : false;
        var data_minimizable = min == undefined || min == null ? false : true;
        var data_maximizable = max == undefined || max == null ? false : true;
        var data_collapsible = col == undefined || col == null ? false : true;
        var data_title = title == undefined || title == null ? "提示" : title;

        var top = ($(window).height() - data_height) / 2 + $(document).scrollTop();
        var left = ($(window).width() - data_width) / 2;

        var $mask = $("<div class=\"mywindow\"></div>").appendTo($(wrap));

        var t = $($mask).window({
            width: data_width,
            height: data_height,
            modal: data_modal,
            href: data_url,
            maximized: data_maximize,
            title: data_title,
            minimizable: data_minimizable,
            maximizable: data_maximizable,
            collapsible: data_collapsible,
            top: top,
            left: left,
            shadow: false,
            modal: true,
            closed: true,
            cache: false,
            onClose: function () {
                if (event_callback != null && event_callback != undefined && event_callback != "") {
                    myextend.callFunc(event_callback, { "sender": $($mask) });
                }
                $mask.remove();
                $mask = null;
            }
        });
        t.window("open");
    }
}

/***************下拉框***************/
var combobox = {
    /** 
    * 生成控件底层
    * @param id 控件唯一识别符 
    * @param multiple 是否多选
    * @param editable 是否可编辑
    * @param val 默认值
    * @param panelHeight 高度
    * @param panelWidth 宽度  
    * @param required 是否必填  
    * @param readonly 是否只读
    * @param showdown 是否显示下拉按钮
    */
    init: function (id, multiple, editable, val, panelHeight, panelWidth, required, readonly, showdown) {
        return String.format("<input type=\"text\" class=\"easyui-combobox\"  type=\"text\" name=\"{0}\" id=\"{0}\" data-options=\"valueField:'value',textField:'text',method:'get',multiple:{1},panelHeight: '{4}',panelWidth: '{5}',editable:{2}, required:{6},readonly:{7},hasDownArrow:{8}\"  value=\"{3}\" style=\"width:100%;\"/>", id, multiple, editable, val, panelHeight, panelWidth, required, readonly, showdown);
    },
    /** 
    * 获取控件底层
    * @param item 控件外层
    */
    add: function (item, adddefault) {
        var data_allowtext = commonctrl.getattr(item, "data-allowtext") == "true";
        var data_multiple = commonctrl.getattr(item, "data-multiple") == "true";
        var data_url = commonctrl.getattr(item, "data-url");
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        var data_panelHeight = commonctrl.getattr(item, "data-panelHeight");
        var data_panelWidth = commonctrl.getattr(item, "data-panelWidth");
        var data_required = commonctrl.getattr(item, "data-required") == "true";
        var data_readonly = commonctrl.getattr(item, "data-readonly") == "true";
        var data_showdown = commonctrl.getattr(item, "data-showdown") != "false";

        if (myextend.isNull(data_panelHeight)) data_panelHeight = "auto";

        return this.init(data_id + data_index, data_multiple, data_allowtext, data_value, data_panelHeight, data_panelWidth, data_required, data_readonly, data_showdown);
    },
    /** 
    * 绑定easyui控件
    * @param item 控件外层
    * @param adddefault 是否添加默认值
    */
    bind: function (item, adddefault) {
        if (myextend.isNull(item)) return;
        var data_index = commonctrl.getattr(item, "data-index");
        var data_url = commonctrl.getattr(item, "data-url");
        var data_id = commonctrl.getattr(item, "data-id");
        var data_value = commonctrl.getattr(item, "data-value");
        var data_allowtext = commonctrl.getattr(item, "data-allowtext") == "true";
        var data_multiple = commonctrl.getattr(item, "data-multiple") == "true";
        var event_onchanged = commonctrl.getattr(item, "event-onchanged");

        var base_ctrl = $(item).find("#" + data_id + data_index + "");
        if (myextend.isNull(base_ctrl)) return;
        adddefault = adddefault && myextend.isNull(data_value);
        if (data_multiple) {
            this.add_multiple(base_ctrl, adddefault, data_allowtext, event_onchanged, data_url);
        }
        else {
            this.add_nomultiple(base_ctrl, adddefault, event_onchanged, data_url);
        }
        //            base_ctrl.next("span").find("input").unbind("focus").on("focus", function () { base_ctrl.combobox("showPanel") });
        //            base_ctrl.next("span").find("input").unbind("blur").on("blur", function () { base_ctrl.combobox("hidePanel") });

        //        if (!myextend .isNull(data_url)) {
        //            $(item).find("#" + data_id + "").combobox({
        //                //'../Async/combobox_data1.json',
        //                //"loader": myloader,
        //                //"mode": 'remote',
        //                //"queryParams":eval('(' +"{\"q\":\""+myid+"\"}"+')'),
        //                "url": data_url,
        //                "method": 'get',
        //                "multiple": data_multiple,
        //                "valueField": 'value',
        //                "textField": 'text',
        //                "panelHeight": 'auto'
        //            });
        //        }
        //        else {
        //            $(item).find("#" + data_id + "").combobox({
        //            "options":null,
        //                "panelHeight": 'auto'
        //            });
        //        }
    },
    /** 
    * 绑定可多选easyui控件
    * @param base_ctrl 控件
    * @param adddefault 是否添加默认值
    * @param allowtext 是否可编辑
    */
    add_multiple: function (base_ctrl, adddefault, allowtext, event_onchanged, _url) {
        if (myextend.isNull(base_ctrl)) return;
        //todo：可编辑下拉框，文本框中的内容不是下拉选项时，回车会被清空，未解决
        base_ctrl.combobox({
            url: _url,
            formatter: function (row) {
                var opts = $(this).combobox('options');
                return '<input type="checkbox" class="combobox-checkbox" id="' + row[opts.valueField] + '">' + row[opts.textField]
            },
            onShowPanel: function () {
                combobox.syncVal(base_ctrl);
                var opts = $(this).combobox('options');
                var target = this;
                var values = $(target).combobox('getValues');
                $.map(values, function (value) {
                    var el = opts.finder.getEl(target, value);
                    el.find('input.combobox-checkbox')._propAttr('checked', true);
                });
            },
            onLoadSuccess: function (data) {
                if (adddefault) {
                    combobox.setdefault(base_ctrl, data);
                }
                combobox.syncVal(base_ctrl);

                //                base_ctrl.combobox("textbox").on('input', function (e) {
                //                    combobox.syncVal(base_ctrl);
                //                });
                //IE会造成死循环，暂时无解，此项功能用于输入时自动勾选
                //                base_ctrl.combobox("textbox").on('propertychange', function (e) {
                //                    combobox.syncVal(base_ctrl);
                //                });
            },
            onClick: function (row) {
                combobox.check(this, true, row);

                var opts = $(this).combobox('options');
                var values = $(this).combobox('getValues');
                var alldata = $(this).combobox('getData');
                //                var _combo = $(this).combobox('combo');
                var row_group = "";
                var row_value = row[opts.valueField];
                var row_text = row[opts.textField];
                //查找所属group
                if (alldata != null && alldata != undefined) {
                    for (var i = 0; i < alldata.length; i++) {
                        var _group = alldata[i].groupno;
                        var _value = alldata[i].value;
                        var _text = alldata[i].text;

                        //根据值查找
                        if (row_value + "" == _value + "") {
                            row_group = _group;
                            break;
                        }
                    }
                }
                if (row_group != "" && row_group != null && row_group != undefined
                        && alldata != null && alldata != undefined
                        && values != null && values != undefined && values.length > 0) {
                    for (var i = 0; i < alldata.length; i++) {
                        var _group = alldata[i].groupno;
                        var _value = alldata[i].value;
                        if ($.inArray(_value + "", values) != -1) {
                            if (row_group + "" != _group + "" && _group != "" && _group != undefined && _group != null) {
                                $(this).combobox('unselect', _value);
                            }
                        }
                    }
                }
            },
            onSelect: function (row) {
                combobox.check(this, true, row);
            },
            onUnselect: function (row) {
                combobox.check(this, false, row);
            },
            onChange: function (newvalue, oldvalue) {
                if (event_onchanged != null && event_onchanged != undefined && event_onchanged != "") {
                    myextend.callFunc(event_onchanged, { "sender": base_ctrl, "newvalue": newvalue, "oldvalue": oldvalue });
                }
            }
        });

    },
    /** 
    * 绑定单选easyui控件
    * @param base_ctrl 控件
    * @param adddefault 是否添加默认值
    */
    add_nomultiple: function (base_ctrl, adddefault, event_onchanged, _url) {
        if (myextend.isNull(base_ctrl)) return;
        base_ctrl.combobox({
            url: _url,
            onLoadSuccess: function (data) {
                if (adddefault) {
                    combobox.setdefault(base_ctrl, data);
                }
            },
            onChange: function (newvalue, oldvalue) {
                if (event_onchanged != null && event_onchanged != undefined && event_onchanged != "") {
                    myextend.callFunc(event_onchanged, { "sender": base_ctrl, "newvalue": newvalue, "oldvalue": oldvalue });
                }
            },
            onShowPanel: function () {
                combobox.syncVal(base_ctrl);
            }
        });
    },
    /** 
    * 根据数据源添加默认值
    * @param base_ctrl 控件
    * @param data 数据源
    */
    setdefault: function (base_ctrl, data) {
        if (data == null || data == undefined) return;
        //通过数据源获取，设置默认值
        var defaultitems = [];
        $.each(data, function (index, item) {
            if (item.defaultselect == "1") {
                defaultitems.push(item.value);
            }
        });
        if (defaultitems != null && defaultitems != undefined && defaultitems.length > 0) {
            base_ctrl.combobox("setValues", defaultitems);
        }
    },
    /** 
    * 选中自定义文本框
    * @param item 控件
    * @param checked 是否选中
    * @param row 选中的行
    */
    check: function (item, checked, row) {
        var opts = $(item).combobox('options');
        var el = opts.finder.getEl(item, row[opts.valueField]);
        el.find('input.combobox-checkbox')._propAttr('checked', checked);
    },
    /** 
    * 根据values分析是否存在手动输入的文本，如果有则查找到对应的value，并设置到控件
    * @param base_ctrl 控件
    */
    syncVal: function (base_ctrl) {
        var alldata = base_ctrl.combobox('getData');
        var orgtext = (base_ctrl.combobox('getText') + "");
        var gettext = orgtext.replace("，", ",");//.replace("、", ",");
        var values = gettext.split(",");
        if (values == null || values == undefined || values.length <= 0) return;
        var newvalues = $.extend(true, [], values);

        var tmpvalues = base_ctrl.combobox('getValues');

        //        console.log(alldata);
        //        console.log(values);
        //        console.log(tmpvalues);

        //取消已经选择的选项
        if (alldata != null && alldata != undefined) {
            for (var i = 0; i < alldata.length; i++) {
                var _value = alldata[i].value;
                var _text = alldata[i].text;

                //                console.log(_value);
                //                console.log(_text);
                //根据值查找
                if ((tmpvalues.contains(_value) || tmpvalues.contains(_text)) && orgtext.indexOf(_text) == -1) {
                    base_ctrl.combobox('unselect', _value + "");
                }
            }
        }
        //根据文本选择已经有的内容
        //        $.map(values, function (value) {
        //查找文本
        if (alldata != null && alldata != undefined) {
            for (var i = 0; i < alldata.length; i++) {
                var _value = alldata[i].value;
                var _text = alldata[i].text;
                var _text_new = (_text + "").replace("，", ",").replace("、", ",");

                //                console.log(_value);
                //                console.log(_text);
                //根据值查找
                if (orgtext.indexOf(_text) != -1 && ("," + gettext + ",").indexOf("," + _text_new + ",") != -1) {
                    //                    if ((value + "").trim() == (_text + "").trim()) {
                    newvalues.remove(_text);
                    newvalues.push(_value + "");
                    //                        base_ctrl.combobox('unselect', _text + "");
                    //                        base_ctrl.combobox('select', _value + "");
                }
            }
        }
        //        });
        if (newvalues != null && newvalues.length > 0 && newvalues[0] != "") {
            base_ctrl.combobox('setValues', newvalues);
        }
        else base_ctrl.combobox('setValues', []);
    },
    /** 
    * 获取值，根据情况分析是获取text还是value
    * @param item 控件
    */
    getVal: function (item) {
        if (myextend.isNull(item)) return "";
        var data_allowtext = commonctrl.getattr(item, "data-allowtext") == "true";
        var data_multiple = commonctrl.getattr(item, "data-multiple") == "true";
        var data_recordtext = commonctrl.getattr(item, "data-recordtext") == "true";
        var val = "";
        if (data_allowtext || data_multiple || data_recordtext) {
            var t = $(item).find("input.easyui-combobox");
            if (myextend.isNull(t) || t.length <= 0) return "";
            val = t.combobox('getText');
        }
        else {
            var t = $(item).find("input.easyui-combobox");

            if (myextend.isNull(t) || t.length <= 0) return "";
            try {
                val = t.combobox('getValue');
            } catch (e) {
                var ss = "";
            }
        }
        return val;
    },
    /** 
    * 获取文本text
    * @param item 控件
    */
    getText: function (item) {
        if (myextend.isNull(item)) return "";
        var t = $(item).find("input.easyui-combobox");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.combobox('getText');
    },
    /** 
    * 设置值，根据情况分析是获取text还是value
    * @param item 控件
    * @param val 值
    */
    setVal: function (item, val) {
        if (myextend.isNull(item)) return;
        var data_allowtext = commonctrl.getattr(item, "data-allowtext") == "true";
        var data_multiple = commonctrl.getattr(item, "data-multiple") == "true";
        var data_recordtext = commonctrl.getattr(item, "data-recordtext") == "true";

        if ((data_allowtext || data_multiple || data_recordtext) && !$.isArray(val)) {
            var t = $(item).find("input.easyui-combobox");
            if (myextend.isNull(t) || t.length <= 0) return;
            t.combobox('setText', val);
        }
        else {
            var t = $(item).find("input.easyui-combobox");
            if (myextend.isNull(t) || t.length <= 0) return;
            if ($.isArray(val))
                t.combobox('setValues', val);
            else
                t.combobox('setValue', val);
        }
    },
    getHoverIndexs: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combobox");
        if (t == null || t == undefined || t.length <= 0) return;
        var _panel = t.combo("panel");
        if (_panel == null || _panel == undefined) return;
        var _combo_items = $(_panel).find(".combobox-item");
        if (_combo_items == null || _combo_items == undefined || _combo_items.length <= 0) return;

        var _indexs = [];
        var _arr = $.grep(_combo_items, function (n, i) {
            var _exist = $(n).hasClass("combobox-item-hover");
            if (_exist) {
                _indexs.push(i);
            }
            return _exist;
        });
        var _data = {};
        _data.ishover = _indexs != null && _indexs != undefined && _indexs.length > 0;
        _data.hover_indexs = _indexs;
        return _data;
    },
    getSelectIndexs: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combobox");
        if (t == null || t == undefined || t.length <= 0) return;
        var _datas = t.combobox("getData");
        if (_datas == null || _datas == undefined) return;
        var _panel = t.combo("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combobox("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = $(_panel).find(".combobox-item");
        if (_combo_items == null || _combo_items == undefined || _combo_items.length <= 0) return;

        var _first_index = -1;
        var _last_1_index = -1;
        var _last_index = -1;
        var _lastpos_index = -1;
        var _firstpos_index = -1;
        var _multiple = _options.multiple;

        $.each(_datas, function (i, n) {
            if (isNaN(n.index) || n.index == undefined)
                n.index = i + 1;
        });
        var _selected_values = t.combobox("getValues");
        if (_selected_values != null && _selected_values != undefined && _selected_values != "" && _selected_values.length > 0) {
            var _arr = $.grep(_datas, function (n, i) {
                return $.inArray(n["value"] + "", _selected_values) != -1 || $.inArray(n["text"] + "", _selected_values) != -1;
            });
            if (_arr != null && _arr.length > 0) _first_index = _arr[0]["index"] - 1;
            if (_arr != null && _arr.length > 1) _last_1_index = _arr[_arr.length - 2]["index"] - 1;
            if (_arr != null && _arr.length > 0) _last_index = _arr[_arr.length - 1]["index"] - 1;

            _arr = $.grep(_datas, function (n, i) {
                return _selected_values[_selected_values.length - 1] == n["value"] + "" || _selected_values[_selected_values.length - 1] == n["text"] + "";
            });
            if (_arr != null && _arr.length > 0) _lastpos_index = _arr[0]["index"] - 1;

            _arr = $.grep(_datas, function (n, i) {
                return _selected_values[0] == n["value"] + "" || _selected_values[0] == n["text"] + "";
            });
            if (_arr != null && _arr.length > 0) _firstpos_index = _arr[0]["index"] - 1;
        }
        var _data = {};
        _data.first_index = _first_index;
        _data._last_1_index = _last_1_index;
        _data._last_index = _last_index;
        _data._lastpos_index = _lastpos_index;
        _data._firstpos_index = _firstpos_index;
        return _data;
    },
    up: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combobox");
        if (t == null || t == undefined || t.length <= 0) return;
        var _datas = t.combobox("getData");
        if (_datas == null || _datas == undefined) return;
        var _panel = t.combo("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combobox("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = $(_panel).find(".combobox-item");
        if (_combo_items == null || _combo_items == undefined || _combo_items.length <= 0) return;

        var _multiple = _options.multiple;
        var _hover_data = combobox.getHoverIndexs(item);
        var _select_data = combobox.getSelectIndexs(item);
        var _selected_index = -1;
        if (_options.readonly) return;
        var _indexs = [];
        var _is_hover = false;
        if (_hover_data != null && _hover_data != undefined) {
            _is_hover = _hover_data.ishover;
            if (_hover_data.ishover)
                _indexs.push(Math.min.apply(null, _hover_data.hover_indexs)); //取最小的id
        }
        if (!_is_hover) {
            if (_select_data != null && _select_data != undefined) {
                _indexs.push(_select_data._last_index);
            }
        }
        _selected_index = Math.min.apply(null, _indexs); //取最小的id
        if (_selected_index < 0) _selected_index = 0; //默认第一个，需根据panel方向调整

        if (!_multiple) {
            if (_selected_index >= 1 && _selected_index < _datas.length + 1)
                t.combobox("select", _datas[_selected_index - 1]["value"]);
        }
        else {
            if (_selected_index >= 1 && _combo_items.length + 1 > _selected_index) {
                $(_combo_items).removeClass("combobox-item-hover");
                $(_combo_items[_selected_index - 1]).addClass("combobox-item-hover");
            }
        }
        if (_selected_index >= 1 && _selected_index < _datas.length + 1)
            t.combobox("scrollTo", _datas[_selected_index - 1]["value"]);
    },
    down: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combobox");
        if (t == null || t == undefined || t.length <= 0) return;
        var _datas = t.combobox("getData");
        if (_datas == null || _datas == undefined) return;
        var _panel = t.combo("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combobox("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = $(_panel).find(".combobox-item");
        if (_combo_items == null || _combo_items == undefined || _combo_items.length <= 0) return;

        var _multiple = _options.multiple;
        var _hover_data = combobox.getHoverIndexs(item);
        var _select_data = combobox.getSelectIndexs(item);
        var _selected_index = -1;
        if (_options.readonly) return;
        var _indexs = [];
        var _is_hover = false;
        if (_hover_data != null && _hover_data != undefined) {
            _is_hover = _hover_data.ishover;
            if (_hover_data.ishover)
                _indexs.push(Math.max.apply(null, _hover_data.hover_indexs)); //取最大的id
        }
        if (!_is_hover) {
            if (_select_data != null && _select_data != undefined) {
                _indexs.push(_select_data._last_index);
            }
        }
        _selected_index = Math.max.apply(null, _indexs); //取最大的id
        if (_selected_index < 0) _selected_index = -1; //默认第一个，需根据panel方向调整

        if (!_multiple) {
            if (_selected_index >= -1 && _selected_index + 1 < _datas.length)
                t.combobox("select", _datas[_selected_index + 1]["value"]);
        }
        else {
            if (_selected_index >= -1 && _combo_items.length > _selected_index + 1) {
                $(_combo_items).removeClass("combobox-item-hover");
                $(_combo_items[_selected_index + 1]).addClass("combobox-item-hover");
            }
        }
        if (_selected_index >= -1 && _selected_index + 1 < _datas.length)
            t.combobox("scrollTo", _datas[_selected_index + 1]["value"]);
    },
    backspace: function (item) {
        var result = false;
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combobox");
        if (t == null || t == undefined) return;
        var _datas = t.combobox("getData");
        if (_datas == null || _datas == undefined) return;
        var _panel = t.combo("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combobox("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = $(_panel).find(".combobox-item");
        if (_combo_items == null || _combo_items == undefined) return;
        if (_options.readonly) return;
        var data_recordtext = commonctrl.getattr(item, "data-recordtext") == "true";
        var _multiple = _options.multiple;
        var _hover_data = combobox.getHoverIndexs(item);
        var _select_data = combobox.getSelectIndexs(item);
        var _selected_index = -1;
        var _selected_index_1 = -1;

        if (_select_data != null && _select_data != undefined) {
            _selected_index = _select_data._lastpos_index;
            _selected_index_1 = _select_data._last_1_index;
        }
        if (_selected_index >= 0 && _selected_index < _datas.length) {
            if (!data_recordtext)
                t.combobox("unselect", _datas[_selected_index]["value"]);
            else
                t.combobox("unselect", _datas[_selected_index]["text"]);
            result = true;
        }

        if (_selected_index_1 >= 0 && _selected_index_1 < _datas.length)
            t.combobox("scrollTo", _datas[_selected_index_1]["value"]);
        return result;
    },
    space: function (item) {
        var result = false;
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combobox");
        if (t == null || t == undefined) return;
        var _datas = t.combobox("getData");
        if (_datas == null || _datas == undefined) return;
        var _panel = t.combo("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combobox("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = $(_panel).find(".combobox-item");
        if (_combo_items == null || _combo_items == undefined) return;
        if (_options.readonly) return;
        var _multiple = _options.multiple;
        var _hover_data = combobox.getHoverIndexs(item);
        var _select_data = combobox.getSelectIndexs(item);
        var _selected_index = -1;
        var _selected_index_1 = -1;

        var _indexs = [];
        if (_hover_data != null && _hover_data != undefined) {
            if (_hover_data.ishover)
                _indexs.push(Math.max.apply(null, _hover_data.hover_indexs)); //取最大的id
        }

        _selected_index = Math.max.apply(null, _indexs); //取最大的id

        if (_selected_index >= 0 && _selected_index < _datas.length) {

            var _selected_values = t.combobox("getValues");
            var _is_selected = false;

            if (_selected_values != null && _selected_values != undefined && _selected_values != "" && _selected_values.length > 0) {
                var _arr = $.grep(_selected_values, function (n, i) {
                    var _is = _datas[_selected_index]["value"] == n;
                    if (_is) {
                        _is_selected = true;
                    }
                    return _is;
                });
            }
            if (_is_selected)
                t.combobox("unselect", _datas[_selected_index]["value"]);
            else
                t.combobox("select", _datas[_selected_index]["value"]);

            result = true;
        }
        //        if (_selected_index >= 0 && _selected_index < _datas.length)
        //            t.combobox("scrollTo", _datas[_selected_index]["value"]);
        return result;
    },
    keyHandler: function (item, keytype) {
        switch (keytype) {
            case "up":
                combobox.up(item);
                break;
            case "down":
                combobox.down(item);
                break;
            case "backspace":
                return combobox.backspace(item);
            case "space":
                return combobox.space(item);
        }
    }
    //var myloader = function (param, success, error) {
    //    var q = param.q || '';
    //    if (q.length <= 2) { return false }
    //    $.ajax({
    //        url: '../Async/combobox_data.asmx/Select',
    //        dataType: 'json',
    //        type: 'post',
    //        async: true,
    //        data: {
    //            q: q
    //        },
    //        success: function (data) {
    //            var items = $.map(data, function (item, index) {
    //                return {
    //                    value: item.value,
    //                    text: item.text
    //                };
    //            });
    //            success(items);
    //        },
    //        error: function () {
    //            error.apply(this, arguments);
    //        }
    //    });
    //}
}
/***************文本框***************/
var textbox = {
    /** 
    * 生成控件底层
    * @param id 控件唯一识别符号
    * @param value 默认值
    * @param multiline 是否多行
    * @param height 高度
    * @param readonly 是否只读
    * @param placeholder 文本框提示文字
    * @param validtype 验证类别   
    */
    init: function (id, value, multiline, height, readonly, required, event_onchange, placeholder, validtype) {
        if (myextend.isNull(id)) return null;
        var noeditable = readonly ? " noeditable " : "";
        if (required || (validtype + "").length > 0) {
            return String.format("<input id=\"{0}\" class=\"easyui-textbox {9}\" data-options=\"required:{1},validType:'{2}',multiline:{3},height:'{4}',value:'{5}',readonly:{6},prompt:'{8}'{7}\">", id, required, validtype, multiline, height, value, readonly, myextend.isNull(event_onchange) ? "" : ",onChange:" + event_onchange, placeholder, noeditable);
        }
        else {
            if (multiline)
                return String.format("<span class=\"textbox\" style=\"height:\"{0}px;\"><textarea id=\"{1}\" class=\"textbox-text validatebox-text  {6}\" autocomplete=\"off\" tabindex=\"\" placeholder=\"{5}\" style=\"margin: 0px; height:{0}px;width:99%;resize:vertical;\" {2} {4}>{3}</textarea></span>", height, id, readonly ? "readonly=\"readonly\"  unselectable=\"on\"" : "", value, myextend.isNull(event_onchange) ? "" : " onchange='" + event_onchange + "(this.value)'", placeholder, noeditable);
            else
                return String.format("<span class=\"textbox\"><input id=\"{0}\" type=\"text\" class=\"textbox-text validatebox-text {5}\" autocomplete=\"off\" tabindex=\"\" placeholder=\"{4}\" style=\"margin: 0px; padding-top: 0px; padding-bottom: 0px;width:100%;\" {1} value=\"{2}\" {3} ></span>", id, readonly ? "readonly=\"readonly\" unselectable=\"on\"" : "", value, myextend.isNull(event_onchange) ? "" : " onchange='" + event_onchange + "(this.value)'", placeholder, noeditable);
        }
    },
    /** 
    * 获取控件底层
    * @param item 控件外层
    */
    add: function (item) {
        var data_textmode = commonctrl.getattr(item, "data-textmode");
        var data_rows = parseInt(commonctrl.getattr(item, "data-rows"), 10);
        var data_height = parseInt(commonctrl.getattr(item, "data-height"), 10);
        var data_readonly = commonctrl.getattr(item, "data-readonly") == "true";
        var data_required = commonctrl.getattr(item, "data-required") == "true";
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        var data_placeholder = commonctrl.getattr(item, "data-placeholder");
        var event_onchange = commonctrl.getattr(item, "event-onchanged");
        var data_validtype = commonctrl.getattr(item, "data-validtype");


        if (data_rows == null || data_rows == undefined || isNaN(data_rows)) data_rows = 1;
        var height = (data_rows > 1 ? data_height + "" : "");
        var multiline = data_rows > 1;

        return this.init(data_id + data_index, data_value, multiline, height, data_readonly, data_required, event_onchange, data_placeholder, data_validtype);
    },
    /** 
    * 绑定easyui控件
    * @param item 控件外层
    */
    bind: function (item) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
//        var data_required = commonctrl.getattr(item, "data-required") == "true";
        var base_ctrl = $(item).find("#" + data_id + data_index + "");
        if (myextend.isNull(base_ctrl)) return;
        if (textbox.needbind(item))
            base_ctrl.textbox();
    },
    needbind: function (item) {
        return commonctrl.getattr(item, "data-required") == "true" || (commonctrl.getattr(item, "data-validtype") + "").length > 0;
    },
    /** 
    * 获取值
    * @param item 控件外层
    */
    getVal: function (item) {
//        var data_required = commonctrl.getattr(item, "data-required") == "true";

        if (!textbox.needbind(item)) {
            if (myextend.isNull(item)) return "";
            var t = $(item).find(".textbox-text");
            if (myextend.isNull(t) || t.length <= 0) return "";
            return t.val();
        }
        else {
            var t = $(item).find("input.easyui-textbox");
            if (myextend.isNull(t) || t.length <= 0) return "";
            return t.textbox('getText');
        }
    },
    /** 
    * 获取文本
    * @param item 控件外层
    */
    getText: function (item) {
        if (myextend.isNull(item)) return "";
        var t = $(item).find(".textbox-text");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.val();
    },
    /** 
    * 设置值
    * @param item 控件外层
    * @param val 值
    */
    setVal: function (item, _val) {
        if (myextend.isNull(item)) return;
        var t = $(item).find(".textbox-text");
        if (myextend.isNull(t) || t.length <= 0) return;
        t.val(_val);
    },
    bindAutoTextArea: function (wrapper) {
        $(wrapper).find("textarea").each(function (index, item) {
            textbox.autoTextarea(document.getElementById(item.id));
        });
    },
    autoTextarea: function (elem, extra, maxHeight) {
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function (type, callback) {
                    elem.addEventListener ?
                                elem.addEventListener(type, callback, false) :
                                elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function (name) {
                    var val = elem.currentStyle[name];

                    if (name === 'height' && val.search(/px/i) !== 1) {
                        var rect = elem.getBoundingClientRect();
                        return rect.bottom - rect.top -
                                        parseFloat(getStyle('paddingTop')) -
                                        parseFloat(getStyle('paddingBottom')) + 'px';
                    };

                    return val;
                } : function (name) {
                    return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));

        var change = function () {
            var scrollTop, height,
                        padding = 0,
                        style = elem.style;

            if (elem._length === elem.value.length) return;
            elem._length = elem.value.length;

            if (!isFirefox && !isOpera) {
                padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
            };
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

            elem.style.height = minHeight + 'px';
            if (elem.scrollHeight > minHeight) {
                if (maxHeight && elem.scrollHeight > maxHeight) {
                    height = maxHeight - padding;
                    style.overflowY = 'auto';
                } else {
                    height = elem.scrollHeight - padding;
                    style.overflowY = 'hidden';
                };
                style.height = height + extra + 'px';
                scrollTop += parseInt(style.height) - elem.currHeight;
                document.body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;
                elem.currHeight = parseInt(style.height);
            };
        };

        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
    }

}

/***************日期选择框***************/
var datepicker = {
    /** 
    * 生成控件底层
    * @param id 控件唯一识别符
    * @param val 默认值
    * @param onSelect 选择事件
    * @param required 是否必填   
    * @param readonly 是否只读
    * @param showdown 是否显示下拉按钮 
    */
    init: function (id, val, onSelect, required, readonly, showdown) {
        if (myextend.isNull(id)) return null;
        return String.format(" <input type=\"text\" class=\"easyui-datebox\"  name=\"{0}\" id=\"{0}\" value=\"{1}\" style=\"width:100%;\" data-options=\"required:{2},editable:{4},readonly:{5},validType:'date'{3},hasDownArrow:{6}\">", id, val, required, myextend.isNull(onSelect) ? "" : ",onSelect:" + onSelect, !readonly, readonly, showdown);
    },
    /** 
    * 获取控件底层
    * @param item 控件外层
    */
    add: function (item) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        var data_required = (commonctrl.getattr(item, "data-required") + "") == "true";
        var event_onselected = commonctrl.getattr(item, "event-onselected");
        var data_readonly = commonctrl.getattr(item, "data-readonly") == "true";
        var data_showdown = commonctrl.getattr(item, "data-showdown") != "false";

        return this.init(data_id + data_index, data_value, event_onselected, data_required, data_readonly, data_showdown);

    },
    /** 
    * 绑定easyui控件
    * @param item 控件外层
    */
    bind: function (item) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var base_ctrl = $(item).find("#" + data_id + data_index + "");
        if (myextend.isNull(base_ctrl)) return;
        base_ctrl.datebox({
            panelWidth: 220,
            panelHeight: 226,
            formatter: datepicker.myformatter,
            parser: datepicker.myparser
        });
        //,editable:false
        //手动输入时同步value
        base_ctrl.next("span").find("input").unbind("change").on("change", function () {
            //            setTimeout(function () {
            var t = $(this).val(); //base_ctrl.datebox("getText"); 
            //            base_ctrl.datebox("validate");
            //            if (!base_ctrl.datebox("isValid") && $.trim(t) != "") return true;
            if (!myextend.isDate_1(t)) {
                if (t != "")
                    return false;
                else t = null;
            }
            var v = datepicker.myparser(t);
            var _options = base_ctrl.datebox("options");
            if (_options != undefined && _options != null) {
                var event_onselected = _options.onSelect;
                base_ctrl.datebox("setValue", t);
                if (event_onselected != undefined && event_onselected != null)
                    event_onselected(v);
            }
            //            }, 1000);
            return true;
        });

        //todo：日期回车自动选择当天，未解决

        //        base_ctrl.datebox("textbox").on('input', function (e) {
        //            datepicker.syncVal(base_ctrl);
        //            return false;
        //        });
        //        base_ctrl.datebox("textbox").on('input propertychange', function (e) {
        //            datepicker.syncVal(base_ctrl);
        //            return false;
        //        });
        // base_ctrl.next("span").find("input").unbind("focus").on("focus", function () { base_ctrl.datebox("showPanel") });
        //        base_ctrl.next("span").find("input").unbind("blur").on("blur", function () { base_ctrl.datebox("hidePanel") });

        //        _textbox.on('change', function (e) {
        //            var newdate = datepicker.myparser(base_ctrl.datebox('textbox').textbox('getValue') + "");
        //            if (newdate != null) {
        //                var _calendar = base_ctrl.datebox('calendar');
        //                _calendar.calendar('moveTo', newdate);
        //            }
        //            //            if (e.keyCode == 13) {
        //            //                alert('keydown' + base_ctrl.datebox('textbox').trigger('blur')); return false; //e.preventDefault();
        //            //            }
        //        });
    },
    /** 
    * 获取值
    * @param item 控件外层
    */
    getVal: function (item, noformat) {
        if (noformat) return datepicker.getText(item);
        if (myextend.isNull(item)) return "";
        var t = $(item).find("input.easyui-datebox");
        if (myextend.isNull(t) || t.length <= 0) return "";
        //        console.log(t.datebox('getValue'));
        return t.datebox('getValue');
        //        return datepicker.myparser(datepicker.getText(item));
    },
    /** 
    * 获取文本
    * @param item 控件外层
    */
    getText: function (item) {
        if (myextend.isNull(item)) return "";
        var t = $(item).find("input.easyui-datebox");
        if (myextend.isNull(t) || t.length <= 0) return "";
        //console.log(t.datebox('getText'));
        return t.datebox('getText');
    },
    /** 
    * 设置值
    * @param item 控件外层
    * @param val 值
    */
    setVal: function (item, val) {
        if (myextend.isNull(item)) return "";
        var t = $(item).find("input.easyui-datebox");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.datebox('setValue', val);
    },
    syncVal: function (item) {
        try {
            var t = item.datebox('getText');
            var t_value = item.datebox('getValue');
            if (!myextend.isNull(t_value)) {
                if (myextend.isNull(t)) {
                    item.datebox('setValue', null);
                }
                else {
                    setTimeout(function () {
                        var newdate = datepicker.myparser(t + "");
                        if (newdate != null) {
                            item.datebox('setValue', datepicker.myformatter(newdate));
                        }
                    }, 1000);
                }
            }
        } catch (e)
        { }
    },
    myformatter: function (date) {
        return myextend.myformatter(date);
    },
    myparser: function (s) {
        return myextend.myparser(s);
    }
}

/***************标签***************/
var label = {
    init: function (id, val) {
        if (myextend.isNull(id) || val == undefined || val == null) return;
        return String.format("<label id=\"{0}\">{1}</label>", id, val);
    },
    add: function (item) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        return this.init(data_id + data_index, data_value);
    },
    /** 
    * @param item 控件外层
    * @param val 值
    */
    setVal: function (item, val) {
        if (myextend.isNull(item)) return "";
        $(item).html(val);
    }
}

/***************下拉树形***************/
var combotree = {
    /** 
    * 生成控件底层
    * @param id 控件唯一识别符 
    * @param url 数据源地址
    * @param multiple 是否多选
    * @param cascadeCheck 是否联动选择
    * @param editable 是否可编辑
    * @param panelHeight 高度
    * @param panelWidth 宽度
    * @param value 宽度
    * @param required 必填    
    * @param readonly 是否只读    
    * @param showdown 是否显示下拉按钮 
    */
    init: function (id, url, multiple, cascadeCheck, editable, panelHeight, panelWidth, value, required, readonly, showdown) {
        return String.format(" <input class=\"easyui-combotree\" name=\"{0}\" id=\"{0}\" style=\"width:100%;\" data-options=\"url: '{1}',method: 'get',multiple: {2},cascadeCheck:{3},editable:{4},value:'{7}',required:{8},readonly:{9},hasDownArrow:{10}{5}{6}\">", id, url, multiple, cascadeCheck, editable, (panelWidth ? ",panelWidth:'" + panelWidth + "'" : ""), (panelHeight ? ",panelHeight:'" + panelHeight + "'" : ""), value, required, readonly,showdown);
    },
    /** 
    * 获取控件底层
    * @param item 控件外层
    */
    add: function (item) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_url = commonctrl.getattr(item, "data-url");
        var data_panelHeight = commonctrl.getattr(item, "data-panelHeight");
        var data_panelWidth = commonctrl.getattr(item, "data-panelWidth");
        var data_editable = commonctrl.getattr(item, "data-editable") == "true";
        var data_multiple = commonctrl.getattr(item, "data-multiple") == "true";
        var data_cascadeCheck = commonctrl.getattr(item, "data-cascadeCheck") == "true";
        var data_required = commonctrl.getattr(item, "data-required") == "true";
        var data_url = commonctrl.getattr(item, "data-url");
        var data_value = commonctrl.getattr(item, "data-value");
        var data_readonly = commonctrl.getattr(item, "data-readonly") == "true";
        var data_showdown = commonctrl.getattr(item, "data-showdown") != "false";

        return this.init(data_id + data_index, data_url, data_multiple, data_cascadeCheck, data_editable, data_panelHeight, data_panelWidth, data_value, data_required, data_readonly, data_showdown);
    },
    /** 
    * 绑定easyui控件
    * @param item 控件外层
    */
    bind: function (item, adddefault) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        var data_url = commonctrl.getattr(item, "data-url");
        var data_fullpath = commonctrl.getattr(item, "data-fullpath") == "true";
        var data_panelHeight = commonctrl.getattr(item, "data-panelHeight");
        var data_panelWidth = commonctrl.getattr(item, "data-panelWidth");
        var data_editable = commonctrl.getattr(item, "data-editable") == "true";
        var data_multiple = commonctrl.getattr(item, "data-multiple") == "true";
        var data_cascadeCheck = commonctrl.getattr(item, "data-cascadeCheck") == "true";
        var data_fullpathdelimiter = commonctrl.getattr(item, "data-fullpathdelimiter");
        var data_entriesdelimiter = commonctrl.getattr(item, "data-entriesdelimiter");

        var tree_wrapper = $(item).find("#" + data_id + data_index + "");
        if (myextend.isNull(tree_wrapper)) return;

        tree_wrapper.combotree({
            onLoadSuccess: function (node, data) {
                //                tree_wrapper.combotree("setValues", data_value);
                if (adddefault) {
                    combotree.setdefault(tree_wrapper, data);
                }
                else {
                    combotree.syncVal(tree_wrapper, data_fullpath, data_fullpathdelimiter, data_entriesdelimiter, data_multiple);
                }
                combotree.expandToSeleted(tree_wrapper, data, data_editable);
            },
            onChange: function (newvalue, oldvalue) {
                //                combotree.setVal(tree_wrapper, data_fullpath, data_fullpathdelimiter, data_entriesdelimiter, data_multiple);
                combotree.setDelimiterText(tree_wrapper, data_fullpath, data_fullpathdelimiter, data_entriesdelimiter);
            },
            onCheck: function (node, checked) {
                if (checked) combotree.mutexBrother(tree_wrapper, node);
            },
            onClick: function (node) {
                combotree.setDelimiterText(tree_wrapper, data_fullpath, data_fullpathdelimiter, data_entriesdelimiter);
            },
            onSelect: function (node) {
                combotree.setDelimiterText(tree_wrapper, data_fullpath, data_fullpathdelimiter, data_entriesdelimiter);
            },
            onHidePanel: function () {
                combotree.setDelimiterText(tree_wrapper, data_fullpath, data_fullpathdelimiter, data_entriesdelimiter);
            }
        });
        //        
        //        tree_wrapper.combotree("setValue", data_value);
        //            tree_wrapper.next("span").find("input").unbind("focus").on("focus", function () { tree_wrapper.combotree("showPanel") });
        //            tree_wrapper.next("span").find("input").unbind("blur").on("blur", function () { tree_wrapper.combotree("hidePanel") });
    },
    /** 
    * 展开接收到的值对应的节点
    * @param tree_wrapper 控件
    * @param data 数据源
    * @param data_editable 是否可编辑
    */
    expandToSeleted: function (tree_wrapper, data, data_editable) {
        var t = tree_wrapper.combotree('tree'); //获取tree  
        var values = tree_wrapper.combotree('getValues'); //获取值
        var _options = tree_wrapper.combotree("options");
        if (_options == undefined || _options == null) return;
        var _multiple = _options.multiple;
        if (values != null && values != undefined && values.length > 0 && data != null && data != undefined && data.length > 0) {
            $.map(values, function (value) {
                node = t.tree("find", value);
                if (node != null) {
                    t.tree('expandTo', node.target).tree('select', node.target);
                }
            });
        }
    },
    /** 
    * 根据文本递归树形控件查找text指定的节点
    * @param treeObj 控件
    * @param text 查找的文本
    * @param pathdelimiter 同级节点之间的分隔符
    */
    findTreeNodeByText: function (tree_wrapper, text, pathdelimiter) {
        if (tree_wrapper == null || tree_wrapper == undefined) return;
        if (text == null || text == undefined) return;
        var treeObj = tree_wrapper.combotree('tree'); //获取tree 
        if (treeObj == null || treeObj == undefined) return;
        var roots = treeObj.tree("getRoots");      //展开根节点
        return this.findTreeNode(treeObj, roots, text, pathdelimiter);
    },
    /** 
    * 根据文本查找节点列表text指定的节点，利用逐层查找的方式，如果上一次的文本正好处于text的开始位置，则递归向下寻找，否则结束，
    * 比如“下城区清江街道”，则会先查询下城区，找到之后再查询清江街道节点
    * @param treeObj 控件
    * @param nodes 轮询的节点列表
    * @param text 查找的文本
    * @param pathdelimiter 同级节点之间的分隔符
    */
    findTreeNode: function (treeObj, nodes, text, pathdelimiter) {
        if (treeObj == null || treeObj == undefined) return;
        if (nodes == null || nodes == undefined || nodes.length <= 0) return;

        for (var i = 0; i < nodes.length; i++) {
            node = nodes[i];
            if ((text + "").indexOf(node.text) == 0) {
                text = this.trimNodePath((text + "").substr(node.text.length), pathdelimiter);
                if ((text + "").length <= 0) {
                    return node;
                    break;
                }
                else {
                    nodes = treeObj.tree('getChildren', node.target);
                    return this.findTreeNode(treeObj, nodes, text);
                }
            }
        }
    },
    /** 
    * 剔除节点之间的分隔符 
    * @param text 文本
    * @param delimiter 同级节点之间的分隔符
    */
    trimNodePath: function (text, delimiter) {
        return (text + "").mytrim("/", "").mytrim(" ", "").mytrim("、", "").mytrim(delimiter, "");
    },
    /** 
    * 根据叶子节点选中的值，获取树整个路径的名称 
    * @param treeObj 树对象，（combotree的树对象获取：var treeObj = comboObj.combotree("tree");） 
    * @param node 叶子节点
    * @param pathdelimiter 叶节点与叶节点之间的连接符
    */
    getTreePathNames: function (treeObj, node, pathdelimiter) {
        if (treeObj == null || treeObj == undefined) return;
        if (node == null || node == undefined) return;
        var pathName = node.text;
        var parentNode = treeObj.tree("getParent", node.target);
        if (parentNode != null && parentNode != "undefined") {
            pathName = this.getTreePathNames(treeObj, parentNode, pathdelimiter) + pathdelimiter + pathName;
        }
        return pathName;
    },
    /** 
    * 根据叶子节点选中的值，获取树整个路径的名称 
    * @param combotreeId 唯一ID 
    * @param leafValue 叶子节点的值 
    */
    getCombotreePathNames: function (combotreeId, leafValue) {
        var combotreeObj = $(combotreeId);
        var treeObj = combotreeObj.combotree("tree");
        var nodesChecked = treeObj.tree("getChecked"); //获取选中的值  
        var pathName = "";
        if (nodesChecked.length > 0) {
            for (var i = 0; i < nodesChecked.length; i++) {
                pathName += this.getTreePathNames(treeObj, nodesChecked[i]);
            }
        }
        return pathName;
    },
    /** 
    * 根据叶子节点选中的值，显示完整路径
    * @param tree_wrapper 控件
    * @param fullpath 是否显示完整路径
    * @param fullpathdelimiter 连接上下级节点文本的字符
    * @param entriesdelimiter 连接同级节点文本的字符
    */
    setDelimiterText: function (tree_wrapper, fullpath, fullpathdelimiter, entriesdelimiter) {
        if (fullpath) {
            var t = tree_wrapper.combotree('tree'); //获取tree   
            var values = tree_wrapper.combotree('getValues'); //获取值
            var val = "";
            if (!myextend.isNull(values)) {
                $.map(values, function (value) {
                    var node = t.tree("find", value);
                    if (val != "") val += entriesdelimiter;
                    var tmp = combotree.getTreePathNames(t, node, fullpathdelimiter);
                    if (tmp != null && tmp != undefined)
                        val += tmp;
                });
            }
            if (!myextend.isNull(val)) tree_wrapper.combotree("setText", val);
        }
    },
    /** 
    * 根据当前控件的values，分析是text还是value，如果是text则按照各分隔符进行分割后取出叶节点的值
    * @param tree_wrapper 控件
    * @param fullpath 是否显示完整路径
    * @param fullpathdelimiter 连接上下级节点文本的字符
    * @param entriesdelimiter 连接同级节点文本的字符
    */
    syncVal: function (tree_wrapper, fullpath, fullpathdelimiter, entriesdelimiter, multiple) {
        if (fullpath) {
            var t = tree_wrapper.combotree('tree'); //获取tree   
            var values = tree_wrapper.combotree('getValues'); //获取值
            var newvalues = [];
            var val = "";
            if (!myextend.isNull(values)) {
                $.map(values, function (value) {
                    if (multiple) {
                        if (myextend.isNull(entriesdelimiter)) entriesdelimiter = ",";
                        var textlist = (value + "").split(entriesdelimiter);
                        if (!myextend.isNull(textlist)) {
                            $.map(textlist, function (val) {
                                var node = combotree.findTreeNodeByText(tree_wrapper, val, fullpathdelimiter);
                                if (!myextend.isNull(node))
                                    newvalues.push(node.id);
                            });
                        }
                    }
                });
            }
            if (!myextend.isNull(newvalues)) {
                tree_wrapper.combotree("setValues", newvalues);
                combotree.setDelimiterText(tree_wrapper, fullpath, fullpathdelimiter, entriesdelimiter);
            }
        }
    },
    /** 
    * 获取当前选中的节点，根据外层属性，选择取text还是value
    * @param item 控件外层
    */
    getVal: function (item) {
        if (myextend.isNull(item)) return "";
        var data_editable = commonctrl.getattr(item, "data-editable") == "true";
        var data_multiple = commonctrl.getattr(item, "data-multiple") == "true";
        var t = $(item).find("input.easyui-combotree");
        if (myextend.isNull(t) || t.length <= 0) return "";
        if (data_editable || data_multiple) {
            return t.combotree('getText');
        }
        else {
            return t.combotree('getValue');
        }
        return "";
    },
    /** 
    * 获取当前选中的节点text
    * @param item 控件外层
    */
    getText: function (item) {
        if (myextend.isNull(item) || item.length <= 0) return "";

        var t = $(item).find("input.easyui-combotree");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.combotree('getText');
    },
    /** 
    * 设置当前选中的节点，根据外层属性，选择取text还是value
    * @param item 控件外层
    * @param val 值
    */
    setVal: function (item, val) {
        if (myextend.isNull(item)) return "";
        var data_editable = commonctrl.getattr(item, "data-editable") == "true";
        var data_multiple = commonctrl.getattr(item, "data-multiple") == "true";
        var t = $(item).find("input.easyui-combotree");
        if (myextend.isNull(t) || t.length <= 0) return "";
        if (data_editable || data_multiple) {
            return t.combotree('setText', val);
        }
        else {
            return t.combotree('setValue', val);
        }
        return "";
    },
    mutexBrother: function (tree_wrapper, node) {
        if (tree_wrapper == null || tree_wrapper == undefined) return;

        var treeObj = tree_wrapper.combotree('tree'); //获取tree   
        if (treeObj == null || treeObj == undefined) return;

        //        var values = tree_wrapper.combotree('getValues'); //获取值
        //        if (values == null || values == undefined) return;

        var parentNode = treeObj.tree('getParent', node.target);
        if (parentNode == null || parentNode == undefined) return;

        var childrenNodes = treeObj.tree('getChildren', parentNode.target);
        if (childrenNodes == null || childrenNodes == undefined) return;

        $.map(childrenNodes, function (_n) {
            var checked = treeObj.tree('getChecked', _n);
            if (checked && _n.attributes.groupno + "" != node.attributes.groupno + "") {
                treeObj.tree('uncheck', _n.target);
            }
        });
    },
    /** 
    * 根据数据源添加默认值
    * @param base_ctrl 控件
    * @param data 数据源
    */
    setdefault: function (base_ctrl, data) {
        if (data == null || data == undefined) return;
        //通过数据源获取，设置默认值
        var defaultitems = [];
        defaultitems = this.getdefaultloop(base_ctrl, data, defaultitems);
        if (defaultitems != null && defaultitems != undefined && defaultitems.length > 0) {
            base_ctrl.combotree("setValues", defaultitems);
        }
    },
    getdefaultloop: function (base_ctrl, data, defaultitems) {
        if (data == null || data == undefined) return defaultitems;
        //通过数据源获取，设置默认值

        $.each(data, function (index, item) {
            if (item.attributes != null && item.attributes != undefined
            && item.attributes.selected != null && item.attributes.selected != undefined && item.attributes.selected == "1") {
                defaultitems.push(item.id);
            }
            if (item.children != null && item.children != undefined && item.children.length > 0) {
                combotree.getdefaultloop(base_ctrl, item.children, defaultitems);
            }
        });
        return defaultitems;
    },
    getHoverIndexs: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;
        var _options = t.combotree("options");
        if (_options == undefined || _options == null) return;
        var _multiple = _options.multiple;

        var _combo_items = combotree.getVisibleItems(item);
        if (_combo_items == null || _combo_items == undefined) return;
        //console.log(_combo_items);
        var _indexs = [];
        var _arr = $.grep(_combo_items, function (n, i) {
            var _exist = $(n).hasClass("tree-node-hover") || (!_multiple && $(n).hasClass("tree-node-selected"))
            if (_exist) {
                _indexs.push(i);
            }
            return _exist;
        });
        var _data = {};
        _data.ishover = _indexs != null && _indexs != undefined && _indexs.length > 0;
        _data.hover_indexs = _indexs;
        //console.log(_indexs);
        return _data;
    },
    getSelectIndexs: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;

        var _panel = t.combotree("panel");
        if (_panel == null || _panel == undefined) return;

        var _tree = t.combotree("tree");
        if (_tree == null || _tree == undefined) return;

        var _options = t.combotree("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = combotree.getVisibleItems(item);
        if (_combo_items == null || _combo_items == undefined) return;
        var _datas = combotree.getVisibleNodes(item);

        var _first_index = -1;
        var _last_1_index = -1;
        var _last_index = -1;
        var _lastpos_index = -1;
        var _firstpos_index = -1;
        var _multiple = _options.multiple;

        var _selected_values = t.combotree("getValues");
        if (_selected_values != null && _selected_values != undefined && _selected_values != "" && _selected_values.length > 0) {
            var _arr = [];
            $.each(_datas, function (index, n) {
                if ($.inArray(n["id"] + "", _selected_values) || $.inArray(n["text"] + "", _selected_values)) {
                    var t = {};
                    t.index = index + 1;
                    t.item = n;
                    _arr.push(t);
                }
            });

            if (_arr != null && _arr.length > 0) _first_index = _arr[0]["index"] - 1;
            if (_arr != null && _arr.length > 1) _last_1_index = _arr[_arr.length - 2]["index"] - 1;
            if (_arr != null && _arr.length > 0) _last_index = _arr[_arr.length - 1]["index"] - 1;

            _arr = [];
            $.each(_datas, function (index, n) {
                if (_selected_values[_selected_values.length - 1] == n["id"] + "" || _selected_values[_selected_values.length - 1] == n["text"] + "") {
                    var t = {};
                    t.index = index + 1;
                    t.item = n;
                    _arr.push(t);
                }
            });


            if (_arr != null && _arr.length > 0) _lastpos_index = _arr[0]["index"] - 1;

            _arr = [];
            $.each(_datas, function (index, n) {
                if (_selected_values[0] == n["id"] + "" || _selected_values[0] == n["text"] + "") {
                    var t = {};
                    t.index = index + 1;
                    t.item = n;
                    _arr.push(t);
                }
            });
            if (_arr != null && _arr.length > 0) _firstpos_index = _arr[0]["index"] - 1;
        }
        var _data = {};
        _data.first_index = _first_index;
        _data._last_1_index = _last_1_index;
        _data._last_index = _last_index;
        _data._lastpos_index = _lastpos_index;
        _data._firstpos_index = _firstpos_index;
        return _data;
    },
    getVisibleItems: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;

        var _panel = t.combotree("panel");
        if (_panel == null || _panel == undefined) return;
        var _combo_items = $(_panel).find(".tree-node");
        if (_combo_items == null || _combo_items == undefined) return;

        var _filter_combo_items = [];
        $.each(_combo_items, function (index, c) {
            var _parent = $(c).parents("ul:first");
            if (_parent != undefined && _parent != null && !$(c).is(":hidden")) {
                _filter_combo_items.push(c);
            }
        });
        return _filter_combo_items;
    },
    getVisibleNodes: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;

        var _panel = t.combotree("panel");
        if (_panel == null || _panel == undefined) return;

        var _tree = t.combotree("tree");
        if (_tree == null || _tree == undefined) return;

        var _roots = _tree.tree("getRoots");
        if (_roots == undefined || _roots == null) return;

        var _rtn_data = [];
        $.each(_roots, function (index, n) {
            var t = combotree.getVisibleChildren(item, n);
            if (t != undefined && t != null && t.length > 0) {
                _rtn_data = _rtn_data.concat(t);
            }
        });
        return _rtn_data;
    },
    getVisibleChildren: function (item, n) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;

        var _panel = t.combotree("panel");
        if (_panel == null || _panel == undefined) return;

        var _tree = t.combotree("tree");
        if (_tree == null || _tree == undefined) return;


        var _rtn_data = [];
        if (n == undefined || n == null) return _rtn_data;
        var _new_n = _tree.tree("find", n.id);
        _rtn_data.push(_new_n);
        if (n.state == "open" && n.children != undefined && n.children != null) {
            $.each(n.children, function (index, cn) {
                var t = combotree.getVisibleChildren(item, cn);
                if (t != undefined && t != null && t.length > 0) {
                    _rtn_data = _rtn_data.concat(t);
                }
            });
        }
        return _rtn_data;
    },
    up: function (item) {

        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;

        var _tree = t.combotree("tree");
        if (_tree == null || _tree == undefined) return;

        var _panel = t.combotree("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combotree("options");
        if (_options == null || _options == undefined) return;

        var _roots = _tree.tree("getRoots");
        if (_roots == null || _roots == undefined) return;

        var _combo_items = combotree.getVisibleItems(item);
        if (_combo_items == null || _combo_items == undefined) return;

        var _all_combo_items = $(_panel).find(".tree-node");
        if (_options.readonly) return;
        var _multiple = _options.multiple;
        var _hover_data = combotree.getHoverIndexs(item);
        var _datas = combotree.getVisibleNodes(item);

        //var _select_data = combotree.getSelectIndexs(item);
        var _selected_index = -1;

        var _indexs = [];
        var _is_hover = false;
        if (_hover_data != undefined && _hover_data != null) {
            _is_hover = _hover_data.ishover;
            if (_hover_data.ishover)
                _indexs.push(Math.max.apply(null, _hover_data.hover_indexs)); //取最大的id
        }
        //        if (!_is_hover && !_multiple) {
        //            if (_select_data != undefined && _select_data != null) {
        //                _indexs.push(_select_data._last_index);
        //            }
        //        }

        _selected_index = Math.max.apply(null, _indexs); //取最大的id
        if (_selected_index < 0) _selected_index = -1; //默认第一个，需根据panel方向调整

        if (!_multiple) {
            if (_selected_index >= 1 && _selected_index - 1 < _datas.length) {
                _tree.tree("select", _datas[_selected_index - 1].target);
                t.combotree("setValue", _datas[_selected_index - 1]["id"]);
                $(_all_combo_items).removeClass("tree-node-hover");
                $(_combo_items[_selected_index - 1]).addClass("tree-node-hover");
            }
        }
        else {
            if (_selected_index >= 1 && _combo_items.length > _selected_index - 1) {
                $(_all_combo_items).removeClass("tree-node-hover");
                $(_combo_items[_selected_index - 1]).addClass("tree-node-hover");
            }
        }
        if (_selected_index >= 1 && _selected_index - 1 < _datas.length)
            if (_datas[_selected_index - 1].target != undefined)
                _tree.tree("scrollTo", _datas[_selected_index - 1].target);
    },
    down: function (item) {

        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;

        var _tree = t.combotree("tree");
        if (_tree == null || _tree == undefined) return;

        var _panel = t.combotree("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combotree("options");
        if (_options == null || _options == undefined) return;

        //        var _roots = _tree.tree("getRoots");
        //        if (_roots == null || _roots == undefined) return;

        var _combo_items = combotree.getVisibleItems(item);
        if (_combo_items == null || _combo_items == undefined) return;
        if (_options.readonly) return;
        var _all_combo_items = $(_panel).find(".tree-node");

        var _multiple = _options.multiple;
        var _hover_data = combotree.getHoverIndexs(item);
        var _datas = combotree.getVisibleNodes(item);

        //        var _select_data = combotree.getSelectIndexs(item);
        var _selected_index = -1;

        var _indexs = [];
        var _is_hover = false;
        if (_hover_data != undefined && _hover_data != null) {
            _is_hover = _hover_data.ishover;
            if (_hover_data.ishover)
                _indexs.push(Math.max.apply(null, _hover_data.hover_indexs)); //取最大的id
        }
        //        if (!_is_hover && !_multiple) {
        //            if (_select_data != undefined && _select_data != null) {
        //                _indexs.push(_select_data._last_index);
        //            }
        //        }

        _selected_index = Math.max.apply(null, _indexs); //取最大的id
        if (_selected_index < 0) _selected_index = -1; //默认第一个，需根据panel方向调整

        if (!_multiple) {
            if (_selected_index >= -1 && _selected_index + 1 < _datas.length) {
                _tree.tree("select", _datas[_selected_index + 1].target);
                t.combotree("setValue", _datas[_selected_index + 1]["id"]);
                $(_all_combo_items).removeClass("tree-node-hover");
                $(_combo_items[_selected_index + 1]).addClass("tree-node-hover");
            }
        }
        else {
            if (_selected_index >= -1 && _combo_items.length > _selected_index + 1) {
                $(_all_combo_items).removeClass("tree-node-hover");
                $(_combo_items[_selected_index + 1]).addClass("tree-node-hover");
            }
        }
        if (_selected_index >= -1 && _selected_index + 1 < _datas.length) {
            if (_datas[_selected_index + 1].target != undefined)
                _tree.tree("scrollTo", _datas[_selected_index + 1].target);
        }

    },
    backspace: function (item) {
        var result = false;
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;

        var _tree = t.combotree("tree");
        if (_tree == null || _tree == undefined) return;

        var _panel = t.combotree("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combotree("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = combotree.getVisibleItems(item);
        if (_combo_items == null || _combo_items == undefined) return;
        var _datas = combotree.getVisibleNodes(item);
        if (_datas == null || _datas == undefined) return;
        if (_options.readonly) return;
        var _multiple = _options.multiple;
        var _select_data = combotree.getSelectIndexs(item);
        var _selected_index = -1;
        var _selected_index_1 = -1;

        if (_select_data != null && _select_data != undefined) {
            _selected_index = _select_data._lastpos_index;
            _selected_index_1 = _select_data._last_1_index;
        }
        if (_selected_index >= 0 && _selected_index < _datas.length) {
            if (_multiple) {
                _tree.tree("uncheck", _datas[_selected_index].target);
            }
            else {
                _tree.tree("unselect", _datas[_selected_index].target);
            }

            result = true;
        }

        if (_selected_index >= 0 && _selected_index < _datas.length)
            _tree.tree("scrollTo", _datas[_selected_index].target);
        return true;
    },
    space: function (item) {
        var result = false;
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;

        var _tree = t.combotree("tree");
        if (_tree == null || _tree == undefined) return;

        var _panel = t.combotree("panel");
        if (_panel == null || _panel == undefined) return;

        var _options = t.combotree("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = combotree.getVisibleItems(item);
        if (_combo_items == null || _combo_items == undefined) return;

        var _multiple = _options.multiple;
        var _hover_data = combotree.getHoverIndexs(item);
        var _select_data = combotree.getSelectIndexs(item);
        var _selected_index = -1;
        var _selected_index_1 = -1;
        var _datas = combotree.getVisibleNodes(item);
        var _all_combo_items = $(_panel).find(".tree-node");
        if (_options.readonly) return;
        var _indexs = [];
        if (_hover_data != null && _hover_data != undefined) {
            if (_hover_data.ishover)
                _indexs.push(Math.max.apply(null, _hover_data.hover_indexs)); //取最大的id
        }

        _selected_index = Math.max.apply(null, _indexs); //取最大的id

        if (_selected_index >= 0 && _selected_index < _datas.length) {

            var _selected_values = t.combobox("getValues");
            var _is_selected = false;

            if (_selected_values != null && _selected_values != undefined && _selected_values != "" && _selected_values.length > 0) {
                var _arr = $.grep(_selected_values, function (n, i) {
                    var _is = _datas[_selected_index]["id"] == n;
                    if (_is) {
                        _is_selected = true;
                    }
                    return _is;
                });
            }
            if (_is_selected) {
                _tree.tree("uncheck", _datas[_selected_index].target);
            }
            else {
                _tree.tree("check", _datas[_selected_index].target);
            }
            //result = true;
        }
        return true;
    },
    left: function (item) {
        var result = false;
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;

        var _tree = t.combotree("tree");
        if (_tree == null || _tree == undefined) return;

        var _panel = t.combotree("panel");
        if (_panel == null || _panel == undefined) return;

        var _options = t.combotree("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = combotree.getVisibleItems(item);
        if (_combo_items == null || _combo_items == undefined) return;
        if (_options.readonly) return;
        var _multiple = _options.multiple;
        var _hover_data = combotree.getHoverIndexs(item);
        var _select_data = combotree.getSelectIndexs(item);
        var _selected_index = -1;
        var _selected_index_1 = -1;
        var _datas = combotree.getVisibleNodes(item);
        var _all_combo_items = $(_panel).find(".tree-node");

        var _indexs = [];
        if (_hover_data != null && _hover_data != undefined) {
            if (_hover_data.ishover)
                _indexs.push(Math.max.apply(null, _hover_data.hover_indexs)); //取最大的id
        }

        _selected_index = Math.max.apply(null, _indexs); //取最大的id
        if (_selected_index >= 0 && _selected_index < _datas.length) {
            if (_datas[_selected_index].state == "open" && !_tree.tree("isLeaf", _datas[_selected_index].target)) {
                _tree.tree("collapse", _datas[_selected_index].target);
                result = true;
            }
        }
        return result;
    },
    right: function (item) {
        var result = false;
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combotree");
        if (t == null || t == undefined || t.length <= 0) return;

        var _tree = t.combotree("tree");
        if (_tree == null || _tree == undefined) return;

        var _panel = t.combotree("panel");
        if (_panel == null || _panel == undefined) return;

        var _options = t.combotree("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = combotree.getVisibleItems(item);
        if (_combo_items == null || _combo_items == undefined) return;
        if (_options.readonly) return;
        var _multiple = _options.multiple;
        var _hover_data = combotree.getHoverIndexs(item);
        var _select_data = combotree.getSelectIndexs(item);
        var _selected_index = -1;
        var _selected_index_1 = -1;
        var _datas = combotree.getVisibleNodes(item);
        var _all_combo_items = $(_panel).find(".tree-node");

        var _indexs = [];
        if (_hover_data != null && _hover_data != undefined) {
            if (_hover_data.ishover)
                _indexs.push(Math.max.apply(null, _hover_data.hover_indexs)); //取最大的id
        }

        _selected_index = Math.max.apply(null, _indexs); //取最大的id
        if (_selected_index >= 0 && _selected_index < _datas.length && _datas[_selected_index].state == "closed") {
            _tree.tree("expand", _datas[_selected_index].target);
            result = true;
        }
        return result;
    },
    keyHandler: function (item, keytype) {
        switch (keytype) {
            case "up":
                combotree.up(item);
                break;
            case "down":
                combotree.down(item);
                break;
            case "backspace":
                return combotree.backspace(item);
            case "space":
                return combotree.space(item);
            case "left":
                return combotree.left(item);
            case "right":
                return combotree.right(item);
        }
    }
}



/***************动态下拉树形***************/
var combotree_async = {
    /** 
    * 生成控件底层
    * @param id 控件唯一识别符 
    * @param url 数据源地址
    * @param editable 是否可编辑
    * @param panelHeight 高度
    * @param panelWidth 宽度
    * @param value 宽度
    * @param required 是否必填
    * @param readonly 是否只读  
    * @param showdown 是否显示下拉按钮 
    */
    init: function (id, editable, panelHeight, panelWidth, value, required, readonly, showdown) {
        return String.format(" <input class=\"easyui-combotree\" name=\"{0}\" id=\"{0}\" style=\"width:100%;\" data-options=\"editable:{1},value:'{4}',required:{5},readonly:{6},hasDownArrow:{7}{2}{3}\">", id, editable, (panelWidth ? ",panelWidth:'" + panelWidth + "'" : ""), (panelHeight ? ",panelHeight:'" + panelHeight + "'" : ""), value, required, readonly,showdown);
    },
    /** 
    * 获取控件底层
    * @param item 控件外层
    */
    add: function (item) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_panelHeight = commonctrl.getattr(item, "data-panelHeight");
        var data_panelWidth = commonctrl.getattr(item, "data-panelWidth");
        var data_editable = commonctrl.getattr(item, "data-editable") == "true";
        var data_value = commonctrl.getattr(item, "data-value");
        var data_required = commonctrl.getattr(item, "data-required") == "true";
        var data_readonly = commonctrl.getattr(item, "data-readonly") == "true";
        var data_showdown = commonctrl.getattr(item, "data-showdown") != "false";

        return this.init(data_id + data_index, data_editable, data_panelHeight, data_panelWidth, data_value, data_required, data_readonly, data_showdown);
    },
    /** 
    * 绑定easyui控件
    * @param item 控件外层
    */
    bind: function (item, adddefault, callback) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        var data_url = commonctrl.getattr(item, "data-url");
        var data_fullpath = commonctrl.getattr(item, "data-fullpath") == "true";
        var data_panelHeight = commonctrl.getattr(item, "data-panelHeight");
        var data_panelWidth = commonctrl.getattr(item, "data-panelWidth");

        var tree_wrapper = $(item).find("#" + data_id + data_index + "");
        if (myextend.isNull(tree_wrapper)) return;
        combotree_async.config(data_url, tree_wrapper, null, data_value);
        combotree_async.loadChildren(data_url, tree_wrapper, data_value, callback);
    },
    config: function (services_url,tree_wrapper, data, val) {
        var myinput = false;
        $(tree_wrapper).combotree({
            data: data,
            textField: 'text',
            valueField: "id",
            onBeforeExpand: function (node) {
                var parentid = node.value;

                var childrenArr = $(tree_wrapper).combotree('tree').tree('getChildren', node.target);
                if (childrenArr != null && childrenArr.length > 1)
                    return;
                $.ajax({
                    type: 'post',
                    data: { "input": JSON.stringify({ "parentid": parentid, "type": "1" }) },
                    url: services_url,
                    dataType: 'json',
                    success: function (data) {
                        combotree_async.removeChildren(tree_wrapper, node);
                        $(tree_wrapper).combotree('tree').tree('append', {
                            parent: node.target,
                            data: data
                        });
                        $(tree_wrapper).combotree('tree').tree('collapse', node.target);
                        $(tree_wrapper).combotree('tree').tree('expand', node.target);
                    }
                });
            },
            onLoadSuccess: function (node, data) {
                var curnode = $(tree_wrapper).combotree('tree').tree('find', val);
                if (curnode != null && curnode != undefined) {
                    $(tree_wrapper).combotree('tree').tree('expandTo', curnode.target);
                    $(tree_wrapper).combotree('tree').tree('select', curnode.target);
                }
            }
        });

    },
    loadChildren: function (services_url, tree_wrapper, val, callback) {
        $.ajax({
            //type: 'post',
            type: 'get',
            data: { "input": JSON.stringify({ "parentid": 0, "value": val, "type": val == "" || val == null || val == undefined ? "1" : "2" }) },
            url: services_url,
            dataType: 'json',
            success: function (data) {
                //success(data, val);
                 $(tree_wrapper).combotree("loadData",data);
                if (callback != undefined && callback != null) {
                    callback();
                };
            }
        });
//        function success(data, val) {
//            var myinput = false;
//            $(tree_wrapper).combotree({
//                data: data,
//                textField: 'text',
//                valueField: "id",
//                onBeforeExpand: function (node) {
//                    var parentid = node.value;

//                    var childrenArr = $(tree_wrapper).combotree('tree').tree('getChildren', node.target);
//                    if (childrenArr != null && childrenArr.length > 1)
//                        return;
//                    $.ajax({
//                        type: 'post',
//                        data: { "input": JSON.stringify({ "parentid": parentid, "type": "1" }) },
//                        url: services_url,
//                        dataType: 'json',
//                        success: function (data) {
//                            combotree_async.removeChildren(tree_wrapper, node);
//                            $(tree_wrapper).combotree('tree').tree('append', {
//                                parent: node.target,
//                                data: data
//                            });
//                            $(tree_wrapper).combotree('tree').tree('collapse', node.target);
//                            $(tree_wrapper).combotree('tree').tree('expand', node.target);
//                        }
//                    });
//                },
//                onLoadSuccess: function (node, data) {
//                    var curnode = $(tree_wrapper).combotree('tree').tree('find', val);
//                    if (curnode != null && curnode != undefined) {
//                        $(tree_wrapper).combotree('tree').tree('expandTo', curnode.target);
//                        $(tree_wrapper).combotree('tree').tree('select', curnode.target);
//                    }
//                    //                    var parents = $(tree_wrapper).parents("td");
//                    //                    if (parents != null && parents != undefined && parents.length > 0) {
//                    //                        var parent = parents[0];
//                    //                        if (parent != null && parent != undefined) {
//                    //                            var btn_query = $(parent).find(".btn_query");

//                    //                            $(btn_query).unbind("click").on("click", function () {
//                    //                                var _textbox = $(parent).find(".textbox-text");
//                    //                                var mytext = "";
//                    //                                if (_textbox != null && _textbox != undefined && _textbox.length > 0)
//                    //                                    mytext = $(_textbox[0]).val();
//                    //                                if (mytext != "" && mytext != null && mytext != undefined)
//                    //                                    combotree_async.filer(tree_wrapper, services_url, val, mytext);
//                    //                            });
//                    //                        }

//                    //                        //                        //                        var _textbox = $(parent).find(".textbox-text");
//                    //                        //                        //                        var mytext = "";
//                    //                        //                        //                        if (_textbox != null && _textbox != undefined && _textbox.length > 0)
//                    //                        //                        //                            mytext = $(_textbox[0]).val();
//                    //                        //                        //                        if (mytext != "" && mytext != null && mytext != undefined)
//                    //                        //                        //                            $(tree_wrapper).combotree('tree').tree("search", mytext);
//                    //                    }

//                    //                    $(tree_wrapper).combotree('textbox').on('input propertychange', function (e) {
//                    //                        var myval = $(this).val() + "";
//                    //                        $(tree_wrapper).combotree('tree').tree("search", myval);
//                    //                    });
//                }
//                //                ,
//                //                onBeforeSelect: function (node) {
//                //                    if (!$(tree_wrapper).combotree('tree').tree("isLeaf", node.target)) {
//                //                        $(tree_wrapper).combotree("showPanel");
//                //                        return false;
//                //                    }
//                //                }
//            });
        //}
    },
    removeChildren: function (tree_wrapper, node) {
        var childrenArr = $(tree_wrapper).combotree('tree').tree('getChildren', node.target);
        if (childrenArr.length > 0) {
            $.map(childrenArr, function (n) {
                $(tree_wrapper).combotree('tree').tree('remove', n.target);
            });
        }
    },
    filer: function (tree_wrapper, services_url, val, text) {
        $(tree_wrapper).combotree('showPanel');
        $.ajax({
            type: 'post',
            data: { "input": JSON.stringify({ "parentid": -1, "value": val, "text": text, "type": "2" }) },
            url: services_url,
            dataType: 'json',
            success: function (data) {
                //                                var roots = $(tree_wrapper).combotree('tree').tree('getRoots');
                //                ////                var childrenArr = $(tree_wrapper).combotree('tree').tree('getChildren', root.target);
                //                //               

                //                                if (roots != null && roots.length > 0) {
                //                                    $.map(roots, function (n) {
                //                                    if(n)
                //                                        $(tree_wrapper).combotree('tree').tree('remove', n.target);
                //                                    });                    
                //                                }
                //                $.map(data, function (_data) {
                //                    var curnode = $(tree_wrapper).combotree('tree').tree('find', _data.id);
                //                    if (curnode != null && curnode != undefined) {
                //                        $(tree_wrapper).combotree('tree').tree('insert', { before: curnode.target, data: _data });
                //                        $(tree_wrapper).combotree('tree').tree('remove', curnode.target);
                //                    }
                //                });
                //                $(tree_wrapper).combotree('tree').tree("loadData", data);
                $(tree_wrapper).combotree('tree').tree("search", text); //doFilter
            },
            error: function (err) {

            }
        });
    },
    /** 
    * 获取当前选中的节点，根据外层属性，选择取text还是value
    * @param item 控件外层
    */
    getVal: function (item) {
        if (myextend.isNull(item)) return "";
        var data_recordvalue = commonctrl.getattr(item, "data-recordvalue") == "true";
        var t = $(item).find("input.easyui-combotree");
        if (myextend.isNull(t) || t.length <= 0) return "";
        if (!data_recordvalue) {
            return t.combotree('getText');
        }
        else {
            return t.combotree('getValue');
        }
        return "";
    },
    /** 
    * 获取当前选中的节点text
    * @param item 控件外层
    */
    getText: function (item) {
        if (myextend.isNull(item) || item.length <= 0) return "";

        var t = $(item).find("input.easyui-combotree");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.combotree('getText');
    },
    /** 
    * 设置当前选中的节点，根据外层属性，选择取text还是value
    * @param item 控件外层
    * @param val 值
    */
    setVal: function (item, val) {
        if (myextend.isNull(item)) return "";
        var data_recordvalue = commonctrl.getattr(item, "data-recordvalue") == "true";

        var t = $(item).find("input.easyui-combotree");
        if (myextend.isNull(t) || t.length <= 0) return "";
        if (!data_recordvalue) {
            return t.combotree('setText', val);
        }
        else {
            var data_url = commonctrl.getattr(item, "data-url");
            $.ajax({
                type: 'post',
                data: { "input": JSON.stringify({ "value": val }) },
                url: data_url,
                dataType: 'json',
                success: function (data) {
                    //                    combotree_async.removeChildren(tree_wrapper, node);
                    //                    $(tree_wrapper).combotree('tree').tree('append', {
                    //                        parent: node.target,
                    //                        data: data
                    //                    });                    
                },
                error: function () {
                    combotree_async.removeChildren(tree_wrapper, node);
                }
            });
        }
        return "";
    }
}

/***************下拉表格框***************/
var combogrid = {
    /** 
    * 生成控件底层
    * @param id 控件唯一识别符 
    * @param options 配置选项
    * @param val 默认值
    * @param readonly 是否只读
    */
    init: function (id, options, val, readonly) {    
        return String.format("<input type=\"text\" class=\"easyui-combogrid\"  name=\"{0}\" id=\"{0}\" data-options=\"{1}\"  value=\"{2}\" style=\"width:100%;\" /> ", id, options, val);
    },
    /** 
    * 获取控件底层
    * @param item 控件外层
    */
    add: function (item) {
        var data_options = commonctrl.getattr(item, "data-options");
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        var data_readonly = commonctrl.getattr(item, "data-readonly") == "true";
        var data_showdown = (commonctrl.getattr(item, "data-showdown") + "") != "false";

        return this.init(data_id + data_index, data_options, data_value, data_readonly,data_showdown);
    },
    /** 
    * 绑定easyui控件
    * @param item 控件外层
    * @param adddefault 是否添加默认值
    */
    bind: function (item, adddefault) {
        if (myextend.isNull(item)) return;
        var data_index = commonctrl.getattr(item, "data-index");
        var data_id = commonctrl.getattr(item, "data-id");
        var data_value = commonctrl.getattr(item, "data-value");

        var base_ctrl = $(item).find("#" + data_id + data_index + "");
        if (myextend.isNull(base_ctrl)) return;
        base_ctrl.combogrid({
            onLoadSuccess: function (data) {
                if (adddefault) {
                    combogrid.setdefault(base_ctrl, data);
                }
            }
            //            ,
            //            onChange: function (newvalue, oldvalue) {
            //                if (event_onchanged != null && event_onchanged != undefined && event_onchanged != "") {
            //                    myextend.callFunc(event_onchanged, { "sender": base_ctrl, "newvalue": newvalue, "oldvalue": oldvalue });
            //                }
            //            }
        });

    },

    /** 
    * 根据数据源添加默认值
    * @param base_ctrl 控件
    * @param data 数据源
    */
    setdefault: function (base_ctrl, data) {
        if (data == null || data == undefined) return;
        //通过数据源获取，设置默认值
        var defaultitems = [];
        $.each(data, function (index, item) {
            if (item.defaultselect == "1") {
                defaultitems.push(item.value);
            }
        });
        if (defaultitems != null && defaultitems != undefined && defaultitems.length > 0) {
            base_ctrl.combobox("setValues", defaultitems);
        }
    },

    /** 
    * 获取值，根据情况分析是获取text还是value
    * @param item 控件
    */
    getVal: function (item) {
        if (myextend.isNull(item)) return "";
        var val = "";

        var t = $(item).find("input.easyui-combogrid");

        if (myextend.isNull(t) || t.length <= 0) return "";
        try {
            val = t.combobox('getValue');
        } catch (e) {
            var ss = "";
        }

        return val;
    },
    /** 
    * 获取文本text
    * @param item 控件
    */
    getText: function (item) {
        if (myextend.isNull(item)) return "";
        var t = $(item).find("input.easyui-combogrid");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.combobox('getText');
    },
    /** 
    * 设置值，根据情况分析是获取text还是value
    * @param item 控件
    * @param val 值
    */
    setVal: function (item, val) {
        if (myextend.isNull(item)) return;

        var t = $(item).find("input.easyui-combogrid");
        if (myextend.isNull(t) || t.length <= 0) return;
        if ($.isArray(val))
            t.combobox('setValues', val);
        else
            t.combobox('setValue', val);
    },
    getHoverIndexs: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combogrid");
        if (t == null || t == undefined || t.length <= 0) return;
        var _grid = t.combogrid("grid");
        if (_grid == undefined || _grid == null) return;
        var _grid_datas = _grid.datagrid("getData");
        if (_grid_datas == undefined || _grid_datas == null) return;
        var _datas = _grid_datas.rows;
        if (_datas == null || _datas == undefined) return;
        var _panel = t.combo("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combogrid("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = $(_panel).find(".datagrid-row");
        if (_combo_items == null || _combo_items == undefined) return;

        var _indexs = [];
        var _arr = $.grep(_combo_items, function (n, i) {
            var _exist = $(n).hasClass("datagrid-row-over");
            if (_exist) {
                _indexs.push(i);
            }
            return _exist;
        });
        var _data = {};
        _data.ishover = _indexs != null && _indexs != undefined && _indexs.length > 0;
        _data.hover_indexs = _indexs;
        return _data;
    },
    getSelectIndexs: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combogrid");
        if (t == null || t == undefined || t.length <= 0) return;
        var _grid = t.combogrid("grid");
        if (_grid == undefined || _grid == null) return;
        var _grid_datas = _grid.datagrid("getData");
        if (_grid_datas == undefined || _grid_datas == null) return;
        var _datas = _grid_datas.rows;
        if (_datas == null || _datas == undefined) return;
        var _panel = t.combo("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combogrid("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = $(_panel).find(".datagrid-row");
        if (_combo_items == null || _combo_items == undefined) return;

        var _first_index = -1;
        var _last_1_index = -1;
        var _last_index = -1;
        var _lastpos_index = -1;
        var _firstpos_index = -1;
        var _multiple = _options.multiple;

        var _selected_values = t.combogrid("getValues");
        if (_selected_values != null && _selected_values != undefined && _selected_values != "" && _selected_values.length > 0) {
            var _arr = $.grep(_datas, function (n, i) {
                return $.inArray(n["value"] + "", _selected_values) != -1 || $.inArray(n["text"] + "", _selected_values) != -1;
            });
            if (_arr != null && _arr.length > 0) _first_index = _arr[0]["index"] - 1;
            if (_arr != null && _arr.length > 1) _last_1_index = _arr[_arr.length - 2]["index"] - 1;
            if (_arr != null && _arr.length > 0) _last_index = _arr[_arr.length - 1]["index"] - 1;

            _arr = $.grep(_datas, function (n, i) {
                return _selected_values[_selected_values.length - 1] == n["value"] + "" || _selected_values[_selected_values.length - 1] == n["text"] + "";
            });
            if (_arr != null && _arr.length > 0) _lastpos_index = _arr[0]["index"] - 1;

            _arr = $.grep(_datas, function (n, i) {
                return _selected_values[0] == n["value"] + "" || _selected_values[0] == n["text"] + "";
            });
            if (_arr != null && _arr.length > 0) _firstpos_index = _arr[0]["index"] - 1;
        }
        var _data = {};
        _data.first_index = _first_index;
        _data._last_1_index = _last_1_index;
        _data._last_index = _last_index;
        _data._lastpos_index = _lastpos_index;
        _data._firstpos_index = _firstpos_index;
        return _data;
    },
    up: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combogrid");
        if (t == null || t == undefined || t.length <= 0) return;
     
        var _grid = t.combogrid("grid");
        if (_grid == undefined || _grid == null) return;
        var _grid_datas = _grid.datagrid("getData");
        if (_grid_datas == undefined || _grid_datas == null) return;
        var _datas = _grid_datas.rows;
        if (_datas == null || _datas == undefined) return;
        var _panel = t.combo("panel");
        if (_panel == null || _panel == undefined) return;
        var _combo_items = $(_panel).find(".datagrid-row");
        if (_combo_items == null || _combo_items == undefined) return;

        var _options = t.combogrid("options");
        if (_options == null || _options == undefined) return;
        if (_options.readonly) return;

        var _hover_data = combogrid.getHoverIndexs(item);
        var _select_data = combogrid.getSelectIndexs(item);
        var _selected_index = -1;

        var _indexs = [];
        var _is_hover = false;
        if (_hover_data != null && _hover_data != undefined) {
            _is_hover = _hover_data.ishover;
            if (_hover_data.ishover)
                _indexs.push(Math.min.apply(null, _hover_data.hover_indexs)); //取最小的id
        }
        if (!_is_hover) {
            if (_select_data != null && _select_data != undefined) {
                _indexs.push(_select_data._last_index);
            }
        }
        _selected_index = Math.min.apply(null, _indexs); //取最小的id
        if (_selected_index < 0) _selected_index = 0; //默认第一个，需根据panel方向调整


        if (_selected_index >= 1 && _selected_index < _datas.length + 1)
            _grid.datagrid("selectRow", _selected_index - 1);

        if (_selected_index >= 1 && _selected_index < _datas.length + 1)
            _grid.datagrid("scrollTo", _selected_index - 1);

    },
    down: function (item) {
        if (item == null || item == undefined) return;
        var t = $(item).find("input.easyui-combogrid");
        if (t == null || t == undefined || t.length <= 0) return;
        var _grid = t.combogrid("grid");
        if (_grid == undefined || _grid == null) return;
        var _grid_datas = _grid.datagrid("getData");
        if (_grid_datas == undefined || _grid_datas == null) return;
        var _datas = _grid_datas.rows;
        if (_datas == null || _datas == undefined) return;
        var _panel = t.combo("panel");
        if (_panel == null || _panel == undefined) return;
        var _options = t.combogrid("options");
        if (_options == null || _options == undefined) return;
        var _combo_items = $(_panel).find(".datagrid-row");
        if (_combo_items == null || _combo_items == undefined) return;

        if (_options.readonly) return;

        var _hover_data = combogrid.getHoverIndexs(item);
        var _select_data = combogrid.getSelectIndexs(item);
        var _selected_index = -1;

        var _indexs = [];
        var _is_hover = false;
        if (_hover_data != null && _hover_data != undefined) {
            _is_hover = _hover_data.ishover;
            if (_hover_data.ishover)
                _indexs.push(Math.max.apply(null, _hover_data.hover_indexs)); //取最大的id
        }
        if (!_is_hover) {
            if (_select_data != null && _select_data != undefined) {
                _indexs.push(_select_data._last_index);
            }
        }
        _selected_index = Math.max.apply(null, _indexs); //取最大的id
        if (_selected_index < 0) _selected_index = -1; //默认第一个，需根据panel方向调整


        if (_selected_index >= -1 && _selected_index + 1 < _datas.length)
            _grid.datagrid("selectRow", _selected_index + 1);

        if (_selected_index >= -1 && _selected_index + 1 < _datas.length)
            _grid.datagrid("scrollTo", _selected_index + 1);
    },
    keyHandler: function (item, keytype) {
        switch (keytype) {
            case "up":
                combogrid.up(item);
                break;
            case "down":
                combogrid.down(item);
                break;
        }
    }
}



/***************日期时间选择框***************/
var datetimebox = {
    /** 
    * 生成控件底层
    * @param id 控件唯一识别符
    * @param val 默认值
    * @param onSelect 选择事件
    * @param required 是否必填  
    * @param readonly 是否只读
    * @param showdown 是否只读
    */
    init: function (id, val, onSelect, required, readonly, showdown) {
        if (myextend.isNull(id)) return null;
        return String.format(" <input type=\"text\" class=\"easyui-datetimebox\"  name=\"{0}\" id=\"{0}\" value=\"{1}\" style=\"width:100%;\" data-options=\"required:{2},editable:{4},validType:'datetime'{3},readonly:{5},hasDownArrow:{6}\">", id, val, required, myextend.isNull(onSelect) ? "" : ",onSelect:" + onSelect, !readonly, readonly, showdown);
    },
    /** 
    * 获取控件底层
    * @param item 控件外层
    */
    add: function (item) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        var data_required = (commonctrl.getattr(item, "data-required") + "") == "true";
        var data_readonly = (commonctrl.getattr(item, "data-readonly") + "") == "true";
        var event_onselected = commonctrl.getattr(item, "event-onselected");
        var data_showdown = (commonctrl.getattr(item, "data-showdown") + "") != "false";

        return this.init(data_id + data_index, data_value, event_onselected, data_required, data_readonly, data_showdown);

    },
    /** 
    * 绑定easyui控件
    * @param item 控件外层
    */
    bind: function (item) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var base_ctrl = $(item).find("#" + data_id + data_index + "");
        if (myextend.isNull(base_ctrl)) return;
        base_ctrl.datetimebox({
            panelWidth: 220,
            panelHeight: 226, formatter: datetimebox.myformatter, parser: datetimebox.myparser
        });

        //todo：日期回车自动选择当天，未解决
        var _textbox = base_ctrl.datetimebox('textbox');

        // base_ctrl.next("span").find("input").unbind("focus").on("focus", function () { base_ctrl.datetimebox("showPanel") });

    },
    /** 
    * 获取值
    * @param item 控件外层
    */
    getVal: function (item, noformat) {
        if (noformat) return datetimebox.getText(item);
        //        if (myextend.isNull(item)) return "";
        //        var t = $(item).find("input.easyui-datetimebox");
        //        if (myextend.isNull(t) || t.length <= 0) return "";
        //        return t.datetimebox('getValue');
        return datetimebox.myparser(datetimebox.getText(item));
    },
    /** 
    * 获取文本
    * @param item 控件外层
    */
    getText: function (item) {
        if (myextend.isNull(item)) return "";
        var t = $(item).find("input.easyui-datetimebox");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.datetimebox('getText');
    },
    /** 
    * 设置值
    * @param item 控件外层
    * @param val 值
    */
    setVal: function (item, val) {
        if (myextend.isNull(item)) return "";
        var t = $(item).find("input.easyui-datetimebox");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.datetimebox('setValue', val);
    },
    syncVal: function (item) {
        try {
            var t = item.datetimebox('getText');
            var t_value = item.datetimebox('getValue');
            if (!myextend.isNull(t_value)) {
                if (myextend.isNull(t)) {
                    item.datetimebox('setValue', null);
                }
                else {
                    setTimeout(function () {
                        var newdate = datepicker.myparser(t + "");
                        if (newdate != null) {
                            item.datetimebox('setValue', datetimebox.myformatter(newdate));
                        }
                    }, 1000);
                }
            }
        } catch (e)
        { }
    },
    myformatter: function (date) {
        return myextend.myformatter_2(date);
    },
    myparser: function (s) {
        return myextend.myparser_1(s);
    }
}


/***************复选框***************/
var checkbox = {
    /** 
    * 生成控件底层
    * @param id 控件唯一识别符号
    */
    init: function (id, value) {
        if (myextend.isNull(id)) return null;
        return String.format("<input class='easyui-checkbox' id='{0}' name='{0}' {1}  >", id, value == "1" ? "checked=checked" : "");
    },
    /** 
    * 获取控件底层
    * @param item 控件外层
    */
    add: function (item) {

        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");

        return this.init(data_id + data_index, data_value);
    },
    /** 
    * 绑定easyui控件
    * @param item 控件外层
    */
    bind: function (item) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        var event_onchanged = commonctrl.getattr(item, "event-onchanged");
        var data_group = commonctrl.getattr(item, "data-cbgroup");
        var base_ctrl = $(item).find("#" + data_id + data_index + "");

        if (myextend.isNull(base_ctrl)) return;

        base_ctrl.checkbox(
        {
            onChange: function (checked) {
                myextend.callFunc(event_onchanged, { "sender": $(item), "args": checked, "group": data_group });
            }
        });
        myextend.callFunc(event_onchanged, { "sender": $(item), "args": data_value=="1", "group": data_group });
    },

    /** 
    * 获取值
    * @param item 控件外层
    */
    getVal: function (item) {
        if (myextend.isNull(item)) return;
        var t = $(item).find(".checkbox-checked");
        if (myextend.isNull(t) || t.length <= 0) return "0";
        return "1";
    },
    /** 
    * 获取文本
    * @param item 控件外层
    */
    getText: function (item) {
        return this.getVal(item);
    },
    /** 
    * 设置值
    * @param item 控件外层
    * @param val 值
    */
    setVal: function (item, _val) {
        if (myextend.isNull(item)) return;
        var t = $(item).find("input.easyui-checkbox");
        if (myextend.isNull(t) || t.length <= 0) return "";
        if (_val == "0")
            t.checkbox("uncheck");
        else
            t.checkbox("check");
    }
}


/***************数字文本框***************/
var numberbox = {
    /** 
    * 生成控件底层
    * @param id 控件唯一识别符号
    * @param value 值
    * @param min 最小值
    * @param max 最大值
    * @param precision 精度
    * @param readonly 是否只读
    */
    init: function (id, value, min, max, precision, readonly) {
        if (myextend.isNull(id)) return null;
        if (min == "" || min == undefined || min == null) min = Number.MIN_VALUE;
        if (max == "" || max == undefined || max == null) max = Number.MAX_VALUE;
        if (precision == "" || precision == undefined || precision == null) precision = 0;
        return String.format("<input class='easyui-numberbox' id='{0}' name='{0}' data-options=\"min:{1},max:{2},precision:{3},value:'{4}',readonly:{5}\" >", id, min, max, precision, value, readonly);
    },
    /** 
    * 获取控件底层
    * @param item 控件外层
    */
    add: function (item) {
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        var data_min = commonctrl.getattr(item, "data-min");
        var data_max = commonctrl.getattr(item, "data-max");
        var data_precision = commonctrl.getattr(item, "data-precision");
        var data_readonly = commonctrl.getattr(item, "data-readonly")=="true";

        return this.init(data_id + data_index, data_value, data_min, data_max, data_precision, data_readonly);
    },
    /** 
    * 绑定easyui控件
    * @param item 控件外层
    */
    bind: function (item) {
        if (myextend.isNull(item)) return;
        var data_id = commonctrl.getattr(item, "data-id");
        var data_index = commonctrl.getattr(item, "data-index");
        var data_value = commonctrl.getattr(item, "data-value");
        var event_onchanged = commonctrl.getattr(item, "event-onchanged");
        var base_ctrl = $(item).find("#" + data_id + data_index + "");

        if (myextend.isNull(base_ctrl)) return;

        base_ctrl.numberbox(
        {
            onChange: function (newValue, oldValue) {
                myextend.callFunc(event_onchanged, { "sender": $(item), "newValue": newValue, "oldValue": oldValue });
            }
        });
    },

    /** 
    * 获取值
    * @param item 控件外层
    */
    getVal: function (item) {
        if (myextend.isNull(item)) return "";
        var t = $(item).find("input.easyui-numberbox");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.numberbox('getValue');
    },
    /** 
    * 获取文本
    * @param item 控件外层
    */
    getText: function (item) {
        if (myextend.isNull(item)) return "";
        var t = $(item).find("input.easyui-numberbox");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.numberbox('getValue');
    },
    /** 
    * 设置值
    * @param item 控件外层
    * @param val 值
    */
    setVal: function (item, val) {
        if (myextend.isNull(item)) return "";
        var t = $(item).find("input.easyui-numberbox");
        if (myextend.isNull(t) || t.length <= 0) return "";
        return t.numberbox('setValue', val);
    }
}