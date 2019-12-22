define(function () {
    function show() {
        require(["tmpl", "jquery", "web_global", "common"], function () {
            $.getJSON(webglobal.jsons.navigation, "", function (data) {
                //初始化选中模式
                var pathname = window.location.pathname;
                
                $.each(data, function (index, item) {
                    if (pathname.indexOf(item.href) != -1) {
                        item.btnchecked = "btn_checked";
                    }
                    else { item.btnchecked = ""; }

                    item.href = myrequest.tourl(item.href);
                });
                
                //template
                var template = $("#navigation_template").html();
                $.template("myTemplate", template);
                //render
                $("#navigation_wrapper").html($.tmpl("myTemplate", data));
                loadnav();
            });
        });
    }
    function loadnav() {
        
        var hasfile;
        require(["share_services", "base_usercontrol", "tmpl", "jquery", "common", "jextend", "web_global", "easyui"], function (s, b) {
            var web_list_callback = function (data) {
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {
                    var mydata = data.info;
                    hasfile= mydata.hasfile;
                }
            };
            //获取参数
            var _req = myrequest.getrequest();
            var dictionary = new myextend.Dictionary();

            myextend.ajaxGet_simple(webglobal.services.GetJDXX, dictionary, web_list_callback, true);
        });
        ButtonEnableVisible(true, true, "pregnantinfo");
        ButtonEnableVisible(true, true, "operativerecord");
        ButtonEnableVisible(true, true, "followupvisit");
    }
    function ButtonEnableVisible(vs, enabled, id) {
        if (!enabled) {
            $("#" + id).attr( "disabled", "disabled" );
            $("#" + id).addClass("btn-flat-gray");
            $("#" + id).css("pointer-events", "none");
        }
        else {
            $("#" + id).removeAttr("disabled", "none");
            $("#" + id).removeClass("btn-flat-gray");
            $("#" + id).css("pointer-events", "auto");
        }
        if (!vs)
            $("#" + id).css("display","none");
        else
            $("#" + id).show();
    }
    return {
        show: show
    }
});