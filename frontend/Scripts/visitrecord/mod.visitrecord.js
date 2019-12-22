define(function () {
    function show() {
        require(['jquery', 'cookie', "common"], function () {
            $(function () {
                var vismode = GetVisMode();
                ChangeVisMode(vismode);
            });
        });
    }
    function GetVisModeCookie() {
        return $.cookie(webglobal.cookies.vismode);
    }
    function SetVisModeCookie(val) {
        $.cookie(webglobal.cookies.vismode, val);
    }
    function GetVisMode() {
        return GetVisModeCookie() == "max" ? "max" : "min";
    }
    function MaxVisMode() {
        ChangeVisMode("max");
    }
    function MinVisMode() {
        ChangeVisMode("min");
    }
    function ChangeVisMode(vismode) {
        SetVisModeCookie(vismode);

        //左边栏
        if (vismode == "max") {
            require(["mod_labcheck_max"], function (a) { a.bind(); });
        }
        else {
            require(["mod_labcheck_min"], function (a) { a.bind(); });
        }
        //右边内容
        $("#list_visitrecord_wrapper").load(webglobal.templates.list_visitrecord, function (response) {
            require(["list_visitrecord"], function (a) {
                var _req = myrequest.getrequest();
                a.bind(!_req.isInWhite()&& _req.isCanEdit(),false);
            });
        });
    }
    return {
        show: show
    }
});
