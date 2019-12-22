define(function () {
    var opened = [];
    var ctrl = {
        win_pregnantsummary_mod_wrapper: "#win_pregnantsummary_mod_wrapper",
        pregsummary_header: "#pregsummary_header",
        pregnantsummary_wrapper: "#pregnantsummary_wrapper",
        info_template: "#info_template",
        pregsummary_mostrisk_wrapper: "#pregsummary_mostrisk_wrapper",
        hl_view_pregnantdetail: "#hl_view_pregnantdetail",
        visit_template: "#visit_template"
    };
    var share_highrisk = null;
    function show() {
        require(["share_highrisk", "tmpl", 'jquery', "jextend", "common", "web_global", "easyui", "edatagrid", "easyuiextend", "locale", "datagrid_detailview"], function (share) {
            share_highrisk = share;
            share_highrisk.init(
            function () { load(); }
            );

        });
    }
    function load() {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                $.get(webglobal.templates.mod_pregnantsummary, { stamp: Math.random() + 1 }, function (response) {
                    $(ctrl.win_pregnantsummary_mod_wrapper).append(response);
                    loadinfo($(ctrl.pregsummary_header), data.info);
                    loadtabs($(ctrl.pregnantsummary_wrapper));
                });
            }
            else {
                $.get(webglobal.templates.norecord, { stamp: Math.random() + 1 }, function (res) {
                    $(ctrl.win_pregnantsummary_mod_wrapper).html(res);
                });
            }
        };
        var dictionary = new myextend.Dictionary();
        var _req = myrequest.getrequest();
        dictionary.set("shenfenzh", _req.shenfenzh);
        dictionary.set("pid", myextend.getUrlParam("pid"));

        myextend.ajaxPost_simple(webglobal.services.GetJDXX_1, dictionary, web_list_callback, true);
    }
    function loadtabs(wrapper) {
        $(wrapper).tabs({
            border: true,
            pill: true,
            justified: true,
            onSelect: function (title, index) {
                var mytab = $(wrapper).tabs('getTab', index);
                var item = mytab.find(".wr");
                if (item != null && item != undefined && item.length > 0) {

                    if (opened.contains(index)) {
                        return;
                    }
                    else {
                        opened.push(index);
                    }
                    switch (index) {
                        case 0:
                            loadvisitlist(item);
                            break;
                        case 1:
                            loadlaborder(item);
                            break;
                        case 2:
                            loadexamorder(item);
                            break;
                        case 3:
                            loadchufang(item);
                            break;
                    }
                }
            }
        });
    }
    function loadinfo(wrapper, data) {
        //获取参数
        var _req = myrequest.getrequest();
        //datasource
        var arr = [];
        arr.push(data);

        //template
        var info_template = $(ctrl.info_template).html();
        $.template("myTemplate", info_template);
        //render
        $(wrapper).append($.tmpl("myTemplate", arr));
        //极危报警信息
        loadmostriskinfo($(ctrl.pregsummary_mostrisk_wrapper));
        //查看完整档案
        var baseurl = webglobal.pages.YUNCHANFDL;
        var jobnumber = _req.jobnumber;
        var jigoudm = _req.jigoudm;
        var shenfenzh = _req.shenfenzh; //myextend.getUrlParam("idcard");
        var bingrenid = data != null && data != undefined ? data.patientid : "";
        var pid = _req.pid; // myextend.getUrlParam("pid");

        if (jobnumber == "" || jobnumber == null || jobnumber == undefined)
            jobnumber = webglobal.conf.whitedoctorid;

        if (!myextend.isNull(jobnumber)) baseurl = myextend.UrlUpdateParams(baseurl, "jobnumber", "'" + jobnumber + "'", true);
        if (!myextend.isNull(shenfenzh)) baseurl = myextend.UrlUpdateParams(baseurl, "shenfenzh", "'" + shenfenzh + "'", true);
        if (!myextend.isNull(bingrenid)) baseurl = myextend.UrlUpdateParams(baseurl, "bingrenid", "'" + bingrenid + "'", true);
        if (!myextend.isNull(pid)) baseurl = myextend.UrlUpdateParams(baseurl, "pid", pid, true);
        if (!myextend.isNull(jigoudm)) baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", "'" + jigoudm + "'", true);

        $(ctrl.hl_view_pregnantdetail).attr("href", baseurl);
    }
    function loadvisitlist(wrapper) {
        var baseurl = webglobal.services.GetVisitRecordList_1;
        $(wrapper).datagrid({
            url: baseurl,
            queryParams: getqueryparam(),
            //            fitColumns: true,
            singleSelect: true,
            rownumbers: true,
            pagination: true,
            pageSize: 20,
            pageList: [10, 20, 50, 100, 200],
            loadFilter: easy_extend.pagerFilter,
            remoteSort: false,
            striped: true,
            //nowrap:false,
            emptyMsg: '<span class="must">暂无数据</span>',
            columns: [[
                    { field: 'visitdate', title: '检查日期', width: '6%', align: 'center' },
                    { field: 'checkweek', title: '孕周', width: '3%', align: 'center' },
                    { field: 'bp', title: '血压mmHg', width: '5%', align: 'center' },
                    { field: 'weight', title: '体重kg', width: '5%', align: 'center' },
                    { field: 'heartrate', title: '脉搏cpm', width: '5%', align: 'center' },
                    { field: 'edemastatus', title: '浮肿', width: '5%', align: 'center' },
                    { field: 'xianjie', title: '衔接', width: '5%', align: 'center' },
                    { field: 'heightfundusuterus', title: '宫高cm', width: '5%', align: 'center' },
                    { field: 'abdomencircumference', title: '腹围cm', width: '5%', align: 'center' },
                    { field: 'fetalheartrates', title: '胎心率bpm', width: '7%', align: 'center' },
                    { field: 'fetalpositions', title: '胎方位', width: '8%', align: 'center' },
                    { field: 'presentpositions', title: '先露', width: '5%', align: 'center' },
                    { field: 'fetalmoves', title: '胎动', width: '5%', align: 'center' },
            //                    { field: 'highrisklevel', title: '高危评定', width: '5%', align: 'center', formatter: share_highrisk.unitFormatter_level },
                    {field: 'followupappointment', title: '下次随访日期', width: '8%', align: 'center' },
                    { field: 'hospitalcode', title: '产检单位', width: '17%', align: 'center', formatter: remarkFormater },
                    { field: 'doctorname', title: '随访医生', width: '5%', align: 'center' },
                ]],
            toolbar: [
                {
                    text: '下载',
                    handler: function (sender) {
                        //                        OnDownload();
                        //获取参数
                        var _req = myrequest.getrequest();
                        var dictionary = new myextend.Dictionary();
                        dictionary.set("shenfenzh", _req.shenfenzh); // myextend.getUrlParam("idcard")
                        dictionary.set("jigoudm", _req.jigoudm); // myextend.getUrlParam("jigoudm")
                        dictionary.set("pid", _req.pid); //myextend.getUrlParam("pid")
                        dictionary.set("ptype", 1);

                        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
                        if (dataparam == "" || dataparam == undefined)
                            return;
                        window.open(webglobal.services.DownloadCompletePreg + "?" + dataparam);
                    }
                }, '-',
                {
                    text: '打印',
                    handler: function (sender) {
                        OnPrint();
                    }
                }
                ],
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
            onExpandRow: function (index, row) {
                //                var ddv = $(this).datagrid('getRowDetail', index).find('div.ddv');
                //                ddv.panel({
                //                    border: false,
                //                    cache: false,
                //                    href: webglobal.templates.one_visitrecord_detail,
                //                    onLoad: function () {
                //                        $(wrapper).datagrid('fixDetailRowHeight', index);
                //                    }
                //                });
                //                $(wrapper).datagrid('fixDetailRowHeight', index);
                $(this).datagrid('selectRow', index);
            },
            onCollapseRow: function (index, row) {
                $(this).datagrid('unselectRow', index);
            },
            onLoadSuccess: function (data) {
                if (data == null | data == undefined || data.total <= 0) {
                    $(this).edatagrid('resize', { height: $(this).parents(".tabs-panels").height() + 20 });
                }
                else {
                    $(this).edatagrid('resize', { height: 'auto' });
                }
                $(".easyui-tooltip").tooltip();
            }
        });
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
    function getqueryparam() {
        var dictionary = new myextend.Dictionary();
        var _req = myrequest.getrequest();
        dictionary.set("shenfenzh", _req.shenfenzh);
        dictionary.set("pid", _req.pid); //myextend.getUrlParam("pid")
        return { "input": myextend.HtmlEncode(JSON.stringify(dictionary.getItems())) };
    }
    function loadlaborder(wrapper) {
        require(["page_laborder"], function (a) { a.show_share(wrapper); });
    }
    function loadexamorder(wrapper) {
        require(["page_examorder"], function (a) { a.show_share(wrapper); });
    }
    function loadchufang(wrapper) {
        require(["page_chufang"], function (a) { a.show_share(wrapper); });
    }
    function loadmostriskinfo(wrapper) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                $(wrapper).html("【极危报警】" + data.info.excepresult);
                $(wrapper).show();
            }
            else {
                $(wrapper).hide();
            }
        };
        var web_list_bef_callback = function (data) { };
        var web_list_com_callback = function (data) { };
        var web_list_err_callback = function (data) { };

        //获取参数
        var mostrisktipid = parseInt(myextend.getUrlParam("mostrisktipid"));
        if (mostrisktipid == null || mostrisktipid == undefined || mostrisktipid <= 0 || isNaN(mostrisktipid))
            return;

        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("id", mostrisktipid);
        dictionary.set("jobnumber", _req.jobnumber);

        myextend.ajaxPost_simple(webglobal.services.GetOneMostRisk, dictionary, web_list_callback, true);
    }
    function OnPrint() {
        require(["lodop_extend", "jquery", "web_global", "jextend", "common"], function (lodop) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    lodop.print(data.info.pagesize, data.info.title, data.info.filenames, data.info.preview);
                }
                else {
                    require(["easyui"], function () {
                        $.messager.alert('错误', data.msg);
                    });
                }
            };
            var web_list_bef_callback = function (data) { };
            var web_list_com_callback = function (data) { };
            var web_list_err_callback = function (data) { };

            var _req = myrequest.getrequest();
            var dictionary = new myextend.Dictionary();
            //dictionary.set("shenfenzh", myextend.getUrlParam("idcard"));

            dictionary.set("shenfenzh", _req.shenfenzh);
            dictionary.set("pid", _req.pid); //myextend.getUrlParam("pid")
            dictionary.set("jigoudm", _req.jigoudm);

            myextend.ajaxPost_simple(webglobal.services.PrintCompletePreg, dictionary, web_list_callback, true);

        });
    }
    //    function OnDownload() {
    //        require(["jquery", "web_global", "jextend", "common"], function (lodop) {
    //            var web_list_callback = function (data) {
    //                if (data == null || data == undefined) return;
    //                if (data.result == webglobal.enum_const.service_result_success) {
    //                    FileUtil.download(data.info, "123");
    //                }
    //                else {
    //                    require(["easyui"], function () {
    //                        $.messager.alert('错误', data.msg);
    //                    });
    //                }
    //            };
    //            var web_list_bef_callback = function (data) { };
    //            var web_list_com_callback = function (data) {

    //            };
    //            var web_list_err_callback = function (data) { };

    //            var dictionary = new myextend.Dictionary();
    //            dictionary.set("shenfenzh", myextend.getUrlParam("idcard"));

    //            var dataparam = "input=" + JSON.stringify(dictionary.getItems());
    //            if (dataparam == "" || dataparam == undefined)
    //                return;

    //            try {
    //                myextend.ajaxPost(webglobal.services.DownloadCompletePreg, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
    //            }
    //            catch (err) {
    //                document.writeln("捕捉到例外，开始执行catch块语句 --->");
    //                document.writeln("错误名称: " + err.name + " ---> ");
    //                document.writeln("错误信息: " + err.message + " ---> ");
    //            }
    //        });
    //        //        require(["jquery", "web_global", "jextend", "common"], function () {
    //        //            var dictionary = new myextend.Dictionary();
    //        //            dictionary.set("shenfenzh", myextend.getUrlParam("idcard"));

    //        //            var dataparam = "input=" + JSON.stringify(dictionary.getItems());
    //        //            if (dataparam == "" || dataparam == undefined)
    //        //                return;

    //        //            var url = webglobal.services.DownloadCompletePreg + "?" + dataparam;
    //        //            var xhr = new XMLHttpRequest();
    //        //            xhr.open('Get', url, true);
    //        //            // 也可以使用POST方式，根据接口   
    //        //            xhr.responseType = "blob";
    //        //            // 返回类型blob    
    //        //            // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑    
    //        //            xhr.onload = function () {
    //        //                // 请求完成        
    //        //                if (this.status === 200) {
    //        //                    // 返回200            
    //        //                    var blob = this.response;
    //        //                    var reader = new FileReader();
    //        //                    reader.readAsDataURL(blob);
    //        //                    // 转换为base64，可以直接放入a表情href            
    //        //                    reader.onloadend = function (e) {
    //        //                        // 转换完成，创建一个a标签用于下载                
    //        //                        var a = document.createElement('a');
    //        //                        a.download = 'test.pdf';
    //        //                        a.href = e.target.result;
    //        //                        $("body").append(a);
    //        //                        // 修复firefox中无法触发click                
    //        //                        a.click();
    //        //                        $(a).remove();
    //        //                    }
    //        //                }
    //        //            };
    //        //            // 发送ajax请求    
    //        //            xhr.send();
    //        //        });
    //    }


    return { show: show
    }
});

