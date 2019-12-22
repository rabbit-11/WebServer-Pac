define(function () {

    /*A4纵向*/
    function A4(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4');
        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", htmlcon[i]);
        }
        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(573, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }

    /*A4纵向-表格形式-表格翻转，可复制表头的打印类型，普通打印机不支持*/
    function A4_table_rotate(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'A4');

        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_TABLE(0, 0, "100%", "82%", htmlcon[i]);
        }
        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(580, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }
    /*A4纵向-表格形式-表格不翻转，可复制表头的打印类型*/
    function A4_table(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4');

        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_TABLE(0, 0, "100%", "90%", htmlcon[i]);
        }
        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(580, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }

    /*A5纵向*/
    function A5(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A5');

        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", htmlcon[i]);
        }
        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(580, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }
    /*A5纵向-表格形式-表格不翻转，可复制表头的打印类型*/
    function A5_table(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A5');

        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_TABLE(0, 0, "100%", "95%", htmlcon[i]);
        }
        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(580, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }
    /*A5横向-表格形式-表格翻转，可复制表头的打印类型，普通打印机不支持*/
    function A5_table_rotate(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'A5');

        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_TABLE(0, 0, "100%", "82%", htmlcon[i]);
        }
        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(580, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }
    /*A5横向，上半部分*/
    function A5_htm_transverse_top(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4');
        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_HTM(0, 0, "100%", "45%", htmlcon[i]);
        }

        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(0, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }
    /*A5横向，下半部分*/
    function A5_htm_transverse_bottom(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4');
        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_HTM(580, 0, "100%", "45%", htmlcon[i]);
        }

        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(580, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }
    /*A5横向-表格形式-表格不翻转，可复制表头的打印类型，上半部分*/
    function A5_table_transverse_top(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4');
        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_TABLE(0, 0, "100%", "45%", htmlcon[i]);
        }
        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(0, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }
    /*A5横向-表格形式-表格不翻转，可复制表头的打印类型，下半部分*/
    function A5_table_transverse_bottom(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(1, 0, 0, 'A4');

        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_TABLE(580, 0, "100%", "45%", htmlcon[i]);
        }
        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(580, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }
    /*180mm*120mm*/
    function P_180_120(htmlcon, LODOP) {
        LODOP.SET_PRINT_PAGESIZE(1, 1800, 1200, '');

        for (var i = 0; i < htmlcon.length; i++) {
            LODOP.NewPageA();
            LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", htmlcon[i]);
        }
        //右下角加个页号对象：
        LODOP.ADD_PRINT_TEXT(160, 715, 200, 20, "第#页/共&页");
        LODOP.SET_PRINT_STYLEA(0, "ItemType", 2);
        LODOP.SET_PRINT_STYLEA(0, "Horient", 1);
        LODOP.SET_PRINT_STYLEA(0, "Vorient", 1);
    }
    function print(pagesize, title, strFilename, preview) {
        var arr = [];
        if (!$.isArray(strFilename)) {
            arr.push(strFilename);
        }
        else
            arr = strFilename;
        myextend.ajaxs(arr, function (datas) {
            print_share(pagesize, title, datas, preview);
        }, true);
    }
    function print_share(pagesize, title, data, preview) {
        var arr = [];
        if (!$.isArray(data))
            arr.push(data);
        else
            arr = data;

        var LODOP = getLodop();
        if (LODOP == null || LODOP == undefined) {
            return;
        }
        LODOP.PRINT_INIT(title);

        if (pagesize == "A4") A4(data, LODOP);
        else if (pagesize == "A4table") A4_table(data, LODOP);
        else if (pagesize == "A4rotatetable") A4_table_rotate(data, LODOP);

        else if (pagesize == "A5") A5(data, LODOP);
        else if (pagesize == "A5table") A5_table(data, LODOP);
        //else if (pagesize == "A5rotatetable") A5_table_rotate(data, LODOP);

        else if (pagesize == "A5rotate" || pagesize == "A5rotatetop") A5_htm_transverse_top(data, LODOP);
        else if (pagesize == "A5rotatebottom") A5_htm_transverse_bottom(data, LODOP);

        else if (pagesize == "A5rotatetable" || pagesize == "A5rotatetabletop") A5_table_transverse_top(data, LODOP);
        else if (pagesize == "A5rotatetablebottom") A5_table_transverse_bottom(data, LODOP);
        else if (pagesize == "P_180_120") P_180_120(data, LODOP);
        else {
            alert("打印模式有误，请联系管理员");
            LODOP = null;
            return;
        }
        if (preview)
            LODOP.PREVIEW();
        else
            LODOP.PRINT();
        LODOP = null;
    }
    return {
        print: print
    }
});