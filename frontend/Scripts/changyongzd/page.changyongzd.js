define(function () {
    function show() {
        require(["tmpl", 'jquery', "jextend", "common", "web_global", "easyui", "locale"], function () {
            $(function () {
                $.get(webglobal.templates.mod_chanyongzd, { stamp: Math.random() + 1 }, function (response) {
                    $("#win_changyongzd_mod_wrapper").append(response);
                    $(".easyui-linkbutton").linkbutton();
                    $("#tb_search").textbox({ prompt: '诊断名称 / 拼音' });

                    bind_right();
                    bind_left();
                    //                    $("#tb_search").textbox('textbox').on("", function () {
                    //                        search();
                    //                    });
                    var serachtimer;
                    $("#tb_search").textbox('textbox').on("input propertychange", function () {
                        clearTimeout(serachtimer);
                        serachtimer = setTimeout(function () {
                            search();
                        }, 1000);
                    });
                    //移动按钮
                    $("#dl_add").unbind("click").on("click", function () {
                        goto_right();
                    });
                    //移动按钮
                    $("#dl_add_all").unbind("click").on("click", function () {
                        goto_rightAll();
                    });
                    $("#dl_remove").unbind("click").on("click", function () {
                        goto_left();
                    });
                    $("#dl_remove_all").unbind("click").on("click", function () {
                        goto_leftAll();
                    });
                    $(".btn_changyongzd_save").unbind("click").on("click", function () {
                        save();
                    });
                });
            });
        });
    }
    function bind_right() {
        require(["web_global", "jquery"], function () {
            $('#dr').datalist({
                url: webglobal.services.GetChangYongZD,
                method: 'post',
                queryParams: getqueryparam(),
                valueField: 'value',
                textField: 'text',
                lines: false,
                checkbox: true,
                singleSelect: false,
                selectOnCheck: true,
                checkOnSelect: true,
                onDblClickRow: function (index, row) {
                    $(this).datalist('selectRow', index);
                    goto_left();
                }
            });
        });
    }
    function getqueryparam() {
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("jobnumber", _req.jobnumber);

        return { "input":myextend.HtmlEncode(JSON.stringify(dictionary.getItems())) };
    }
    function bind_left() {
        require(["web_global", "jquery"], function () {
            $('#dl').datalist({
                url: webglobal.services.QueryJiBing,
                method: 'post',
                queryParams: getqueryparam_search(),
                valueField: 'value',
                textField: 'text',
                lines: false,
                checkbox: true,
                singleSelect: false,
                selectOnCheck: true,
                checkOnSelect: true,
                onDblClickRow: function (index, row) {
                    $(this).datalist('selectRow', index);
                    goto_right();
                }
            });
        });
    }
    function getqueryparam_search() {
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("keyword", $("#tb_search").textbox('getText'));
        dictionary.set("jigoudm", _req.jigoudm);
        
        return { "input":myextend.HtmlEncode( JSON.stringify(dictionary.getItems())) };
    }
    function search() {
        require(['jquery', "easyui", "locale"], function () {
            $("#dl").datalist("reload", getqueryparam_search());
        });
    }
    function goto_right() {
        var rows = $("#dl").datalist("getSelections");

        $(rows).each(function (i) {
            if (!exist(rows[i])) {
                //添加
                var row = getRow(rows[i]);
                $("#dr").datalist("appendRow", row);
                // $("#dr").datalist("insertRow", { index: 0, row: row }); //作为第一条
            }
            //删除
            var rowIndex = $("#dl").datalist("getRowIndex", rows[i]);
            $("#dl").datalist("deleteRow", rowIndex);
        });
        //移动完后重新加载dr,否则显示不正常
        $("#dr").datalist("loadData", $("#dr").datalist('getRows'));
    }
    function goto_left() {
        //方式2
        var rows = $("#dr").datalist("getSelections");
        var rowArray = new Array();
        $(rows).each(function (i) {
            var row = getRow(rows[i]);
            //添加
            $("#dl").datalist("appendRow", row);
            //$("#dl").datalist("insertRow", { index: 0, row: row }); //作为第一条
            //删除
            var rowIndex = $("#dr").datalist("getRowIndex", rows[i]);
            $("#dr").datalist("deleteRow", rowIndex);
        });
        //移动完后重新加载dl,否则显示不正常
        $("#dl").datalist("loadData", $("#dl").datalist('getRows'));
    }
    function goto_rightAll() {
        var data = $("#dl").datalist("getData");
        var rows = data.rows;
        var rowsLength = rows.length;
        var indexArray = new Array();
        for (var i = 0; i < rowsLength; i++) {
            if (!exist(rows[i])) {
                var row = getRow(rows[i]);
                //添加
                $("#dr").datalist("appendRow", row);
            }
        }
        //删除
        var rows = $("#dl").datalist('getRows');
        for (var i = rows.length - 1; i >= 0; i--) {
            $("#dl").datalist("deleteRow", i);
        }
        //移动完后重新加载dr,否则显示不正常
        $("#dr").datalist("reload");
    }
    function exist(r) {
        var data = $("#dr").datalist("getData");
        var rows = data.rows;
        var rowsLength = rows.length;

        var zhenduanid_selected = r.value;
        var zhenduanmc_selected = r.text;
        var icd10_selected = r.icd10;

        for (var i = 0; i < rowsLength; i++) {
            var zhenduanid_local = rows[i].value;
            var zhenduanmc_local = rows[i].text;
            var icd10_local = rows[i].icd10;

            if (zhenduanid_local === zhenduanid_selected && zhenduanmc_local == zhenduanmc_selected && icd10_local == icd10_selected)
                return true;
        }
        return false;
    }
    function goto_leftAll() {
        var data = $("#dr").datalist("getData");
        var rows = data.rows;
        var rowsLength = rows.length;
        var indexArray = new Array();
        for (var i = 0; i < rowsLength; i++) {
            var row = getRow(rows[i]);
            //添加
            $("#dl").datalist("appendRow", row);
        }
        //删除
        var rows = $("#dr").datalist('getRows');
        for (var i = rows.length - 1; i >= 0; i--) {
            $("#dr").datalist("deleteRow", i);
        }
        //移动完后重新加载dl
        //$("#dl").datalist("reload");
    }
    function getRow(r) {
        if (r == null || r == undefined) return null;

        var value = r.value;
        var text = r.text;
        var icd10 = r.icd10;
        var row = {
            value: value,
            text: text,
            icd10: icd10
        };
        return row;
    }
    function save() {
        var data = $("#dr").datalist("getData");
        var rows = data.rows;
        var rowsLength = rows.length;
        var arr = [];
        var _req = myrequest.getrequest();
        var _jobnumber = _req != null && _req != undefined ? _req.jobnumber : "";
        var _jigoudm = _req != null && _req != undefined ? _req.jigoudm : "";
        for (var i = 0; i < rowsLength; i++) {
            var zhenduanid = rows[i].value;
            var zhenduanmc = rows[i].text;
            var yishengks = _jobnumber;
            var icd10 = rows[i].icd10;
            var row = {
                zhenduanid: zhenduanid,
                zhenduanmc: zhenduanmc,
                yishengks: yishengks,
                icd10: icd10
            };
            arr.push(row);
        }

        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                TipUtil.ShowSuccess("设置成功");
            }
            else
            { $.messager.alert('错误', data.msg); }
        };
        
        var dictionary = new myextend.Dictionary();
        dictionary.set("jobnumber", _jobnumber);
        dictionary.set("jigoudm", _jigoudm);
        dictionary.set("data", arr);

        myextend.ajaxPost_simple(webglobal.services.SaveChangYongZD, dictionary, web_list_callback, true);
    }
    return {
        show: show
    }
});

