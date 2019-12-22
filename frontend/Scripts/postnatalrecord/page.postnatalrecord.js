define(function () {
    var base = null;
    //用于新增--开始
    var sharedata = null;
    var count = 0;
    var allcount = 0;
    //用于新增--结束

    var ctrl = {
        btn_add_postnatalvisitrecord: "#btn_add_postnatalvisitrecord",
        right_wrapper: "#right_wrapper",
        left_wrapper: "#left_wrapper",
        one_postnatalvisitrecord_template: "#one_postnatalvisitrecord_template",
        list_pv_wrapper: "#list_pv_wrapper",
        btn_add_wrapper: "#btn_add_wrapper",
        mod_postnatalrecord_wrapper: "#mod_postnatalrecord_wrapper"
    };
    function show() {
        require(["base_usercontrol", "tmpl", 'jquery', "jextend", "easyui", "web_global", "common"], function (b) {
            base = b;
            $.get(webglobal.templates.list_postnatalrecord, { stamp: Math.random() + 1 }, function (template) {
                $(ctrl.left_wrapper).html(template);
                //新增
                $(ctrl.btn_add_postnatalvisitrecord).unbind("click").on("click", function () {
                    require(["mod_postnatalrecord"], function (detail) {
                        //detail.show($(ctrl.right_wrapper), {}, webglobal.enum_mod.add);
                        loadadd();
                    });
                });
                var _req = myrequest.getrequest();
                EventUtil.showOrHide($(ctrl.btn_add_postnatalvisitrecord), !_req.isInWhite() && _req.isCanEdit());

                loadlist(!_req.isInWhite() && _req.isCanEdit(), true);
            });
        });
    }
    function loadlist(autoadd, autobind) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            var arr = [];
            if (data.result == webglobal.enum_const.service_result_success) {
                arr = data.info;
                var todayid = (data.attr != null && data.attr != undefined && (data.attr.todayid <= 0 || isNaN(data.attr.todayid))) ? data.attr.todayid : 0;

                if (arr == null || arr == undefined) {
                    arr = [];
                    if (_req.isInWhite() || !_req.isCanEdit()) {
                        loadnorecord();
                    }
                }
                //template
                var template = $(ctrl.one_postnatalvisitrecord_template).html();
                $.template("myTemplate", template);
                $(ctrl.list_pv_wrapper).html($.tmpl("myTemplate", arr));

                bind(todayid, autobind, autoadd);
            }
            else {
                loadnorecord();
            }
        };
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("bingrenid", _req.bingrenid);
        dictionary.set("shenfenzh", _req.shenfenzh);
        dictionary.set("jobnumber", _req.jobnumber);
        dictionary.set("jigoudm", _req.jigoudm);
        dictionary.set("pid", _req.pid);

        myextend.ajaxPost_simple(webglobal.services.GetPostnatal42dayRecordList, dictionary, web_list_callback, true);
    }
    //新增
    function loadadd() {
        require(["mod_postnatalrecord", "jquery", "common", "jextend", "web_global"], function (detail) {
            count = 0;
            allcount = 5;
            sharedata = null;
            loadadd_empty(webglobal.services.GetEmptyPostnatal42dayRecord_Normal, end);
            loadadd_empty(webglobal.services.GetEmptyPostnatal42dayRecord_Diagnosis, end);
            loadadd_empty(webglobal.services.GetEmptyPostnatal42dayRecord_LabOrder, end);
            loadadd_empty(webglobal.services.GetEmptyPostnatal42dayRecord_ExamOrder, end);
            loadadd_empty(webglobal.services.GetEmptyPostnatal42dayRecord_ChuFang, end);
        });
    }
    function end() {
        count++;
        if (count == allcount) {
            require(["mod_postnatalrecord"], function (detail) {
                detail.show($(ctrl.right_wrapper), sharedata, webglobal.enum_mod.add);
                selectone(0);
            });
        }
    }

    function loadadd_empty(ws_url, success_callback) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                if (data.info != null && data.info != undefined) {
                    var data_1 = sharedata;
                    var data_2 = data.info;
                    sharedata = $.extend(true, data_1, data_2);
                }
                if (success_callback != null && success_callback != undefined)
                    success_callback();
            }
        };
        var web_list_bef_callback = function (data) { };
        var web_list_com_callback = function (data) { };
        var web_list_err_callback = function (data) { };
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        //        dictionary.set("bingrenid", _req.bingrenid);
        //        dictionary.set("shenfenzh", _req.shenfenzh);
        //        dictionary.set("jobnumber", _req.jobnumber);
        //        dictionary.set("doctorname", _req.doctorname);
        //        dictionary.set("jiuzhenid", _req.jiuzhenid);
        //        dictionary.set("jigoudm", _req.jigoudm);

        //        dictionary.set("departmentcode", _req.departmentcode);
        //        dictionary.set("departmentname", _req.departmentname);
        _req.todic(dictionary);

        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
        if (dataparam == "" || dataparam == undefined)
            return;
        try {
            myextend.ajaxPost(ws_url, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
        }
        catch (err) {
            document.writeln("捕捉到例外，开始执行catch块语句 --->");
            document.writeln("错误名称: " + err.name + " ---> ");
            document.writeln("错误信息: " + err.message + " ---> ");
        }
    }
    function bind(todayid, autobind, autoadd) {
        var autoloadid = 0;
        var myitem = null;
        $(ctrl.list_pv_wrapper).find(".link_one_pv").each(function (index, item) {
            $(item).unbind("click").on("click", function (sender) {
                var id = $(sender.target).attr("data-id");
                var canedit = $(sender.target).attr("data-canedit") == "true";
                loadone(id, canedit ? webglobal.enum_mod.edit : webglobal.enum_mod.view);
            });
            if (todayid <= 0)
                todayid = $(item).attr("data-id");
            if (todayid == $(item).attr("data-id"))
                myitem = item;
        });

        if (autobind && todayid > 0 && myitem) {
            var canedit = $(myitem).attr("data-canedit") == "true";
            loadone(todayid, canedit ? webglobal.enum_mod.edit : webglobal.enum_mod.view);
        }
        else if (autoadd && todayid <= 0) {
            loadadd();
        }
    }
    function loadone(id, mod) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                selectone(id);
                require(["mod_postnatalrecord"], function (detail) {
                    detail.show($(ctrl.right_wrapper), data.info, mod);
                });
            }
        };

        var dictionary = new myextend.Dictionary();
        dictionary.set("id", id);
        dictionary.set("mod", mod);

        myextend.ajaxPost_simple(webglobal.services.GetOnePostnatal42dayRecord, dictionary, web_list_callback, true);
    }
    function selectone(cid) {
        $(ctrl.left_wrapper).find(".link_one_pv").removeClass("btn_checked");
        if (cid <= 0) {
            $(ctrl.btn_add_wrapper).addClass("btn_checked");
        }
        $(ctrl.list_pv_wrapper).find(".link_one_pv").each(function (index, item) {
            var id = parseInt($(item).attr("data-id"), 10);
            if (cid == id) {
                $(this).addClass("btn_checked");
            }
        });
    }
    function reload(autoadd, autobind) {
        loadlist(autoadd, autobind);
    }
    function loadnorecord() {
        $.get(webglobal.templates.norecord, { stamp: Math.random() + 1 }, function (res) {
            $(ctrl.mod_postnatalrecord_wrapper).html(res);
            $(ctrl.mod_postnatalrecord_wrapper).addClass("border_class_light_1");
            $(ctrl.mod_postnatalrecord_wrapper).css("min-height", "100px");
        });
    }
    return {
        show: show,
        reload: reload
    }
});

