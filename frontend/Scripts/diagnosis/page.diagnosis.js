define(function () {
    var diagnosistype_data = null;
    var diagnosisconfirm_data = null;
    var closed = false;
    var ctrl = {
        win_diagnosis_mod_wrapper: "#win_diagnosis_mod_wrapper",
        diagnosislist: "#diagnosislist",
        textFilter: "#textFilter_diagnosis",
        left_wrapper: "#left_wrapper"
    };
    var class_base = null;
    var class_share = null;
    function using(callback) {
        require(["base_usercontrol", "share_services", "easyui", "edatagrid", "locale", "web_global", 'jquery', "jextend", "common"], function (base, share) {
            class_base = base;
            class_share = share;
            if (callback != null && callback != undefined) {
                callback();
            }
        });
    }
    function show() {
        using(function () {
            var url = $(ctrl.win_diagnosis_mod_wrapper).parents(".window-body").attr("data-url");
            var data = [];
            if (url != "" && url != undefined && url != null) {
                var para = myextend.getBaseUrlParam("s", url, true);
                if (para != "" && para != undefined && para != null) {
                    data = fromparam(JSON.parse(para));
                }
            }
            $.get(webglobal.templates.mod_diagnosis, { stamp: Math.random() + 1 }, function (response) {

                var height = 0;
                var mywindow = $(ctrl.win_diagnosis_mod_wrapper).parents(".mywindow");
                if (mywindow != null && mywindow != undefined) {
                    class_base.setattr(mywindow, "data-back", "");
                    height = mywindow.height() - 32;
                }
                if (height <= 0 || isNaN(height)) height = 700;

                $(ctrl.win_diagnosis_mod_wrapper).html(response);

                class_share.getScenemapData(webglobal.jsons.diagnosistype, function (data2) {
                    diagnosistype_data = data2;
                    class_share.getScenemapData(webglobal.jsons.diagnosisconfirm, function (data1) {
                        diagnosisconfirm_data = data1;

                        initgrid();
                        initsearch(height);
                        loadgrid(data);
                    });
                });
            });
        });
    }
    function fromparam(data) {
        if (data == null || data == undefined) return;
        var newdata = [];
        $.map(data, function (item) {
            newdata.push({
                "diagnosistype": item.t,
                "diagnosiscontent": item.c,
                "diagnosisconfirm": item.f,
                "diagnosisintrodution": item.i,
                "morbiditydate": item.d,
                "icd10": item.icd10,
                "jibingid": item.z
            });
        });
        return newdata;
    }
    function toparam(data) {
        if (data == null || data == undefined || data.rows == null || data.rows == undefined) return;
        var newdata = [];
        $.map(data.rows, function (item) {
            newdata.push({
                "t": item.diagnosistype,
                "c": item.diagnosiscontent,
                "f": item.diagnosisconfirm,
                "i": item.diagnosisintrodution,
                "d": item.morbiditydate,
                "icd10": item.icd10,
                "z": item.jibingid
            });
        });
        return newdata;
    }
    function grid_addrow(value, text, icd10) {
        var data = $(ctrl.diagnosislist).edatagrid('getData');
        var rows = [];
        if (data != null) {
            rows = data.rows;
        }
        for (var i = 0; i < data.total; i++) {
            if ((value + "") == (rows[i].jibingid + "") && (icd10 + "") == (rows[i].icd10 + "")) {
                return;
            }
        }
        var onerow = {};
        onerow.diagnosistype = "2";
        onerow.diagnosisconfirm = "1";
        onerow.icd10 = icd10;
        onerow.jibingid = value;
        onerow.diagnosiscontent = text;
        onerow.diagnosisintrodution = "";
        onerow.morbiditydate = "";
        rows.push(onerow);
        grid_loaddata(rows);
    }
    function grid_loaddata(data) {
        $(ctrl.diagnosislist).edatagrid('loadData', { "total": data.length, rows: data });
    }
    function initgrid() {
        $(ctrl.diagnosislist).edatagrid({
            fitColumns: true,
            singleSelect: true,
            striped: true,
            emptyMsg: '<span class="must">暂无数据</span>',
            columns: [[
                    { field: 'diagnosistype', title: '诊断类型', width: '10%', formatter: unitFormatter_1, editor: { type: 'combobox', options: { required: true, data: diagnosistype_data, valueField: "value", textField: "text", method: 'get', panelHeight: 'auto'}} },
                    { field: 'diagnosiscontent', title: '诊断内容', width: '30%' },
                    { field: 'diagnosisconfirm', title: '确诊标志', width: '10%', formatter: unitFormatter_2, editor: { type: 'combobox', options: { required: true, data: diagnosisconfirm_data, valueField: "value", textField: "text", method: 'get', panelHeight: 'auto'}} },
                    { field: 'diagnosisintrodution', title: '诊断说明', width: '30%', editor: { type: 'textbox'} },
                    { field: 'morbiditydate', title: '发病日期', width: '20%', formatter: myextend.myformatter, parser: myextend.myparser, editor: { type: 'datebox', options: { panelWidth: 180, panelHeight: 186, editable: false}} },
                    { field: 'icd10', hidden: true },
                    { field: 'jibingid', hidden: true },

                ]],
            onLoadSuccess: function (data) {
                if (data == null | data == undefined || data.total <= 0) {
                    $(this).edatagrid('resize', { height: 200 });
                }
                else {
                    $(this).edatagrid('resize', { height: 'auto' });
                }
            },
            onSave: function (index, row) {
                var $datagrid = $(ctrl.diagnosislist);
                if ($datagrid.data('isSave')) {
                    $datagrid.removeData('isSave');
                }
            },
            toolbar: [{
                text: '保存',
                handler: function () {
                    ////标记需要刷新
                    $(ctrl.diagnosislist).data('isSave', true).edatagrid('saveRow');
                    var getData = $(ctrl.diagnosislist).edatagrid('getData');
                    save(toparam(getData));
                }
            }, '-', {
                text: '删除',
                handler: function () {
                    $(ctrl.diagnosislist).edatagrid('destroyRow');
                }
            }],
            onBeforeEdit: function (index, row) {
                var editable = row.editable;
                return editable;
            },
            onEndEdit: function (index, row, changes) {
                var d = $(ctrl.diagnosislist).edatagrid('getData');
                if (d != null && d != undefined) {
                    var rows = d.rows;
                    var count = 0;
                    if (rows != null && rows != undefined) {
                        for (var i = 0; i < d.total; i++) {
                            if (rows[i].diagnosistype == "1") {
                                count++;
                            }
                        }
                    }
                }
                if (count > 1) {
                    $.messager.alert('错误', "主诊断只允许一个");
                    $(ctrl.diagnosislist).edatagrid("rejectChanges");
                }
            }
        });
    }

    var combobox_row = null;
    function initsearch(height) {
        $(ctrl.textFilter).combobox({
            mode: 'remote',  //模式： 远程获取数据
            method: 'post',
            //                queryParams: getqueryparam_search(),
            //                url: webglobal.services.GetJiBing,  //远程数据请求地址
            loader: myloader,
            valueField: 'value', //value对应的属性字段
            textField: 'text', //text对应的属性字段
            panelHeight: height,
            onLoadSuccess: function (data) {

                $(this).parent().find(".mypanel").css("min-height", height - 3);
                $(this).parent().find(".mypanel").css("width", $(this).parents(ctrl.left_wrapper).width() - 2); //2代表左右border的宽度
                $(this).parent().find(".mypanel").removeClass("hidden");

                $(this).textbox('textbox').keydown(function (event) {
                    if (event.keyCode == 13) {
                        if (combobox_row!=null)
                            CheckOneNode(combobox_row);
                    }
                });
            },
            onClick: function (row) {
                CheckOneNode(row);
            },
            onSelect: function (row) {
                combobox_row = row;
            }
        });
    }
    function CheckOneNode(row) {
        var value = row.value;
        var text = row.text;
        var icd10 = row.attributes != null && row.attributes != undefined ? row.attributes.icd10 : "";
        grid_addrow(value, text, icd10);

        $(ctrl.textFilter).combobox('loadData', []);
        $(ctrl.textFilter).combobox('clear');
        //延时100ms清空选项
        setTimeout(function () {
            $(ctrl.textFilter).combobox('setText', '');
            $(ctrl.textFilter).combobox('setValue', '');
        }, 100);
    }
    function unitFormatter_1(value, rowData, rowIndex) {
        return unitFormatter(value, rowData, rowIndex, diagnosistype_data);
    }
    function unitFormatter_2(value, rowData, rowIndex) {
        return unitFormatter(value, rowData, rowIndex, diagnosisconfirm_data);
    }
    function unitFormatter(value, rowData, rowIndex, data) {
        if (value == 0) {
            return "";
        }
        var unitJSON = data;
        if (unitJSON == null || unitJSON == undefined) return "";

        for (var i = 0; i < unitJSON.length; i++) {
            if (unitJSON[i].value == value) {
                return unitJSON[i].text;
            }
        }
        return value;
    }
    function loadgrid(data) {
        if (data == null || data == undefined) return;
        grid_loaddata(data);
    }
    function save(data) {
        var json = "";
        if (data != null && data != undefined)
            json = JSON.stringify(data);
        var mywindow = $(ctrl.win_diagnosis_mod_wrapper).parents(".mywindow");
        if (mywindow != null && mywindow != undefined) {
            class_base.setattr(mywindow, "data-back", json);
            mywindow.window('close');
        }
    }
    function getqueryparam_search() {
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();

        dictionary.set("keyword", $(ctrl.textFilter).combobox("getText"));
        dictionary.set("jigoudm", _req.jigoudm);

        return { "input": myextend.HtmlEncode(JSON.stringify(dictionary.getItems())) };
    }
    var myloader = function (param, success, error) {
        var q = param.q || '';
        $.ajax({
            url: webglobal.services.GetJiBing,
            dataType: 'json',
            type: 'post',
            async: true,
            data: getqueryparam_search(),
            success: function (data) {
                var items = $.map(data, function (item, index) {
                    return {
                        value: item.value,
                        text: item.text
                    };
                });
                success(items);
            },
            error: function () {
                error.apply(this, arguments);
            }
        });
    }
    return {
        show: show
    }
});

