define(function () {
    var ctrl = {
        tree_highrisk: "#tree_highrisk",
        win_highrisk_mod_wrapper: "#win_highrisk_mod_wrapper",
        highrisklist: "#highrisklist",
        textFilter1: '#textFilter1'
    }
    var share_highrisk = null;
    function show() {
        require(["base_usercontrol", "share_highrisk", "locale", "easyui", "edatagrid", "web_global", 'jquery', "jextend", "common"], function (base, share) {
            var s = myextend.getBaseUrlParam("s", $(ctrl.win_highrisk_mod_wrapper).parents(".window-body").attr("data-url"), true);
            if (s == "") s = null;
            var data = fromparam(JSON.parse(s));

            $.get(webglobal.templates.mod_highrisk, { stamp: Math.random() + 1 }, function (response) {

                //var data =[{ "l": "A", "r": "a70501", "t": "贫血：Hb70~110g/L123"}]);
                $(ctrl.win_highrisk_mod_wrapper).append(response);

                share_highrisk = share;
                share_highrisk.init(function () {
                    inittree(data);
                    initgrid();
                    initsearch();
                    loadgrid(data);
                })

                var height = 0;
                var mywindow = $(ctrl.win_highrisk_mod_wrapper).parents(".mywindow");
                if (mywindow != null && mywindow != undefined) {
                    base.setattr(mywindow, "data-back", "");
                    height = mywindow.height() - 32;
                }
                if (height <= 0 || isNaN(height)) height = 700;

                //自动调节高度
                $(ctrl.win_highrisk_mod_wrapper).find(".easyui-panel").css("height", height);
            });
        });
    }
    function fromparam(data) {
        if (data == null || data == undefined) return;
        var newdata = [];
        $.map(data, function (item) {
            newdata.push({ "text": item.t, "grade": item.l, "dictionary": item.r });
        });
        return newdata;
    }
    function toparam(data) {
        if (data == null || data == undefined || data.rows == null || data.rows == undefined) return;
        var newdata = [];
        $.map(data.rows, function (item) {
            newdata.push({ "t": item.text, "l": item.grade, "r": item.dictionary });
        });
        return newdata;
    }
    function inittree(checkeddata) {
        var url = webglobal.services.GetHighRiskRating;
        var _req = myrequest.getrequest();

        url = myextend.UrlUpdateParams(url, "jigoudm", _req.jigoudm);
        $(ctrl.tree_highrisk).tree({
            onlyLeafCheck: true,
            CascadeCheck: false,
            checkbox: true,
            url: url,
            method: 'get',
            animate: true,
            lines: true,
            formatter: function (node) {
                //超过字数换行，存在高度叠行的问题
                //                            var s = node.text;
                //                            var perline = 24;
                //                            var new_str = "";
                //                            if (s != null && s != undefined) {
                //                                for (var i = 0; i < s.length; i += perline) {
                //                                    new_str += "<div>" + s.substr(i, perline) + "</div>";
                //                                }
                //                            }
                //                return new_str;
                var t = node.attributes;
                if (t.auto) {
                    return "<span class='font_class_deep' mnd>" + node.text + "</span>";
                }
                return "<span mnd>" + node.text + "</span>";
            },
            onLoadSuccess: function (data) {
                loadtree(checkeddata);
                require(["easyui"], function () {
                    $("[mnd]").each(function () {
                        $(this).tooltip(
                        {
                            position: 'top',
                            content: $(this).html()
                        });
                    });
                });
            },
            onBeforeCheck: function (node, checked) {
                if (node.checked) return true;
                var flag = Distinct(node);
                if (flag) return false;
            },
            onCheck: function (node, checked) {
                var data = getChecked();
                grid_loaddata(data);
                expandToChecked();
            },
            onSelect: function (node) {
                var checked = HasChecked(node);
                if (!checked) {
                    var flag = Distinct(node);
                    if (flag) return false;
                    $(ctrl.tree_highrisk).tree('check', node.target); //设置选中该节点
                }
                else {
                    $(ctrl.tree_highrisk).tree('uncheck', node.target); //设置取消选中该节点
                }
            }
        });
    }
    function HasChecked(node) {
        var data = getChecked();
        if (data != null && data != undefined) {
            for (var i = 0; i < data.length; i++) {
                if (node.attributes != null && node.attributes.id != null && (data[i].id + "").trim() == (node.attributes.id + "").trim()) {
                    return true;
                }
            }
        }
        return false;
    }
    function Distinct(node) {
        var data = getChecked();
        if (data != null && data != undefined) {
            for (var i = 0; i < data.length; i++) {
                if (node.attributes != null && node.attributes.classfiction != null && node.attributes.classfiction != "" && (data[i].classfiction + "").trim() == (node.attributes.classfiction + "").trim()) {
                    TipUtil.ShowFailure(String.format("已选择【{0}】", data[i].text));
                    return true;
                }
            }
        }
        return false;
    }
    function unCheckOneNode(id) {
        var node = $(ctrl.tree_highrisk).tree('find', id);
        if (node != null) {
            $(ctrl.tree_highrisk).tree('uncheck', node.target); //设置取消选中该节点
        }
    }
    function CheckOneNode(id) {
        var node = $(ctrl.tree_highrisk).tree('find', id);
        if (node != null) {
            $(ctrl.tree_highrisk).tree('check', node.target); //设置取消选中该节点
        }
    }
    /** 
    * 展开值对应的节点
    */
    function expandToChecked() {
        var data = getChecked();
        if (data != null && data != undefined) {
            $.map(data, function (row) {
                node = $(ctrl.tree_highrisk).tree("find", row.id);
                if (node != null) {
                    $(ctrl.tree_highrisk).tree('expandTo', node.target);
                }
            });
        }
    }
    function getChecked() {
        var nodes = $(ctrl.tree_highrisk).tree('getChecked');
        var checkedlist = [];
        for (var i = 0; i < nodes.length; i++) {
            checkedlist.push(nodes[i].attributes);
        }
        return checkedlist;
    }

    /** 
    * 根据文本递归树形控件查找dictionary指定的节点
    * @param treeObj 控件
    * @param dictionary 查找的字典
    */
    function findTreeNodeByDictionary(treeObj, dictionary) {

        if (dictionary == null || dictionary == undefined) return;
        if (treeObj == null || treeObj == undefined) return;
        var roots = treeObj.tree("getRoots");      //展开根节点

        return findTreeNode(treeObj, roots, dictionary);
    }
    /** 
    * 根据属性查找节点列表dictionary指定的节点，利用逐层查找的方式
    * @param treeObj 控件
    * @param nodes 轮询的节点列表
    * @param dictionary 查找的字典
    */
    function findTreeNode(treeObj, nodes, dictionary) {
        if (treeObj == null || treeObj == undefined)
            return null;
        if (nodes == null || nodes == undefined || nodes.length <= 0)
            return null;

        for (var i = 0; i < nodes.length; i++) {
            node = nodes[i];
            if ((dictionary + "") == (node.attributes.dictionary + "")) {
                return node;
            }
            else {
                var subnodes = treeObj.tree('getChildren', node.target);
                if (subnodes != null && subnodes != undefined && subnodes.length > 0) {
                    var n = findTreeNode(treeObj, subnodes, dictionary);
                    if (n != null && n != undefined)
                        return n;
                }
            }
        }
    }

    function grid_loaddata(data) {
        $(ctrl.highrisklist).edatagrid('loadData', { "total": data != null && data != undefined ? data.length : 0, rows: data != null && data != undefined ? data : [] });
    }
    function initgrid() {

        $(ctrl.highrisklist).edatagrid({
            fitColumns: true,
            singleSelect: true,
            striped: true,
            rownumbers: true,
            nowrap: false,
            emptyMsg: '<span class="must">暂无数据</span>',
            //            rowStyler: function (index, row) {
            //                return { style: "height:28px;" };
            //            },
            columns: [[
                    { field: 'text', title: '高危因素', width: '80%', editor: { type: 'textbox', options: { required: true}} },
                    { field: 'grade', title: '因素分级', width: '10%', align: 'center', formatter: share_highrisk.unitFormatter_level, editor: { type: 'combobox', options: { required: true, url: webglobal.jsons.highrisklevel, valueField: "value", textField: "text", method: 'get', panelHeight: 'auto'} }
                    },
                     {
                         field: 'action',
                         title: '操作',
                         width: '10%',
                         align: 'center',
                         formatter: function (value, row, index) {
                             var str = '';
                             str += String.format('<a href="javascript:void(0)" class="linkbutton-del" data-row="del_{0}" data-index="{0}" data-dictionary="{1}" style="margin-left:5px;color:black"  >删除</a>', index, row.dictionary);
                             return str;
                         }
                     },
                    { field: 'dictionary', hidden: true },
                ]],
            onSave: function (index, row) {
                var $datagrid = $(ctrl.highrisklist);
                if ($datagrid.data('isSave')) {
                    //如果需要刷新，保存完后刷新
                    //                        $datagrid.edatagrid('reload');
                    $datagrid.removeData('isSave');
                }
                //                            var getData = $('#highrisklist').edatagrid('getData');
                //                            save(getData);
            },
            toolbar: [{
                text: '保存',
                handler: function () {
                    //标记需要刷新
                    $(ctrl.highrisklist).data('isSave', true).edatagrid('saveRow');
                    var getData = $(ctrl.highrisklist).edatagrid('getData');
                    save(toparam(getData));
                }
            }
            //            , '-', {
            //                text: '删除',
            //                handler: function () {
            //                    $(ctrl.highrisklist).edatagrid('destroyRow');
            //                }
            //}
            ],
            onDestroy: function (index, row) {
                var id = row.id;
                unCheckOneNode(id);
            },
            onBeforeEdit: function (index, row) {
                var editable = row.editable;
                return editable;
            },
            onLoadSuccess: function (data) {
                if (data == null | data == undefined || data.total <= 0) {
                    $(this).edatagrid('resize', { height: 200 });
                }
                else {
                    $(this).edatagrid('resize', { height: 'auto' });
                }
                $(ctrl.win_highrisk_mod_wrapper).find(".linkbutton-del").each(function (index, item) {
                    //$(item).linkbutton();
                    $(item).unbind("click").on("click", function () {
                        var i = parseInt($(item).attr("data-index"), 10);
                        var d = $(item).attr("data-dictionary");
                        deleteRow(i, d);
                    });
                });
            }

        });
    }
    var combobox_index = -1;
    function initsearch() {
        $(ctrl.textFilter1).combobox({
            mode: 'remote',  //模式： 远程获取数据
            method: 'post',
            url: webglobal.services.QueryHighRisk,  //远程数据请求地址
            valueField: 'id', //value对应的属性字段
            textField: 'text', //text对应的属性字段

            queryParams: getqueryparam_search(),
            onClick: function (row) {
                selectOneItem(row.id);
            },
            onSelect: function (row) {
                combobox_index = row.id;
            },
            onLoadSuccess: function (data) {
                $(this).textbox('textbox').keydown(function (event) {
                    if (event.keyCode == 13) {
                        if (combobox_index > 0)
                            selectOneItem(combobox_index);
                    }
                });
            }
        });
    }
    function selectOneItem(id) {
        CheckOneNode(id);
        combobox_index = -1;
        $(ctrl.textFilter1).combobox('loadData', []);
        $(ctrl.textFilter1).combobox('clear');
        //延时100ms清空选项
        setTimeout(function () {
            $(ctrl.textFilter1).combobox('setText', '');
        }, 100);
    }
    function getqueryparam_search() {
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("keyword", $(ctrl.textFilter1).val());
        dictionary.set("jigoudm", _req.jigoudm);

        return { "input": myextend.HtmlEncode(JSON.stringify(dictionary.getItems())) };
    }
    function loadtree(data) {
        if (data == null || data == undefined) return;
        $.map(data, function (item) {
            var node = findTreeNodeByDictionary($(ctrl.tree_highrisk), item.dictionary);
            if (node != null && node != undefined) {
                $(ctrl.tree_highrisk).tree('check', node.target); //设置选中该节点
            }
        });
        expandToChecked();
    }
    function loadgrid(data) {
        //        if (data == null || data == undefined) return;
        grid_loaddata(data);
    }
    function save(data) {
        require(["base_usercontrol"], function (base) {
            var json = "";
            if (data != null && data != undefined)
                json = JSON.stringify(data);
            var mywindow = $(ctrl.win_highrisk_mod_wrapper).parents(".mywindow");
            if (mywindow != null && mywindow != undefined) {
                base.setattr(mywindow, "data-back", json);
                mywindow.window('close');
            }
        });
    }

    function deleteRow(index, d) {
        //提示
        $.messager.confirm({
            ok: '是',
            cancel: '否',
            title: '提示',
            msg: '将删除该高危项，如外院复查正常或无需再自动评定本项高危，请点击<span style="color:red;">是</span>',
            fn: function (r) {
                if (r) {
                    doDelete(index, d);
                }
                else {
                    $(ctrl.highrisklist).edatagrid("deleteRow", index);
                    return false;
                }
            }
        });
    }
    function doDelete(index, d) {
        require(["base_usercontrol", "jquery", "common", "jextend", "web_global"], function (base) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    $(ctrl.highrisklist).edatagrid("deleteRow", index);
                }
            };

            //获取参数
            var _req = myrequest.getrequest();

            var dictionary = new myextend.Dictionary();
            dictionary.set("highriskreasonid", d);
            _req.todic(dictionary);

            myextend.ajaxPost_simple(webglobal.services.AddHighRiskReasonException, dictionary, web_list_callback, true);
        });
    }
    return {
        show: show
    }

});

