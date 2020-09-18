var calendar = {
  date: new Date(), // 日期对象，今天的日期
  weeks: ['日', '一', '二', '三', '四', '五', '六'], // 星期列表
  showDate: { // 当前在输入框中显示的日期对象，键值为年、月、日的索引值
    year: 0,
    month: 0,
    day: 0,
  },
  showPanel: false, // 是否显示日历面板，true为显示，false为不显示
  init: function (options) {
    this.initData(options); // 初始化数据
    this.render();
    this.handle();
  },
  initData: function (options) {
    this.el = options.el;
    this.getDate = options.getDate;

    this.showDate = this.getYearMonthDay(this.date); // 获取当前显示的日期
    this.showDays = this.getShowDays(); // 获取渲染日历面板上显示日期的数组
    this.chooseDay = this.getChooseDay(this.showDate); // 获取选择的日期
  },
  /**
   * 根据传入的日期对象，获得包含年、月、日索引的普通对象
   * @param {Data} date - 日期对象
   * @return {Object} - 返回包含年、月、日索引的普通对象
   */
  getYearMonthDay: function (date) {
    
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    return {
      year: year,
      month: month,
      day: day,
    }
  },
  /**
   * 获取渲染日历面板显示日期的数组
   * @return {Array} - [new Date(...), new Date(...)],日历面板根据该数组进行渲染
   */
  getShowDays: function () {
    var arr = [];
    var firstDay = new Date(this.showDate.year, this.showDate.month, 1);  // 获取本月第一天的日期对象
    var firstDayWeek = firstDay.getDay(); // 根据第一天的日期对象，获取本月的第一天是周几
    var startDay = +firstDay - firstDayWeek * 24 * 60 * 60 * 1000;  // 获取本月日历起始日期

    for(var i = 0; i < 42; i ++) {
      var day = new Date( startDay + i * 24 * 60 * 60 * 1000 );
      arr[i] = day;
    }

    return arr;
  },
  /**
   * 获取当前选择的日期
   * @param {Date|Object} date 
   * @return {String} 如 2020-4-26
   */
  getChooseDay: function (date) {
    if(date instanceof Date) {
      // 判断date是否为日期对象
      return date.getFullYear() + '-' + ( date.getMonth() + 1)+ '-' + date.getDate();
    } else {
      return date.year + '-' + ( date.month + 1)+ '-' + date.day;
    }
  },
  /**
   * 渲染函数
   */
  render: function () {
    this.el.innerHTML = this.renderInput() + this.renderCalendar();
  },
  /**
   * 渲染input输入框区域
   */
  renderInput: function () {
    return `
      <div class="picker-input">
        <span class="input-prefix"></span>
        <input value="${this.chooseDay}"/>
      </div>
    `;
  },
  /**
   * 渲染日历面板区域
   */
  renderCalendar: function () {
    return `
      <div class="calendar" style="display: ${this.showPanel ? 'block' : 'none'}">
        ${this.renderHeader()}
        ${this.renderContent()}
      </div>
    `;
  },
  /**
   * 渲染日历面板头部区域
   */
  renderHeader: function () {
    return `
      <div class="header">
        <span class="picker-btn picker-prev-year"></span>
        <span class="picker-btn picker-prev-month"></span>
        <span class="picker-date">
          ${this.showDate.year} 年 ${this.showDate.month + 1} 月
        </span>
        <span class="picker-btn picker-next-month"></span>
        <span class="picker-btn picker-next-year"></span>
      </div>
    `;
  },
  /**
   * 渲染日历面板content区域
   */
  renderContent: function () {
    return `
      <div class="content">
        <div class="picker-weeks">
          ${this.renderWeeks()}
        </div>
        <div class="picker-days">
          ${this.renderDays()}
        </div>
      </div>
    `;
  },
  /**
   * 渲染日历面板内容 星期 区域
   */
  renderWeeks: function () {
    var template = '';
    for(var i = 0; i < this.weeks.length; i ++) {
      template += `<div>${this.weeks[i]}</div>`;
    }
    return template;
  },
  /**
   * 渲染日历面板内容 天数 区域
   */
  renderDays: function () {
    var template = '';
    for(var i = 0; i < this.showDays.length; i ++) {
      var date = this.showDays[i]; // 获取每一次循环的日期对象
      template +=  `
        <div 
          class="
            ${!this.isCur(date).month ? 'other-month' : ''}
            ${this.isCur(date).day ? 'is-today' : ''}
            ${this.isCur(date).select ? 'is-select' : ''}
          "
          data-index=${i}
        >${date.getDate()}</div>
      `;
    }
    return template;
  },
  /**
   * 判断传入的日期对象是展示日期的月份、是否为当天、是否为被选择的那一天
   * @param {Data} date - 日期对象
   * @return {Object} - 包含判断结果的值
   */
  isCur: function (date) {
    // 获取传入日期对象的年、月、日
    var year = this.getYearMonthDay(date).year;
    var month = this.getYearMonthDay(date).month;
    var day = this.getYearMonthDay(date).day;

    // 获取当前展示日期的年、月
    var showDate = this.showDate;
    var showYear = showDate.year;
    var showMonth = showDate.month;

    // 获取今天的年、月、日
    var curDate = this.getYearMonthDay(new Date());
    var curYear = curDate.year;
    var curmonth = curDate.month;
    var curDay = curDate.day;

    // 获取选择日期的年、月、日
    var chooseDate = this.getYearMonthDay(new Date(this.chooseDay));
    var chooseYear = chooseDate.year;
    var chooseMonth = chooseDate.month;
    var chooseDay = chooseDate.day;
    
    return {
      month: year === showYear && month === showMonth, // 判断当前日期是否为本月，需要年月都相同
      day: year === curYear && month === curmonth && day === curDay, // 判断当前日期是否为今天，需要年月日都相同
      select: year === chooseYear && month === chooseMonth && day === chooseDay, // 判断当前日期是否为选择的那天，需要年月日都相同
    }
  },
  handle: function () {
    /**
     * 监听事件
     */
    var self = this;

    document.onclick = function (e) {
      var dom = e.target;
      var isElSon = self.el.contains(dom) && dom !== self.el;
      
      if(isElSon && !self.showPanel) {
        self.changePanel(true);
      } else if (!isElSon && self.showPanel){
        self.changePanel(false);
      }

      if(isElSon) {
        var isDay = dom.parentNode.classList.contains('picker-days'); // 判断当前点击元素的父元素是否为 picker-days
        var isBtn = dom.classList.contains('picker-btn');
        var isYearBtn = isBtn && dom.getAttribute('class').includes('-year'); // 判断是否为 更改“年”按钮
        var isMonthBtn = isBtn && dom.getAttribute('class').includes('-month'); // 判断是否为 更改“月”按钮

        if(isDay) {
          self.handleDay(dom);
        } else if(isYearBtn) {
          self.handleChangeYear(dom);
        } else if(isMonthBtn) {
          self.handleChangeMonth(dom);
        }
      }
      
    }
  },
  /**
   * 更改日历面板的显示状态
   * @param { Boolean } status - 被更改的状态
   */
  changePanel: function (status) {
    this.showPanel = status;
    var oPanel = this.el.getElementsByClassName('calendar')[0];
    oPanel.style.display = status ? 'block' : 'none';
  },
  /**
   * 点击日期
   */
  handleDay: function (dom) {
    var index = dom.dataset.index; // 获取点击元素的索引值
    var date = this.showDays[index]; // 根据索引值找到对应的日期对象
    var month = date.getMonth();
    this.chooseDay = this.getChooseDay(date); // 根据选择的日期对象，设置并获取选中的日期
    
    if(month !== this.showDate.month) {
      this.showDate.month = month;
      this.showDays = this.getShowDays(); // 更改显示日期数组
    }

    this.getDate(this.chooseDay); // 执行更改日期的回调函数，将更改后的选择日期作为参数传递过去
    this.changePanel(false); // 切换显示
    this.render();
  },
  /**
   * 更改年份
   */
  handleChangeYear: function (dom) {
    var isPrev = dom.getAttribute('class').includes('prev'); // 判断是否为 前一年 按钮
    var moveYear = isPrev ? -1 : 1; // 若为前一年，则移动-1年。否则移动 +1 年

    this.showDate.year += moveYear; // 更改显示日期的year

    this.showDays = this.getShowDays(); // 更改显示日期数组
    this.render();  // 重新渲染
  },
  /**
   * 更改月份
   */
  handleChangeMonth: function (dom) {
    var isPrev = dom.getAttribute('class').includes('prev'); // 判断点击是否为前一月
    var moveMonth = isPrev ? -1 : 1;  // 如果点击为“前”，则月份移动-1，否额移动+1
    var showDate = new Date(this.showDate.year, this.showDate.month, this.showDate.day); // 将this.showDate 变为真正的日期对象
    showDate.setMonth(this.showDate.month + moveMonth); // 通过日期对象设置月份

    this.showDate.year = this.getYearMonthDay(showDate).year; // 得到更改后的年份并设置当前显示日期的年份
    this.showDate.month = this.getYearMonthDay(showDate).month;  // 得到更改后的月份并设置当前显示日期的月份

    this.showDays = this.getShowDays(); // 重新获得showDays数组
    this.render(); // 重新渲染
  },
}