var calendar = {
  date: new Date(),
  el: document.getElementsByClassName('calendar')[0],
  weeks: ['日', '一', '二', '三', '四', '五', '六'],
  showDate: {
    year: 0,
    month: 0,
    day: 0,
  },
  init: function (callback) {
    this.initData(this.date, callback);
    this.render();
    this.handle();
  },
  initData: function (date, callback) {
    this.showDate = this.getYearMonthDay(date); // 获取当前显示的日期
    this.showDays = this.getShowDays(); // 显示日期的数组
    this.chooseDay = this.getChooseDay(this.showDate); // 获取选择的日期
    this.getDate = callback;
  },
  getShowDays: function () {
    var arr = [];
    var firstDay = new Date(this.showDate.year, this.showDate.month, 1);  // 获取本月第一天
    var firstDayWeek = firstDay.getDay(); // 获取本月第一天是周几
    var startDay = +firstDay - firstDayWeek * 24 * 60 * 60 * 1000;  // 获取本月日历起始日期

    for(var i = 0; i < 42; i ++) {
      var day = new Date( startDay + i * 24 * 60 * 60 * 1000 );
      arr[i] = day;
    }

    return arr;
  },
  getChooseDay: function (date) {
    if(date instanceof Date) {
      // 判断date是否为日期对象
      return date.getFullYear() + '-' + ( date.getMonth() + 1)+ '-' + date.getDate();
    } else {
      return date.year + '-' + ( date.month + 1)+ '-' + date.day;
    }
  },
  render: function () {
    this.el.innerHTML = this.renderHeader() + this.renderContent();
  },
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
  renderWeeks: function () {
    var template = '';
    for(var i = 0; i < this.weeks.length; i ++) {
      template += `<div>${this.weeks[i]}</div>`;
    }
    return template;
  },
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
    return template.trim();
  },
  isCur: function (date) {
    // 获取传入日期对象的年、月、日
    var year = this.getYearMonthDay(date).year;
    var month = this.getYearMonthDay(date).month;
    var day = this.getYearMonthDay(date).day;

    // 获取当前展示日期的年、月
    var showYear = this.showDate.year;
    var showMonth = this.showDate.month;

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
  getYearMonthDay: function (date) {
    /**
     * 通过日期对象获取年、月、日
     */
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    return {
      year: year,
      month: month,
      day: day,
    }
  },
  handle: function () {
    /**
     * 监听事件
     */
    var self = this;
    this.el.onclick = function (e) {
      var dom = e.target;
      var isDay = dom.parentNode.classList.contains('picker-days') && !dom.classList.contains('other-month'); // 判断当前点击元素的父元素是否为 picker-days，并且当前点击元素不是非本月日期
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
  },
  handleDay: function (dom) {
    /**
     * 点击日期
     */
    var index = dom.dataset.index;
    var date = this.showDays[index];
    this.chooseDay = this.getChooseDay(date);
    this.getDate(this.chooseDay);
    this.render();
  },
  handleChangeYear: function (dom) {
    /**
     * 更改年份
     */
    var isPrev = dom.getAttribute('class').includes('prev'); // 判断是否为 前一年 按钮
    var moveYear = isPrev ? -1 : 1; // 若为前一年，则移动-1年。否则移动 +1 年
    this.showDate.year += moveYear; // 更改显示日期的year
    this.showDays = this.getShowDays(); // 更改显示日期数组
    this.render();  // 重新渲染
  },
  handleChangeMonth: function (dom) {
    /**
     * 更改月份
     */
    var isPrev = dom.getAttribute('class').includes('prev'); // 判断点击是否为前一月
    var moveMonth = isPrev ? -1 : 1;  // 如果点击为“前”，则月份移动-1，否额移动+1
    var showDate = new Date(this.showDate.year, this.showDate.month, this.showDate.day); // 通过this.showDate 对应得到日期对象
    showDate.setMonth(this.showDate.month + moveMonth); // 通过日期对象设置月份
    var showYear = this.getYearMonthDay(showDate).year; // 通过更改好的日期对象，得到更改后的年份
    var showMonth = this.getYearMonthDay(showDate).month; // 通过更改好的日期对象，得到更改后的月份
    this.showDate.year = showYear; // 设置当前显示日期的年份
    this.showDate.month = showMonth;  // 设置当前显示日期的月份
    this.showDays = this.getShowDays(); // 重新获得showDays数组
    this.render(); // 重新渲染
  }
}