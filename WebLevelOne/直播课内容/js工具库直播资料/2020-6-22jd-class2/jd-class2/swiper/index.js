//

// $.extend({
//     swiper:  function () {

//     }
// })
// $.swiper()
// $.fn === $.prototype.extend({

// })
// $('.xxx').swiper

// 实例、 工具

// 实例： 由一个构造函数构造出来的就是实例
// 工具： 拿过来就可以用的
/**
 *      1. 动画类型： animateType:  'fade'(淡入淡出)  'animation' (从左到右的轮播)
        2. 是否自动轮播： isAutoChange （布尔值）
        3. 轮播的内容： domList  （dom数组） 
        4. 是否显示左右按钮：showChangeBtn: 'always'（一直在页面当中） 'none'（一直不显示） 'hover' （鼠标移入轮播图区域显示）、
        5. 是否显示小圆点：showSpotBtn: true  
        6. 轮播图的大小 width  height
 */
(function () {
  // 存储轮播图数据的构造函数
  function Slider(options, wrap) {
    // 包裹轮播图的页面的区域
    this.wrap = wrap;
    // 当前轮播图对象的动画类型
    this.animateType = options.animateType || "fade";
    // 当前轮播图自动轮播的状态  默认为自动轮播
    this.isAutoChange =
      options.isAutoChange === undefined ? true : options.isAutoChange;
    // 轮播内容列表
    this.domList = options.domList || [];
    // 轮播图的左右按钮显示状态
    this.showChangeBtn = options.showChangeBtn || "always";
    // 轮播图的小圆点按钮显示状态
    this.showSpotBtn =
      options.showSpotBtn === undefined ? true : options.showSpotBtn;
    // 轮播图的大小
    this.width = options.width || $(wrap).width();
    this.height = options.height || $(wrap).height();
    // 轮播内容长度
    this.len = this.domList.length;
    // 当前展示的轮播内容索引值
    this.nowIndex = options.nowIndex || 0;
    // 加锁  当前是否有动画正在进行中   true代表有   false代表没有
    this.lock = false;
    // 小圆点的位置
    this.spotPosition = options.spotPosition || "left";
    // 自动轮播的定时器
    this.timer = null;
    // 自动轮播的时间
    this.autoTime = options.autoTime || 4000;
  }
  // 创建轮播图结构
  Slider.prototype.createElement = function () {
    var swiperWrapper = $('<div class="my-swiper"></div>');
    var imgDomList = $('<ul class="my-swiper-list"></ul>');
    var spotsBtn = $('<div class="my-swiper-spots"></div>');
    for (var i = 0; i < this.domList.length; i++) {
      // 包裹着轮播内容的结构  方便书写样式
      var oLi = $('<li class="my-swiper-item"></li>');
      // this.domList[i] 代表当前轮播内容信息
      oLi.append($(this.domList[i])).appendTo(imgDomList);
      spotsBtn.append("<span></span>");
    }
    // 如果当前轮播效果为从左到右的轮播  那么在最后插入一个轮播区域  这个轮播区域的内容和第一个轮播区域的内容相同
    if (this.animateType == "animation") {
      $('<li class="my-swiper-item"></li>')
        .append($(this.domList[0]).clone())
        .appendTo(imgDomList);
    }
    var leftBtn = $('<div class="my-swiper-lBtn my-swiper-btn">&lt;</div>');
    var rightBtn = $('<div class="my-swiper-rBtn my-swiper-btn">&gt;</div>');
    swiperWrapper
      .append(imgDomList)
      .append(leftBtn)
      .append(rightBtn)
      .append(spotsBtn)
      .appendTo(this.wrap);
  };
  //  设置样式
  Slider.prototype.initStyle = function () {
    $(".my-swiper", this.wrap)
      .css({
        width: this.width,
        height: this.height,
      })
      .find(".my-swiper-item")
      .css({
        width: this.width,
        height: this.height,
      })
      .end()
      .find(".my-swiper-spots")
      .css({
        textAlign: this.spotPosition,
      })
      .find("span")
      .eq(this.nowIndex)
      .addClass("active");

    if (this.animateType == "animation") {
      $(".my-swiper", this.wrap)
        .find(".my-swiper-list")
        .css({
          width: this.width * (this.len + 1),
          height: this.height,
          position: "absolute",
          left: -(this.width * this.nowIndex),
        })
        .find(".my-swiper-item")
        .css({
          float: "left",
        });
    } else if (this.animateType == "fade") {
      $(".my-swiper", this.wrap)
        .find(".my-swiper-list")
        .css({
          width: this.width,
          height: this.height,
          position: "relative",
        })
        .find(".my-swiper-item")
        .css({
          position: "absolute",
        })
        .hide()
        .eq(this.nowIndex)
        .show();
    }
    // 设置小圆点的显示情况
    if (!this.showSpotBtn) {
      $(".my-swiper", this.wrap).find(".my-swiper-spots").hide();
    }
    if (this.showChangeBtn === "hide") {
      $(".my-swiper", this.wrap).find(".my-swiper-btn").hide();
    } else if (this.showChangeBtn === "hover") {
      var self = this;
      $(".my-swiper", self.wrap).find(".my-swiper-btn").hide();
      $(".my-swiper", this.wrap).hover(
        function () {
          $(".my-swiper", self.wrap).find(".my-swiper-btn").show();
        },
        function () {
          $(".my-swiper", self.wrap).find(".my-swiper-btn").hide();
        }
      );
    } else {
      $(".my-swiper", this.wrap).find(".my-swiper-btn").show();
    }
  };

  // 设置行为
  Slider.prototype.bindEvent = function () {
    var self = this;
    $(".my-swiper-lBtn", this.wrap).click(function () {
      if (self.lock) {
        return false;
      }
      self.lock = true;
      if (self.nowIndex === 0) {
        self.nowIndex = self.len - 1;
        if (self.animateType === "animation") {
          $(".my-swiper-list", self.wrap).css({
            left: -self.width * self.len,
          });
        }
      } else {
        self.nowIndex--;
      }
      self.change();
    });
    $(".my-swiper-rBtn", this.wrap).click(function () {
      if (self.lock) {
        return false;
      }
      self.lock = true;
      if (self.animateType === "fade") {
        if (self.nowIndex === self.len - 1) {
          self.nowIndex = 0;
        } else {
          self.nowIndex++;
        }
      } else if (self.animateType === "animation") {
        // 如果是从左到右的轮播  那么判断当前是不是后面的第一张图片  如果是的话那么瞬间移动到前面第一张图片的位置  之后正常轮播
        if (self.nowIndex === self.len) {
          $(".my-swiper-list", self.wrap).css({
            left: 0,
          });
          self.nowIndex = 0;
        }
        self.nowIndex++;
      }
      self.change();
    });
    $(".my-swiper-spots", this.wrap).on("mouseenter", "span", function () {
      if (self.lock) {
        return false;
      }
      self.lock = true;
      self.nowIndex = $(this).index();
      self.change();
    });
    $(".my-swiper", this.wrap).mouseenter(function () {
        clearInterval(self.timer)
    }).mouseleave(function () {
        if (self.isAutoChange) {
            self.autoChange();
        }
    })
  };

  //  切换样式
  Slider.prototype.change = function () {
    var self = this;
    if (this.animateType === "animation") {
      $(".my-swiper-list", this.wrap).animate(
        {
          left: -this.width * this.nowIndex,
        },
        function () {
          self.lock = false;
        }
      );
    } else {
      $(".my-swiper-list", this.wrap)
        .find(".my-swiper-item")
        .fadeOut()
        .eq(this.nowIndex)
        .fadeIn(function () {
          self.lock = false;
        });
    }
    // 设置小圆点的样式
    $(".my-swiper", this.wrap)
      .find(".my-swiper-spots > span")
      .removeClass("active")
      .eq(this.nowIndex % this.len)
      .addClass("active");
  };
  // 自动轮播
  Slider.prototype.autoChange = function () {
    var self = this;
    this.timer = setInterval(function () {
      $(".my-swiper-rBtn", self.wrap).trigger("click");
    }, this.autoTime);
  };
  $.fn.extend({
    swiper: function (options) {
      var obj = new Slider(options, this);
      obj.createElement();
      obj.initStyle();
      obj.bindEvent();
      if (obj.isAutoChange) {
        obj.autoChange();
      }
    },
  });
})();
