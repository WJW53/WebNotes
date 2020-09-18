(function () {
    function jQuery (selector) {
        return new jQuery.prototype.init(selector);
    }
    jQuery.prototype.init = function (selector) {
        // this = {};
        // 选出 dom 并且包装成jQuery对象  返回
        // id class
        this.length = 0;
        // null undefined dom
        if (selector == null) {
            return this;
        }

        if (typeof selector == 'string' && selector.indexOf('.') != -1) {
            var dom = document.getElementsByClassName( selector.slice(1) );
        }else if (typeof selector == 'string' && selector.indexOf('#') != -1) {
            var dom = document.getElementById( selector.slice(1) );
        }

        if (selector instanceof Element || dom.length == undefined) {
            this[0] = dom || selector;
            this.length++;
        }else {
            // 基础铺垫
            for (var i = 0; i < dom.length; i++) {
                this[i] = dom[i];
                this.length++
            }
        }
        // return this;
    }

    jQuery.prototype.css = function (config) {
        // 循环操作每一个dom
        // 循环操作
        for (var i = 0; i < this.length; i++) {
            for (var attr in config) {
                this[i].style[attr] = config[attr];
            }
        }

        // 链式操作
        return this;
    }

    jQuery.prototype.pushStack = function (dom) {
        // dom newObj
        if (dom.constructor != jQuery) {
            dom = jQuery(dom);
        }
        dom.prevObject = this;//新建立一个prevObject属性,指向上一个环境
        return dom;
    }


    jQuery.prototype.get = function (num) {
        return num != null ? (num >= 0 ? this[num] : this[num + this.length]) : [].slice.call(this, 0);
    }

    jQuery.prototype.eq = function (num) {
        var dom = num != null ? (num >= 0 ? this[num] : this[num + this.length]) : null;
        return this.pushStack(dom);
    }

    jQuery.prototype.add = function (selector) {
        var curObj = jQuery(selector);
        var baseObj = this;
        var newObj = jQuery();

        ////这是老师写的顺序,,有点毛病?还是按我自己的来吧,在另外一个文件夹里
        for (var i = 0; i < curObj.length; i++) {
            newObj[newObj.length++] = curObj[i];
        }
        for (var i = 0; i < baseObj.length; i++) {
            newObj[newObj.length++] = baseObj[i];
        }
        
        
        //console.log(newObj);//测试一下

        this.pushStack(newObj);

        return newObj;
    }

    jQuery.prototype.end = function () {
        return this.prevObject;
    }


    jQuery.prototype.init.prototype = jQuery.prototype;


    window.$ = window.jQuery = jQuery;
})();