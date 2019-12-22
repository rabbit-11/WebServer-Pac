define(function () {
    var class_base = null;
    function using(callback) {
        require(["base_usercontrol", "easyui", "locale", "web_global", 'jquery', "jextend", "common", "cookie", "easyuiextend"], function (b) {
            class_base = b;

            if (callback != null && callback != undefined) {
                callback();
            }
        });
    }
    var global_config = {
        template: null,
        wrapper: "#mod_wrapper",
        c_jiuzhenrq: "#jiuzhenrq",
        c_xingming: "#xingming",
        c_jiuzhenkh: "#jiuzhenkh",
        c_bingrenid: "#bingrenid",
        c_guahaobc: "#guahaobc",
        c_guahaoks: "#guahaoks",
        btn_search: "#btn_search",
        btn_sync: "#btn_sync",
        btn_logout: "#btn_logout",
        list_wrapper: "#guahaoxxlist",
        win_prediagnosis: "#win_prediagnosis",
        win_emerprediagnosis: "#win_emerprediagnosis",
        sr_list: null,
        wrapper_lururname: "#wrapper_lururname"
    };
    function config() {
        global_config.sr_list = webglobal.services.GetGuaHaoXXList;
        global_config.template = webglobal.templates.mod_guahaoxx;
    }

    function show() {
        using(function () {
            config();
            $(function () {
                $.get(global_config.template, { stamp: Math.random() + 1 }, function (response) {
                    $(global_config.wrapper).append(response);

                    $(global_config.c_jiuzhenrq).datebox({ panelWidth: 220, panelHeight: 226, editable: false, value: myextend.myformatter(new Date()) });


                    $(global_config.c_xingming).textbox();
                    $(global_config.c_xingming).textbox('textbox').bind('keydown', function (e) {
                        EventUtil.doFilter(e, global_config.btn_search);
                    });

                    $(global_config.c_jiuzhenkh).textbox();
                    $(global_config.c_jiuzhenkh).textbox('textbox').bind('keydown', function (e) {
                        EventUtil.doFilter(e, global_config.btn_search);
                    });

                    $(global_config.c_bingrenid).textbox();
                    $(global_config.c_bingrenid).textbox('textbox').bind('keydown', function (e) {
                        EventUtil.doFilter(e, global_config.btn_search);
                    });

                    $(global_config.c_guahaobc).combobox({ panelHeight: 'auto', editable: false });
                    $(global_config.c_guahaoks).combobox({
                        panelHeight: '400',
                        editable: true,
                        url: webglobal.services.GetKeShiList,
                        queryParams: getqueryparam_keshi(),
                        method: 'get',
                        valueField: 'keshiid',
                        textField: 'keshimc',
                        multiple: true,
                        formatter: function (row) {
                            var opts = $(this).combobox('options');
                            return '<input type="checkbox" class="combobox-checkbox" id="' + row[opts.valueField] + '">' + row[opts.textField]
                        },
                        onShowPanel: function () {
                            var opts = $(this).combobox('options');
                            var target = this;
                            var values = $(target).combobox('getValues');
                            $.map(values, function (value) {
                                var el = opts.finder.getEl(target, value);
                                el.find('input.combobox-checkbox')._propAttr('checked', true);
                            });
                        },
                        onLoadSuccess: function (data) {
                            var mycookie = getcookie();
                            if (data != null && data != undefined && mycookie != null && mycookie != undefined) {
                                $.map(data, function (a) {
                                    if (mycookie.contains(a.value)) {
                                        a.defaultselect = "1";
                                    }
                                });
                            }
                            class_base.setComboboxDefault($(global_config.c_guahaoks), data);
                            //默认查询
                            init();
                        },
                        onClick: function (row) {
                            combobox.check(this, true, row);
                        },
                        onSelect: function (row) {
                            combobox.check(this, true, row);

                        },
                        onUnselect: function (row) {
                            combobox.check(this, false, row);
                        }
                    });
                    $(global_config.btn_search).linkbutton();
                    $(global_config.btn_sync).linkbutton();
                    $(global_config.btn_logout).linkbutton();

                    var _source = myextend.getUrlParam("source", true);
                    $(global_config.btn_logout).css("display", !myextend.isNull(_source) ? "inline-block" : "none");

                    $(global_config.btn_search).unbind("click").on('click', function () {
                        query();
                    });
                    $(global_config.btn_sync).unbind("click").on('click', function () {
                        synconetype("guahaoxx", query);
                    });
                    $(global_config.btn_logout).unbind("click").on('click', function () {
                        var baseurl = "";
                        switch (_source) {
                            case webglobal.enum_sourcetype.userlogin:
                                baseurl = webglobal.pages.Page_UserLogin;
                                break;
                        }
                        var _req = myrequest.getrequest();
                        if (!myextend.isNull(_req.jigoudm)) baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", "'" + _req.jigoudm + "'", true);

                        window.location = baseurl;
                    });
                    var _req = myrequest.getrequest();
                    $(global_config.wrapper_lururname).html(_req.username);
                });
            });
        });
    }
    function synconetype(synctype, success_callback) {
        var dataparam = getparam(synctype);
        myextend.ajaxPost_simple(webglobal.services.SyncOneType, dataparam, success_callback, true);
    }
    function init() {
        $(global_config.list_wrapper).datagrid({
            url: webglobal.services.GetGuaHaoXXList,
            queryParams: getqueryparam(),
            method: 'post',
            fitColumns: true,
            singleSelect: true,
            pagination: true,
            pageSize: 20,
            pageList: [10, 20, 50, 100, 200],
            loadFilter: easy_extend.pagerFilter,
            remoteSort: false,
            rownumbers: true,
            striped: true,
            emptyMsg: '<span class="must">暂无数据</span>',
            columns: [[
                { field: 'keshimc', title: '科室名称', width: '16%', align: 'center', sortable: true },
                { field: 'yishengxm', title: '医生姓名', width: '12%', align: 'center', sortable: true },
                { field: 'guahaobc', title: '上午/下午', width: '12%', align: 'center', sortable: true },
                { field: 'xingming', title: '姓名', width: '10%', align: 'center', sortable: true },
                { field: 'jiuzhenkh', title: '就诊卡号', width: '10%', align: 'center', sortable: true },
                { field: 'xingbie', title: '性别', width: '10%', align: 'center', sortable: true },
                { field: 'chushengrq', title: '出生日期', width: '10%', align: 'center', sortable: true },
                { field: 'bingrenid', title: '健康号', width: '10%', align: 'center', sortable: true },
                { field: 'filenumber', title: '建大卡号', width: '10%', align: 'center', sortable: true },
                { field: 'jiuzhenid', hidden: true },
                { field: 'zhengjianhm', hidden: true },
            ]],
            onClickRow: function (index, row) { showwindow(row.jiuzhenid, row.zhengjianhm, row.bingrenid, row.keshidm, row.xingming, row.keshimc); },
            onLoadSuccess: function (data) {
                if (data == null | data == undefined || data.total <= 0) {
                    $(this).datagrid('resize', { height: 200 });
                }
                else {
                    $(this).datagrid('resize', { height: 'auto' });
                }
            },
            rowStyler: function (index, row) {
                switch (row.status) {
                    case 3:
                        return 'background-color:#B4EEB4;color:#000;';
                    case 4:
                        return 'background-color:#FFE4B5;color:#000;';
                }
                if (row.status == 1) {
                    //return { class: 'back_class_deep', style: { 'color': '#fff'} };
                }
            }
        });
    }
    function getparam(synctype) {
        var jiuzhenrq = $(global_config.c_jiuzhenrq).datebox('getValue');
        var guahaoks = $(global_config.c_guahaoks).combobox('getValues');
        var bingrenid = $(global_config.c_bingrenid).val();

        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("visitdate", jiuzhenrq);
        dictionary.set("keshiids", JSON.stringify(guahaoks));
        dictionary.set("type", synctype);
        dictionary.set("bingrenid", bingrenid);
        dictionary.set("jigoudm", _req.jigoudm);

        return dictionary;
    }
    function getqueryparam() {
        var jiuzhenrq = $(global_config.c_jiuzhenrq).datebox('getValue');
        var guahaoks = $(global_config.c_guahaoks).combobox('getValues');
        var xingming = $(global_config.c_xingming).val();
        var jiuzhenkh = $(global_config.c_jiuzhenkh).val();
        var bingrenid = $(global_config.c_bingrenid).val();
        var guahaobc = $(global_config.c_guahaobc).combobox('getValue');

        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("time", jiuzhenrq);
        dictionary.set("guahaoks", guahaoks);
        dictionary.set("xingming", xingming);
        dictionary.set("jiuzhenkh", jiuzhenkh);
        dictionary.set("guahaobc", guahaobc);
        dictionary.set("bingrenid", bingrenid);
        dictionary.set("jigoudm", _req.jigoudm);

        addcookie(guahaoks);

        return { "input": JSON.stringify(dictionary.getItems()) };
    }
    function getqueryparam_keshi() {

        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("jigoudm", _req.jigoudm);
        dictionary.set("type", getKeShiType());

        return { "input": JSON.stringify(dictionary.getItems()) };
    }
    function addcookie(data) {
        require(["cookie", "jquery"], function () {
            $.cookie("keshi", JSON.stringify(data));
        });
    }
    function getcookie() {
        var s = $.cookie("keshi");
        if (s == null || s == undefined) return null;
        return JSON.parse(s);
    }
    function query() {
        $(global_config.list_wrapper).datagrid('load', getqueryparam());
    }
    function showwindow(jiuzhenid, shenfenzh, bingrenid, keshiid, bingrenxm, keshimc) {
        var lururcode = myextend.getUrlParam("lururcode", true);
        var lururname = myextend.getUrlParam("lururname", true);
        var jigoudm = myextend.getUrlParam("jigoudm", true);
        getKeShiType(keshiid, function (data) {
            if (data == null || data == undefined || data.info == null || data.info == undefined)
                return;
            var keshitype = data.info.type;
            var isemergency = data.info.type == webglobal.enum_keshitype.emergency;
            var baseurl = isemergency ? webglobal.pages.Page_EmerPreDiagnosis : webglobal.pages.Page_PreDiagnosis;

            if (!myextend.isNull(jiuzhenid)) baseurl = myextend.UrlUpdateParams(baseurl, "jiuzhenid", "'" + jiuzhenid + "'", true);
            if (!myextend.isNull(shenfenzh)) baseurl = myextend.UrlUpdateParams(baseurl, "shenfenzh", "'" + shenfenzh + "'", true);
            if (!myextend.isNull(bingrenid)) baseurl = myextend.UrlUpdateParams(baseurl, "bingrenid", "'" + bingrenid + "'", true);
            if (!myextend.isNull(bingrenxm)) baseurl = myextend.UrlUpdateParams(baseurl, "bingrenxm", "'" + bingrenxm + "'", true);
            if (!myextend.isNull(lururcode)) baseurl = myextend.UrlUpdateParams(baseurl, "lururcode", "'" + lururcode + "'", true);
            if (!myextend.isNull(lururname)) baseurl = myextend.UrlUpdateParams(baseurl, "lururname", "'" + lururname + "'", true);
            if (!myextend.isNull(keshiid)) baseurl = myextend.UrlUpdateParams(baseurl, "departmentcode", "'" + keshiid + "'", true);
            if (!myextend.isNull(keshimc)) baseurl = myextend.UrlUpdateParams(baseurl, "departmentname", "'" + keshimc + "'", true);
            if (!myextend.isNull(jigoudm)) baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", "'" + jigoudm + "'", true);

            var win = isemergency ? $(global_config.win_emerprediagnosis) : $(global_config.win_prediagnosis);
            win.attr("data-url", baseurl);
            class_base.showwindow(win);
        });
    }
    function getKeShiType(departmentcode, success_callback) {
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("departmentcode", departmentcode);
        dictionary.set("jigoudm", _req.jigoudm);

        myextend.ajaxPost_simple(webglobal.services.GetGuaHaoType, dictionary, success_callback, true);
    }
    return {
        show: show,
        query: query
    }
});

