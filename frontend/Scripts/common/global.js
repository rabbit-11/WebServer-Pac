document.onkeydown = function (e) {
    var code;
    if (!e) { var e = window.event; }
    if (e.keyCode) { code = e.keyCode; }
    else if (e.which) { code = e.which; }
    //BackSpace 不允许返回页面; 
    if (
                  (e.keyCode == 8 || e.keyCode == 32)
                  && ((e.srcElement.type != "text" && e.srcElement.type != "textarea" && e.srcElement.type != "password")
                   || e.srcElement.readOnly == true
                   )
                  ) {
        e.keyCode = 0;
        e.returnValue = false;
        e.preventDefault();
    }
    if (e.ctrlKey == true && e.keyCode == 83) {
        e.keyCode = 0;
        e.returnValue = false;
        e.preventDefault();
        //console.log("global"); 
        return false;
    }
    return true;
}; 