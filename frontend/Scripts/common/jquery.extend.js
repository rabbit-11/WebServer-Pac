myextend = {
    //动态调整表格控件宽度
    setCustomTable: function (ctwidth, tdwidth, _cssclass, wrapper) {
        var customtable1 = null;
        var ct_width = ctwidth;
        var text_width = tdwidth;
        var nowidth = [];

        var isfind = false;
        if (wrapper == null || wrapper == undefined)
            customtable1 = $(_cssclass);
        else
            customtable1 = $(wrapper).find(_cssclass);

        $(customtable1).each(function (index, item) {
            customtable = $(item);
            var alltd = 0;
            customtable.find("tr:eq(0) .form_td").each(function (i) {
                var colspan = $(this).attr("colspan");
                var col = 1;
                if (typeof (colspan) != "undefined") {
                    col = parseInt(colspan, 10);
                }
                alltd += col;
            });
            var countinput = parseInt(alltd / 2, 10);
            var text_input = ((ct_width - text_width * countinput) / countinput);   //控件长
            var lenarr = new Array();   //列宽数组
            for (var l = 0; l < alltd; l++) {
                if (l % 2 == 0)
                    lenarr.push(text_width);
                else
                    lenarr.push(text_input);
            }

            customtable.find("tr").each(function (j) {
                var inputcount = $(this).find(".form_td").length;
                var remainwidth = ct_width;
                $(this).find(".form_td").each(function (i) {
                    if ($(this).is(".form_td_title")) {
                        $(this).css("width", tdwidth);
                        $(this).find("span.form_td_span_title").css("width", tdwidth - 6); //6为margin-left的值
                        remainwidth = remainwidth - tdwidth;
                        return true;
                    }

                    var colspan = $(this).attr("colspan");
                    var col = 1;
                    if (typeof (colspan) != "undefined") {
                        col = parseInt(colspan, 10);
                    }
                    var autowidth = 0;

                    /*最后一个节点的宽度等于全部-前面用掉的*/
                    if (i == inputcount - 1 && col > 1) {
                        autowidth = remainwidth;
                    }
                    else {
                        for (var c = 0; c < col; c++) {
                            if (i + c < lenarr.length)
                                autowidth += lenarr[i + c];
                        }
                    }
                    remainwidth = remainwidth - autowidth;
                    var isfind = false;
                    for (var i = 0; i < nowidth.length; i++) {
                        if ($(this).hasClass(nowidth[i])) {
                            isfind = true;
                        }
                    }
                    if (!isfind) {
                        var mywidth = autowidth - 2;
                        if ($(this).is(".selfwidth")) {
                            var str = $(this).attr("data-width") + "";
                            if (str.indexOf("%") != -1) {
                                str = str.replace("%", "");
                                str = str / 100;
                                mywidth = autowidth * str;
                            }
                            else {
                                mywidth = str;
                            }
                        }
                        $(this).css("width", mywidth);
                        $(this).find(".form_td_ctrl_wrapper").css("width", mywidth);
                        myextend.setCtrlWidth(this);
                    }

                });
            });
        });
    },
    setCtrlWidth: function (wrapper) {
        $(wrapper).find(".textbox").each(function (index, item) {
            $(item).css("width", "100%");
            $(item).css("display", "inline-block");
            $(item).css("overflow", "hidden");
            var mywidth = $(item).width();
            if ($(item).find(".textbox-addon").parent().is(".combo")) {
                if ($(item).find(".textbox-addon").css('display') != "none") {
                    //下拉箭头的大小
                    var addon_width = $(item).find(".textbox-addon").width();
                    $(item).find("input[type='text']").css("width", ((mywidth - addon_width) * 100 / mywidth) + "%");
                }
                else {
                    $(item).find("input[type='text']").css("width", "100%");
                    $(item).find("input[type='text']").css("margin", "0px 0px 0px 0px");
                }
            }
            else {
                $(item).find("input[type='text']").css("width", "100%");
                $(item).find("textarea").css("width", "99%");
            }
        });
    },
    //判断是否无效
    isNull: function (key) {
        return key == null || key == undefined || key == 'undefined' || key == "";
    },
    //异步请求
    ajaxPost: function (dataUrl, parameter, callback, bef_callback, com_callback, err_callback, _async) {
        try {
            parameter = (parameter + "").replace(/\+/g, "%2B");
            parameter = (parameter + "").replace(/\&/g, "%26");
            jQuery.support.cors = true;
            $.ajax({
                url: dataUrl,
                dataType: 'json',
                data: parameter,
                type: 'post',
                async: true,
                contentType: "application/json; charset=utf-8",
                xhrFields: {
                    //withCredentials: true
                },
                crossDomain: true,
                beforeSend: function (data) {
                    if (bef_callback) {
                        bef_callback(data)
                    }
                },
                success: function (data) {
                    //alert(data);
                    if (callback) {
                        callback(data)
                    }
                },
                complete: function (data) {
                    if (com_callback) {
                        com_callback(data)
                    }
                    console.log(data);
                },
                error: function (data) {
                    if (err_callback) {
                        err_callback(data)
                    } //alert(data);
                    console.log(data)
                }
            });
        }
        catch (err) {
            document.writeln("捕捉到例外，开始执行catch块语句 --->");
            document.writeln("错误名称: " + err.name + " ---> ");
            document.writeln("错误信息: " + err.message + " ---> ");
        }
    },
    //异步请求
    ajaxGet: function (dataUrl, parameter, callback, bef_callback, com_callback, err_callback, _async) {
        try {
            parameter = (parameter + "").replace(/\+/g, "%2B");
            parameter = (parameter + "").replace(/\&/g, "%26");
            jQuery.support.cors = true;
            $.ajax({
                url: dataUrl,
                dataType: 'json',
                data: parameter,
                type: 'get',
                async: _async == null || _async == undefined || _async,
                xhrFields: {
                    //withCredentials: true
                },
                crossDomain: true,
                beforeSend: function (data) {
                    if (bef_callback) {
                        bef_callback(data)
                    }
                },
                success: function (data) {
                    //alert(data);
                    if (callback) {
                        callback(data)
                    }
                },
                complete: function (data) {
                    if (com_callback) {
                        com_callback(data)
                    }
                    //alert(data);
                },
                error: function (data) {
                    if (err_callback) {
                        err_callback(data)
                    } //alert(data);

                }
            });
        }
        catch (err) {
            document.writeln("捕捉到例外，开始执行catch块语句 --->");
            document.writeln("错误名称: " + err.name + " ---> ");
            document.writeln("错误信息: " + err.message + " ---> ");
        }
    },
    //异步请求
    ajaxPost_simple: function (dataUrl, dictionary, callback, _async) {
        var dataparam = JSON.stringify(dictionary.getItems());
        if (dataparam == "" || dataparam == undefined)
            return;
        myextend.ajaxPost(dataUrl, dataparam, callback, null, null, null, _async);
    },
    ajaxGet_simple: function (dataUrl, dictionary, callback, _async) {
        var dataparam = myextend.HtmlEncode(JSON.stringify(dictionary.getItems()));
        if (dataparam == "" || dataparam == undefined)
            return;
        myextend.ajaxGet(dataUrl, dataparam, callback, null, null, null, _async);
    },
    //获取当前参数
    getUrlParam: function (name, decode) {
        return myextend.getBaseUrlParam(name, window.location.search, decode);
    },
    //获取当前参数
    getBaseUrlParam: function (name, url, decode) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        if ((url + "").indexOf("?") == -1)
            return null;
        url = (url + "").substr((url + "").indexOf("?"));
        var r = (url + "").substr(1).match(reg);
        if (r != null) {
            var s = "";
            try {
                if (decode) {
                    s = (decodeURIComponent(decodeURIComponent(r[2])) + "").replace(/% 27/g, "").replace(/%27/g, "").replace(/'/g, "");
                }
                else {
                    s = ((r[2]) + "").replace(/% 27/g, "").replace(/%27/g, "").replace(/'/g, "");
                }
            } catch (err) {
                s = ((r[2]) + "").replace(/% 27/g, "").replace(/%27/g, "").replace(/'/g, "");
            }
            finally {
                return s;
            }
        }
        return null;
    },
    HtmlEncode: function (value) {
        //        value = (value + "").replace(/\+/g, "%2B");
        //        value = (value + "").replace(/\&/g, "%26");
        return encodeURIComponent(encodeURIComponent(value));
    },
    HtmlDecode: function (value) {
        return decodeURIComponent(decodeURIComponent(value));
    },
    UrlUpdateParams: function (url, name, value, encode, noautoadd) {
        var r = url;
        if (r != null && r != 'undefined' && r != "") {
            if (encode) value = encodeURIComponent(encodeURIComponent(value));
            if (value == null || value == undefined | value == 'null') value = "''";
            var reg = new RegExp("([?&])" + name + "=.*?(&|$)", "i");
            var separator = url.indexOf('?') !== -1 ? "&" : "?";
            if (url.match(reg)) {
                return url.replace(reg, '$1' + name + "=" + value + '$2');
            }
            else {
                if (!(noautoadd == true))
                    return url + separator + name + "=" + value;
            }
            //            var tmp = name + "=" + value;
            //            if (url.match(reg) != null) {
            //                var rs = (url + "").substr(1).match(reg);
            //                r = url.replace(rs, tmp);
            //            }
            //            else {
            //                if (url.match("[\?]")) {
            //                    r = url + "&" + tmp;
            //                } else {
            //                    r = url + "?" + tmp;
            //                }
            //            }
        }
        return r;
    },
    StrUpdateParams: function (str, key, value, encode, noautoadd) {
        var r = str;
        if (r != null && r != 'undefined' && r != "") {
            if (encode) value = encodeURIComponent(encodeURIComponent(value));
            if (value == null || value == undefined | value == 'null') value = "";
            var oReg = new RegExp(key, "g");
            r = r.replace(oReg, value);
        }
        return r;
    },
    //字典类
    Dictionary: function () {
        var items = {};

        this.has = function (key) {
            return key in items;
        };

        this.set = function (key, value) {
            items[key] = value;
        };

        this.remove = function (key) {
            if (this.has(key)) {
                delete items[key];
                return true;
            }
            return false;
        };

        this.get = function (key) {
            return this.has(key) ? items[key] : undefined;
        };

        this.values = function () {
            var values = [];
            for (var k in items) {
                if (this.has(k)) {
                    values.push(items[k]);
                }
            }
            return values;
        };
        this.keys = function () {
            var keys = [];
            for (var k in items) {
                if (this.has(k)) {
                    keys.push(k);
                }
            }
            return keys;
        };
        this.clear = function () {
            items = {};
        };

        this.size = function () {
            var count = 0;
            for (var prop in items) {
                if (items.hasOwnProperty(prop)) {
                    ++count;
                }
            }
            return count;
        };

        this.getItems = function () {
            return items;
        };
    },
    myformatter_0: function (value, form) {

        var d = new Date();
        if (typeof value == 'string')
            d = myextend.myparser(value);
        else
            d = value;
        if (d == null || d == undefined)
            return "";
        return d.Format(form);
    },
    myformatter_1: function (value) {
        return myextend.myformatter_0(value, "yy.MM.dd");
    },
    myformatter: function (date) {
        return myextend.myformatter_0(date, "yyyy-MM-dd");
    },
    myformatter_2: function (date) {
        return myextend.myformatter_0(date, "yyyy-MM-dd hh:mm:ss");
    },
    myparser: function (s) {
        if (!s) return null;
        var ss = ((s + "").split('-'));
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(y, m - 1, d);
        } else {
            return null;
        }
    },
    myparser_1: function (s) {
        if (!s) return null;
        var s_1 = ((s + "").split(' '));

        var ss = ((s_1[0] + "").split('-'));
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            ss = ((s_1[1] + "").split(':'));
            var h = parseInt(ss[0], 10);
            var m_1 = parseInt(ss[1], 10);
            var s = parseInt(ss[2], 10);
            if (!isNaN(h) && !isNaN(m_1) && !isNaN(s)) {
                return new Date(y, m - 1, d, h, m_1, s);
            }
        }
        else {
            return null;
        }
    },
    callFunc: function (fn, args) {
        try {
            fn = eval(fn);
        } catch (e) {
            //            console.log(e);
            //alert(fn+'方法不存在！');
        }
        if (typeof fn === 'function') {
            fn.call(this, args);
        }
    },
    ajaxs: function (opts, fn, globalOpt) {
        var times = 0, byOrder = false, datas = [];
        if (typeof globalOpt === 'boolean') {
            byOrder = globalOpt;
            globalOpt = { byOrder: byOrder };
        } else {
            byOrder = globalOpt.byOrder;
        }
        $.each(opts, function (i, opt) {
            opt = typeof opt === 'object' ? opt : { url: opt };
            var _globalOpt = $.extend(true, {}, globalOpt),
                    _success = opt.success || _globalOpt.success || $.noop,
                    _opt = $.extend(_globalOpt, opt, {
                        success: function (data, textStatus, $XHR) {
                            _success(data, textStatus, $XHR, i);
                            datas[i] = data;
                            trigger();
                        }
                    });
            byOrder ? (opts[i] = _opt) : $.ajax(_opt);
        });
        byOrder && $.ajax(opts[times], { stamp: Math.random() });

        function trigger() {
            times++;
            if (times === opts.length) {
                fn && fn(datas);
            } else {
                byOrder && $.ajax(opts[times]);
            }
        }

        return this;
    },
    // 判断一个字符串是不是时间格式
    isDate: function (str) {
        if (!/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.test(str))
            return false;
        var year = RegExp.$1 - 0;
        var month = RegExp.$2 - 1;
        var date = RegExp.$3 - 0;
        var obj = new Date(year, month, date);
        return !!(obj.getFullYear() == year && obj.getMonth() == month && obj.getDate() == date);
    },
    isDate_1: function (str) {
        return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i.test(str);
    },
    CheckDateTime: function (str) {
        var reg = /^(\d+)-(\d{ 1,2 })-(\d{ 1,2 }) (\d{ 1,2 }):(\d{ 1,2 }):(\d{ 1,2 })$/;
        var r = str.match(reg);
        if (r == null) return false;
        r[2] = r[2] - 1;
        var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
        if (d.getFullYear() != r[1]) return false;
        if (d.getMonth() != r[2]) return false;
        if (d.getDate() != r[3]) return false;
        if (d.getHours() != r[4]) return false;
        if (d.getMinutes() != r[5]) return false;
        if (d.getSeconds() != r[6]) return false;
        return true;
    },
    getpregweekorday: function (lastmenstrualperiod, dateofprenatal, currenttime, method, weekorday) {
        //用末次月经计算
        if (method == 1) {
            if ((lastmenstrualperiod == null || lastmenstrualperiod == undefined) && (dateofprenatal != null && dateofprenatal != undefined)) {
                lastmenstrualperiod = dateofprenatal.DateAdd('d', -280);
            }
        }
        else if (method == 2) {
            if (dateofprenatal != null && dateofprenatal != undefined) {
                lastmenstrualperiod = dateofprenatal.DateAdd('d', -280);
            }
        }
        var TotalMilliseconds = currenttime - lastmenstrualperiod; //相差的毫秒数      
        if (TotalMilliseconds <= 0 || TotalMilliseconds == undefined || TotalMilliseconds == NaN)
            return;

        var timespan = {};
        timespan.weeks = parseInt(TotalMilliseconds / 1000 / 60 / 60 / 24 / 7, 10);
        timespan.days = parseInt(parseInt(TotalMilliseconds / 1000 / 60 / 60 / 24, 10) % 7, 10);

        if (weekorday == 1)
            return timespan.weeks;
        else if (weekorday == 2)
            return timespan.days;
        return 0;
    }
}
//js格式化时间 "yyyy-MM-dd hh:mm:ss"
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
 
//---------------------------------------------------
// 日期格式化
// 格式 YYYY/yyyy/YY/yy 表示年份
// MM/M 月份
// W/w 星期
// dd/DD/d/D 日期
// hh/HH/h/H 时间
// mm/m 分钟
// ss/SS/s/S 秒
//---------------------------------------------------
//Date.prototype.Format = function(formatStr)
//{
//    var str = formatStr;
//    var Week = ['日','一','二','三','四','五','六'];
//    str=str.replace(/yyyy|YYYY/,this.getFullYear());
//    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));
//    str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());
//    str=str.replace(/M/g,this.getMonth());
//    str=str.replace(/w|W/g,Week[this.getDay()]);
//    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
//    str=str.replace(/d|D/g,this.getDate()); 
//    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
//    str=str.replace(/h|H/g,this.getHours());
//    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
//    str=str.replace(/m/g,this.getMinutes());
//    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
//    str=str.replace(/s|S/g,this.getSeconds());
//    return str;
//}

Date.prototype.clone = function () {
    return new Date(this.valueOf());
};
//+---------------------------------------------------
//| 日期计算
//+---------------------------------------------------
Date.prototype.DateAdd = function (strInterval, Number) {
    var dtTmp = this;
    switch (strInterval) {
        case 's': return new Date(Date.parse(dtTmp) + (1000 * Number));
        case 'n': return new Date(Date.parse(dtTmp) + (60000 * Number));
        case 'h': return new Date(Date.parse(dtTmp) + (3600000 * Number));
        case 'd': return new Date(Date.parse(dtTmp) + (86400000 * Number));
        case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * Number));
        case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
        case 'y': return new Date((dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
    }
}

//+---------------------------------------------------
//| 比较日期差 dtEnd 格式为日期型或者 有效日期格式字符串
//+---------------------------------------------------
Date.prototype.DateDiff = function (strInterval, dtEnd) {
    var dtStart = this;
    if (typeof dtEnd == 'string')//如果是字符串转换为日期型
    {
        dtEnd = StringToDate(dtEnd);
    }
    switch (strInterval) {
        case 's': return parseInt((dtEnd - dtStart) / 1000);
        case 'n': return parseInt((dtEnd - dtStart) / 60000);
        case 'h': return parseInt((dtEnd - dtStart) / 3600000);
        case 'd': return parseInt((dtEnd - dtStart) / 86400000);
        case 'w': return parseInt((dtEnd - dtStart) / (86400000 * 7));
        case 'm': return (dtEnd.getMonth() + 1) + ((dtEnd.getFullYear() - dtStart.getFullYear()) * 12) - (dtStart.getMonth() + 1);
        case 'y': return dtEnd.getFullYear() - dtStart.getFullYear();
    }
}
////+---------------------------------------------------
////| 日期输出字符串，重载了系统的toString方法
////+---------------------------------------------------
//Date.prototype.toString = function(showWeek)
//{
//    var myDate= this;
//    var str = myDate.toLocaleDateString();
//    if (showWeek)
//    {
//        var Week = ['日','一','二','三','四','五','六'];
//        str += ' 星期' + Week[myDate.getDay()];
//    }
//    return str;
//}

////+---------------------------------------------------
////| 把日期分割成数组
////+---------------------------------------------------
//Date.prototype.toArray = function()
//{
//    var myDate = this;
//    var myArray = Array();
//    myArray[0] = myDate.getFullYear();
//    myArray[1] = myDate.getMonth();
//    myArray[2] = myDate.getDate();
//    myArray[3] = myDate.getHours();
//    myArray[4] = myDate.getMinutes();
//    myArray[5] = myDate.getSeconds();
//    return myArray;
//}

//+---------------------------------------------------
//| 取得日期数据信息
//| 参数 interval 表示数据类型
//| y 年 m月 d日 w星期 ww周 h时 n分 s秒
//+---------------------------------------------------
Date.prototype.DatePart = function(interval)
{
    var myDate = this;
    var partStr='';
    var Week = ['日','一','二','三','四','五','六'];
    switch (interval)
    {
        case 'y' :partStr = myDate.getFullYear();break;
        case 'm' :partStr = myDate.getMonth()+1;break;
        case 'd' :partStr = myDate.getDate();break;
        case 'w' :partStr = Week[myDate.getDay()];break;
        case 'ww' :partStr = myDate.WeekNumOfYear();break;
        case 'h' :partStr = myDate.getHours();break;
        case 'n' :partStr = myDate.getMinutes();break;
        case 's' :partStr = myDate.getSeconds();break;
    }
    return partStr;
} 


/*重写jquery函数*/
String.prototype.mytrim = function (char, type) {
    if (char) {
        if (type == 'left') {
            return this.replace(new RegExp('^\\' + char + '+', 'g'), '');
        } else if (type == 'right') {
            return this.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
}; 
String.format = function () {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}
String.prototype.endWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
}

String.prototype.startWith = function (s) {
    if (s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if (this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
}
Array.prototype.distinct = function () {
    var arr = this;
    var result = [];
    var i;
    var j;
    var len = arr.length;
    for (i = 0; i < len; i++) {
        for (j = i + 1; j < len; j++) {
            if (arr[i] === arr[j]) {
                j = ++i;
            }
        }
        result.push(arr[i]);
    }
    return result;
}
Array.prototype.contains = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            return true;
        }
    }
    return false;
}; 
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

(function ($) {
    $.fn.extend({
        /*
        * 获取光标所在位置
        */
        iGetFieldPos: function () {
//            var field = this.get(0);
//            var CaretPos = 0;   // IE Support
//            if (document.selection) {
//                $(this).focus();
//                var Sel = document.selection.createRange();
//                Sel.moveStart('character', -Sel.text.length);
//                CaretPos = Sel.text.length;
//            }
//            // Firefox support
//            else if (field.selectionStart || field.selectionStart == '0')
//                CaretPos = field.selectionStart;
//            return (CaretPos);
var s, e, range, stored_range;
    if (this[0].selectionStart == undefined) {
        var selection = document.selection;
       
        if (this[0].tagName.toLowerCase() != "textarea") {
            var val = this.val();
            range = selection.createRange().duplicate();
            range.moveEnd("character", val.length);
            s = (range.text == "" ? val.length : val.lastIndexOf(range.text));
            range = selection.createRange().duplicate();
            range.moveStart("character", -val.length);
            e = range.text.length;
        } else {
            range = selection.createRange();
            stored_range = range.duplicate();
            stored_range.moveToElementText(this[0]);
            stored_range.setEndPoint('EndToEnd', range);
            s = stored_range.text.length - range.text.length;
            e = s + range.text.length;
        }
    } else {
        s = this[0].selectionStart,
            e = this[0].selectionEnd;
    }
    var te = this[0].value.substring(s, e);
    return s;
        },
        /*
        * 选中指定位置内字符 || 设置光标位置
        * --- 从start起选中(含第start个)，到第end结束（不含第end个）
        * --- 若不输入end值，即为设置光标的位置（第start字符后）
        */
        iSelectField: function (start, end) {
            var field = this.get(0);
            //end未定义，则为设置光标位置
            if (arguments[1] == undefined) {
                end = start;
            }
            if (document.selection) {
                //IE
                var range = field.createTextRange();
                range.moveEnd('character', -$(this).val().length);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            } else {
                //非IE
                field.setSelectionRange(start, end);
                $(this).focus();
            }
        },
        /*
        * 选中指定字符串
        */
        iSelectStr: function (str) {
            var field = this.get(0);
            var i = $(this).val().indexOf(str);
            i != -1 ? $(this).iSelectField(i, i + str.length) : false;
        },
        /*
        * 在光标之后插入字符串
        */
        iAddField: function (str) {
            var field = this.get(0);
            var v = $(this).val();
            var len = $(this).val().length;

            //textarea必须加，否则单行的文本框getfieldpos会出错
            //var b = $(this).iGetFieldPos() > 0;
            var selPos = $(this).iGetFieldPos();

            //var addbr = false;
            if (len > 0) {
                if (v.indexOf(str) != -1) {
                    this.iSelectField(selPos);
                    return;
                }
                if ($(this).is("textarea")) {
                    if (selPos > 0)
                        str = "\r\n" + str;
                    if (selPos < len - 1)
                        str = str + "\r\n";
                    //addbr = true;
                }
            }

            var newpos = (selPos + str.length);

            if (document.selection) {
                //IE
                $(this).focus();
                document.selection.createRange().text = str;

                this.iSelectField(newpos);
            } else {
                //非IE
                //var selPos = field.selectionStart;
                $(this).val($(this).val().slice(0, field.selectionStart) + str + $(this).val().slice(field.selectionStart, len));
                this.iSelectField(newpos);
            };
        },
        /*
        * 删除光标前面(-)或者后面(+)的n个字符
        */
        iDelField: function (n) {
            var field = this.get(0);
            var pos = $(this).iGetFieldPos();
            var v = $(this).val();
            //大于0则删除后面，小于0则删除前面
            $(this).val(n > 0 ? v.slice(0, pos - n) + v.slice(pos) : v.slice(0, pos) + v.slice(pos - n));
            $(this).iSelectField(pos - (n < 0 ? 0 : n));
        }

    })
})(jQuery);
