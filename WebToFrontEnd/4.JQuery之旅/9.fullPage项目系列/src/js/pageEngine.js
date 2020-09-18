var pageEngine = {
    //注意精髓之一的: this!!!
    init: function (selector,colorsArray) {
        this.$W = $(selector);//
        this.colorsArray = colorsArray;
        this.slideFlag = false;//需要加到哪里的标记
        return this;    
    },
    addSection: function (className){
        this.slideFlag = false;//加到section下面就false
        this.$Page = $('<div class = "section"></div>').addClass(className);
        this.$Page = this.$Page.appendTo(this.$W);
        return this;
    },
    addSlide: function (className){
        this.slideFlag = true;
        this.$Slide = $('<div class="slide"></div>').addClass(className);
        this.$Slide.appendTo(this.$Page);
        return this;
    },
    addComponent: function(config){
        var type = config.type;//判断是加到哪儿
        var component = null;
        switch(type){
            case 'base':
                component = ComponentFactory(config);
                break;
            case 'super':
                component = ComponentSuperFactory(config);
                break;
        }
        this.slideFlag ? this.$Slide.append(component) : this.$Page.append(component)
        return this;
    },
    bindEvent: function(){
        this.$W.find('.section').on({
            _leave: function(){
                $(this).find('.component').trigger('cpLeave');
            },
            _load: function(){
                $(this).find('.component').trigger('cpLoad');
            }
        })
    },
    load: function(){
        var self = this;
        this.bindEvent();//别忘了 , 现在这里执行,才能绑定那俩事件,
        this.$W.myFullPage({
            colorsArray: this.colorsArray,
            //触发映射事件
            onLeave: function(index){
                self.$W.find('.section').eq(index).trigger('_leave');//最终component动画
            },
            afterLoad: function(index){
                self.$W.find('.section').eq(index).trigger('_load');
            },
        });
        this.$W.find('.section').eq(0).trigger('_load');//手动触发第一页的样式
    }


}