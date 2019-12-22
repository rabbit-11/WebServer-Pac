define(function () {
    var global_config = null
    var tree_config = null;
    var mod_config = null;
    var class_base = null;
    var class_share = null;

    function using(callback) {
        require(["share_model", "base_usercontrol", "tmpl", "jquery", "common", "jextend", "web_global", "easyui", "edatagrid"], function (s, b) {
            class_base = b;
            class_share = s;

            if (callback != null && callback != undefined) {
                callback();
            }
        });
    }
    function show() {
        using(function () {
            tree_config = {
                wrapper: "#wrapper_left_pregnantcyhistory",
                sr_list: webglobal.services.GetListPregnancyHistory,
                sr_one: webglobal.services.GetOnePregnancyHistory,
                sr_del: webglobal.services.DelPregnancyHistory
            };
            mod_config = {
                btn_save: "#btn_save_pregnancyhistory",
                wrapper: "#wrapper_right_pregnantcyhistory",
                //form: "form_wrapper_pregnancyhistory",
                template: webglobal.templates.mod_pregnancyhistory,
                sr_save: webglobal.services.SavePregnancyHistory,
                sr_del: webglobal.services.DelPregnancyHistory,
                table_wrapper: '.customtable_pregnancyhistory',
                event_save: onsave
            };
            initgrid();
        });
    }
    function initgrid() {
        $(tree_config.wrapper).edatagrid({
            url: tree_config.sr_list,
            queryParams: getqueryparam(),
            idField: "id",
            method: 'post',
            fitColumns: true,
            singleSelect: true,
            striped: true,
            rownumbers: true,
            nowrap: false,
            emptyMsg: '<span class="must">暂无数据</span>',
            columns: [[
                    { field: 'pregdeliverydate', title: '生产日期', width: '50.1%' },
                    { field: 'editorname', title: '医生姓名', width: '55%' },
                    { field: 'dictionary', hidden: true },
                ]],
            toolbar: [{
                id: "add",
                text: '新增',
                handler: function () {
                    loadone(0);
                }
            }, "-", {
                id: "delete",
                text: '删除',
                handler: function () {
                    var row = $(tree_config.wrapper).edatagrid("getSelected");
                    if (row == null || row == undefined) {
                        $.messager.alert('提示', "未选中行");
                        return;
                    }
                    mydelete(row.id);
                }
            }],
            onLoadSuccess: function (data) {
                if (data == null | data == undefined || data.total <= 0) {
                    $(this).edatagrid('resize', { height: 200 });
                }
                else {
                    $(this).edatagrid('resize', { height: 'auto' });
                }
                var _req = myrequest.getrequest();
                if (_req.isInWhite()) {
                    $("div.datagrid div.datagrid-toolbar").eq(0).hide();
                }
            },
            onClickRow: function (index, row) {
                loadone(row.id);
            }
        });
    }
    function loadone(id) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                if (data.info.mod == webglobal.enum_mod.add && _req.isInWhite()) {
                    mod_config.template = webglobal.templates.norecord;
                }
                class_share.show(data.info, data.info.mod, mod_config);
            }
        };
        //获取参数
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("id", id);
        _req.todic(dictionary);

        myextend.ajaxPost_simple(tree_config.sr_one, dictionary, web_list_callback, true);
    }
    function mydelete(id) {
        if (id <= 0 || isNaN(id)) {
            $.messager.alert('错误', "记录不存在");
            return;
        }

        //提示
        $.messager.confirm('提示', "确认删除 所选 记录？", function (r) {
            if (r) {
                do_mydelete(id);
            }
        });
    }
    function do_mydelete(id) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                reload();
                loadone(0);
            }
            else {
                $.messager.alert('提示', data.msg);
            }
        };
        var web_list_bef_callback = function (data) {
            MaskUtil.mask($(tree_config.wrapper), "正在删除...");
        };
        var web_list_com_callback = function (data) {
            MaskUtil.unmask($(tree_config.wrapper));
        };
        var web_list_err_callback = function (data) { };

        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("id", id);
        _req.todic(dictionary);

        var dataparam = "input=" + myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
        if (dataparam == "" || dataparam == undefined)
            return;
        myextend.ajaxPost(tree_config.sr_del, dataparam, web_list_callback, web_list_bef_callback, web_list_com_callback, web_list_err_callback, true);
    }

    function getqueryparam() {
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        _req.todic(dictionary);
        return { "input": myextend.HtmlEncode(JSON.stringify(dictionary.getItems())) };
    }
    function onsave(id) {
        reload();
        $(tree_config.wrapper).edatagrid('selectRecord', id);
    }
    function reload() {

        $(tree_config.wrapper).edatagrid('reload');
    }
    return {
        show: show
    }
});
