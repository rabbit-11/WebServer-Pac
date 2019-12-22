define(function () {
    var globalbase = null;
    var ctrl = {
        mod_wrapper: "#mod_wrapper",
        s_lastvisidate: "#s_lastvisidate",
        e_lastvisidate: "#e_lastvisidate",
        s_dateofprenatal: '#s_dateofprenatal',
        e_dateofprenatal: '#e_dateofprenatal',
        s_followupappointment: '#s_followupappointment',
        e_followupappointment: '#e_followupappointment',
        personname: '#personname',
        patientaccount: '#patientaccount',
        departmentname: '#departmentname',

        departmentname: '#departmentname',
        lastdoctorname: '#lastdoctorname',
        patientid: '#patientid',
        hasvisit: '#hasvisit',
        highrisklevel: '#highrisklevel',
        highriskreason: '#highriskreason',
        btn_search: '#btn_search',
        highriskvisitlist: "#highriskvisitlist",
        infectdisease: "#infectdisease",
        btn_logout: "#btn_logout",

        overday_e: '#overday_e',
        overday_s: '#overday_s',
        checkweek_e: '#checkweek_e',
        checkweek_s: '#checkweek_s',
        hashighrisk: '#hashighrisk',
        haskcal: '#haskcal',
        visit_template: "#visit_template"
    }
    function show() {
        require(["easyui", "locale", "web_global", "tmpl", 'jquery', "jextend", "common", "cookie", "easyuiextend", "datagrid_detailview"], function () {
            $(function () {
                $.get(webglobal.templates.mod_list_highriskvisit, { stamp: Math.random() + 1 }, function (response) {
                    $(ctrl.mod_wrapper).append(response);

                    $(ctrl.s_lastvisidate).datebox({ panelWidth: 220, panelHeight: 226, editable: false });
                    $(ctrl.e_lastvisidate).datebox({ panelWidth: 220, panelHeight: 226, editable: false });

                    $(ctrl.s_dateofprenatal).datebox({ panelWidth: 220, panelHeight: 226, editable: false, value: myextend.myformatter(new Date()) });
                    $(ctrl.e_dateofprenatal).datebox({ panelWidth: 220, panelHeight: 226, editable: false });

                    $(ctrl.s_followupappointment).datebox({ panelWidth: 220, panelHeight: 226, editable: false });
                    $(ctrl.e_followupappointment).datebox({ panelWidth: 220, panelHeight: 226, editable: false });

                    $(ctrl.personname).textbox();
                    $(ctrl.patientaccount).textbox();
                    $(ctrl.departmentname).textbox();
                    $(ctrl.lastdoctorname).textbox();
                    $(ctrl.patientid).textbox();

                    $(ctrl.checkweek_e).textbox();
                    $(ctrl.checkweek_s).textbox();
                    $(ctrl.overday_s).textbox();
                    $(ctrl.overday_e).textbox();
                    $(ctrl.hashighrisk).combobox({ panelHeight: 'auto', url: webglobal.jsons.shifou, method: 'get', editable: false });
                    $(ctrl.haskcal).combobox({ panelHeight: 'auto', url: webglobal.jsons.shifou, method: 'get', editable: false,value:"1" });

                    $(ctrl.hasvisit).combobox({ panelHeight: 'auto', url: webglobal.jsons.shifou, method: 'get', editable: false });
                    $(ctrl.highrisklevel).combobox({
                        panelHeight: 'auto',
                        editable: false,
                        url: webglobal.jsons.highrisklevel,
                        method: "get",
                        multiple: true,
                        formatter: function (row) {
                            var opts = $(this).combobox('options');
                            return '<input type="checkbox" class="combobox-checkbox" id="' + row[opts.valueField] + '">' + row[opts.textField]
                        },
                        onSelect: function (row) {
                            var opts = $(this).combobox('options');
                            var el = opts.finder.getEl(this, row[opts.valueField]);
                            el.find('input.combobox-checkbox')._propAttr('checked', true);
                        },
                        onUnselect: function (row) {
                            var opts = $(this).combobox('options');
                            var el = opts.finder.getEl(this, row[opts.valueField]);
                            el.find('input.combobox-checkbox')._propAttr('checked', false);
                        }
                    });
                    {
                        var url = webglobal.services.GetHighRiskRating;
                        var _req = myrequest.getrequest();
                        url = myextend.UrlUpdateParams(url, "jigoudm", _req.jigoudm);
                        $(ctrl.highriskreason).combotree({
                            panelHeight: 'auto'
                            , url: url
                            , method: 'get'
                            , panelHeight: 500
                            , panelWidth: 500
                            , checkbox: true
                            , onlyLeafCheck: true
                            , multiple: true
                            , editable: true
                            , filter: function (q, row) {
                                return ((row.text + "").toUpperCase()).indexOf((q + "").toUpperCase()) >= 0;
                            }
                        });
                    }
                    $(ctrl.infectdisease).combobox({ panelHeight: 'auto', url: webglobal.jsons.shifou, method: 'get', editable: false });

                    init();
                    $(ctrl.btn_search).linkbutton();
                    $(ctrl.btn_search).unbind("click").on('click', function () {
                        query();
                    });
                    $(ctrl.btn_logout).linkbutton();

                    var _source = myextend.getUrlParam("source", true);
                    $(ctrl.btn_logout).css("display", !myextend.isNull(_source) ? "inline-block" : "none");
                    $(ctrl.btn_logout).unbind("click").on('click', function () {
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
                });
            });
        });
    }
    function init() {
        $(ctrl.highriskvisitlist).datagrid({
            url: webglobal.services.GetHighRiskVisitList,
            queryParams: getqueryparam(),
            method: 'post',
            fitColumns: true,
            singleSelect: true,
            rownumbers: true,
            pagination: true,
            pageSize: 20,
            pageList: [10, 20, 50, 100, 200],
            loadFilter: easy_extend.pagerFilter,
            remoteSort: false,
            nowrap: false,
            emptyMsg: '<span class="must">暂无数据</span>',
            columns: [[
                    { field: 'personname', title: '姓名', width: '5%', align: 'center' },
                    { field: 'mobilenumber', title: '联系电话', width: '8%', align: 'center', formatter: remarkFormater },

                    { field: 'dateofprenatal', title: '预产期', width: '5%', align: 'center', formatter: myextend.myformatter_1 },
                    { field: 'builknumber', title: '建大卡号', width: '8%', align: 'center', formatter: remarkFormater },
                    { field: 'highrisklevel', title: '高危等级', width: '5%', align: 'center',
                        styler: function (value, row, index) {
                            var css = {};

                            if ((value + "").indexOf("绿") != -1) {
                                css.class = "green";
                            }
                            else if ((value + "").indexOf("黄") != -1) {
                                css.class = "yellow";
                            }
                            else if ((value + "").indexOf("橙") != -1) {
                                css.class = "orange";
                            }
                            else if ((value + "").indexOf("红") != -1) {
                                css.class = "red";
                            }
                            if ((value + "").indexOf("紫") != -1) {
                                css.style = 'color:#6E0A9E';
                            }
                            return css;
                        }
                    },
                    { field: 'lastvisitdate', title: '末次检查日期', width: '6%', align: 'center', formatter: myextend.myformatter_1 },
                    { field: 'lastdoctorname', title: '末次检查医生', width: '6%', align: 'center', formatter: remarkFormater },
                    { field: 'visitcount', title: '产检次数', width: '5%', align: 'center', formatter: remarkFormater },
                    { field: 'followupappointment', title: '预约日期', width: '5%', align: 'center', formatter: myextend.myformatter_1 },
                    { field: 'overday', title: '超时天数', width: '4%', align: 'center' },
                    { field: 'checkweek', title: '孕周', width: '4%', align: 'center' },
                    { field: 'chasedoctorname', title: '追访医生', width: '5%', align: 'center' },
                    { field: 'chasedate', title: '追访日期', width: '5%', align: 'center', formatter: myextend.myformatter_1 },
                    { field: 'chaseresult', title: '随访结果', width: '6%', align: 'center' },
                    { field: 'chasenotice', title: '通知', width: '6%', align: 'center' },
                    { field: 'isappointment', title: '诊间预约', width: '5%', align: 'center' },
                    { field: 'hasvisit', title: '状态', width: '4%', align: 'center' },
                    { field: 'remark', title: '备注', width: '4%', align: 'center', formatter: remarkFormater },
                    {
                        title: '追访',
                        field: 'visit',
                        formatter: function (value, row, index) {
                            var vs = "visibility";
                            return '<a class="btn_edit btnlink" style="color:black;visibility:' + vs + ';" data-id="' + row.chaseid + '" data-pregnantinfoid="' + row.pregnantinfoid + '" data-personname="' + row.personname + '" data-attached_type="' + row.attached_type + '"  data-visitrecordid="' + row.visitrecordid + '" href="javascript:void(0)">追访</a>';
                        }, width: '3%'
                    },
            //                    { field: 'visitrecordid', hidden: true },
            //                    { field: 'pregnantinfoid', hidden: true },
            //                    { field: 'chaseid', hidden: true },
                ]],
            view: detailview,
            detailFormatter: function (index, row) {
                //datasource
                var arr = [];
                arr.push(row);

                //template
                var visit_template = $(ctrl.visit_template).html();
                $.template("myTemplate", visit_template);
                var s = $.tmpl("myTemplate", arr);
                return '<div class="border_class_deep_top border_class_deep_bottom" style="width:96%;margin:10px auto;border-left:0px solid black;border-right:0px solid black;">' + s.html() + '</div>';
            },
            //单击操作和点击追访操作同时触发，导致页面异常
            //            onClickRow: function (index, row) {
            //                var _req = myrequest.getrequest();
            //                ShowOneUrl(row.chaseid, row.visitrecordid, row.pregnantinfoid, row.attached_type, _req.jobnumber, _req.doctorname, _req.jigoudm, row.personname);
            //            },
            onLoadSuccess: function (data) {

                if (data == null | data == undefined || data.total <= 0) {
                    $(this).datagrid('resize', { height: 200 });
                }
                else {
                    $(this).datagrid('resize', { height: 'auto' });
                }
                $(".btn_edit").unbind("click").on("click", function (sender) {
                    OnEdit(sender.target);
                });
            }

        });
    }
    function OnEdit(target) {
        require(["base_usercontrol", "common", "jextend"], function (base) {
            var chaseid = $(target).attr("data-chaseid");
            var visitrecordid = $(target).attr("data-visitrecordid");
            var pregnantinfoid = $(target).attr("data-pregnantinfoid");
            var personname = $(target).attr("data-personname");
            var attached_type = $(target).attr("data-attached_type");

            var _req = myrequest.getrequest();

            ShowOneUrl(chaseid, visitrecordid, pregnantinfoid, attached_type, _req.userid, _req.username, _req.jigoudm, personname);
        });
    }
    function ShowOneUrl(chaseid, visitrecordid, pregnantinfoid, attached_type, doctorid, doctorname, jigoudm, personname) {
        require(["base_usercontrol"], function (base) {
            var mywindow = $("#win_chasevisit");
            var baseurl = base.getattr(mywindow, "data-url");
            baseurl = myextend.UrlUpdateParams(baseurl, "chaseid", chaseid);
            baseurl = myextend.UrlUpdateParams(baseurl, "visitrecordid", visitrecordid);
            baseurl = myextend.UrlUpdateParams(baseurl, "pregnantinfoid", pregnantinfoid);
            baseurl = myextend.UrlUpdateParams(baseurl, "attached_type", attached_type);
            baseurl = myextend.UrlUpdateParams(baseurl, "chasedoctorcode", doctorid);
            baseurl = myextend.UrlUpdateParams(baseurl, "chasedoctorname", doctorname);
            baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", jigoudm);
            baseurl = myextend.UrlUpdateParams(baseurl, "personname", personname, true);

            base.setattr(mywindow, "data-url", baseurl);
            base.setattr(mywindow, "data-back", null);
            base.showwindow(mywindow);
        });
    }

    function getqueryparam() {
        var s_lastvisidate = $(ctrl.s_lastvisidate).datebox('getValue');
        var e_lastvisidate = $(ctrl.e_lastvisidate).datebox('getValue');

        var s_dateofprenatal = $(ctrl.s_dateofprenatal).datebox('getValue');
        var e_dateofprenatal = $(ctrl.e_dateofprenatal).datebox('getValue');

        var s_followupappointment = $(ctrl.s_followupappointment).datebox('getValue');
        var e_followupappointment = $(ctrl.e_followupappointment).datebox('getValue');

        var personname = $(ctrl.personname).val();
        var patientaccount = $(ctrl.patientaccount).val();
        var patientid = $(ctrl.patientid).val();
        var departmentname = $(ctrl.departmentname).val();
        var lastdoctorname = $(ctrl.lastdoctorname).val();
        var hasvisit = $(ctrl.hasvisit).combobox('getValue');
        var haskcal = $(ctrl.haskcal).combobox('getValue');

        var highisklevel = $(ctrl.highrisklevel).combobox('getValues');
        var infectdisease = $(ctrl.infectdisease).combobox('getValue');


        var checkweek_e = $(ctrl.checkweek_e).val();
        var checkweek_s = $(ctrl.checkweek_s).val();
        var overday_s = $(ctrl.overday_s).val();
        var overday_e = $(ctrl.overday_e).val();
        var hashighrisk = $(ctrl.hashighrisk).combobox('getValue');

        //高危因素
        var highriskreason = [];
        var nodes_highrikreason = $(ctrl.highriskreason).combotree("tree").tree('getChecked');
        if (nodes_highrikreason != null && nodes_highrikreason != undefined && nodes_highrikreason.length > 0) {
            $.map(nodes_highrikreason, function (x) {
                highriskreason.push(x.attributes.dictionary);
            });
        }

        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("s_lastvisitdate", s_lastvisidate);
        dictionary.set("e_lastvisitdate", e_lastvisidate);
        dictionary.set("s_dateofprenatal", s_dateofprenatal);
        dictionary.set("e_dateofprenatal", e_dateofprenatal);
        dictionary.set("s_followupappointment", s_followupappointment);
        dictionary.set("e_followupappointment", e_followupappointment);

        dictionary.set("personname", personname);
        dictionary.set("patientaccount", patientaccount);
        dictionary.set("patientid", patientid);
        dictionary.set("departmentname", departmentname);
        dictionary.set("hasvisit", hasvisit);
        dictionary.set("lastdoctorname", lastdoctorname);
        dictionary.set("highriskreasons", highriskreason);
        dictionary.set("highrisklevel", highisklevel);
        dictionary.set("infectdisease", infectdisease);

        dictionary.set("checkweek_e", checkweek_e);
        dictionary.set("checkweek_s", checkweek_s);
        dictionary.set("overday_s", overday_s);
        dictionary.set("overday_e", overday_e);
        dictionary.set("hashighrisk", hashighrisk);
        dictionary.set("haskcal", haskcal);

        return { "input": myextend.HtmlEncode(JSON.stringify(dictionary.getItems())) };
    }
    function query() {

        $(ctrl.highriskvisitlist).datagrid('load', getqueryparam());
    }

    function remarkFormater(value, row, index) {
        var content = '';
        var abValue = value + '';
        if (value != undefined) {
            if (value.length >= 18) {
                abValue = value.substring(0, 15) + "...";
                content = '<span title="' + value + '" class="easyui-tooltip">' + abValue + '</span>';
            }
            else {
                content = '<span  title="' + value + '" class="easyui-tooltip">' + abValue + '</span>';
            }
        }
        return content;
    }
    return { show: show,
        reload: query
    }
});

