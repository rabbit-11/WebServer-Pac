//require配置
require.config({
    baseUrl: '../Scripts',
    urlArgs: 'ver=4.5',
    paths: {
        jquery: 'common/jquery-1.12.4',
        cookie: 'common/jquery.cookie',
        tmpl: 'common/jquery.tmpl.min',
        easyui: 'common/jquery.easyui.min',
        edatagrid: 'common/jquery.edatagrid',
        locale: "locale/easyui-lang-zh_CN",
        thread: 'common/Concurrent.Thread',
        datagrid_dnd: 'common/datagrid-dnd',
        datagrid_detailview :'common/datagrid-detailview',
        lodop_extend: '../Lodop/LodopCommonFunc',
        lodop: '../Lodop/LodopFuncs',

        jextend: 'common/jquery.extend',
        common: 'common/base.common',
        base_usercontrol: 'common/base.usercontrolbase',
        easyuiextend: 'common/easyui-extend',
//        easyuivalidator: 'common/easyui-validator',
        html2canvas: 'html2pdf/pdf.html2canvas',
        jspdf: 'html2pdf/jspdf.debug',

        web_global: 'web.global',

        pagemaster: 'share/master.pagemaster',
        head: 'share/mod.head',
        header: 'share/mod.header',
        navigation: 'share/mod.navigation',
        
        page_visitrecord: 'visitrecord/page.visitrecord',
        mod_visitrecord: 'visitrecord/mod.visitrecord',
        list_visitrecord: 'visitrecord/mod.list.visitrecord',
        mod_onevisitrecord: 'visitrecord/mod.one.visitrecord',
        mod_onevisitrecord_summary: 'visitrecord/mod.one.visitrecord.summary',
        mod_onevisitrecord_detail: 'visitrecord/mod.one.visitrecord.detail',

        mod_labcheck_min: 'labcheck/mod.labcheck.min',
        mod_labcheck_max: 'labcheck/mod.labcheck.max',

        mod_multifetal: 'multifetal/mod.multifetal',
        mod_multifetal_prediagnosis: 'multifetal/mod.multifetal.prediagnosis',
        mod_multifetal_emerprediagnosis: 'multifetal/mod.multifetal.emerprediagnosis',

        list_multifetal: 'multifetal/mod.list.multifetal',
        page_fetal: 'multifetal/page.fetal',

        mod_pregnantinfo_summary: 'pregnantinfo/mod.pregnantinfo.summary',
        mod_pregnantinfo_detail: 'pregnantinfo/mod.pregnantinfo.detail',
        page_pregnantinfo: 'pregnantinfo/page.pregnantinfo',
        page_operativerecord: 'operativerecord/page.operativerecord',
        mod_operativerecord_detail: 'operativerecord/mod.operativerecord.detail',
        page_followupvisit: 'followupvisit/page.followupvisit',
        mod_followupvisit_detail: 'followupvisit/mod.followupvisit.detail',

        mod_pregnanthistory: 'pregnanthistory/mod.pregnanthistory',

        mod_postnatalrecord: 'postnatalrecord/mod.postnatalrecord',
        page_postnatalrecord: 'postnatalrecord/page.postnatalrecord',

        page_chufang: 'chufang/page.chufang',
        page_examorder: 'examorder/page.examorder',
        page_examorder_import: 'examorder/page.examorder.import',
        page_laborder: 'laborder/page.laborder',
        page_laborder_import: 'laborder/page.laborder.import',

        page_guahaoxx: 'guahaoxx/page.guahaoxx',
        page_prediagnosis: 'prediagnosis/page.prediagnosis',
        page_highrisk: 'highrisk/page.highrisk',
        share_services: 'share/share.services',
        page_diagnosis: 'diagnosis/page.diagnosis',
        page_personalmodel: 'personalmodel/page.personalmodel',
        page_one_personalmodel: 'personalmodel/page.one.personalmodel',
        page_changyongzd: 'changyongzd/page.changyongzd',
        page_monitor: 'monitor/page.monitor',
        echarts: 'echarts/echarts.min',
        mostrisktip: 'share/mod.mostrisktip',
        page_mostrisk: 'mostrisk/page.mostrisk',
        page_pregnantsummary: 'pregnantsummary/page.pregnantsummary',

        share_diagnosis: 'share/share.diagnosis',
        laborder_sumamry: 'laborder/mod.laborder.summary',
        mod_labcheck: 'labcheck/mod.labcheck',
        page_labcheck: 'labcheck/page.labcheck',
        share_labcheck: 'labcheck/share.labcheck',
        page_pregnantlist: 'pregnantlist/page.pregnantlist',
        page_prelogin: 'prelogin/page.prelogin',
        page_fixidcard: 'fixidcard/page.fixidcard',
        page_pregnantinfo_simple: 'pregnantinfo/page.pregnantinfo.simple',
        share_highrisk: 'share/share.highrisk',
        page_userlogin: 'userlogin/page.userlogin',
        page_hosent: 'userlogin/page.hosent',
        page_highriskvisit: 'highriskvisit/page.highriskvisit',
        page_one_highriskvisit: 'highriskvisit/page.one.highriskvisit',
        page_filed: 'filed/page.filed',
        page_emerprediagnosis: 'emerprediagnosis/page.emerprediagnosis',
        page_specialeva: 'specialeva/page.specialeva',
        page_bscan: 'bscanmeasurement/page.bscan',
        page_firstrecord: 'firstrecord/page.firstrecord',
        share_model:'share/share.model',
        page_exam: 'exam/page.exam',
        page_pregnancyhistory: 'pregnancyhistory/mod.pregnancyhistory',

        page_highriskhistory: 'highrisk/page.highriskhistory',

        list_model: 'share_list/mod.list.model',
        mod_onemodel: 'share_list/mod.one.model',
        mod_onemodel_summary: 'share_list/mod.one.model.summary',
        mod_onemodel_detail: 'share_list/mod.one.model.detail',

        page_screeningdiagnosis: 'screeningdiagnosis/page.screeningdiagnosis',
        mod_precheckrequest: 'precheckrequest/mod.precheckrequest',
        page_union: 'union/page.union',
        page_deliveryrecord: 'deliveryrecord/page.deliveryrecord'
        
    },
    shim: {
        'jextend': {
            deps: ['jquery']
        },
        'common': {
            deps: ['jquery', 'jextend', 'easyui']
        },
        'easyui': {
            deps: ['jquery']
        },
        'edatagrid': {
            deps: ['jquery', 'easyui']
        },
        'tmpl': {
            deps: ['jquery']
        },
        'cookie': {
            deps: ['jquery']
        },
        'locale': {
            deps: ['jquery', 'easyui', 'edatagrid']
        },
        'base_usercontrol': {
            deps: ["jquery"]
        },
        "easyuiextend": {
            deps: ["jquery", 'easyui', 'edatagrid']
        },
        "datagrid_dnd": {
            deps: ["jquery", 'easyui', 'edatagrid']
        },
        "lodop_extend": {
            deps: ["jquery", 'lodop']
        },
         "thread": {
            deps: ["echarts"]
        },
        "datagrid_detailview":{
            deps: ["jquery", 'easyui', 'edatagrid']
        }
    }
});
require(["web_global"]);