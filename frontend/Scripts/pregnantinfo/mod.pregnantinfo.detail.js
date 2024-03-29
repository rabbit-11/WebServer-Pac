﻿define(function () {
    var globalwrapper = null;
    var globalmod = null;
    var share = null;
    var base = null;
    var ctrl = {
        btn_save: "#btn_save",
        btn_end: "#btn_end",
        btn_view: "#btn_view",
        btn_print: "#btn_print",
        btn_builtkcal: "#btn_builtkcal",
        btn_exam: "#btn_exam",
        btn_pregnancyhistory: "#btn_pregnancyhistory",
        form_tr_wrapper_pregnanthistory: "#form_tr_wrapper_pregnanthistory",
        form_td_widthflag: ".form_td_widthflag",
        win_exam: "#win_exam",
        win_pregnancyhistory: "#win_pregnancyhistory",
        btn_diff: "#btn_diff",
        btn_import: "#btn_import"
    };

    function getCtrl(id) {
        return $(globalwrapper).find(id);
    }
    function getID() {
        var t = getCtrl("[data-id='tmpl_id']");
        if (t != null && t != undefined) {
            return parseInt(t.val(), 10);
        }
    }
    function setID(id) {
        var t = getCtrl("[data-id='tmpl_id']");
        if (t != null && t != undefined) {
            t.val(id);
        }
    }
    function reload(data) {
        //        if (data == undefined || data == null) return;
        //        var id = data.id;
        //        var t = getCtrl("[data-id='tmpl_id']");
        //        if (t != null && t != undefined) {
        //            t.val(id);
        //        }

        //        var editorname = data.editorname;
        //        var t = getCtrl("[data-id='tmpl_editorname']");
        //        if (t != null && t != undefined) {
        //            t.val(editorname);
        //        }
        base.reload_reverse(globalwrapper, data);
    }

    //初始化界面
    function initstate() {
        autowidth($(globalwrapper));
        var hasfile = getID() > 0;
        var _req = myrequest.getrequest();

        //保存
        EventUtil.showOrHide(getCtrl(ctrl.btn_save), !_req.isInWhite() );
        EventUtil.bindclick(getCtrl(ctrl.btn_save), save);

        //结案新建
        var btn_end = getCtrl(ctrl.btn_end);
        EventUtil.showOrHide(btn_end,  hasfile && !_req.isInWhite() );
        EventUtil.bindclick(btn_end, end);

        $(ctrl.btn_pregnancyhistory).unbind("click").on("click", function () {
            base.showwindow($(ctrl.win_pregnancyhistory));
            return false;
        });
    }
    //数据载入
    function loaddata(data) {
        if (globalwrapper == null || globalwrapper == undefined) return;
        $.get(webglobal.templates.mod_pregnantinfo_detail, { stamp: Math.random() + 1 }, function (template) {
            var arr = [];
            console.log(data);
            data.pregnanthistory = JSON.stringify(data.pregnanthistory);
            
            arr.push(data);
            //template
            $.template("myTemplate", template);
            var newrow = $(globalwrapper).html($.tmpl("myTemplate", arr));
            initstate();
            require(["base_usercontrol"], function (a) {
                a.drawcontrol($(globalwrapper), globalmod, true, prerender, afterrender);
            });
        });
    }
    //新增
    function loadadd(data) {
        globalmod = webglobal.enum_mod.add;
        loaddata(data);
    }
    //编辑
    function loadedit(data) {
        globalmod = webglobal.enum_mod.edit;
        loaddata(data);
    }
    //只读
    function loadview(data) {
        globalmod = webglobal.enum_mod.view;
        loaddata(data);
    }
    //渲染前
    function prerender() {
        MaskUtil.mask($(globalwrapper), "正在加载，请稍候...");
        setPersonInfo();
    }
    //渲染后
    function afterrender(data) {
        
        require(["base_usercontrol"], function (base) {
            var p = base.getattr($(ctrl.form_tr_wrapper_pregnanthistory), "data-value")
            loadpregnanthistory(globalmod, JSON.parse(p), $(ctrl.form_tr_wrapper_pregnanthistory));
        });
        MaskUtil.unmask($(globalwrapper));
        bindkeydown();
        
        autowidth();

        if (globalmod == webglobal.enum_mod.add) {
            getPredignosis(globalwrapper);
        }
        if (globalmod != webglobal.enum_mod.view) {
            LeaveCheckUtil.leave("input_wrapper", "离开前是否保存？", save, null, clearCache);
            saveCache();
        }
    }
    function bindkeydown() {
        require(["common", "jquery"], function () {
            PressUtil.bindkeydown($(globalwrapper), true, { btn_save: $(globalwrapper).find(ctrl.btn_save) });
        });
    }
    //保存
    function save(sender, success_callback, e) {
        setreq();
        var web_list_callback = function (data) {
            console.log(data)
            if (data == null || data == undefined) return;
            if (data.code == "200") {
                TipUtil.ShowSuccess("保存成功");
                reload(data.info);
                initstate();
                base.reload(globalwrapper);

                require(["header"], function (a) { a.show(); });
                require(["navigation"], function (a) { a.show(); });

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
            
        };
        var web_list_com_callback = function (data) {
            EventUtil.setVisible(sender, true);
            console.log(1)
        };
        var web_list_err_callback = function (data) { };

        var data = guiddata(base);
        console.log(data)
        // var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(data));
        var dataparam = JSON.stringify(data);
        if (dataparam == "" || dataparam == undefined)
            return;
        console.log(dataparam);
        myextend.ajaxPost(webglobal.services.SavePregnantInfo, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);

    }
    //结案新建
    function end(sender) {
        //提示
        $.messager.confirm('提示', "确认结案？", function (r) {
            if (r) {
                var web_list_callback = function (data) {
                    if (data == null || data == undefined) return;
                    if (data.result == webglobal.enum_const.service_result_success) {
                        TipUtil.ShowSuccess("结案成功，开始加载...");
                        loadadd(data.info);
                        require(["header"], function (a) { a.show(); });
                        require(["navigation"], function (a) { a.show(); });
                    }
                    else {
                        TipUtil.ShowFailure(data.msg);
                    }
                };
                var web_list_bef_callback = function (data) {
                    EventUtil.setVisible(sender, false);
                };
                var web_list_com_callback = function (data) {
                    EventUtil.setVisible(sender, true);
                };
                var web_list_err_callback = function (data) { };
                //获取参数
                var _req = myrequest.getrequest();
                
                var dictionary = new myextend.Dictionary();
                dictionary.set("bingrenid", _req.bingrenid);
                dictionary.set("shenfenzh", _req.shenfenzh);
                dictionary.set("userid", _req.userid);
                dictionary.set("username", _req.username);
                dictionary.set("jigoudm", _req.jigoudm);
                dictionary.set("id", getID());
                console.log(dictionary.getItems());
                var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));

                if (dataparam == "" || dataparam == undefined)
                    return;
                myextend.ajaxPost(webglobal.services.EndPregnantInfo, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);

            }
        });
    }
    //建大卡
    function builtkcal(sender) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                TipUtil.ShowSuccess("建大卡成功");
                loadBuiltKcal(globalwrapper, data.info);
            }
            else {
                TipUtil.ShowFailure(data.msg);
            }
        };
        var web_list_bef_callback = function (data) {
            EventUtil.setVisible(sender, false);
        };
        var web_list_com_callback = function (data) {
            EventUtil.setVisible(sender, true);
        };
        var web_list_err_callback = function (data) { };
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("pid", getID());
        dictionary.set("jigoudm", _req.jigoudm);
        dictionary.set("userid", _req.userid);
        dictionary.set("username", _req.username);
        dictionary.set("bingrenid", _req.bingrenid);
        dictionary.set("jiuzhenid", _req.jiuzhenid);
        dictionary.set("departmentcode", _req.departmentcode);
        dictionary.set("departmentname", _req.departmentname);

        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));

        if (dataparam == "" || dataparam == undefined)
            return;
        //myextend.ajaxPost(webglobal.services.BulitKcal, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
        myextend.ajaxGet(webglobal.services.BulitKcal, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
    }

    function autowidth() {
        require(["jextend"], function () {
            $(document).ready(function () {
                //自适应宽度
                var w = $(globalwrapper).width() * 0.96;
                var td_w = $(globalwrapper).find(ctrl.form_td_widthflag).find("span").width();
                myextend.setCustomTable(parseInt(w, 10), parseInt(td_w, 10) <= 0 ? 74 : parseInt(td_w, 10), '.customtable');
            });
        });
    }
    function loadpregnanthistory(mod, data, ctrl_wrapper) {
        require(["mod_pregnanthistory"], function (a) {
            //新增
            if (mod == webglobal.enum_mod.add) {
                a.loadadd(ctrl_wrapper, data);
            }
            //编辑
            else if (mod == webglobal.enum_mod.edit) {
                a.loadedit(ctrl_wrapper, data);
            }
            //只读
            else if (mod == webglobal.enum_mod.view) {
                a.loadview(ctrl_wrapper, data);
            }
        });
    }
    function show(ctrl_wrapper) {
        require(["share_services", "base_usercontrol", "tmpl", "jquery", "common", "jextend", "web_global", "easyui"], function (s, b) {
            if (myextend.isNull(ctrl_wrapper)) return;
            globalwrapper = ctrl_wrapper;
            base = b;
            share = s;
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                console.log(data);
                if (data.result == webglobal.enum_const.service_result_success) {
                    // 新增
                    // if (mod == webglobal.enum_mod.add) {
                        loadadd(data.info);
                    // }
                    // //编辑
                    // else if (mod == webglobal.enum_mod.edit) {
                    //     loadedit(data.info);
                    // }
                    // //只读
                    // else if (mod == webglobal.enum_mod.view) {
                    //     loadview(data.info);
                    // }
                }
            };
            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            dictionary.set("bingrenid", _req.bingrenid);
            // dictionary.set("shenfenzh", _req.shenfenzh);
            // dictionary.set("userid", _req.userid);
            // dictionary.set("username", _req.username);
            // dictionary.set("jigoudm", _req.jigoudm);
            // dictionary.set("pid", _req.pid);

            //myextend.ajaxPost_simple(webglobal.services.GetPregnantInfo, dictionary, web_list_callback, true);
            myextend.ajaxGet_simple(webglobal.services.GetPregnantInfo, dictionary, web_list_callback, true);


        });
    }
    //预诊
    function getPredignosis(ctrl_wrapper) {
        share.getPreDiagnosis(ctrl_wrapper, function (ctrl_wrapper, data) {
            if (data == null || data == undefined) return;
            var t = 0;
            t = parseFloat(data.sbp);
            if (t > 0 && !isNaN(t)) {
                base.setVal("tmpl_sbp", t, ctrl_wrapper);
            }
            t = parseFloat(data.dbp);
            if (t > 0 && !isNaN(t)) {
                base.setVal("tmpl_dbp", t, ctrl_wrapper);
            }
            t = parseFloat(data.weight);
            if (t > 0 && !isNaN(t)) {
                base.setVal("tmpl_weight", t, ctrl_wrapper);
            }
            t = parseFloat(data.heartrate);
            if (t > 0 && !isNaN(t)) {
                base.setVal("tmpl_pulse", t, ctrl_wrapper);
            }
            t = parseFloat(data.height);
            if (t > 0 && !isNaN(t)) {
                base.setVal("tmpl_height", t, ctrl_wrapper);
            }
            setBMI();
        });
    }
    //建大卡记录
    function loadBuiltKcal(ctrl_wrapper, data) {
        if (data == null || data == undefined) return;
        base.setVal("tmpl_builtkcal_time", data.builtkcal_time, ctrl_wrapper);
        base.setVal("tmpl_builtkcal_filenumber", data.builtkcal_filenumber, ctrl_wrapper);
        base.setVal("tmpl_builtkcal_createusername", data.builtkcal_createusername, ctrl_wrapper);
    }

    function saveprint() {
        save(null, print, null);
    }
    function print() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                share.print(getID(), data.info.type);
            }
        };
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("q", webglobal.enum_printtype.pregnantinfo);
        dictionary.set("jigoudm", _req.jigoudm);

        //myextend.ajaxPost_simple(webglobal.services.GetPrintType, dictionary, web_list_callback, true);
        myextend.ajaxGet_simple(webglobal.services.GetPrintType, dictionary, web_list_callback, true);
    }
    function lastmenstrualperiod_selected(date) {
        require(["base_usercontrol", "jextend"], function (base) {
            var ctrl = "tmpl_dateofprenatal";
            var dateofprenatal = base.getVal(ctrl);
            if (myextend.isNull(dateofprenatal)) {
                var newdate = date.clone();
                var d = newdate.DateAdd('d', 280);

                base.setVal(ctrl, myextend.myformatter(d));
                setWeekDay();
            }
        });
    }
    function preabortiontime_selected(date) {
        require(["base_usercontrol", "jextend"], function (base) {
            var ctrl = "tmpl_dateofprenatal";
            var dateofprenatal = base.getVal(ctrl);
            if (myextend.isNull(dateofprenatal)) {
                var newdate = date.clone();
                var d = newdate.DateAdd('d', 280);

                base.setVal(ctrl, myextend.myformatter(d));
                setWeekDay();
            }
        });
    }
    function dateofprenatal_selected(date) {
        require(["base_usercontrol", "jextend"], function (base) {
            var ctrl = "tmpl_lastmenstrualperiod";
            var lastmenstrualperiod = base.getVal(ctrl);
            if (myextend.isNull(lastmenstrualperiod)) {

                var newdate = date.clone();
                var d = newdate.DateAdd('d', -280);
                base.setVal(ctrl, myextend.myformatter(d));
            }
            setWeekDay();
        });
    }
    function setWeekDay() {
        var _dateofprenatal = myextend.myparser(base.getVal("tmpl_dateofprenatal"));
        var _lastmenstrualperiod = myextend.myparser(base.getVal("tmpl_lastmenstrualperiod"));
        var _visitdate = myextend.myparser(base.getVal("tmpl_createdate"));

        var weeks = myextend.getpregweekorday(_lastmenstrualperiod, _dateofprenatal, _visitdate, 2, 1);
        var days = myextend.getpregweekorday(_lastmenstrualperiod, _dateofprenatal, _visitdate, 2, 2);
        if (weeks >= 0 && weeks <= 43 && !isNaN(weeks)) {
            base.setVal("tmpl_gestationalweeks", weeks);
        }
        if (days >= 0 && days <= 6 && !isNaN(days)) {
            base.setVal("tmpl_gestationaldays", days);
        }
    }
    function height_change(sender) {
        setBMI();
    }
    function weight_change(sender) {
        setBMI();
        console.log(1)
    }
    function setBMI() {
        var height = base.getVal("tmpl_height");
        var weight = base.getVal("tmpl_weight");

        var _intheight = parseInt(height, 10);
        if (_intheight <= 0 || isNaN(_intheight))
            return;
        var _intweight = parseInt(weight, 10);
        if (_intweight <= 0 || isNaN(_intweight))
            return;
        var _bmi = parseInt(_intweight * 10000 / (_intheight * _intheight), 10);
        if (_bmi <= 0 || isNaN(_bmi))
            return;
        base.setVal("tmpl_bmi", _bmi);
    }
    function highriskreason_change(sender){
        setHighRiskReason();
        console.log(1)
    }
    function setHighRiskReason(){
        var text = base.getVal("tmpl_highriskreason");
        var cnt=0;
        if(text!=""){
            var arr=text.split(",");
            cnt=arr.length;
        }
        $("#highriskreason_cnt").html(cnt);
    }
    function repeat_highriskreason_change(sender){
        setRepeatHighRiskReason()
    }
    function setRepeatHighRiskReason(){
        var text = base.getVal("tmpl_repeat_highriskreason");
        var cnt=0;
        if(text!=""){
            var arr=text.split(",");
            cnt=arr.length;
        }
        $("#repeat_highriskreason_cnt").html(cnt);

    }
    function idcard_change(sender) {
        var data = { ctrl_idcard: "tmpl_idcard", ctrl_sexcode: "tmpl_sexcode", ctrl_birthday: "tmpl_birthday", ctrl_idtype: "tmpl_idtype" };
        _idcard_change(data);
        birthday_selected(base.getVal(data.ctrl_birthday));
    }
    function husbandidcard_change(sender) {
        var data = { ctrl_idcard: "tmpl_husbandidcard", ctrl_birthday: "tmpl_husbandbirthday", ctrl_idtype: "tmpl_husbandidtype" };
        _idcard_change(data);

        husbandbirthday_selected(base.getVal(data.ctrl_birthday));
    }
    function _idcard_change(data) {
        var idcard = base.getVal(data.ctrl_idcard);
        var _idcardinfo = idCardNoUtil.getIdCardInfo(idcard);
        if (_idcardinfo == undefined || _idcardinfo == null || _idcardinfo.gender == "") return;

        base.setVal(data.ctrl_idtype, (1));
        base.setVal(data.ctrl_sexcode, (_idcardinfo.gender));
        base.setVal(data.ctrl_birthday, (_idcardinfo.birthday));
    }
    function _birthday_selected(data) {
        var createdate = base.getVal(data.ctrl_createdate);
        var ymd = DateUtil.getDiffYmdBetweenDate(data.date, createdate);
        if (ymd != undefined && ymd != null && !isNaN(ymd.y))
            base.setVal(data.ctrl_age, ymd.y);
    }
    function birthday_selected(date) {
        _birthday_selected({ date: date, ctrl_createdate: "tmpl_createdate", ctrl_age: "tmpl_createage" });
    }
    function husbandbirthday_selected(date) {
        _birthday_selected({ date: date, ctrl_createdate: "tmpl_createdate", ctrl_age: "tmpl_husbandage" });
    }
    //实时缓存 
    function ischange() {
        return base.isChange($(globalwrapper));
    }
    function guiddata() {
        var allitem = new myextend.Dictionary();
        var required_arr = [];
        var data = new Object();
        $(globalwrapper).find(".form_td_ctrl").each(function (index, item) {
            var id = commonctrl.getid(commonctrl.getattr(item, "data-id"));
            var required = commonctrl.getattr(item, "data-required") == "true";

            if(id=="height"){
                var newrtn = base.getVal("tmpl_"+id);
                if (newrtn != null && newrtn != undefined) {
                    newrtn=Number(parseFloat(newrtn).toFixed(2));
                    allitem.set(id, newrtn);
                }
            }
            else if(id=="weight"){
                var newrtn = base.getVal("tmpl_"+id);
                if (newrtn != null && newrtn != undefined) {
                    newrtn=Number(parseFloat(newrtn).toFixed(2));
                    allitem.set(id, newrtn);
                }
            }
            else if(id=="bmi"){
                var newrtn = base.getVal("tmpl_"+id);
                if (newrtn != null && newrtn != undefined) {
                    newrtn=Number(parseFloat(newrtn).toFixed(2));
                    allitem.set(id, newrtn);
                }
            }
            else if(id=="inducedabortion"){
                var newrtn = base.getVal("tmpl_"+id);
                if (newrtn != null && newrtn != undefined) {
                    newrtn=Number(parseInt(newrtn));
                    allitem.set(id, newrtn);
                }
            }
            else if(id=="cesareansection"){
                var newrtn = base.getVal("tmpl_"+id);
                if (newrtn != null && newrtn != undefined) {
                    newrtn=Number(parseInt(newrtn));
                    allitem.set(id, newrtn);
                }
            }
            else if(id=="qwetimes"){
                var newrtn = base.getVal("tmpl_"+id);
                if (newrtn != null && newrtn != undefined) {
                    newrtn=Number(parseInt(newrtn));
                    allitem.set(id, newrtn);
                }
            }
            else{
                var newrtn = base.getVal("tmpl_"+id);
                if (newrtn != null && newrtn != undefined) {
                    allitem.set(id, newrtn);
                }
            }
            //检查必填项
            if (((newrtn + "") == "" || newrtn == null) && required) {
                required_arr.push(id);
            }
        });
        data=allitem.getItems();
        console.log(data)
        data.id=1;
        data.updatetime=(new Date()).Format("yyyy-MM-dd hh:mm:ss.S");
        if(base.getVal('tmpl_createtime')=="")
            data.createtime=(new Date()).Format("yyyy-MM-dd hh:mm:ss.S");
        
        data.reqitems = required_arr;

        if (data == null || data == undefined) return;
        //获取参数
        var _req = myrequest.getrequest();

        //        data.create_localuser = _req.username;
        //        data.jigoudm = _req.jigoudm;

        _req.todata(data);
        return data;
        // var data = base.getFormDic(globalwrapper, globalmod == webglobal.enum_mod.add);
        // console.log(data)
        // if (data == null || data == undefined) return;
        // //获取参数
        // var _req = myrequest.getrequest();

        // //        data.create_localuser = _req.username;
        // //        data.jigoudm = _req.jigoudm;

        // _req.todata(data);
        // return data;
    }

    function saveCache() {
        var enum_cachetype = webglobal.enum_cachetype.pregnantinfo;
        if (enum_cachetype == null || enum_cachetype == undefined) return;
        require(["thread"], function (a) {
            Concurrent.Thread.create(share.threadCacheRecord, enum_cachetype, ischange, guiddata, share.addCacheRecord);
        });
    }
    function clearCache(callback) {
        share.clearCacheRecord(webglobal.enum_cachetype.pregnantinfo, callback);
    }
    function myimport() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                //提示
                $.messager.confirm({
                    ok: '是',
                    cancel: '否',
                    title: '提示',
                    msg: "<span style='color:red;'>覆盖</span>请点击【是】，只填入空缺字段不修改已有内容请点【否】",
                    fn: function (r) {
                        base.reload_reverse(globalwrapper, data.info, r);
                        if(r)
                        {
                            var p = data.info.pregnanthistory;
                            loadpregnanthistory(globalmod, JSON.parse(p), $(ctrl.form_tr_wrapper_pregnanthistory));
                        }
                    }
                });

            }
            else {
                TipUtil.ShowMsg(data.msg);
            }
        };
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        _req.todic(dictionary);

        //myextend.ajaxPost_simple(webglobal.services.GetSelfPregnantInfo, dictionary, web_list_callback, true);
        myextend.Get_simple(webglobal.services.GetSelfPregnantInfo, dictionary, web_list_callback, true);
    }
    function setPersonInfo(){
        require(["share_services", "base_usercontrol", "tmpl", "jquery", "common", "jextend", "web_global", "easyui"], function (s, b) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                console.log(data);
                var _req = myrequest.getrequest();
                setName(data.info.personname);
                setIdCard(data.info.idcard);
                setBirthday(data.info.birthday);
                setSexCode(data.info.sexcode);
                setPatientAccount(data.info.patientaccount);
                setMobileNumber(data.info.mobilenumber);
                setGravidity(data.info.gravidity);
                setParity(data.info.parity);
            };

            var dictionary = new myextend.Dictionary();
            //myextend.ajaxPost_simple(webglobal.services.GetPregnantInfo, dictionary, web_list_callback, true);
            myextend.ajaxGet_simple(webglobal.services.GetJDXX, dictionary, web_list_callback, true);
        });
    }
    function setreq(){
        require(["share_services", "base_usercontrol", "tmpl", "jquery", "common", "jextend", "web_global", "easyui"], function (s, b) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                var _req = myrequest.getrequest();
                //setCreateTime();
                //setUpdateTime();
                setCreateUserCode(_req.jobnumber);
                setCreateUserName(_req.doctorname);
                setLastMofidyUserCode(_req.jobnumber);
                setLastMofidyUserName(_req.doctorname);
                setDepartmentCode(_req.departmentcode);
                setDepartmentName(_req.departmentname);
                setPatientID(data.info.patientid);
                setJiuzhenID(_req.jiuzhenid);
            };
            var dictionary = new myextend.Dictionary();
            //myextend.ajaxPost_simple(webglobal.services.GetPregnantInfo, dictionary, web_list_callback, true);
            myextend.ajaxGet_simple(webglobal.services.GetJDXX, dictionary, web_list_callback, true);
        });
    }
    function setName(data){
        base.setattr(getCtrl("[data-id='tmpl_personname']"),"data-value",data);
    }
    function setIdCard(data){
        base.setattr(getCtrl("[data-id='tmpl_idcard']"),"data-value",data);
    }
    function setBirthday(data){
        base.setattr(getCtrl("[data-id='tmpl_birthday']"),"data-value",data);
    }
    function setSexCode(data){
        base.setattr(getCtrl("[data-id='tmpl_sexcode']"),"data-value",data);
    }
    function setPatientAccount(data){
        base.setattr(getCtrl("[data-id='tmpl_patientaccount']"),"data-value",data);
    }
    function setMobileNumber(data){
        base.setattr(getCtrl("[data-id='tmpl_mobilenumber']"),"data-value",data);
    }
    function setGravidity(data){
        base.setattr(getCtrl("[data-id='tmpl_gravidity']"),"data-value",data);
    }
    function setParity(data){
        base.setattr(getCtrl("[data-id='tmpl_parity']"),"data-value",data);
    }
    function setCreateUserCode(data){
        if(base.getVal('tmpl_createusercode')=="")
            base.setVal('tmpl_createusercode',data);
    }
    function setCreateUserName(data){
        if(base.getVal('tmpl_createusername')=="")
            base.setVal('tmpl_createusername',data);
    }
    function setLastMofidyUserCode(data){
        base.setVal('tmpl_lastmofidyusercode',data);
    }
    function setLastMofidyUserName(data){
        base.setVal('tmpl_lastmofidyusername',data);
    }
    function setDepartmentCode(data){
        base.setVal('tmpl_departmentcode',data);
    }
    function setDepartmentName(data){
        base.setVal('tmpl_departmentname',data);
    }
    function setPatientID(data){
        base.setVal('tmpl_patientid',data);
    }
    function setJiuzhenID(data){
        base.setVal('tmpl_jiuzhenid',data);
    }
    return {
        show: show,
        setBMI: setBMI,
        lastmenstrualperiod_selected: lastmenstrualperiod_selected,
        preabortiontime_selected: preabortiontime_selected,
        dateofprenatal_selected: dateofprenatal_selected,
        height_change: height_change,
        weight_change: weight_change,
        highriskreason_change: highriskreason_change,
        repeat_highriskreason_change: repeat_highriskreason_change,
        idcard_change: idcard_change,
        husbandidcard_change: husbandidcard_change,
        birthday_selected: birthday_selected,
        husbandbirthday_selected: husbandbirthday_selected,
        setPersonInfo:setPersonInfo,
    }
});