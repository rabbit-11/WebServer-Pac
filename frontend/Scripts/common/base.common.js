/******************加载框******************/
var MaskUtil = (function () {
    var $mask, $maskMsg;
    var defMsg = '正在加载，请稍候...';
    function init(wrapper) {
        if (wrapper == null || wrapper == undefined) return;
        $(wrapper).css("position", "relative");
        if (!$mask) {
            $mask = $("<div class=\"datagrid-mask mymask\"></div>").appendTo(wrapper);
        }
        if (!$maskMsg) {
            $maskMsg = $("<div class=\"datagrid-mask-msg mymask\">" + defMsg + "</div>").appendTo(wrapper).css({ 'font-size': '12px' });
        }
        //由于IE在界面未完全加载好之前wrapper的高度为空，所以暂时用document代替
        $mask.css({ width: "100%", height: $(wrapper).height() });
        $maskMsg.css({
            //outerWidth(true)
            left: ($(wrapper).width() - $($maskMsg).width()) / 2, top: ($(wrapper).height() - $($maskMsg).height()) / 2
        });
    }
    return {
        mask: function (wrapper, msg) {
            if (wrapper == null || wrapper == undefined) return;
            init(wrapper);
            if ($mask != null && $mask != undefined) {
                $mask.show();
            }
            if ($maskMsg != null && $maskMsg != undefined) {
                $maskMsg.html(msg || defMsg).show();
            }
        },
        unmask: function (wrapper) {
            if (wrapper == null || wrapper == undefined) return;

            $mask = $(wrapper).find(".datagrid-mask");
            $maskMsg = $(wrapper).find(".datagrid-mask-msg");

            if ($mask != null && $mask != undefined) {
                $mask.remove();
                $mask = null;
            }
            if ($maskMsg != null && $maskMsg != undefined) {
                $maskMsg.remove();
                $maskMsg = null;
            }
        }
    }
} ());

/******************回车操作******************/
var PressUtil = (function () {
    //获取焦点
    function myfocus(destition) {
        if (destition == null || destition == undefined)
            return;

        var target = destition;
        if (destition[0]) target = destition[0];
        //文本框
        if (destition.is(".textbox-text")) {
            destition.focus();
        }
        //日期选择框
        //        var t_par = destition.parents(".td_datepicker");
        //        if (t_par != null && t_par != undefined && t_par.length > 0) {
        //            //destition.parents(".td_datepicker").find("input.easyui-datebox").focus(); 
        //            var t = t_par.find("input.easyui-datebox");
        //            if (t != null && t != undefined) { t.datebox("showPanel"); return; }
        //        }
        //下拉框
        t_par = destition.parents(".td_combobox");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            var t = t_par.find("input.easyui-combobox");
            if (t != null && t != undefined) { t.combobox("showPanel"); return; }
            //destition.parents(".td_combobox").find("input.easyui-combobox").focus(); 
        }
        //树形下拉框
        t_par = destition.parents(".td_dropdowntree");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            var t = t_par.find("input.easyui-combotree");
            if (t != null && t != undefined) { t.combotree("showPanel"); return; }
            //destition.parents(".td_dropdowntree").find("input.easyui-combotree").focus(); 
        }
        //树形下拉框-异步
        t_par = destition.parents(".td_dropdowntree_async");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            var t = t_par.find("input.easyui-combotree");
            if (t != null && t != undefined) { t.combotree("showPanel"); return; }
        }
        //表格下拉框
        t_par = destition.parents(".td_combogrid");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            var t = t_par.find("input.easyui-combogrid");
            if (t != null && t != undefined) { t.combogrid("showPanel"); return; }
        }
    }
    //失去焦点
    function myblur(destition) {
        var target = destition;
        if (destition[0]) target = destition[0];

        //文本框
        if (destition.is(".textbox-text")) {
            destition.blur();
        }
        //日期选择框
        //        var t_par = destition.parents(".td_datepicker");
        //        if (t_par != null && t_par != undefined && t_par.length > 0) {
        //            var t = t_par.find("input.easyui-datebox");
        //            if (t != null && t != undefined) { t.datebox("hidePanel"); return; }
        //        }
        //下拉框
        t_par = destition.parents(".td_combobox");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            var t = t_par.find("input.easyui-combobox");
            if (t != null && t != undefined) { t.combobox("hidePanel"); return; }
        }
        //树形下拉框
        t_par = destition.parents(".td_dropdowntree");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            var t = t_par.find("input.easyui-combotree");
            if (t != null && t != undefined) { t.combotree("hidePanel"); return; }
        }
        //树形下拉框-异步
        t_par = destition.parents(".td_dropdowntree_async");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            var t = t_par.find("input.easyui-combotree");
            if (t != null && t != undefined) { t.combotree("hidePanel"); return; }
        }
        //表格下拉框
        t_par = destition.parents(".td_combogrid");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            var t = t_par.find("input.easyui-combogrid");
            if (t != null && t != undefined) { t.combogrid("hidePanel"); return; }
        }
    }
    function myup(base, destition) {
        var target = destition;
        if (destition[0]) target = destition[0];
        var t_par = null;

        //下拉框
        t_par = destition.parents(".td_combobox");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "up");
            return;
        }
        //树形下拉框
        t_par = destition.parents(".td_dropdowntree");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "up");
            return;
        }
        //树形下拉框-异步
        t_par = destition.parents(".td_dropdowntree_async");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "up");
            return;
        }
        //表格下拉框
        t_par = destition.parents(".td_combogrid");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "up");
            return;
        }
    }
    function mybackspace(base, destition) {
        var target = destition;
        if (destition[0]) target = destition[0];
        var t_par = null;

        //下拉框
        t_par = destition.parents(".td_combobox");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            return base.keyHandler(t_par[0], "backspace");
        }
        //树形下拉框
        t_par = destition.parents(".td_dropdowntree");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            return base.keyHandler(t_par[0], "backspace");
        }

        //树形下拉框-异步
        t_par = destition.parents(".td_dropdowntree_async");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "backspace");
        }
    }
    function mydown(base, destition) {
        var target = destition;
        if (destition[0]) target = destition[0];
        var t_par = null;

        //下拉框
        t_par = destition.parents(".td_combobox");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "down"); return;
        }
        //树形下拉框
        t_par = destition.parents(".td_dropdowntree");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "down"); return;
        }
        //树形下拉框-异步
        t_par = destition.parents(".td_dropdowntree_async");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "down"); return;
        }
        //表格下拉框
        t_par = destition.parents(".td_combogrid");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "down"); return;
        }
    }
    function myspace(base, destition) {
        var target = destition;
        if (destition[0]) target = destition[0];
        var t_par = null;

        //下拉框
        t_par = destition.parents(".td_combobox");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            return base.keyHandler(t_par[0], "space");
        }
        //树形下拉框
        t_par = destition.parents(".td_dropdowntree");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "space");
        }

        //树形下拉框-异步
        t_par = destition.parents(".td_dropdowntree_async");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            base.keyHandler(t_par[0], "space");
        }
    }

    function myleft(base, destition) {
        var target = destition;
        if (destition[0]) target = destition[0];
        var t_par = null;

        //树形下拉框
        t_par = destition.parents(".td_dropdowntree");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            return base.keyHandler(t_par[0], "left");
        }

        //树形下拉框-异步
        t_par = destition.parents(".td_dropdowntree_async");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            return base.keyHandler(t_par[0], "left");
        }
    }

    function myright(base, destition) {
        var target = destition;
        if (destition[0]) target = destition[0];
        var t_par = null;

        //树形下拉框
        t_par = destition.parents(".td_dropdowntree");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            return base.keyHandler(t_par[0], "right");
        }

        //树形下拉框-异步
        t_par = destition.parents(".td_dropdowntree_async");
        if (t_par != null && t_par != undefined && t_par.length > 0) {
            return base.keyHandler(t_par[0], "right");
        }
    }
    function gettarget(wrapper) {
        var filter_par = $('.form_td_ctrl[data-readonly!="true"]');
        return filter_par.find(".textbox-text");
    }
    function removekeybind(wrapper) {
        var $target = gettarget(wrapper);
        $target.unbind("keydown").unbind("keyup");
    }

    function bindkeydown(wrapper, showfirst, options) {
        var $target = gettarget(wrapper);
        if ($target == undefined || $target == null || $target.length == 0) return;

        var btn_save = options != undefined && options != null ? options.btn_save : null;

        if (showfirst) {
            focusfirst($target);
        }
        require(["base_usercontrol", "easyui"], function (base) {
            $target.unbind("keydown").bind('keydown', function (e) {
                e = e || window.event;
                var destition = $(this);
                var target = destition;
                if (destition[0])
                    target = destition[0];
                if (e.ctrlKey == true && e.keyCode == 83) {//Ctrl+S 
                    if (btn_save != undefined && btn_save != null && btn_save.length > 0) {
                        $(target).blur();
                        $(btn_save).click();
                        e.preventDefault();
                        return false;
                    }
                    return;
                }
                if (e.keyCode == 39||e.keyCode == 13) {//Right,Enter
                    if (myright(base, $(this))) {
                        e.preventDefault();
                        return;
                    }
                    if (destition.is(".noblur") || destition.parents("td:first").hasClass("noblur")) {
                        return;
                    }
                    e.preventDefault();

                    //下一个控件获取焦点
                    //myfocus(t);
                    nextfocus(wrapper, this);
                }
                else if (e.keyCode == 37) {//Left
                    if (myleft(base, $(this))) {
                        e.preventDefault();
                        return;
                    }
                    e.preventDefault();
                    var nxtIdx = $target.index(this);
                    //本控件失去焦点
                    myblur($(this));
                    prevfocus(wrapper, $(this));
                }
                else if (e.keyCode == 38) {//Up
                    myup(base, $(this));
                    e.preventDefault();
                }
                else if (e.keyCode == 40) {//Down
                    mydown(base, $(this));
                    e.preventDefault();
                }
                else if (e.keyCode == 8) {//BackSpace
                    if (mybackspace(base, $(this)))
                        e.preventDefault();
                }
                else if (e.keyCode == 32) {//Space
                    if (myspace(base, $(this)))
                        e.preventDefault();
                }
                else {
                    checkmax(e, $(this),wrapper);
                }
            });
            $target.unbind("keyup").bind('keyup', function (e) {
                e = e || window.event;
                if ([83, 39, 37, 38, 40, 8, 32].contains(e.keyCode) || e.ctrlKey == true)
                    return;
                checkmax(e, $(this), wrapper);
            });
        });
    }
    function checkmax(e, mytarget,wrapper) {
        var destition = $(mytarget);

        var par = $(destition).parents(".td_textbox");
        if (par == undefined || par == null || par.length <= 0) return;

        var maxlength;
        var curlength;
        maxlength = parseInt($(par).attr("maxlength"), 10);
        if (maxlength == undefined || maxlength <= 0)
            return;
        curlength = ($(mytarget).val() + "").length;

        if (maxlength <= curlength) {
            e.preventDefault();

            //本控件失去焦点
            myblur($(mytarget));
            //下一个控件获取焦点 
            nextfocus(wrapper, mytarget);
        }
    }
    function nextfocus(wrapper, obj) {
        if (obj == null || obj == undefined)
            return;
        var $target = gettarget(wrapper);
        //        var nxtIdx = $target.index(obj) + 1;
        //        if (nxtIdx < 0)
        //            return;
        //        myfocus($target.eq(nxtIdx));
        var Idx = $target.index(obj);
        //本控件失去焦点
        myblur($(obj));
        var t = null;
        var par = null;
        do {
            Idx++;
            t = $target.eq(Idx);
            par = t.parents(".hidden");
        }
        while (par != null && par != undefined && par.length > 0);
        if (t != null && t != undefined)
            myfocus(t);
    }
    function prevfocus(wrapper, obj) {
        if (obj == null || obj == undefined)
            return;
        var $target = gettarget(wrapper);
        //        var nxtIdx = $target.index(obj) + 1;
        //        if (nxtIdx < 0)
        //            return;
        //        myfocus($target.eq(nxtIdx));
        var Idx = $target.index(obj);
        //本控件失去焦点
        myblur($(obj));
        var t = null;
        var par = null;
        do {
            Idx--;
            t = $target.eq(Idx);
            par = t.parents(".hidden");
        }
        while (par != null && par != undefined && par.length > 0);
        if (t != null && t != undefined)
            myfocus(t);
    }
    function nextblur(wrapper, obj) {
        if (obj == null || obj == undefined)
            return;
        var $target = gettarget(wrapper);
        var nxtIdx = $target.index(obj) + 1;
        if (nxtIdx < 0)
            return;
        myblur($target.eq(nxtIdx));
    }
    function focusfirst(list) {
        // if (list == undefined || list == null || list.length == 0) return;
        // for (var i = 0; i < list.length; i++) {
        //     if ($(list[i]).val() == "") {
        //         myfocus($(list[i]));
        //         break;
        //     }
        // }
    }
    function bindkeydown_search(ctrl, callback) {
        if (ctrl == null || ctrl == undefined) return;
        if (callback == null || callback == undefined) return;
        ctrl.unbind("keydown").on("keydown", function (e) { if (e.keyCode == 13) { $(ctrl).blur(); callback(e); } });
    }
    return {
        bindkeydown: bindkeydown,
        bindkeydown_search: bindkeydown_search
    }
} ());

var TipUtil = (function () {
    //tip是提示信息，type:'success'是成功信息，'danger'是失败信息,'info'是普通信息
    function ShowTip(tip, type) {
        var $tip = $('#tip_share');
        $tip.remove();

        $tip = $('<span id="tip_share" style="font-weight:bold;position:absolute;top:50%;left: 50%;z-index:9999"></span>');
        $('body').append($tip);

        var top = ($(window).height() - $tip.outerHeight()) / 2 + $(document).scrollTop();
        var left = ($(window).width() - $tip.outerWidth()) / 2;
        $tip.stop(true).attr('class', 'alert alert-' + type).html(tip).css({ 'margin-left': -$tip.outerWidth() / 2, 'top': top + 'px', 'left': left + 'px' }).fadeIn(200).delay(1500).fadeOut(200);
    }

    function ShowMsg(msg) {
        ShowTip(msg, 'info');
    }

    function ShowSuccess(msg) {
        ShowTip(msg, 'success');
    }

    function ShowFailure(msg) {
        ShowTip(msg, 'danger');
    }

    function ShowWarn(msg, $focus, clear) {
        ShowTip(msg, 'warning');
        if ($focus) $focus.focus();
        if (clear) $focus.val('');
        return false;
    }

    function ShowAlert(tip, type) {
        var $tip = $('#tip');
        if ($tip.length == 0) {
            $tip = $('<span id="tip" style="font-weight:bold;position:absolute;top:180px;left: 50%;z-index:9999;font-size:13px;line-height:1.1em;"></span>');
            $('body').append($tip);
        }
        $tip.stop(true).attr('class', 'alert alert-' + type).html(tip + '<div style="text-align:center;margin-top:5px;"><span id="tip_close" class="btnlink">关闭</span></div>').css('margin-left', -$tip.outerWidth() / 2).fadeIn(200); //.delay(1500).fadeOut(200);
        $("#tip_close").on("click", function () {
            if ($('#tip')) {
                $('#tip').fadeOut(200);
            }
        });

    }
    return {
        ShowSuccess: ShowSuccess,
        ShowMsg: ShowMsg,
        ShowFailure: ShowFailure,
        ShowAlert: ShowAlert,
        ShowWarn: ShowWarn
    }
} ());

/******************当前URL参数******************/
var myrequest = {
    jobnumber: "f0175", //医生工号
    doctorname: "黄燕清", //医生姓名
    mechanism: "", //医生所属科室
    departmentcode: "20035", //医生所属科室
    departmentname: "妇科门诊（珠）", //医生所属科室名称
    bingrenid: "2800988", //病人id
    shenfenzh: "360430198310060024", //病人身份证号
    bingrenxm: "吴珍", //病人姓名
    lururcode: "", //录入人员工号
    lururname: "", //录入人员姓名
    jiuzhenid: "", //就诊编号
    pid: "", //孕妇档案编号

    userid: "", //用户工号
    username: "", //用户姓名
    jigoudm: "", //机构代码

    timestamp: "", //时间戳
    zhenduanids: "", //诊断编号列表

    getrequest: function (url) {
        if (url == null || url == undefined || url == "") url = window.location.search;
        this.jobnumber = myextend.getBaseUrlParam("jobnumber", url, true);
        this.doctorname = ((myextend.getBaseUrlParam("doctorname", url, true)));

        this.departmentcode = myextend.getBaseUrlParam("mechanism", url, true);
        if (this.departmentcode == null || this.departmentcode == undefined || this.departmentcode == "")
            this.departmentcode = myextend.getBaseUrlParam("departmentcode", url, true);
        this.mechanism = this.departmentcode;
        this.departmentname = ((myextend.getBaseUrlParam("departmentname", url, true)));

        this.bingrenid = myextend.getBaseUrlParam("bingrenid", url, true);
        this.shenfenzh = myextend.getBaseUrlParam("shenfenzh", url, true);
        if (this.shenfenzh == "" || this.shenfenzh == undefined || this.shenfenzh == null)
            this.shenfenzh = myextend.getBaseUrlParam("idcard", url, true);

        this.bingrenxm = ((myextend.getBaseUrlParam("bingrenxm", url, true)));
        this.lururcode = myextend.getBaseUrlParam("lururcode", url, true);
        this.lururname = ((myextend.getBaseUrlParam("lururname", url, true)));
        this.jiuzhenid = ((myextend.getBaseUrlParam("jiuzhenid", url, true)));
        this.pid = ((myextend.getBaseUrlParam("pid", url, true)));
        this.jigoudm = ((myextend.getBaseUrlParam("jigoudm", url, true)));
        this.timestamp = ((myextend.getBaseUrlParam("timestamp", url, true)));
        this.zhenduanids = ((myextend.getBaseUrlParam("zhenduanids", url, true)));


        this.userid = !myextend.isNull(this.jobnumber) ? this.jobnumber : this.lururcode;
        this.username = !myextend.isNull(this.doctorname) ? this.doctorname : this.lururname;

        return this;
    },
    tourl: function (baseurl, org) {
        if (org == null || org == undefined || org == false) {
            this.getrequest();
        }
        if (!myextend.isNull(this.jobnumber))
            baseurl = myextend.UrlUpdateParams(baseurl, "jobnumber", "'" + this.jobnumber + "'", true);
        if (!myextend.isNull(this.doctorname))
            baseurl = myextend.UrlUpdateParams(baseurl, "doctorname", "'" + this.doctorname + "'", true);
        if (!myextend.isNull(this.mechanism))
            baseurl = myextend.UrlUpdateParams(baseurl, "mechanism", "'" + this.mechanism + "'", true);
        if (!myextend.isNull(this.departmentcode))
            baseurl = myextend.UrlUpdateParams(baseurl, "departmentcode", "'" + this.departmentcode + "'", true);
        if (!myextend.isNull(this.departmentname))
            baseurl = myextend.UrlUpdateParams(baseurl, "departmentname", "'" + this.departmentname + "'", true);
        if (!myextend.isNull(this.bingrenid))
            baseurl = myextend.UrlUpdateParams(baseurl, "bingrenid", "'" + this.bingrenid + "'", true);
        if (!myextend.isNull(this.shenfenzh))
            baseurl = myextend.UrlUpdateParams(baseurl, "shenfenzh", "'" + this.shenfenzh + "'", true);
        if (!myextend.isNull(this.bingrenxm))
            baseurl = myextend.UrlUpdateParams(baseurl, "bingrenxm", "'" + this.bingrenxm + "'", true);
        if (!myextend.isNull(this.lururcode))
            baseurl = myextend.UrlUpdateParams(baseurl, "lururcode", "'" + this.lururcode + "'", true);
        if (!myextend.isNull(this.lururname))
            baseurl = myextend.UrlUpdateParams(baseurl, "lururname", "'" + this.lururname + "'", true);
        if (!myextend.isNull(this.jiuzhenid))
            baseurl = myextend.UrlUpdateParams(baseurl, "jiuzhenid", "'" + this.jiuzhenid + "'", true);
        if (!myextend.isNull(this.pid))
            baseurl = myextend.UrlUpdateParams(baseurl, "pid", "'" + this.pid + "'", true);
        if (!myextend.isNull(this.jigoudm))
            baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", "'" + this.jigoudm + "'", true);
        if (!myextend.isNull(this.timestamp))
            baseurl = myextend.UrlUpdateParams(baseurl, "timestamp", "'" + this.timestamp + "'", true);
        if (!myextend.isNull(this.zhenduanids))
            baseurl = myextend.UrlUpdateParams(baseurl, "zhenduanids", "'" + this.zhenduanids + "'", true);
        return baseurl;
    },
    todic: function (dictionary) {
        if (dictionary == null || dictionary == undefined) dictionary = new myextend.Dictionary();

        if (!myextend.isNull(this.jobnumber))
            dictionary.set("jobnumber", this.jobnumber);
        if (!myextend.isNull(this.doctorname))
            dictionary.set("doctorname", this.doctorname);
        if (!myextend.isNull(this.mechanism))
            dictionary.set("mechanism", this.mechanism);
        if (!myextend.isNull(this.departmentcode))
            dictionary.set("departmentcode", this.departmentcode);
        if (!myextend.isNull(this.departmentname))
            dictionary.set("departmentname", this.departmentname);
        if (!myextend.isNull(this.bingrenid))
            dictionary.set("bingrenid", this.bingrenid);
        if (!myextend.isNull(this.shenfenzh))
            dictionary.set("shenfenzh", this.shenfenzh);
        if (!myextend.isNull(this.bingrenxm))
            dictionary.set("bingrenxm", this.bingrenxm);
        if (!myextend.isNull(this.lururcode))
            dictionary.set("lururcode", this.lururcode);
        if (!myextend.isNull(this.lururname))
            dictionary.set("lururname", this.lururname);
        if (!myextend.isNull(this.jiuzhenid))
            dictionary.set("jiuzhenid", this.jiuzhenid);
        if (!myextend.isNull(this.pid))
            dictionary.set("pid", this.pid);
        if (!myextend.isNull(this.jigoudm))
            dictionary.set("jigoudm", this.jigoudm);
        if (!myextend.isNull(this.userid))
            dictionary.set("userid", this.userid);
        if (!myextend.isNull(this.username))
            dictionary.set("username", this.username);
        if (!myextend.isNull(this.timestamp))
            dictionary.set("timestamp", this.timestamp);
        if (!myextend.isNull(this.zhenduanids))
            dictionary.set("zhenduanids", this.zhenduanids);
        return dictionary;
    },
    todata: function (data) {
        if (data == null || data == undefined) data = {};

        if (!myextend.isNull(this.jobnumber))
            data.jobnumber = this.jobnumber;

        if (!myextend.isNull(this.doctorname))
            data.doctorname = this.doctorname;

        if (!myextend.isNull(this.mechanism))
            data.mechanism = this.mechanism;

        if (!myextend.isNull(this.departmentcode))
            data.departmentcode = this.departmentcode;

        if (!myextend.isNull(this.departmentname))
            data.departmentname = this.departmentname;

        if (!myextend.isNull(this.bingrenid))
            data.bingrenid = this.bingrenid;

        if (!myextend.isNull(this.shenfenzh))
            data.shenfenzh = this.shenfenzh;

        if (!myextend.isNull(this.bingrenxm))
            data.bingrenxm = this.bingrenxm;

        if (!myextend.isNull(this.lururcode))
            data.lururcode = this.lururcode;

        if (!myextend.isNull(this.lururname))
            data.lururname = this.lururname;

        if (!myextend.isNull(this.jiuzhenid))
            data.jiuzhenid = this.jiuzhenid;

        if (!myextend.isNull(this.pid))
            data.pid = this.pid;

        if (!myextend.isNull(this.jigoudm))
            data.jigoudm = this.jigoudm;

        if (!myextend.isNull(this.userid))
            data.userid = this.userid;

        if (!myextend.isNull(this.username))
            data.username = this.username;

        if (!myextend.isNull(this.timestamp))
            data.timestamp = this.timestamp;

        if (!myextend.isNull(this.zhenduanids))
            data.zhenduanids = this.zhenduanids;
        return data;
    },
    isInWhite: function () {
        var arr = ["99999"];
        return arr.contains(this.userid);
    },
    isCanEdit: function () {
        return this.jobnumber != undefined && this.jobnumber != null;
    }
};

var LeaveCheckUtil = (function () {
    function leave(obj_wrapper, tiptext, com_callback, ischange_callback, cancel_callback, base) {
        require(["base_usercontrol", "easyui", "locale"], function (base) {
            var isOut = false;
            var showcount = 0;
            var wrapper = getwrapper(obj_wrapper);
            $(wrapper).on("mouseover", function () { isOut = false; });
            $(wrapper).on("mouseout", function () { isOut = true; });

            $("a[disabled!='disabled'],button,input[type='button']").unbind("click", "check_change").on("click", check_change);

            function check_change(e) {
                var eve = e || window.event;

                var obj = eve.srcElement ? eve.srcElement : eve.target;
                if (obj == null || obj == undefined)
                    return true;
                if (!isOut) return true;
                if (showcount != 0) return true;
                if (isIgnore(obj)) return true;
                if (isChild($(this), wrapper)) return true;
                if (isindiv(wrapper)) return true;

                var is_change = false;
                if (ischange_callback == undefined || ischange_callback == null)
                    is_change = base.isChange(wrapper);
                else
                    is_change = ischange_callback();

                if (!is_change) return true;

                if (document.all) { //判断IE浏览器
                    window.event.returnValue = false;
                }
                else {
                    event.preventDefault();
                }
                doConfirm(tiptext, obj, e, com_callback, cancel_callback);

                showcount++;
                isOut = false;
                return false;
            }
        });
    }

    function share_leave(obj_wrapper, tiptext, com_callback, ischange_callback, cancel_callback, base) {
        var wrapper = getwrapper(obj_wrapper);
        var is_change = false;
        if ((ischange_callback == undefined || ischange_callback == null) && base)
            is_change = base.isChange(wrapper);
        else
            is_change = ischange_callback();

        if (!is_change) {
            if (cancel_callback != undefined && cancel_callback != null) {
                cancel_callback();
            }
            return;
        }
        doConfirm_1(tiptext, com_callback, cancel_callback);
    }

    function doConfirm(tiptext, obj, e, com_callback, cancel_callback) {
        //提示
        $.messager.confirm({
            ok: '是',
            cancel: '否',
            title: '提示',
            msg: tiptext,
            fn: function (r) {
                if (r) {
                    if (com_callback != null && com_callback != undefined) {
                        com_callback(obj, mytrigger, e != undefined && e != null ? e.type : null);
                        return true;
                    }
                }
                else {
                    if (obj) {
                        if (cancel_callback != null && cancel_callback != undefined) {
                            cancel_callback(function () { $(obj)[0].click(); });
                        }
                        else { $(obj)[0].click(); }
                    }
                    return false;
                }
            }
        });
    }
    function doConfirm_1(tiptext, com_callback, cancel_callback) {
        //提示
        $.messager.confirm({
            ok: '是',
            cancel: '否',
            title: '提示',
            msg: tiptext,
            fn: function (r) {
                if (r) {
                    if (com_callback != null && com_callback != undefined) {
                        com_callback();
                        return true;
                    }
                }
                else {
                    if (cancel_callback != null && cancel_callback != undefined) {
                        cancel_callback();
                    }
                    return false;
                }
            }
        });
    }
    function getwrapper(obj) {
        var wrapper = null;
        if (typeof (obj) == 'string') {
            obj = (obj + "").replace("#", "");
            wrapper = $("#" + obj);
        }
        else {
            wrapper = $(obj);
        }
        return wrapper;
    }
    function isChild(sender, wrapper) {
        var child = $(wrapper).find(sender);
        if (child == undefined || child == null || child.length <= 0) return false;
        return true;
    }
    function isIgnore(obj) {
        return (
                $(obj).hasClass("nosave") || (($(obj).parents(".nosave") != null && $(obj).parents(".nosave").length > 0))
                || ($(obj).is("a") && ($(obj).attr("href") == "" || $(obj).attr("href") == undefined || $(obj).attr("href") == null))
                || ($(obj).parents("a") != null && $(obj).parents("a").length > 0 && ($(obj).parents("a")[0].href == "" || $(obj).parents("a")[0].href == null || $(obj).parents("a")[0].href == undefined))
                );
    }
    function mytrigger(sender, e) {
        if (sender == undefined || sender == null) return;
        if (e == undefined || e == null) return;
        $(sender).find("img,span,div").trigger(e);
    }
    function isindiv(obj_wrapper) {
        var wrapper = getwrapper(obj_wrapper);

        var wx = window.event.clientX;
        var wy = window.event.clientY;
        var divsave = $(wrapper);
        if (divsave == null || divsave == undefined)
            return true;

        var offset = divsave.offset();
        if (offset == null || offset == undefined)
            return false;
        var d_left = offset.left;
        var d_top = offset.top;
        var d_width = divsave.width();
        var d_height = divsave.height();

        if (wx < d_left || wy < d_top || wx > (d_left + d_width) || wy > (d_top + d_height))
            return false;
        return true;
    }
    return {
        leave: leave,
        share_leave: share_leave
    }
} ());

var EventUtil = (function () {
    var eventTimeFn = null;
    function bindclick(ctrl, callback) {
        if (ctrl != null && ctrl != undefined) {
            ctrl.unbind("click").on("click", function (sender, e) {
                require(["base_usercontrol", "jextend", "jquery", "easyui"], function (base) {
                    clearTimeout(eventTimeFn);
                    eventTimeFn = setTimeout(function () {
                        if (callback != null) {
                            callback(sender.target);
                        }
                        clearTimeout(eventTimeFn);
                    }, 400);
                });
                return false;
            });
        }
    }
    function showOrHide(ctrl, show) {
        if (ctrl == null || ctrl == undefined)
            return;
        if (show)
            ctrl.removeClass("hidden");
        else
            ctrl.addClass("hidden");
    } 
    function HideOnView(ctrl_wrapper, selector, canshow) {
        //设置可视化控件
        var t = $(ctrl_wrapper).find(selector);
        if (t != null && t != undefined) {
            if (!canshow)
                t.hide();
            else
                t.show();
        }
    }
    function setVisible(ctrl, vs) {
        if (ctrl == null || ctrl == undefined)
            return;
        if (!vs)
            $(ctrl).css("visibility", "hidden");
        else
            $(ctrl).css("visibility", "visible");

    }

    function doFilter(e, target) {
        if (e.keyCode == 13) {
            var btn = $(target);

            if (btn != null) {
                e.cancelBubble = true;
                e.returnValue = false;

                if (e.preventDefault) {
                    e.preventDefault();
                }
                btn.click();
            }
        }
    }
    return {
        bindclick: bindclick,
        showOrHide: showOrHide,
        setVisible: setVisible,
        HideOnView: HideOnView,
        doFilter: doFilter
    }
} ());

var IframeUtil = (function () {
    function refreshParent(id) {
        require(["thread"], function (a) {
            function doreinit(interval, id) {
                function reinitIframe() {
                    var iframe = document.getElementById(id);
                    try {
                        var bHeight = iframe.contentWindow.document.body.scrollHeight;
                        var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
                        var height = Math.max(bHeight, dHeight);
                        iframe.height = height;
                        // console.log(height);
                    } catch (ex) { }
                }
                setInterval(reinitIframe, interval, id);
            }
            Concurrent.Thread.create(doreinit, 100, id);
//            doreinit(100, id);
        });
    }
    return {
        refreshParent: refreshParent
    }
} ());

var idCardNoUtil = {
    provinceAndCitys: { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江",
        31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东",
        45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
        65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
    },
    powers: ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"],
    parityBit: ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"],
    genders: { male: "1", female: "2" },
    checkAddressCode: function (addressCode) {
        var check = /^[1-9]\d{5}$/.test(addressCode);
        if (!check) return false;
        if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
            return true;
        } else {
            return false;
        }
    },
    checkBirthDayCode: function (birDayCode) {
        var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
        if (!check) return false;
        var yyyy = parseInt(birDayCode.substring(0, 4), 10);
        var mm = parseInt(birDayCode.substring(4, 6), 10);
        var dd = parseInt(birDayCode.substring(6), 10);
        var xdata = new Date(yyyy, mm - 1, dd);
        if (xdata > new Date()) {
            return false; //生日不能大于当前日期
        } else if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
            return true;
        } else {
            return false;
        }
    },
    getParityBit: function (idCardNo) {
        var id17 = idCardNo.substring(0, 17);

        var power = 0;
        for (var i = 0; i < 17; i++) {
            power += parseInt(id17.charAt(i), 10) * parseInt(idCardNoUtil.powers[i]);
        }

        var mod = power % 11;
        return idCardNoUtil.parityBit[mod];
    },
    checkParityBit: function (idCardNo) {
        var parityBit = idCardNo.charAt(17).toUpperCase();
        if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
            return true;
        } else {
            return false;
        }
    },
    checkIdCardNo: function (idCardNo) {
        //15位和18位身份证号码的基本校验
        var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
        if (!check) return false;
        //判断长度为15位或18位
        if (idCardNo.length == 15) {
            return idCardNoUtil.check15IdCardNo(idCardNo);
        } else if (idCardNo.length == 18) {
            return idCardNoUtil.check18IdCardNo(idCardNo);
        } else {
            return false;
        }
    },

    //校验15位的身份证号码
    check15IdCardNo: function (idCardNo) {
        //15位身份证号码的基本校验
        var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
        if (!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) return false;
        var birDayCode = '19' + idCardNo.substring(6, 12);
        //校验日期码
        return idCardNoUtil.checkBirthDayCode(birDayCode);
    },

    //校验18位的身份证号码
    check18IdCardNo: function (idCardNo) {
        //18位身份证号码的基本格式校验
        var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
        if (!check) return false;
        //校验地址码
        var addressCode = idCardNo.substring(0, 6);
        check = idCardNoUtil.checkAddressCode(addressCode);
        if (!check) return false;
        //校验日期码
        var birDayCode = idCardNo.substring(6, 14);
        check = idCardNoUtil.checkBirthDayCode(birDayCode);
        if (!check) return false;
        //验证校检码
        return idCardNoUtil.checkParityBit(idCardNo);
    },

    formateDateCN: function (day) {
        var yyyy = day.substring(0, 4);
        var mm = day.substring(4, 6);
        var dd = day.substring(6);
        return yyyy + '-' + mm + '-' + dd;
    },

    //获取信息
    getIdCardInfo: function (idCardNo) {
        var idCardInfo = {
            gender: "", //性别
            birthday: "" // 出生日期(yyyy-mm-dd)
        };
        if (idCardNo == null || idCardNo == undefined) return idCardInfo;

        if (idCardNo.length == 15) {
            var aday = '19' + idCardNo.substring(6, 12);
            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
            if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }
        } else if (idCardNo.length == 18) {
            var aday = idCardNo.substring(6, 14);
            idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
            if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
                idCardInfo.gender = idCardNoUtil.genders.female;
            } else {
                idCardInfo.gender = idCardNoUtil.genders.male;
            }

        }
        return idCardInfo;
    },
    getId15: function (idCardNo) {
        if (idCardNo.length == 15) {
            return idCardNo;
        } else if (idCardNo.length == 18) {
            return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
        } else {
            return null;
        }
    },
    getId18: function (idCardNo) {
        if (idCardNo.length == 15) {
            var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
            var parityBit = idCardNoUtil.getParityBit(id17);
            return id17 + parityBit;
        } else if (idCardNo.length == 18) {
            return idCardNo;
        } else {
            return null;
        }
    }
};
/**
* @desc 计算年龄
* 计算年份->计算月份->计算天数
*/
var DateUtil = {

    getDiffYmdBetweenDate: function (sDate1, sDate2) {
        var fixDate = function (sDate) {
            var aD = sDate.split('-');
            for (var i = 0; i < aD.length; i++) {
                aD[i] = fixZero(parseInt(aD[i]));
            }
            return aD.join('-');
        };
        var fixZero = function (n) {
            return n < 10 ? '0' + n : n;
        };
        var fixInt = function (a) {
            for (var i = 0; i < a.length; i++) {
                a[i] = parseInt(a[i]);
            }
            return a;
        };
        var getMonthDays = function (y, m) {
            var aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            if ((y % 400 == 0) || (y % 4 == 0 && y % 100 != 0)) {
                aMonthDays[2] = 29;
            }
            return aMonthDays[m];
        };
        var checkDate = function (sDate) {
        };
        var y = 0;
        var m = 0;
        var d = 0;
        var sTmp;
        var aTmp;
        sDate1 = fixDate(sDate1);
        sDate2 = fixDate(sDate2);
        if (sDate1 > sDate2) {
            sTmp = sDate2;
            sDate2 = sDate1;
            sDate1 = sTmp;
        }
        var aDate1 = sDate1.split('-');
        aDate1 = fixInt(aDate1);
        var aDate2 = sDate2.split('-');
        aDate2 = fixInt(aDate2);
        //计算相差的年份
        /*aTmp = [aDate1[0]+1,fixZero(aDate1[1]),fixZero(aDate1[2])];
        while(aTmp.join('-') <= sDate2){
        y++;
        aTmp[0]++;
        }*/
        y = aDate2[0] - aDate1[0];
        if (sDate2.replace(aDate2[0], '') < sDate1.replace(aDate1[0], '')) {
            y = y - 1;
        }
        //计算月份
        aTmp = [aDate1[0] + y, aDate1[1], fixZero(aDate1[2])];
        while (true) {
            if (aTmp[1] == 12) {
                aTmp[0]++;
                aTmp[1] = 1;
            } else {
                aTmp[1]++;
            }
            if (([aTmp[0], fixZero(aTmp[1]), aTmp[2]]).join('-') <= sDate2) {
                m++;
            } else {
                break;
            }
        }
        //计算天数
        aTmp = [aDate1[0] + y, aDate1[1] + m, aDate1[2]];
        if (aTmp[1] > 12) {
            aTmp[0]++;
            aTmp[1] -= 12;
        }
        while (true) {
            if (aTmp[2] == getMonthDays(aTmp[0], aTmp[1])) {
                aTmp[1]++;
                aTmp[2] = 1;
            } else {
                aTmp[2]++;
            }
            sTmp = ([aTmp[0], fixZero(aTmp[1]), fixZero(aTmp[2])]).join('-');
            if (sTmp <= sDate2) {
                d++;
            } else {
                break;
            }
        }
        return { y: y, m: m, d: d };
    }
};

var ObjectUtil = {
    isObj: function isObj(object) {
        return object && typeof (object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
    },

    isArray: function (object) {
        return object && typeof (object) == 'object' && object.constructor == Array;
    },

    getLength: function (object) {
        var count = 0;
        for (var i in object) count++;
        return count;
    },
    Compare: function (objA, objB) {
        if (!ObjectUtil.isObj(objA) || !ObjectUtil.isObj(objB)) return false; //判断类型是否正确
        if (ObjectUtil.getLength(objA) != ObjectUtil.getLength(objB)) return false; //判断长度是否一致
        return ObjectUtil.CompareObj(objA, objB, true); //默认为true
    },
    CompareObj: function (objA, objB, flag) {
        for (var key in objA) {
            if (!flag) //跳出整个循环
                break;
            if (!objB.hasOwnProperty(key)) {
                flag = false;
                break;
            }
            var oA = objA[key];
            var oB = objB[key];
            if (!ObjectUtil.isArray(oA)) { //子级不是数组时,比较属性值
                if (oB != oA) {
                    flag = false;
                    break;
                }
            }
            else {
                if (!ObjectUtil.isArray(oB)) {
                    flag = false;
                    break;
                }
                if (oA.length != oB.length) {
                    flag = false;
                    break;
                }
                for (k = 0; k < oA.length; k++) {
//                    k = oA[i];
                    if (!flag) //这里跳出循环是为了不让递归继续
                        break;
                    flag = ObjectUtil.CompareObj(oA[k], oB[k], flag);
                }
            }
        }
        return flag;
    }
};