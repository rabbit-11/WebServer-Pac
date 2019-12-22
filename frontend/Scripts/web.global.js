var webglobal = {
    cookies: {
        "skin": "myskin",
        "vismode": "vismode"
    },
    styles: {
        "basepath": "../Styles/"
    },
    templates:
        {
            "norecord": "../Templates/share/template_mod_norecord.htm",

            "head": "../Templates/share/template_mod_head.htm",
            "header": "../Templates/share/template_mod_header.htm",
            "bottom": "../Templates/share/template_mod_bottom.htm",
            "navigation": "../Templates/share/template_mod_navigation.htm",

            "labcheck_28_before": "../Templates/labcheck/template_mod_labcheck_28_before.htm",
            "labcheck_28_36": "../Templates/labcheck/template_mod_labcheck_28_36.htm",
            "labcheck_36_after": "../Templates/labcheck/template_mod_labcheck_36_after.htm",
            "mod_labcheck_max": "../Templates/labcheck/template_mod_labcheck_max.htm",
            "mod_labcheck_min": "../Templates/labcheck/template_mod_labcheck_min.htm",
            "mod_labcheck":"../Templates/labcheck/template_mod_labcheck.htm",
            "mod_labcheck_other":"../Templates/labcheck/template_mod_labcheck_other.htm",

            "mod_visitrecord": "../Templates/visitrecord/template_mod_visitrecord.htm",
            "one_visitrecord": "../Templates/visitrecord/template_mod_one_visitrecord.htm",
            "one_visitrecord_summary": "../Templates/visitrecord/template_mod_one_visitrecord_summary.htm",
            "one_visitrecord_detail": "../Templates/visitrecord/template_mod_one_visitrecord_detail.htm",
            "list_visitrecord": "../Templates/visitrecord/template_mod_list_visitrecord.htm",

            "mod_multifetal": "../Templates/multifetal/template_mod_multifetal.htm",
            "mod_multifetal_prediagnosis": "../Templates/multifetal/template_mod_multifetal_prediagnosis.htm",
            "mod_multifetal_emerprediagnosis": "../Templates/multifetal/template_mod_multifetal_emerprediagnosis.htm",
            "list_multifetal": "../Templates/multifetal/template_mod_list_multifetal.htm",

            "mod_pregnantinfo_detail": "../Templates/pregnantinfo/template_mod_pregnantinfo_detail.htm",
            "mod_pregnantinfo_summary": "../Templates/pregnantinfo/template_mod_pregnantinfo_summary.htm",

            "mod_operativerecord_detail": "../Templates/operativerecord/template_mod_operativerecord_detail.htm",
            
            "mod_followupvisit_detail": "../Templates/followupvisit/template_mod_followupvisit_detail.htm",

            "mod_pregnanthistory": "../Templates/pregnanthistory/template_mod_pregnanthistory.htm",

            "list_postnatalrecord":"../Templates/postnatalvisitrecord/template_mod_list_postnatalrecord.htm",
            "mod_postnatalrecord": "../Templates/postnatalvisitrecord/template_mod_postnatalrecord.htm",

            "mod_chufang": "../Templates/chufang/template_mod_chufang.htm",
            "mod_examorder": "../Templates/examorder/template_mod_examorder.htm",
            "mod_laborder": "../Templates/laborder/template_mod_laborder.htm",

            "mod_guahaoxx": "../Templates/guahaoxx/template_mod_guahaoxx.htm",
            "mod_prediagnosis": "../Templates/prediagnosis/template_mod_prediagnosis.htm",
            "mod_highrisk": "../Templates/highrisk/template_mod_highrisk.htm",
            "mod_diagnosis": "../Templates/diagnosis/template_mod_diagnosis.htm",

            "mod_list_model": "../Templates/personalmodel/template_mod_list_model.htm",
            "mod_one_model": "../Templates/personalmodel/template_mod_one_model.htm",
            "mod_one_personalmodel":"../Templates/personalmodel/template_mod_one_model.htm",

            "mod_chanyongzd":"../Templates/changyongzd/template_mod_chanyongzd.htm",
            "mod_monitor":"../Templates/monitor/template_mod_monitor.htm",
            "mod_mostrisktip":"../Templates/share/template_mod_mostrisktip.htm",
            "mod_list_mostrisk":"../Templates/mostrisk/template_mod_list_mostrisk.htm",
            "mod_pregnantsummary":"../Templates/pregnantsummary/template_mod_pregnantsummary.htm",
            "laborder_summary":"../Templates/laborder/template_mod_laborder_summary.htm",

            "mod_pregnantlist":"../Templates/pregnantlist/template_mod_pregnantlist.htm",
            "mod_fixidcard":"../Templates/fixidcard/template_mod_fixidcard.htm",
            "mod_importlaborder":"../Templates/laborder/template_mod_laborder_import.htm",
            "mod_importexamorder":"../Templates/examorder/template_mod_examorder_import.htm",
            "mod_pregnantinfo_simple":"../Templates/pregnantinfo/template_mod_pregnantinfo_simple.htm",
            "mod_userlogin":"../Templates/userlogin/template_mod_userlogin.htm"  ,
            "mod_hosent":"../Templates/userlogin/template_mod_hosent.htm",
            "mod_list_highriskvisit": "../Templates/highriskvisit/template_mod_list_highriskvisit.htm",
            "mod_one_highriskvisit": "../Templates/highriskvisit/template_mod_one_highriskvisit.htm",
            "mod_one_filed": "../Templates/filed/template_mod_one_filed.htm",
            "mod_list_overvisit": "../Templates/overvisit/template_mod_list_overvisit.htm",

            "mod_emerprediagnosis": "../Templates/emerprediagnosis/template_mod_emerprediagnosis.htm",
            "mod_specialeva": "../Templates/specialeva/template_mod_specialeva.htm",
            "mod_bscan": "../Templates/bscanmeasurement/template_mod_bscan.htm",

            "mod_firstrecord": "../Templates/firstrecord/template_mod_firstrecord.htm",
            "mod_exam": "../Templates/exam/template_mod_exam.htm",
            "mod_pregnancyhistory": "../Templates/pregnancyhistory/template_mod_pregnancyhistory.htm",
            "mod_highriskhistory": "../Templates/highrisk/template_mod_highriskhistory.htm",

            "mod_precheckrequest": "../Templates/precheckrequest/template_mod_precheckrequest.htm",
            "one_precheckrequest": "../Templates/precheckrequest/template_mod_one_precheckrequest.htm",
            "one_precheckrequest_summary": "../Templates/precheckrequest/template_mod_one_precheckrequest_summary.htm",
            "one_precheckrequest_detail": "../Templates/precheckrequest/template_mod_one_precheckrequest_detail.htm",
            "list_precheckrequest": "../Templates/precheckrequest/template_mod_list_precheckrequest.htm",

            "mod_deliveryrecord": "../Templates/deliveryrecord/template_mod_deliveryrecord.htm",
        },
    services:
        {
            "GetSkin": "../Services/ConfigService/GetSkin.json",
            "QueryHighRisk":"../Services/ConfigService.asmx/QueryHighRisk",
            "GetHosList":"../Services/ConfigService.asmx/GetHosList",

            "GetPregnantInfo": "../Services/PregnantInfoService/GetPregnantInfo.json",
            "ExistPregnantInfo": "../Services/PregnantInfoService/ExistPregnantInfo.json",
            "ExistOperativeRecord": "../Services/PregnantInfoService/ExistOperativeRecord.json",
            "SavePregnantInfo":"http://localhost:8089/api/pac/firstVisit/add",
            "EndPregnantInfo":"../Services/PregnantInfoService.asmx/Close",
            "GetSelfPregnantInfo":"../Services/PregnantInfoService/GetSelf.json",

            "PostReturnVisit":"http://localhost:8089/api/pac/returnVisit/showList",

            "BulitKcal":"../Services/BuiltKcalService.asmx/BulitKcal",
            "QueryKcal":"../Services/BuiltKcalService.asmx/QueryKcal",

            "GetPersonalGuide":"../Services/PersonalModelService.asmx/GetPersonalGuide",
            "GetDefaultGuide":"../Services/PersonalModelService.asmx/GetDefaultGuide",

            "GetChuFang":"../Services/ChuFangService.asmx/GetChuFang",

            "GetExamOrder":"../Services/ExamOrderService.asmx/GetExamOrder",

            "GetLabOrder":"../Services/LabOrderService.asmx/GetLabOrder",

            "GetVisitRecordList":"../Services/VisitRecordService.asmx/GetVisitRecordList",
            "GetOneVisitRecord":"../Services/VisitRecordService.asmx/GetOneVisitRecord",
            "GetEmptyVisitRecord_Normal":"../Services/VisitRecordService.asmx/GetEmptyVisitRecord_Normal",
            "GetEmptyVisitRecord_Diagnosis":"../Services/VisitRecordService.asmx/GetEmptyVisitRecord_Diagnosis",
            "GetEmptyVisitRecord_HighRisk":"../Services/VisitRecordService.asmx/GetEmptyVisitRecord_HighRisk",
            "GetEmptyVisitRecord_LabOrder":"../Services/VisitRecordService.asmx/GetEmptyVisitRecord_LabOrder",
            "GetEmptyVisitRecord_ExamOrder":"../Services/VisitRecordService.asmx/GetEmptyVisitRecord_ExamOrder",
            "GetEmptyVisitRecord_ChuFang":"../Services/VisitRecordService.asmx/GetEmptyVisitRecord_ChuFang",
            "GetEmptyVisitRecord_PreDiagnosis":"../Services/VisitRecordService.asmx/GetEmptyVisitRecord_PreDiagnosis",
            "GetVisitRecord_RealTimeData":"../Services/VisitRecordService.asmx/GetRealTimeData",
            "SaveVisitRecord":"../Services/VisitRecordService.asmx/AddOrUpdate",
            "DelVisitRecord":"../Services/VisitRecordService.asmx/Delete",
            "GetTransferHighRisk":"../Services/VisitRecordService.asmx/GetTransferHighRisk",
            "GetFollowupCount":"../Services/VisitRecordService.asmx/GetFollowupCount",
            "GetMultiFetal":"../Services/VisitRecordService.asmx/GetMultiFetal",
            "UpdateHighRisk":"../Services/VisitRecordService.asmx/UpdateHighRisk",
            "GetVisitRecordList_1": "../Services/VisitRecordService.asmx/GetVisitRecordList_1",

            //"GetGuaHaoXXList":"../Services/GuaHaoXXService.asmx/GetGuaHaoXXList",
            "GetGuaHaoXXList":"../Services/GuaHaoXXService/GetGuaHaoXXList.json",       //用于抽取页面
            "GetOneGuaHaoXX":"../Services/GuaHaoXXService.asmx/GetOneGuaHaoXX",
            "GetOnePregnantInfo":"../Services/GuaHaoXXService.asmx/GetOnePregnantInfo",

            "GetOnePreDiagnosis":"../Services/PreDiagnosisService.asmx/GetOnePreDiagnosis",
            "SavePreDiagnosis":"../Services/PreDiagnosisService.asmx/AddOrUpdate",

            // "GetPersonalGuideTypeList":"../Services/PersonalModelService.asmx/GetPersonalGuideTypeList",
            // "GetPersonalGuideList":"../Services/PersonalModelService.asmx/GetPersonalGuideList",
            // "GetOnePersonalGuide":"../Services/PersonalModelService.asmx/GetOnePersonalGuide",
            "GetPersonalGuideTypeList":"../Services/PersonalModelService/GetPersonalGuideTypeList.json", 
            "GetPersonalGuideList":"../Services/PersonalModelService/GetPersonalGuideList.json",
            "GetOnePersonalGuide":"../Services/PersonalModelService/GetOnePersonalGuide.json",
            "SavePersonalModel":"../Services/PersonalModelService.asmx/AddOrUpdate",
            "DeletePersonalModel":"../Services/PersonalModelService.asmx/Delete",
            "ReorderPersonalModel":"../Services/PersonalModelService.asmx/Reorder",

            "GetChangYongZD":"../Services/ChangYongZDService.asmx/GetChangYongZD",
            "QueryJiBing":"../Services/ChangYongZDService.asmx/GetJiBing",
            "SaveChangYongZD":"../Services/ChangYongZDService.asmx/SaveChangYongZD",

            "GetDP":"../Services/MonitorService.asmx/GetDP",
            "GetWeight":"../Services/MonitorService.asmx/GetWeight",
            "GetHeightfundusuterus":"../Services/MonitorService.asmx/GetHeightfundusuterus",
            "GetBScanMeasurement":"../Services/MonitorService.asmx/GetBScanMeasurement",
            "GetHeartRate":"../Services/MonitorService.asmx/GetHeartRate",
            "SaveMonitorData":"../Services/MonitorService.asmx/AddOrUpdate",

            "GetTodayPreDiagnosis":"../Services/ShareService/GetTodayPreDiagnosis.json",
            "GetNavigationStatus":"../Services/ShareService/GetNavigationStatus.json",
            "GetJiBing":"../Services/ShareService.asmx/GetJiBing",
            "GetNormalDiagnosis":"../Services/ShareService.asmx/GetNormalDiagnosis",
            "GetMasterRiskTip":"../Services/ShareService/GetMasterRiskTip.json",
            "GetJDXX_1": "../Services/ShareService.asmx/GetJDXX_1",
            "GetJDXX": "../Services/ShareService/GetJDXX.json",
            "GetTodaySuggestion":"../Services/ShareService.asmx/GetSuggestion",
            "GetRefreshDiagnosis":"../Services/ShareService.asmx/GetRefreshDiagnosis",

            "Print":"../Services/PrintService.asmx/Print",
            "GetPrintType": "../Services/PrintService.asmx/GetPrintType",
            "PrintCompletePreg": "../Services/PrintService.asmx/PrintCompletePreg",
//        "GetEChartBase64": "../Services/PrintService.asmx/GetEChartBase64",

        "GetProcessedList": "../Services/MostRiskService.asmx/GetProcessedList",
        "GetPendingList": "../Services/MostRiskService.asmx/GetPendingList",
        "TreatMostRisk": "../Services/MostRiskService.asmx/Treat",
        "GetOneMostRisk":"../Services/MostRiskService.asmx/GetOne",

        "GetPostnatal42dayRecordList": "../Services/Postnatal42dayRecordService.asmx/GetPostnatal42dayRecordList",
        "GetOnePostnatal42dayRecord": "../Services/Postnatal42dayRecordService.asmx/GetOnePostnatal42dayRecord",
        "GetEmptyPostnatal42dayRecord_Normal":"../Services/Postnatal42dayRecordService.asmx/GetEmptyPostnatal42dayRecord_Normal",
        "GetEmptyPostnatal42dayRecord_Diagnosis":"../Services/Postnatal42dayRecordService.asmx/GetEmptyPostnatal42dayRecord_Diagnosis",
        "GetEmptyPostnatal42dayRecord_LabOrder":"../Services/Postnatal42dayRecordService.asmx/GetEmptyPostnatal42dayRecord_LabOrder",
        "GetEmptyPostnatal42dayRecord_ExamOrder":"../Services/Postnatal42dayRecordService.asmx/GetEmptyPostnatal42dayRecord_ExamOrder",
        "GetEmptyPostnatal42dayRecord_ChuFang":"../Services/Postnatal42dayRecordService.asmx/GetEmptyPostnatal42dayRecord_ChuFang",
        "SavePostnaltalVisitRecord":"../Services/Postnatal42dayRecordService.asmx/AddOrUpdate",
        "DelPostnatal42dayRecord":"../Services/Postnatal42dayRecordService.asmx/Delete",
        "GetPostnatal42dayRecord_RealTimeData":"../Services/Postnatal42dayRecordService.asmx/GetRealTimeData",

        "SaveLabCheck":"../Services/LabCheckService.asmx/AddOrUpdate",
        "GetEmptyLabCheck":"../Services/LabCheckService.asmx/GetEmpty",
        "ImportLabCheck":"../Services/LabCheckService.asmx/Import",
        "GetLabCheck":"../Services/LabCheckService.asmx/GetLabCheck",

        "GetPregnantList":"../Services/PregnantListService.asmx/GetPregnantList",

        "SyncOneType":"../Services/SyncService.asmx/SyncOneType",
        "SyncLog":"../Services/SyncService.asmx/SyncLog",
        "QueryLog":"../Services/SyncService.asmx/QueryLog",
        "FixIdcard":"../Services/FixIdcardService.asmx/FixIdcard",

        "GetLabOrder_Import":"../Services/LabOrderService.asmx/GetLabOrder_Import",
        "GetExamOrder_Import":"../Services/ExamOrderService.asmx/GetExamOrder_Import",
        "GetExamOrder_OneImport":"../Services/ExamOrderService.asmx/GetExamOrder_OneImport",

        "GetLabOrder_OneImport":"../Services/LabOrderService.asmx/GetLabOrder_OneImport",

        /****外部服务******/
        "DownloadCompletePreg": "../../DownService/Services/PrintService.asmx/DownloadCompletePreg",
        "ESBSync": "../../ESBService/SyncService.asmx/Sync",
        "NeedHighRiskReport": "../../RC/Services/ReportCard_HighRiskService.asmx/NeedReport",
        "DRSync": "../../DR/Services/SyncService.asmx/SyncOneType",
        /****外部服务******/
        // "GetKeShiList":"../Services/LoginService.asmx/GetKeShiList",
        "GetKeShiList":"../Services/LoginService/GetKeShiList.json",     //用于抽取页面用
        "GetZhiGongXX":"../Services/LoginService.asmx/GetZhiGongXX",
        "CheckLogin":"../Services/LoginService.asmx/CheckLogin",

        "GetOneChaseVisitRecord":"../Services/HighRiskVisitService.asmx/GetOneChaseVisitRecord",
        "SaveChaseVisitRecord":"../Services/HighRiskVisitService.asmx/AddOrUpdate",
        "GetHighRiskVisitList":"../Services/HighRiskVisitService.asmx/GetHighRiskVisitList",
        // "GetHighRiskRating":"../Services/ConfigService.asmx/HighRiskDic?q=highriskrating",
        "GetHighRiskRating":"../Services/ConfigService/HighRiskDic.json",

        "GetFiledTime":"../Services/FiledService.asmx/GetFiledTime",
        "SaveFiledTime":"../Services/FiledService.asmx/AddOrUpdate",

        "GetOneEmerPreDiagnosis":"../Services/EmerPreDiagnosisService.asmx/GetOnePreDiagnosis",
        "SaveEmerPreDiagnosis":"../Services/EmerPreDiagnosisService.asmx/AddOrUpdate",
        "GetOutComeTime":"../Services/EmerPreDiagnosisService.asmx/GetOutComeTime",
        //"GetGuaHaoType":"../Services/GuaHaoXXService.asmx/GetGuaHaoType",
        "GetGuaHaoType":"../Services/GuaHaoXXService/GetGuaHaoType.json",   //用于抽取页面


        "GetOneSpecialEva":"../Services/SpecialEvaService.asmx/GetOneSpecialEva",
        "SaveSpecialEva":"../Services/SpecialEvaService.asmx/AddOrUpdate",

        "GetBScanList":"../Services/BScanService.asmx/GetList",
        "SaveBScan":"../Services/BScanService.asmx/AddOrUpdate",
        "DelBScan":"../Services/BScanService.asmx/Delete",

        "GetOneFirstRecord": "../Services/FirstRecordService.asmx/GetOneFirstRecord",
        "SaveFirstRecord":"../Services/FirstRecordService.asmx/AddOrUpdate",
        "DelFirstRecord":"../Services/FirstRecordService.asmx/Delete",
        "UpdateFirstHighRisk":"../Services/FirstRecordService.asmx/UpdateHighRisk",
        "GetFirstRecord_RealTimeData":"../Services/FirstRecordService.asmx/GetRealTimeData",

        "GetCheckWeekDay":"../Services/ShareService.asmx/GetCheckWeekDay",

        "GetOneExam": "../Services/ExamService.asmx/GetOneExam",
        "ImportExam": "../Services/ExamService.asmx/ImportExam",
        "SaveExam":"../Services/ExamService.asmx/AddOrUpdate",
        "DelExam":"../Services/ExamService.asmx/Delete",

        "GetOnePregnancyHistory": "../Services/PregnancyHistoryService.asmx/GetOne",
        "GetListPregnancyHistory": "../Services/PregnancyHistoryService.asmx/GetList",
        "SavePregnancyHistory":"../Services/PregnancyHistoryService.asmx/AddOrUpdate",
        "DelPregnancyHistory":"../Services/PregnancyHistoryService.asmx/Delete",

        "ListHighRiskReason":"../Services/HighRiskService/List.json",
        "AddHighRiskReasonException":"../Services/HighRiskService.asmx/AddException",

        "GetPreCheckRequestList":"../Services/PreCheckRequestService.asmx/List",
        "GetOnePreCheckRequest":"../Services/PreCheckRequestService.asmx/One",
        "GetEmptyPreCheckRequest_Normal":"../Services/PreCheckRequestService.asmx/Empty_Normal",
        "GetEmptyPreCheckRequest_LabOrder":"../Services/PreCheckRequestService.asmx/Empty_LabOrder",
        "SavePreCheckRequest":"../Services/PreCheckRequestService.asmx/AddOrUpdate",
        "DelPreCheckRequest":"../Services/PreCheckRequestService.asmx/Delete",

        "AddCacheRecord":"../Services/CacheRecordService.asmx/AddOrUpdate",
        "GetCacheType":"../Services/CacheRecordService.asmx/GetCacheType",
        "ClearCacheRecord":"../Services/CacheRecordService.asmx/Delete"
    },
    jsons: {
        "navigation": "../Configs/json_navigation.json",
        "settings": "../Configs/json_settings.json",
        "highrisklevel": "../Configs/json_highrisklevel.json",
        "diagnosistype": "../Configs/json_diagnosistype.json",
        "diagnosisconfirm": "../Configs/json_diagnosisconfirm.json",
        "shifou":"../Configs/json_shifou.json"
    },
    pages:{
        "Page_PreDiagnosis":"../Page/Page_PreDiagnosis.aspx",
        "YUNCHANFDL":"../Page/YUNCHANFDL.aspx",
        "Page_PregnantSummary":"../Page/PregnantSummary.aspx",
        "Page_AfterLogin":"../Page/Page_AfterLogin.aspx",
        "Page_PreLogin":"../Page/Page_PreLogin.aspx",
        "Page_FixIdcard":"../Page/Page_FixIdcard.aspx",
        "Page_GuaHaoXX":"../Page/Page_GuaHaoXX.aspx",
        "Page_HighRiskVisit":"../Page/Page_HighRiskVisit.aspx",
        "Page_UserLogin":"../Page/Page_UserLogin.aspx",
        "Page_EmerPreDiagnosis":"../Page/Page_EmerPreDiagnosis.aspx",
        "Page_SpecialEva":"../Page/Page_SpecialEva.aspx",
        "Page_BScan":"../Page/Page_BScan.aspx",
        "RC_YUNCHANFDL":"../../RC/Page/YUNCHANFDL.aspx",
        "Page_ReportCard_HighRisk_Simple":"../../RC/Page/Page_ReportCard_HighRisk_Simple.aspx",
        "Page_ReportCard_HighRisk_More":"../../RC/Page/Page_ReportCard_HighRisk_More.aspx",
        "Page_DiffList":"../Page/Page_DiffList.aspx",
        "Page_Iframe":"../Page/Page_Iframe.aspx",

        /*外部地址*/
        "Page_DeliveryRecord":"../../DR/Page/Page_DeliveryEnt.aspx"
    },
    enum_const: {
        "service_result_success":"1",
        "service_result_fail":"0"
    },
    enum_mod: {
        "add": "add",
        "edit": "edit",
        "view": "view"
    },
    enum_printtype:
        {
            visitrecord:"visitrecord",
            postnatalvisitrecord:"postnatalvisitrecord",
            pregnantinfo:"pregnantinfo",
            builtkcal:"builtkcal",
            emerprediagnosis:"emerprediagnosis",
            firstrecord:"firstrecord",
            precheckrequest:"precheckrequest"
        },
    enum_difftype:
        {
            visitrecord:"visitrecord",
            postnatalrecord:"postnatalrecord",
            pregnantinfo:"pregnantinfo",
            firstrecord:"firstrecord",
            precheckrequest:"precheckrequest"
        },
    enum_keshitype:
        {
            custom:0,
            emergency:1
        },
    conf:{
        whitedoctorid:"99999"
    },
    enum_sourcetype:
        {
            userlogin:"1"
        },
    enum_rc_ptype:
        {
            reportcard_highrisk_more:3,
            reportcard_highrisk_simple:4
        },
    enum_cachetype:
        {
            visitrecord:"visitrecord",
            postnatalrecord:"postnatalrecord",
            pregnantinfo:"pregnantinfo",
            firstrecord:"firstrecord",
            precheckrequest:"precheckrequest"
        }
};