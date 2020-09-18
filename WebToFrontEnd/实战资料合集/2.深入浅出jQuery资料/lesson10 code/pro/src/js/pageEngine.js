var pageEngine = {
    init: function (selector, colorsArray) {
        this.$W = $(selector);
        this.colorsArray = colorsArray;
        this.slideFlag = false;
        return this;
    },
    addSection: function (className) {
        this.slideFlag = false;
        this.$Page = $('<div class="section"></div>').addClass(className);
        this.$Page.appendTo(this.$W);
        return this;
    },
    addSlide: function (className) {
        this.slideFlag = true;
        this.$Slide = $('<div class="slide"></div>').addClass(className);
        this.$Slide.appendTo(this.$Page);
        return this;
    },
    addComponent: function (config) {
        var type = config.type;
        var component = null;
        switch(type) {
            case 'base':
                    component = ComponentFactory(config);
                break;
            case 'super':
                    component = ComponentSuperFactory(config);
                break;
        }
        this.slideFlag ? this.$Slide.append(component) :  this.$Page.append(component);
        return this;
    },
    bindEvent: function () {
        this.$W
            .find('.section')
                .on({
                    _leave: function () {
                        $(this).find('.component').trigger('cpLeave');
                    },
                    _load: function () {
                        $(this).find('.component').trigger('cpLoad');
                    }
                })
    },
    load: function () {
        this.bindEvent();
        var self = this;
        this.$W.myFullPage({
            colorsArray: this.colorsArray,
            onLeave: function (index, direction) {
                // 找到离开section
                self.$W.find('.section').eq(index).trigger('_leave');
            },
            afterLoad: function (index, direction) {
                // 来的
                self.$W.find('.section').eq(index).trigger('_load');
            }
        }); 
        this.$W.find('.section').eq(0).trigger('_load');
    }
}

