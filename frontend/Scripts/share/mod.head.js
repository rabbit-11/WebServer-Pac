define(function () {
    function show() {
        require(["tmpl", "jquery", "common", "jextend", "web_global"], function () {

            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    SetGeneralInfo(data.info);
                    SetSettings();
                }
            };
            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            dictionary.set("bingrenid", _req.bingrenid);
            dictionary.set("shenfenzh", _req.shenfenzh);
            dictionary.set("bingrenxm", _req.bingrenxm);
            dictionary.set("jobnumber", _req.jobnumber);
            dictionary.set("jiuzhenid", _req.jiuzhenid);
            dictionary.set("pid", _req.pid);

            //myextend.ajaxPost_simple(webglobal.services.GetJDXX, dictionary, web_list_callback, true);
            myextend.ajaxGet_simple(webglobal.services.GetJDXX, dictionary, web_list_callback, true);

        });
    }
    function SetGeneralInfo(data) {
        if (data == null || data == undefined) return;
        var _req = myrequest.getrequest();
        //datasource
        var arr = [];
        arr.push(data);

        //template
        var header_template = $("#header_template").html();
        $.template("myTemplate", header_template);

        //render
        $("#header_wrapper").html($.tmpl("myTemplate", arr));

        //template
        var color_template = $("#color_template").html();
        $.template("myTemplate1", color_template);
        //render
        $("#highriskcolor_highest_wrapper").html($.tmpl("myTemplate1", data.highrisk_highest));

        //template
        $.template("myTemplate2", color_template);
        $("#highriskcolor_latest_wrapper").html($.tmpl("myTemplate2", data.highrisk_latest));

        require(["page_highriskhistory"], function (a) {
            a.show({ btn: "[highrisk_history]" });
        });
        if (!isNaN(data.pid) && data.pid > 0 && !_req.isInWhite()) {
            $("#header_info_wrapper").append("<a class='edit_dateofprenatal btnlink'><img style='' src='../Images/btn_edit.png' /></a>");
            $("#header_info_wrapper").unbind("click").on("click", function () {
                require(["base_usercontrol", "jextend", "jquery"], function (base) {
                    var win = $("#win_pregnantinfo_simple");
                    //预产期修正弹窗
                    var baseurl = win.attr("data-url");
                    var newdata = { "pid": data.pid }; //, "dateofprenatal": data.dateofprenatal, "reason": data.dateofprenatalmodifyreason
                    baseurl = myextend.UrlUpdateParams(baseurl, "s", JSON.stringify(newdata));
                    win.attr("data-url", baseurl);
                    base.showwindow(win);
                });
                return false;
            });
        }
    }

    function SetSettings() {
        $.getJSON(webglobal.jsons.settings, "", function (data) {
            if (data == null || data == undefined) return;
            //获取参数
            var _req = myrequest.getrequest();
            var _jobnumber = _req.jobnumber;
            var _doctorname = _req.doctorname;
            var _shenfenzh = _req.shenfenzh;
            var _bingrenid = _req.bingrenid;
            var _jigoudm = _req.jigoudm;
            var _timestamp = _req.timestamp;
            var _departmentcode = _req.departmentcode;
            var _departmentname = _req.departmentname;
            var _jiuzhenid = _req.jiuzhenid;
            var _bingrenxm = _req.bingrenxm;
            //设置可视化
            $.each(data, function (index, item) {
                if (item != null && item != undefined) {
                    //类型1表示依赖于医生工号
                    if (item.type == 1) {
                        item.visible = !myextend.isNull(_jobnumber) && !_req.isInWhite() && item.visible != "none" ? "inline-block" : "none";
                    }
                    var baseurl = item.href;

                    baseurl = myextend.StrUpdateParams(baseurl, "#dataitems.jobnumber#", _jobnumber, true);
                    baseurl = myextend.StrUpdateParams(baseurl, "#dataitems.doctorname#", _doctorname, true);
                    baseurl = myextend.StrUpdateParams(baseurl, "#dataitems.jigoudm#", _jigoudm, true);
                    baseurl = myextend.StrUpdateParams(baseurl, "#dataitems.departmentname#", _departmentname, true);
                    baseurl = myextend.StrUpdateParams(baseurl, "#dataitems.departmentcode#", _departmentcode, true);
                    baseurl = myextend.StrUpdateParams(baseurl, "#dataitems.timestamp#", _timestamp, true);
                    baseurl = myextend.StrUpdateParams(baseurl, "#dataitems.jiuzhenid#", _jiuzhenid, true);
                    baseurl = myextend.StrUpdateParams(baseurl, "#dataitems.bingrenid#", _bingrenid, true);
                    baseurl = myextend.StrUpdateParams(baseurl, "#dataitems.shenfenzh#", _shenfenzh, true);
                    baseurl = myextend.StrUpdateParams(baseurl, "#dataitems.bingrenxm#", _bingrenxm, true);

                    item.href = baseurl;

                    //类型2表示依赖于共享账号白名单
                }
            });
            //template
            var setting_template = $("#setting_template").html();
            $.template("myTemplate", setting_template);
            //render
            $("#setting_wrapper").html($.tmpl("myTemplate", data));

            $("#setting_wrapper").find(".mylink").unbind("click").on("click", function () {
                var baseurl = $(this).attr("data-url");
                var win = $(this).attr("data-win") == "true";
                var title = $(this).html();
                if (win) {
                    $(this).attr("href", "javascript:void(0)");
                    $(this).attr("target", "");
                    require(["base_usercontrol"], function (a) {
                        if (baseurl.indexOf("http://") != -1) {
                            var iframeurl = webglobal.pages.Page_Iframe;
                            baseurl = myextend.UrlUpdateParams(iframeurl, "url", "'" + baseurl + "'", true);
                        }
                        a.openwindow($("#setting_wrapper"), baseurl, title);
                    });
                }
            });

        });
    }


    return {
        show: show
    }
});
