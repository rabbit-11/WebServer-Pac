define(function () {
    var globalbase = null;
    var ctrl = {
        win_pregnantlist_mod_wrapper: '#win_pregnantlist_mod_wrapper',
        pregnantlist: '#pregnantlist',
        pregnantlist_querywrapper: "#pregnantlist_querywrapper",
        dateofprenatal_s: "#dateofprenatal_s",
        dateofprenatal_e: "#dateofprenatal_e",
        xingming: "#xingming",
        jiuzhenkh: "#jiuzhenkh",
        shenfenzh: "#shenfenzh",
        status: "#status",
        btn_search: "#btn_search",
    };
    function show() {
        require(["easyui", "locale", "web_global", 'jquery', "jextend", "common", "cookie", "easyuiextend"], function () {
            $(function () {
                $.get(webglobal.templates.mod_pregnantlist, { stamp: Math.random() + 1 }, function (response) {
                    $(ctrl.win_pregnantlist_mod_wrapper).append(response);

                    $(ctrl.dateofprenatal_s).datebox({  panelWidth: 220, panelHeight: 226, editable: false });
                    $(ctrl.dateofprenatal_e).datebox({  panelWidth: 220, panelHeight: 226, editable: false });
                    $(ctrl.xingming).textbox();
                    $(ctrl.jiuzhenkh).textbox();
                    $(ctrl.shenfenzh).textbox();
                    $(ctrl.status).combobox({ panelHeight: 'auto', editable: false });
                    $(ctrl.btn_search).linkbutton();

                    $(ctrl.dateofprenatal_s).datebox('setValue', undefined);
                    $(ctrl.dateofprenatal_e).datebox('setValue', undefined);

                    //设置初始值
                    var visittype = myextend.getUrlParam("visittype");
                    var _req = myrequest.getrequest();
                    var canquery=visittype == "more";
                    EventUtil.showOrHide($(ctrl.pregnantlist_querywrapper),canquery);
                    if (canquery) {
                        $(ctrl.dateofprenatal_s).datebox('setValue', myextend.myformatter(new Date().DateAdd('d', -7)));
                        $(ctrl.dateofprenatal_e).datebox('setValue', myextend.myformatter(new Date()));
                    }
                    else {
                        $(ctrl.xingming).textbox('setValue', _req.bingrenxm);
                        $(ctrl.shenfenzh).textbox('setValue', _req.shenfenzh);
                        $(ctrl.status).combobox('setValue', "-1");
                    }
                    init();
                    $(ctrl.btn_search).unbind("click").on('click', function () {
                        query();
                    });

                });
            });
        });
    }
    function init() {
        $(ctrl.pregnantlist).datagrid({
            url: webglobal.services.GetPregnantList,
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
                    { field: 'personname', title: '姓名', width: '12%', align: 'center', sortable: true },
                    { field: 'idcard', title: '身份证号', width: '12%', align: 'center', sortable: true },
                    { field: 'patientaccount', title: '就诊卡号', width: '12%', align: 'center', sortable: true },
                    { field: 'birthday', title: '出生日期', width: '12%', align: 'center', sortable: true },
                    { field: 'dateofprenatal', title: '预产期', width: '12%', align: 'center', sortable: true },
                    { field: 'sourceunit', title: '建档机构', width: '23%', align: 'center', sortable: true, formatter: remarkFormater },
                    { field: 'status', title: '状态', width: '12%', align: 'center', sortable: true },
                    {
                        title: '查看',
                        field: 'view',
                        width: "5%",
                        formatter: function (value, row, index) {
                            //获取参数
                            var _req = myrequest.getrequest();
                            //查看完整档案
                            var baseurl = webglobal.pages.Page_PregnantSummary;
                            var jobnumber = _req.jobnumber;
                            var jigoudm = _req.jigoudm;
                            var shenfenzh = (row.idcard + "").mytrim();
                            var pid = row.id;

                            if (!myextend.isNull(jobnumber)) baseurl = myextend.UrlUpdateParams(baseurl, "jobnumber", "'" + jobnumber + "'", false);
                            if (!myextend.isNull(jigoudm)) baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", "'" + jigoudm + "'", false);
                            if (!myextend.isNull(shenfenzh)) baseurl = myextend.UrlUpdateParams(baseurl, "idcard", "'" + shenfenzh + "'", false);
                            if (!myextend.isNull(pid) && pid > 0 && !isNaN(pid)) baseurl = myextend.UrlUpdateParams(baseurl, "pid", pid, false);

                            return '<a class="btn_view btnlink" style="color:black;" data-id="' + row.id + '" href="' + baseurl + '" target="_blank" data-view="false">查看</a>';
                        }
                    }
                ]],
            //            onClickRow: function (index, row) { showwindow(row.jiuzhenid, row.zhengjianhm); },
            onLoadSuccess: function (data) {
                if (data == null | data == undefined || data.total <= 0) {
                    $(this).datagrid('resize', { height: 200 });
                }
                else {
                    $(this).datagrid('resize', { height: 'auto' });
                }
                $(".easyui-tooltip").tooltip();
            }

        });
    }
    function remarkFormater(value, row, index) {
        var content = '';
        var abValue = value + '';
        if (value != undefined) {
            if (value.length >= 20) {
                abValue = value.substring(0, 17) + "...";
                content = '<span title="' + value + '" class="easyui-tooltip">' + abValue + '</span>';
            }
            else {
                content = '<span  title="' + value + '" class="easyui-tooltip">' + abValue + '</span>';
            }
        }
        return content;
    }
    function getqueryparam() {
        var dateofprenatal_s = $(ctrl.dateofprenatal_s).datebox('getValue');
        var dateofprenatal_e = $(ctrl.dateofprenatal_e).datebox('getValue');
        var personname = $(ctrl.xingming).val();
        var idcard = $(ctrl.shenfenzh).val();
        var patientaccount = $(ctrl.jiuzhenkh).val();
        var status = $(ctrl.status).combobox('getValue');

        var dictionary = new myextend.Dictionary();
        dictionary.set("idcard", idcard);
        dictionary.set("personname", personname);
        dictionary.set("patientaccount", patientaccount);
        dictionary.set("status", status);
        dictionary.set("dateofprenatal_s", dateofprenatal_s);
        dictionary.set("dateofprenatal_e", dateofprenatal_e);

        return { "input":myextend.HtmlEncode( JSON.stringify(dictionary.getItems())) };
    }
    function query() {
        $(ctrl.pregnantlist).datagrid('load', getqueryparam());
    }
    return { show: show }
});

