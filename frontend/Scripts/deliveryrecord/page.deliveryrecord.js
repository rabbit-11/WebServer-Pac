define(function () {
    var global_config = {
        template: null,
        wrapper: "#mod_wrapper_deliveryrecord",
        iframe: "#iframe_deliveryrecord",
        sr_iframe: null
    };
    function using(callback) {
        require(['jquery', "web_global", "jextend","common"], function () {
            if (callback != null && callback != undefined)
                callback();
        });
    }
    function config() {
        global_config.template = webglobal.templates.mod_deliveryrecord;
        global_config.sr_iframe = webglobal.pages.Page_DeliveryRecord;
    }
    function show() {
        using(function () {
            config();
            $.get(global_config.template, { stamp: Math.random() + 1 }, function (response) {
                $(global_config.wrapper).append(response);
                var _req = myrequest.getrequest();
                var _url = _req.tourl(global_config.sr_iframe);
                $(global_config.wrapper).find(global_config.iframe).attr("src", _url);
                IframeUtil.refreshParent("iframe_deliveryrecord");
            });
        });
    }
    return {
        show: show
    }
});