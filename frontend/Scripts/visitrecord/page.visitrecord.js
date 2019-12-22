define(function () {
    function show() {
        require(['jquery',"web_global"], function () {
            $(function () {
                $("#mod_wrapper").load(webglobal.templates.mod_visitrecord, function (response) { });
            });
        });
    }
    return { show: show }
});

