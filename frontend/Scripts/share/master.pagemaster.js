define(function () {

    function show() {
        require(['jquery', "web_global"], function () {
            $(function () {
                SetSkin();
                $("#header").load(webglobal.templates.header, function (response) { });
                $("#navigation").load(webglobal.templates.navigation, function (response) { });
                $("#bottom").load(webglobal.templates.bottom, function (response) { });
                $("#masterisktip").load(webglobal.templates.mod_mostrisktip, function (response) { });
            });
        });
    }

    /*设置皮肤*/
    function SetSkin() {
        require(['jquery', 'cookie', 'jextend', "web_global"], function () {
            var skin_wrapper = $("#link_skin");
           
            if (myextend.isNull(skin_wrapper)) return;

            var skin = $.cookie(webglobal.cookies.skin);
            // skin="skin_green";
            if (!myextend.isNull(skin)) {
                skin_wrapper.attr("href", webglobal.styles.basepath + skin + ".css");
                return;
            }
            //加载皮肤
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    skin_wrapper.attr("href", webglobal.styles.basepath + data.info.skin + ".css");
                    $.cookie(webglobal.cookies.skin, data.skin);
                }
            };
            // myextend.ajaxPost(webglobal.services.GetSkin, "", web_list_callback, null, null, null, true);
            myextend.ajaxGet(webglobal.services.GetSkin, "", web_list_callback, null, null, null, true);
        });
    }
    return {
        show: show,
        SetSkin: SetSkin
    }
});

