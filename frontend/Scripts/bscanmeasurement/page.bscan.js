define(function () {
    var ctrl = {
        win_bscan_mod_wrapper: "#win_bscan_mod_wrapper",
        bscanlist: "#bscanlist"
    }
    var editIndex = undefined;
    function show() {
        require(["base_usercontrol", "easyui", "edatagrid", "locale", "web_global", 'jquery', "jextend", "common"], function (base) {
            var data = null;

            $.get(webglobal.templates.mod_bscan, { stamp: Math.random() + 1 }, function (response) {

                $(ctrl.win_bscan_mod_wrapper).append(response);
                loadfigure();
                initgrid();

                var height = 0;
                var mywindow = $(ctrl.win_bscan_mod_wrapper).parents(".mywindow");
                if (mywindow != null && mywindow != undefined) {

                    height = mywindow.height() - 32;
                }
                if (height <= 0 || isNaN(height)) height = 700;

                //自动调节高度
                $(ctrl.win_bscan_mod_wrapper).find("#bscanfigure").css("height", height);
            });
        });
    }
    function refresh() {
        $(ctrl.bscanlist).edatagrid('reload');
        loadfigure();
    }
    function loadfigure() {
        require(["page_monitor", "easyui"], function (a) {
            a.draw_bscanmeasurement($("#bscanfigure"), true);
        });
    }
    function getqueryparam() {
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("bingrenid", _req.bingrenid);
        dictionary.set("shenfenzh", _req.shenfenzh);

        return { "input": JSON.stringify(dictionary.getItems()) };
    }
    function initgrid() {
        $(ctrl.bscanlist).edatagrid({
            url: webglobal.services.GetBScanList,
            queryParams: getqueryparam(),
            method: 'post',
            fitColumns: true,
            singleSelect: true,
            striped: true,
            rownumbers: true,
            nowrap: false,
            emptyMsg: '<span class="must">暂无数据</span>',
            columns: [[
                    { field: 'examtime', title: '检查日期', width: '25%', editor: { type: 'datebox', options: { required: true}} },
                    { field: 'bpd', title: 'BPD(mm)', width: '25%', editor: { type: 'numberbox', min: 0, max: 200} },
                    { field: 'fl', title: 'FL(mm)', width: '25%', editor: { type: 'numberbox', min: 0, max: 200} },
                    { field: 'ac', title: 'AC(mm)', width: '25%', editor: { type: 'numberbox', min: 0, max: 200} },
                ]],

            onDblClickCell: onDblClickCell,
            onClickCell: onClickCell,
            onEndEdit: onEndEdit,

            toolbar: [{
                text: '新增',
                handler: function () {
                    append();
                }
            }, '-', {
                text: '保存',
                handler: function () {
                    accept();
                }
            }, '-', {
                text: '删除',
                handler: function () {
                    removeit();
                }
            }, '-', {
                text: '撤销',
                handler: function () {
                    reject();
                }
            }],
            onLoadSuccess: function (data) {
                if (data == null | data == undefined || data.total <= 0) {
                    $(this).edatagrid('resize', { height: 200 });
                }
                else {
                    $(this).edatagrid('resize', { height: 'auto' });
                }
            }
        });
    }

    function onDblClickCell(index, field) {
        if (editIndex != index) {
            if (endEditing()) {
                $(ctrl.bscanlist).edatagrid('selectRow', index)
                            .edatagrid('beginEdit', index);
                editIndex = index;
            } else {
                setTimeout(function () {
                    $(ctrl.bscanlist).datagrid('selectRow', editIndex);
                }, 0);
            }
        }
    }
    function onClickCell(index, field) {
        if (editIndex != index) {

            editIndex = index;
        }
    }
    function onEndEdit(index, row) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                TipUtil.ShowSuccess("保存成功");
                refresh();
            }
        };

        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("idcard", _req.shenfenzh);
        dictionary.set("patientid", _req.bingrenid);
        dictionary.set("personname", _req.bingrenxm);
        dictionary.set("doctorid", _req.userid);
        dictionary.set("doctorname", _req.username);
        dictionary.set("ac", row.ac);
        dictionary.set("fl", row.fl);
        dictionary.set("bpd", row.bpd);
        dictionary.set("examtime", row.examtime);
        dictionary.set("id", row.id);

        myextend.ajaxPost_simple(webglobal.services.SaveBScan, dictionary, web_list_callback, true);
    }
    function endEditing() {
        if (editIndex == undefined) { return true }
        if ($(ctrl.bscanlist).edatagrid('validateRow', editIndex)) {
            $(ctrl.bscanlist).edatagrid('endEdit', editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    }
    function append() {
        if (endEditing()) {
            $(ctrl.bscanlist).edatagrid('appendRow', { status: 'P' });
            editIndex = $(ctrl.bscanlist).edatagrid('getRows').length - 1;
            $(ctrl.bscanlist).edatagrid('selectRow', editIndex)
                        .edatagrid('beginEdit', editIndex);
        }
    }
    function removeit() {
        if (editIndex == undefined) { return }
        $.messager.confirm('提示', "确认删除？", function (r) {
            if (r) {

                var web_list_callback = function (data) {
                    if (data == null || data == undefined) return;
                    if (data.result == webglobal.enum_const.service_result_success) {
                        $(ctrl.bscanlist).edatagrid('cancelEdit', editIndex)
                    .edatagrid('deleteRow', editIndex);
                        TipUtil.ShowSuccess("删除成功");
                        editIndex = undefined;
                        setTimeout(refresh, 100);
                    }
                };
                var row = $(ctrl.bscanlist).edatagrid('getSelected');
                if (row == null || row == undefined) return;
                var dictionary = new myextend.Dictionary();
                dictionary.set("id", row.id);

                myextend.ajaxPost_simple(webglobal.services.DelBScan, dictionary, web_list_callback, true);

            }
        });
    }
    function accept() {
        if (endEditing()) {
            $(ctrl.bscanlist).edatagrid('acceptChanges');
        }
    }
    function reject() {
        $(ctrl.bscanlist).edatagrid('rejectChanges');
        editIndex = undefined;
    }

    return {
        show: show
    }

});

