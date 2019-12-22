define(function () {
    function show() {
        require(["tmpl", 'jquery', "jextend", "common", "web_global", "easyui", "edatagrid", "easyuiextend", "locale", "datagrid_dnd"], function () {
            $(function () {
                $.get(webglobal.templates.mod_list_model, { stamp: Math.random() + 1 }, function (response) {
                    $("#win_personalmodel_mod_wrapper").append(response);
                    var web_list_callback = function (data) {
                        if (data == null || data == undefined) return;
                        if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                            SetListModel($("#list_model_wrapper"), data.info);
                            //DrawDataGrid();
                        }
                        else {
                            $.get(webglobal.templates.norecord, { stamp: Math.random() + 1 }, function (res) {
                                $("#list_model_wrapper").append(res);
                            });
                        }
                    };

                   //myextend.ajaxPost(webglobal.services.GetPersonalGuideTypeList, null, web_list_callback,null,null,null, true);
                   myextend.ajaxGet(webglobal.services.GetPersonalGuideTypeList, null, web_list_callback,null,null,null, true);

                });
            });
        });
    }
    function SetListModel(wrapper, data) {
        if (data == null || data == undefined) return;
        var arr = [];
        arr.push(data);
        //template
        var list_model_template = $("#list_model_template").html();
        $.template("myTemplate", list_model_template);

        //render
        $(wrapper).append($.tmpl("myTemplate", data));

        $('#list_model_wrapper').tabs({
            border: true,
            pill: true,
            justified: true,
            //            fit: true,
            onSelect: function (title, index) {
                var mytab = $('#list_model_wrapper').tabs('getTab', index);
                var item = mytab.find(".modelgrid");
                if (item != null && item != undefined && item.length > 0) {
                    DrawDataGrid(item);
                }
            }
        });
    }
    function DrawDataGrid(item) {
        var baseurl = webglobal.services.GetPersonalGuideList;
        //        $(".modelgrid").each(function (index, item) {

        //        });
        $(item).edatagrid({
            url: baseurl,
            method:"get", //testing，实际使用时可去除，改为post
            queryParams: getqueryparam($(item)),
            fitColumns: true,
            singleSelect: true,
            rownumbers: true,
            pagination: true,
            pageSize: 20,
            pageList: [10, 20, 50, 100, 200],
            loadFilter: easy_extend.pagerFilter,
            remoteSort: false,
            emptyMsg: '<span class="must">暂无数据</span>',
            columns: [[
                    { field: 'diseasename', title: '模板名称', width: '15%' },
                    { field: 'guide', title: '模板内容', width: '70%' },
                    { field: 'stage', title: '阶段', width: '5%' },
                    {
                        title: '编辑',
                        field: 'edit',
                        width: "5%",
                        formatter: function (value, row, index) {
                            var vs = row.canedit ? "visibility" : "hidden";
                            return '<a class="btn_edit btnlink" style="color:black;visibility:' + vs + ';" data-id="' + row.id + '" data-modeltypeid="' + row.modeltypeid + '" href="javascript:void(0)">编辑</a>';
                        }
                    },
                    {
                        title: '删除',
                        field: 'del',
                        width: "5%",
                        formatter: function (value, row, index) {
                            var vs = row.canedit ? "visibility" : "hidden";
                            return '<a class="btn_delete btnlink"  style="color:black;visibility:' + vs + ';" data-id="' + row.id + '" data-modeltypeid="' + row.modeltypeid + '" href="javascript:void(0)">删除</a>';
                        }
                    }
                ]],
            toolbar: [{
                text: '新增',
                handler: function () {
                    OnAdd($(this));
                }
            }],
            onLoadSuccess: function (data) {
                if (data == null | data == undefined || data.total <= 0) {
                    $(this).edatagrid('resize', { height: $(this).parents(".tabs-panels").height() + 20 });
                }
                else {
                    $(this).edatagrid('resize', { height: 'auto' });
                }
                $(item).edatagrid('enableDnd');
                //                    $(".btn_edit").linkbutton({ plain: true });
                //                    $(".btn_delete").linkbutton({ plain: true });

                $(".btn_edit").unbind("click").on("click", function (sender) {
                    OnEdit(sender.target);
                });
                $(".btn_delete").unbind("click").on("click", function (sender) {
                    onDelete(sender.target);
                });
            },
            onDrop: function (targetRow, sourceRow, point) {
                onDrop(targetRow, sourceRow, point);
            }
        });
    }
    function OnEdit(target) {
        require(["base_usercontrol", "common", "jextend"], function (base) {
            var id = $(target).attr("data-id");
            var modeltypeid = $(target).attr("data-modeltypeid");
            var _req = myrequest.getrequest();

            ShowOneModelUrl(id, modeltypeid, _req.jobnumber, _req.doctorname,_req.jigoudm);
        });
    }
    function OnAdd(target) {
        require(["base_usercontrol", "common", "jextend"], function (base) {
            var modeltypeid = $(target).parents(".grid_wrapper").attr("data-modeltypeid");
            var _req = myrequest.getrequest();

            ShowOneModelUrl(null, modeltypeid, _req.jobnumber, _req.doctorname,_req.jigoudm);
        });
    }
    function ShowOneModelUrl(id, modeltypeid, doctorid, doctorname,jigoudm) {
        require(["base_usercontrol"], function (base) {
            var mywindow = $("#win_model");
            var baseurl = base.getattr(mywindow, "data-url");
            baseurl = myextend.UrlUpdateParams(baseurl, "id", id);
            baseurl = myextend.UrlUpdateParams(baseurl, "modeltypeid", modeltypeid);
            baseurl = myextend.UrlUpdateParams(baseurl, "doctorid", doctorid);
            baseurl = myextend.UrlUpdateParams(baseurl, "doctorname", doctorname);
            baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", jigoudm);

            base.setattr(mywindow, "data-url", baseurl);
            base.setattr(mywindow, "data-back", null);
            base.showwindow(mywindow);
        });
    }
    function getqueryparam(wrapper) {
        var modeltypeid = $(wrapper).attr("data-modeltypeid");
        var platformid = $(wrapper).attr("data-platformid");
        var _req = myrequest.getrequest();
        var dictionary = new myextend.Dictionary();
        dictionary.set("jobnumber", _req.jobnumber);
        dictionary.set("jigoudm", _req.jigoudm);
        dictionary.set("modeltypeid", modeltypeid);
        dictionary.set("platformid", platformid);

        return { "input":myextend.HtmlEncode( JSON.stringify(dictionary.getItems())) };
    }
    function reload(data) {
        if (data == null || data == undefined
        || data.info == null || data.info == undefined
        || data.info.modeltypeid == null || data.info.modeltypeid == undefined
        || data.info.modeltypeid <= 0 || isNaN(data.info.modeltypeid)
        ) return;
        require(["jquery"], function () {
            var fieldset = $(".grid_wrapper[data-modeltypeid='" + data.info.modeltypeid + "']");
            if (fieldset != null && fieldset != undefined) {
                var mygrid = fieldset.find(".modelgrid");
                mygrid.edatagrid("reload", getqueryparam(mygrid));
            }
        });
    }
    function onDelete(wrapper) {
        if (wrapper == null || wrapper == undefined)
            return;
        var tr_parent = $(wrapper).parents("tr");
        if (tr_parent == null || tr_parent == undefined)
            return;
        var td_name = tr_parent.find("[field='diseasename']");
        if (td_name == null || td_name == undefined)
            return;
        var cell_name = td_name.find("div");
        if (cell_name == null || cell_name == undefined)
            return;
        var name = cell_name.html();
        var tmp = name != null && name != undefined && name != "" ? "【" + name + "】" : "";
        $.messager.confirm('确认', '确认删除模板' + tmp + '？', function (r) {
            if (r) {
                var web_list_callback = function (data) {
                    if (data == null || data == undefined) return;
                    if (data.result == webglobal.enum_const.service_result_success && data.info != null) {
                        reload(data);
                    }
                };

                var dictionary = new myextend.Dictionary();
                dictionary.set("id", $(wrapper).attr("data-id"));
                dictionary.set("modeltypeid", $(wrapper).attr("data-modeltypeid"));

                myextend.ajaxPost_simple(webglobal.services.DeletePersonalModel, dictionary, web_list_callback, true);
            }
        });
    }
    function onDrop(targetRow, sourceRow, point) {
        var modeltypeid = targetRow.modeltypeid;
        var target_id = targetRow.id;
        var target_setid = targetRow.setid;
        var source_id = sourceRow.id;
        var source_setid = sourceRow.setid;

        var tmp_setid = target_setid;
        target_setid = source_setid;
        source_setid = tmp_setid;

        var dictionary = new myextend.Dictionary();
        dictionary.set(target_id, target_setid);
        dictionary.set(source_id, source_setid);
        dictionary.set("modeltypeid", modeltypeid);

        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success && data.info != undefined && data.info != null) {
                reload(data);
            }
        };
        myextend.ajaxPost_simple(webglobal.services.ReorderPersonalModel, dictionary, web_list_callback, true);
    }
    return { show: show,
        reload: reload
    }
});

