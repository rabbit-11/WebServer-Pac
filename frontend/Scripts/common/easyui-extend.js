
$.extend($.fn.validatebox.defaults.rules, {
    idcard: {// 验证身份证
        validator: function (value) {
            return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
        },
        message: '身份证号码格式不正确'
    },
    minLength: {
        validator: function (value, param) {
            return value.length >= param[0];
        },
        message: "请输入至少（{0}）个字符."
    },
    length: { validator: function (value, param) {
        var len = $.trim(value).length;
        return len >= param[0] && len <= param[1];
    },
        message: "输入内容长度必须介于{0}和{1}之间."
    },
    phone: {// 验证电话号码
        validator: function (value) {
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '格式不正确,请使用下面格式:020-88888888'
    },
    mobile: {// 验证手机号码
        validator: function (value) {
            return /^(13|15|18)\d{9}$/i.test(value);
        },
        message: '手机号码格式不正确'
    },
    intOrFloat: {// 验证整数或小数
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '请输入数字，并确保格式正确'
    },
    currency: {// 验证货币
        validator: function (value) {
            return /^\d+(\.\d+)?$/i.test(value);
        },
        message: '货币格式不正确'
    },
    qq: {// 验证QQ,从10000开始
        validator: function (value) {
            return /^[1-9]\d{4,9}$/i.test(value);
        },
        message: 'QQ号码格式不正确'
    },
    integer: {// 验证整数 可正负数
        validator: function (value) {
            //return /^[+]?[1-9]+\d*$/i.test(value);

            return /^([+]?[0-9])|([-]?[0-9])+\d*$/i.test(value);
        },
        message: '请输入整数'
    },
    age: {// 验证年龄
        validator: function (value) {
            return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
        },
        message: '年龄必须是0到120之间的整数'
    },

    chinese: {// 验证中文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value);
        },
        message: '请输入中文'
    },
    english: {// 验证英语
        validator: function (value) {
            return /^[A-Za-z]+$/i.test(value);
        },
        message: '请输入英文'
    },
    unnormal: {// 验证是否包含空格和非法字符
        validator: function (value) {
            return /.+/i.test(value);
        },
        message: '输入值不能为空和包含其他非法字符'
    },
    username: {// 验证用户名
        validator: function (value) {
            return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
        },
        message: '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
    },
    faxno: {// 验证传真
        validator: function (value) {
            //            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value);
            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
        },
        message: '传真号码不正确'
    },
    zip: {// 验证邮政编码
        validator: function (value) {
            return /^[1-9]\d{5}$/i.test(value);
        },
        message: '邮政编码格式不正确'
    },
    ip: {// 验证IP地址
        validator: function (value) {
            return /d+.d+.d+.d+/i.test(value);
        },
        message: 'IP地址格式不正确'
    },
    name: {// 验证姓名，可以是中文或英文
        validator: function (value) {
            return /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/i.test(value);
        },
        message: '请输入姓名'
    },
    date: {// 验证日期
        validator: function (value) {
            //格式yyyy-MM-dd或yyyy-M-d
            return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(value);
        },
        message: '清输入合适的日期格式(如：yyyy-MM-dd)'
    },
    datetime: {// 验证日期时间
        validator: function (value) {
            //格式yyyy-MM-dd或yyyy-M-d
            return /^(\d{2}|\d{4})(?:\-)?([0]{1}\d{1}|[1]{1}[0-2]{1})(?:\-)?([0-2]{1}\d{1}|[3]{1}[0-1]{1})(?:\s)?([0-1]{1}\d{1}|[2]{1}[0-3]{1})(?::)?([0-5]{1}\d{1})(?::)?([0-5]{1}\d{1})$/i.test(value);
        },
        message: '清输入合适的日期格式(如：yyyy-MM-dd HH:mm:ss)'
    },
    msn: {
        validator: function (value) {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        message: '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
    },
    same: {
        validator: function (value, param) {
            if ($("#" + param[0]).val() != "" && value != "") {
                return $("#" + param[0]).val() == value;
            } else {
                return true;
            }
        },
        message: '两次输入的密码不一致！'
    }
});

$.extend($.fn.combotree.defaults.keyHandler, {
    query: function (q) {
        var t = $(this).combotree('tree');
        t.tree("search", q);
        }

});
$.extend($.fn.tree.methods, {  /** 
  * 扩展easyui tree的搜索方法 
  * @param tree easyui tree的根DOM节点(UL节点)的jQuery对象  * @param searchText 检索的文本 
  * @param this-context easyui tree的tree对象  */
    search: function (jqTree, searchText) {
        //easyui tree的tree对象。可以通过tree.methodName(jqTree)方式调用easyui tree的方法 
        var tree = this;
        //获取所有的树节点 
        var nodeList = getAllNodes(jqTree, tree);
        //如果没有搜索条件，则展示所有树节点 
        searchText = $.trim(searchText);
        if (searchText == "") {
            for (var i = 0; i < nodeList.length; i++) {
                $(".tree-node-targeted",
  nodeList[i].target).removeClass("tree-node-targeted");
                $(nodeList[i].target).show();
            }
            //展开已选择的节点（如果之前选择了）  
            var selectedNode = tree.getSelected(jqTree);
            if (selectedNode) {
                tree.expandTo(jqTree, selectedNode.target);
            }
            return;
        }
        //搜索匹配的节点并高亮显示  
        var matchedNodeList = [];
        if (nodeList && nodeList.length > 0) {
            var node = null;
            for (var i = 0; i < nodeList.length; i++) {
                node = nodeList[i];
                if (isMatch(searchText, node.text)) {
                    matchedNodeList.push(node);
                }
            }
            //隐藏所有节点 
            for (var i = 0; i < nodeList.length; i++) {
                $(".tree-node-targeted", nodeList[i].target).removeClass("tree-node-targeted");
                $(nodeList[i].target).hide();
            }
            //折叠所有节点 
            tree.collapseAll(jqTree);
            //展示所有匹配的节点以及父节点 


            for (var i = 0; i < matchedNodeList.length; i++) {
                showMatchedNode(jqTree, tree, matchedNodeList[i]);
            }
        }
    },
    /** 
    * 展示节点的子节点（子节点有可能在搜索的过程中被隐藏了） 
    * @param node easyui tree节点  
    */
    showChildren: function (jqTree, node) {
        //easyui tree的tree对象。可以通过tree.methodName(jqTree)方式调用easyui tree的方法 
        var tree = this;
        //展示子节点 
        if (!tree.isLeaf(jqTree, node.target)) {
            var children = tree.getChildren(jqTree, node.target);
            if (children && children.length > 0) {
                for (var i = 0; i < children.length; i++) {
                    if ($(children[i].target).is(":hidden")) {
                        $(children[i].target).show();
                    }
                }
            }
        }
    }
//    ,
//    /** 
//    * 将滚动条滚动到指定的节点位置，使该节点可见（如果有滚动条才滚动，没有滚动条就不滚动） 
//    * @param param { 
//    * treeContainer: easyui tree的容器（即存在滚动条的树容器）。如果为null，则取easyui tree的根UL节点的父节点。 
//    * argetNode: 将要滚动到的easyui tree节点。如果targetNode为空，则默认滚动到当前已选中的节点，如果没有选中的节点，则不滚动  * }  */
//    scrollTo: function (jqTree, param) {
//        //easyui tree的tree对象。可以通过tree.methodName(jqTree)方式调用easyui tree的方法 
//        var tree = this;
//        //如果node为空，则获取当前选中的node 
//        var targetNode = param && param.targetNode ? param.targetNode : tree.getSelected(jqTree);
//        if (targetNode != null) {
//            //判断节点是否在可视区域   var root = tree.getRoot(jqTree); 
//            var $targetNode = $(targetNode.target);
//            var container = param && param.treeContainer ? param.treeContainer : jqTree.parent();
//            var containerH = container.height();
//            var nodeOffsetHeight = $targetNode.offset().top - container.offset().top;
//            if (nodeOffsetHeight > (containerH - 30)) {
//                var scrollHeight = container.scrollTop() + nodeOffsetHeight - containerH + 30;
//                container.scrollTop(scrollHeight);
//            }
//        }
//    }
});
/** 
* 展示搜索匹配的节点 */
function showMatchedNode(jqTree, tree, node) {
    //展示所有父节点 
    $(node.target).show();
    $(".tree-title", node.target).addClass("tree-node-targeted");
    var pNode = node;
    while ((pNode = tree.getParent(jqTree, pNode.target))) {
        $(pNode.target).show();
    }
    //展开到该节点 
    tree.expandTo(jqTree, node.target);
    //如果是非叶子节点，需折叠该节点的所有子节点
    if (node != null && node != undefined && !tree.isLeaf(jqTree, node.target)) {
        tree.collapse(jqTree, node.target);
    }
}
/** 
* 判断searchText是否与targetText匹配 
* @param searchText 检索的文本 * @param targetText 目标文本 
* @return true-检索的文本与目标文本匹配；否则为false. 
*/
function isMatch(searchText, targetText) {
    return $.trim(targetText) != "" && ($.trim(targetText + "")).toUpperCase().indexOf($.trim(searchText + "").toUpperCase()) != -1;
}
/** 
* 获取easyui tree的所有node节点 */
function getAllNodes(jqTree, tree) {
    var allNodeList = jqTree.data("allNodeList");
    if (!allNodeList) {
        var roots = tree.getRoots(jqTree);
        allNodeList = getChildNodeList(jqTree, tree, roots);
        jqTree.data("allNodeList", allNodeList);
    }
    return allNodeList;
}
/** 
* 定义获取easyui tree的子节点的递归算法 */
function getChildNodeList(jqTree, tree, nodes) {
    var childNodeList = [];
    if (nodes && nodes.length > 0) {
        var node = null;
        for (var i = 0; i < nodes.length; i++) {
            node = nodes[i];
            childNodeList.push(node);
            if (!tree.isLeaf(jqTree, node.target)) {
                var children = tree.getChildren(jqTree, node.target);
                childNodeList = childNodeList.concat(getChildNodeList(jqTree, tree, children));
            }
        }
    }
    return childNodeList;
}
easy_extend = {
    //分页功能    
    pagerFilter: function (data) {
        if (typeof data.length == 'number' && typeof data.splice == 'function') {
            data = {
                total: data.length,
                rows: data
            }
        }
        var dg = $(this);
        var opts = dg.datagrid('options');
        var pager = dg.datagrid('getPager');
        pager.pagination({
            onSelectPage: function (pageNum, pageSize) {
                opts.pageNumber = pageNum;
                opts.pageSize = pageSize;
                pager.pagination('refresh', {
                    pageNumber: pageNum,
                    pageSize: pageSize
                });
                dg.datagrid('loadData', data);
            }
        });
        if (!data.originalRows) {
            if (data.rows)
                data.originalRows = (data.rows);
            else if (data.data && data.data.rows)
                data.originalRows = (data.data.rows);
            else
                data.originalRows = [];
        }
        var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
        var end = start + parseInt(opts.pageSize);
        data.rows = (data.originalRows.slice(start, end));
        return data;
    }
}