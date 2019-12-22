//使用沙箱模式防止污染外面的变量
; (function () {
    //让外面可以只能访问到require变量
    window.require = require;
    //定义一个加载模块的方法
    function require(moduleName, callback) {
        //创建加载模块的具体实现类
        var requireHelper = new RequireHelper(moduleName, callback);
        //调用加载模块类的load方法加载模块
        requireHelper.load();
    }
    //存储已加载模块的信息
    var moduleList = [];

    //创建一个实体类,给传进来的属性赋值
    function RequireHelper(moduleName, callback) {
        this.moduleName = moduleName;
        this.callback = callback;
    }

    //给模块加载实现类的原型添加方法
    RequireHelper.prototype = {
        //加载模块
        load: function () {
            var that = this;
            var moduleName = that.moduleName;
            if (that.isLoad()) {//模块已被加载(资源优化:已经请求的模块不要再次加载)
                var moduleInfo = that.getModuleInfo(); //获取模块的描述信息
                if (moduleList.isLoad) {//如果模块资源已加载完成
                    that.callback(); //可以放心的调用模块对应的回调函数
                } else {//模块资源没加载完
                    var oldCallback = moduleInfo.callback; //取出之前的回调函数
                    moduleInfo.callback = function () {//追加回调函数
                        oldCallback();
                        that.callback();
                    };
                }
            } else {//模块没有加载
                var script = document.createElement("script");
                script.src = that.moduleName;
                document.getElementsByTagName("head")[0].appendChild(script); //加载模块
                var moduleInfo = {
                    moduleName: that.moduleName, isLoad: false, callback: function () {
                        that.callback();
                    }
                }; 

                 //添加模块的描述信息
                 if(typeof that.callback === "function"){ 
                        script.onreadystatechange = function() { 
                            var r = script.readyState; 
                            console.log(moduleName + ": " + r); 
                            if (r === 'loaded' || r === 'complete') { 
                                script.onreadystatechange = null; 
                                moduleInfo.callback(); //执行模块对应的回调函数
                                moduleInfo.isLoad = true; //标识模块资源被加载完成 
                            } 
                        }; 
                    }
   
                script.onload = function () {
                    moduleInfo.callback(); //执行模块对应的回调函数
                    moduleInfo.isLoad = true; //标识模块资源被加载完成
                }
            }
        },
        //判断指定模块是否加载
        isLoad: function () {
            return this.getModuleInfo() == null ? false : true;
        },
        //根据模块名称获取模块信息
        getModuleInfo: function () {
            for (var i = 0; i < moduleList.length; i++) {
                if (that.moduleName == moduleList[i].name) {
                    return moduleList;
                }
            }
            return null;
        }
    };

})(window)