define(function () {

    function show() {
        require(["web_global", "common", "jextend","jquery"], function () {
            //获取参数
            var _req = myrequest.getrequest();

            var web_list_callback = function (data) {
                $("#masterrisk").hide();
                $("#link_pregnantsummary").hide();
                if (data == null || data == undefined) return;
                if (data.result == webglobal.enum_const.service_result_success) {

                    if (data.info.tips != null && data.info.tips != undefined && data.info.tips != "") {
                        $("#masterrisktip_tips").html(data.info.tips);
                        $("#masterrisk").show();
                    }
                    if (data.info.myid > 0) {
                        var baseurl = webglobal.pages.Page_PregnantSummary;
                        var jobnumber = _req.jobnumber;
                        var shenfenzh = data.info.idcard;
                        baseurl = myextend.UrlUpdateParams(baseurl, "mostrisktipid", "'" + data.info.myid + "'", true);

                        if (!myextend.isNull(jobnumber)) baseurl = myextend.UrlUpdateParams(baseurl, "jobnumber", "'" + jobnumber + "'", true);
                        if (!myextend.isNull(shenfenzh)) baseurl = myextend.UrlUpdateParams(baseurl, "idcard", "'" + shenfenzh + "'", true);
                        $("#link_pregnantsummary").unbind("click").on("click", function () {
                            treat(data.info.myid, show);
                        });
                        $("#link_pregnantsummary").attr("href", baseurl);
                        $("#link_pregnantsummary").show();

                    }
                }
            };
            var dictionary = new myextend.Dictionary();
            dictionary.set("bingrenid", _req.bingrenid);
            dictionary.set("shenfenzh", _req.shenfenzh);
            dictionary.set("jobnumber", _req.jobnumber);
            dictionary.set("bingrenxm", _req.bingrenxm);
            dictionary.set("jiuzhenid", _req.jiuzhenid);
            dictionary.set("jigoudm", _req.jigoudm);

            //myextend.ajaxPost_simple(webglobal.services.GetMasterRiskTip, dictionary, web_list_callback, true);
            myextend.ajaxGet_simple(webglobal.services.GetMasterRiskTip, dictionary, web_list_callback, true);
        });
    }
    function treat(id, success_callback) {
        var web_list_callback = function (data) {
            if (data == null || data == undefined) return;
            if (data.result == webglobal.enum_const.service_result_success) {
                if (success_callback != null && success_callback != undefined)
                    success_callback();
            }
        };
        //获取参数
        var _req = myrequest.getrequest();

        var dictionary = new myextend.Dictionary();
        dictionary.set("jobnumber", _req.jobnumber);
        dictionary.set("id", id);

        myextend.ajaxPost_simple(webglobal.services.TreatMostRisk, dictionary, web_list_callback, true);
       
    }
    return {
        show: show,
        treat: treat
    }
});

