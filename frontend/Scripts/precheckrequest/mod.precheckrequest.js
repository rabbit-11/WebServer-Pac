define(function () {
    var global_config = {
        template: null,
        wrapper: "#list_precheckrequest_wrapper"
    };

    var share_list_config = {
        btn_chufang: "#btn_chufang",
        btn_examorder: "#btn_examorder",
        btn_laborder: "#btn_laborder",
        btn_save_top: "#btn_save_top",
        btn_print: "#btn_print",
        btn_add: "#btn_add",
        list_model_tbody_wrapper: "#list_precheckrequest_tbody_wrapper",
        btn_deletevr: "#btn_deletevr",
        sr_list: null,
        sr_delete: null,
        enum_printtype: null,
        sr_printtype: null,
        template: null,
        event_initstate: oninitstate,
        event_change: onchange,
        win_chufang: "#win_chufang",
        win_examorder: "#win_examorder",
        win_laborder: "#win_laborder",
        btn_diff: "#btn_diff",
        cf_onemodel: {
            sr_empty: [],
            sr_getone: null,
            sr_save: null,
            event_save: null,
            cf_detail: {
                btn_save: ".btn_detail_save",
                list_wrapper: "#list_precheckrequest_wrapper",
                list_model_tbody_wrapper: "list_model_tbody_wrapper",
                table_wrapper: '.customtable',
                template: null
            },
            cf_summary: { template: null },
            list_model_wrapper: "#list_precheckrequest_wrapper"
        }
    };

    var mod_list = null;
    var mod_onemodel = null;
    var class_base = null;
    var class_share = null;
    function using(callback) {
        require(['list_model', 'mod_onemodel', "base_usercontrol", "share_services", 'jquery', 'cookie', "common"], function (l, m, b, s) {
            mod_list = l;
            mod_onemodel = m;
            class_base = b;
            class_share = s;
            if (callback != null && callback != undefined)
                callback();
        });
    }
    function config() {
        global_config.template = webglobal.templates.list_precheckrequest;
        share_list_config.sr_list = webglobal.services.GetPreCheckRequestList;
        share_list_config.sr_delete = webglobal.services.DelPreCheckRequest;
        share_list_config.sr_printtype = webglobal.services.GetPrintType;
        share_list_config.enum_printtype = webglobal.enum_printtype.precheckrequest;
        share_list_config.template = webglobal.templates.one_precheckrequest;
        share_list_config.cf_onemodel.sr_empty = [webglobal.services.GetEmptyPreCheckRequest_Normal];
        share_list_config.cf_onemodel.sr_getone = webglobal.services.GetOnePreCheckRequest;
        share_list_config.cf_onemodel.sr_save = webglobal.services.SavePreCheckRequest;
        share_list_config.cf_onemodel.cf_detail.template = webglobal.templates.one_precheckrequest_detail;
        share_list_config.cf_onemodel.cf_summary.template = webglobal.templates.one_precheckrequest_summary;
        share_list_config.cf_onemodel.event_save = onsave;
        share_list_config.enum_cachetype = webglobal.enum_cachetype.precheckrequest;
        share_list_config.cf_onemodel.cf_detail.enum_cachetype = webglobal.enum_cachetype.precheckrequest;
    }
    function onsave(sender, e, data) {
        if (data != null && data != undefined) {
            class_base.setVal("tmpl_specimennumber", data.specimennumber, mod_list.getCurRowDetail());
        }
    }
    function oninitstate() {
        EventUtil.showOrHide($(share_list_config.btn_diff), false);
    }
    function onchange() {
        var id = mod_list.getCurRowID();
        var hasid = id > 0 && !isNaN(id);
        EventUtil.showOrHide($(share_list_config.btn_diff), hasid);        
        //痕迹
        var btn_diff = $(share_list_config.btn_diff);
        if (!myextend.isNull(btn_diff)) {
            var baseurl = webglobal.pages.Page_DiffList;
            var _req = myrequest.getrequest();
            baseurl = myextend.UrlUpdateParams(baseurl, "attachedid", id);
            baseurl = myextend.UrlUpdateParams(baseurl, "attachedtype", webglobal.enum_difftype.precheckrequest);
            baseurl = myextend.UrlUpdateParams(baseurl, "jigoudm", _req.jigoudm);
            btn_diff.attr("href", baseurl);
        }
    }
    function show() {
        using(function () {
            $(function () {
                config();
                //右边内容
                $(global_config.wrapper).load(global_config.template, function (response) {
                    var _req = myrequest.getrequest();
                    mod_list.bind(!_req.isInWhite() && _req.isCanEdit(), false, share_list_config);
                });
            });
        });
    }
  
    return {
        show: show
    }
});
