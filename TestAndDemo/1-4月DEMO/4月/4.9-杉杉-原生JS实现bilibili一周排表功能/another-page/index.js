var timeline = {
  el: null,
  dataTimeLine: [],
  index: 5,
  moveIndex: 3,
  oArrowLeft: null,
  oArrowRight: null,
  oTlBodyList: null,
  oTlHeadList: null,
  init: function (options) {
    this.initData(options);
    this.render();
    this.handle();
  },
  initData: function (options) {
    var self = this;
    this.el = this.addElClass(options.el);
    this.dataTimeLine = options.dataTimeLine;

    setTimeout(function () {
      self.oArrowLeft = self.el.getElementsByClassName('arrow-left')[0];
      self.oArrowRight = self.el.getElementsByClassName('arrow-right')[0];
      self.oTlBodyList = self.el.getElementsByClassName('tl-body-list')[0];
      self.oTlHeadList = self.el.getElementsByClassName('tl-head-list')[0];
    }, 0)
  },
  addElClass: function (el) {
    el.setAttribute('class', 'timeline-container');
    return el;
  },
  render: function () {
    this.el.innerHTML = this.renderTimelineHeader() + this.renderTimelineWrapper();
  },
  renderTimelineHeader: function () {
    return `
      <div class="timeline-header">
        <div class="arrow arrow-left"></div>
        <div class="tl-weeks">
          <ul 
            class="tl-head-list"
            style="transform: translateX(-${330*this.index}px)"
          >${this.renderTlHeadList()}</ul>
        </div>
        <div class="arrow arrow-right"></div>
      </div>
    `;
  },
  renderTlHeadList: function () {
    var template = '';
    var length = this.dataTimeLine.length;

    for(var i = 0; i < length; i ++) {
      var timeline = this.dataTimeLine[i];
      template += `
        <li class="tl-head">
          <div class="tl-day ${timeline.is_today ? 'today' : ''}">
            <span class="indicator"></span>
            <div class="day-of-week week-${timeline.day_of_week}"></div>
            <span class="t-date">${timeline.date}</span>
            <span class="t-week">${this.getDayOfWeek(timeline.day_of_week)}</span>
          </div>
        </li>
      `;
    }

    return template;
  },
  renderTimelineWrapper: function () {
    return `
    <div class="timeline-wrapper">
      <div 
        class="tl-body-list"
        style="transform: translateX(-${330*this.index}px)"
      >${this.renderSeasonTimeline()}</div>
    </div>
    `;
  },
  renderSeasonTimeline: function () {
    var template = '';
    var length = this.dataTimeLine.length;

    for(var i = 0; i < length; i ++) {
      var timeline = this.dataTimeLine[i];
      
      template += `
        <div class="season-timeline">
          ${this.renderSeasonGroup(this.getSeasonsObj(timeline.seasons), timeline.is_today)}
        </div>
      `;

    }
    return template;
  },
  renderSeasonGroup: function (seasonObj, isToday) {
    var template = '';

    // 判断seasonObj是不是为一个空对象，如果为空对象，则给season-group元素添加season-empty class
    if(JSON.stringify(seasonObj) === '{}') {
      template = `<div class="season-group season-empty"></div>`;
    }

    for(var key in seasonObj) {
      template += `
        <div class="
          season-group 
          ${seasonObj[key][0].is_published ? 'is-published' : ''} 
          ${isToday ? 'today' : ''}"
        >
          <div class="group-time">${key}</div>
          <ul class="season-list">${this.renderSeasonList(seasonObj[key])}</ul>
        </div>
      `;
    }

    return template;
  },
  renderSeasonList: function (seasons) {
    var template = '';

    for(var i = 0; i < seasons.length; i ++) {
      var season = seasons[i];
      template += `
        <li class="season-item">
          <img src="${season.square_cover}" alt="${season.title}">
          <div class="season-body">
            <div class="season-title">${season.title}</div>
            <div class="season-desc ${season.is_published ? 'published' : ''}">${season.pub_index}</div>
          </div>
        </li>
      `;
    }

    return template;
  },
  getDayOfWeek: function (dayofweek) {
    /**
     * 根据数字返回星期文字
     */
    switch (dayofweek) {
      case 1:
        return '周一';
      case 2:
        return '周二';
      case 3:
        return '周三';
      case 4:
        return '周四';
      case 5:
        return '周五';
      case 6:
        return '周六';
      case 7:
        return '周日';
    }
  },
  getSeasonsObj: function (seasons) {
    /**
     * 将数组内，所有发布时间相同的对象，放入进一个数组内，最终将所有数组放入一个对象中，返回
     * 
     * 形式如: 
     * {
     *  12:00: [
     *    {},
     *    {},
     *    {}
     *  ]
     * }
     */
    var seasonObj = {};

    for(var i = 0; i < seasons.length; i ++) {
      var season = seasons[i];
      var pubTime = season.pub_time;

      // 如果该属性不存在，则先让其为数组
      if(seasonObj[pubTime] === undefined) {
        seasonObj[pubTime] = [];
      }

      // 向数组中添加对象
      seasonObj[pubTime].push({
        pub_index: season.pub_index,
        square_cover: season.square_cover,
        title: season.title,
        is_published: season.is_published,
      })
    }
    return seasonObj;
  },
  handle: function () {
    var self = this;
    this.el.onclick = function (e) {
      var dom = e.target;
      var isArrowLeft = dom.classList.contains('arrow-left');
      var isArrowRight = dom.classList.contains('arrow-right');

      if(isArrowLeft) {
        self.handleArrow('left');
      } else if(isArrowRight) {
        self.handleArrow('right');
      }
    }
  },
  handleArrow: function (type) {
    var moveIndex = type === 'right' ? this.moveIndex : -this.moveIndex; // 求得每一次改变的index范围
    var minIndex = 0; // 最小临界值
    var maxIndex = this.dataTimeLine.length - 3;  // 最大临界值
    this.index = this.index + moveIndex;  // 更改index

    if(this.index <= minIndex) {
      this.index = minIndex;
      this.oArrowLeft.style.display = 'none';
    } else if(this.index >= maxIndex) {
      this.index = maxIndex;
      this.oArrowRight.style.display = 'none';
    } else {
      this.oArrowLeft.style.display = 'block';
      this.oArrowRight.style.display = 'block';
    }

    // 更改元素的样式
    var transform = `translateX(-${330*this.index}px)`;
    this.oTlHeadList.style.transform = transform;
    this.oTlBodyList.style.transform = transform;

  }
}