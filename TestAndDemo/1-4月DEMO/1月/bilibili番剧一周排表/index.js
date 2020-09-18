var timeline = {
  el: null,
  weekArr: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  weekIndex: 1,
  dataTimeLine: [],
  init: function (options) {
    this.initData(options);
    this.render();
    this.handle();
  },
  initData: function (options) {
    this.el = this.addElClass(options.el);
    this.dataTimeLine = this.addNewToTimeLine(options.dataTimeLine);
  },
  addElClass: function (el) {
    el.setAttribute('class', 'time-line');
    return el;
  },
  addNewToTimeLine: function (dataTimeLine) {
    return dataTimeLine;
  },
  render: function () {
    this.el.innerHTML = this.renderTlTitle() + this.renderZoneListBox();
  },
  renderTlTitle: function () {
    return `
      <div class="tl-title">
        <div class="tl-week">
          <div class="anime"></div>
          <div class="name">番剧</div>
          <div class="tab-switch">
            ${this.renderTabSwitchItem()}
          </div>
        </div>
      <a href="./another-page/index.html" target="_blank" class="tl-link">新番时间表 &gt;</a>
      </div>
    `;
  },
  renderTabSwitchItem: function () {
    var template = '';

    for(var i = 0 ; i < this.weekArr.length; i ++) {
      template += `
        <div 
          class="tab-switch-item ${i+1 === this.weekIndex ? 'on' : ''}" 
          data-week-index=${i+1}
        >
          ${this.weekArr[i]}
        </div>
      `;
    }

    return template;

  },
  renderZoneListBox: function () {
    return `
      <div class="zone-list-box">
        ${ this.renderTimeLineCard()}
      </div>
    `;
  },
  renderTimeLineCard: function () {
    var episodes = this.getEpisodes();
    var template = '';

    for(var i = 0; i < episodes.length; i ++) {
      var episode = episodes[i];
      template += `
        <div class="time-line-card">
          <img src="${episode.square_cover}" alt="" class="card-poster">
          <div class="card-body">
            <div class="card-title">${episode.title}</div>
            <div class="card-desc">${episode.pub_index}</div>
          </div>
        </div>
      `;
    }

    return template;
  },
  getEpisodes: function () {
    var episodes;

    for(var i = 0; i < this.dataTimeLine.length; i ++) {
      var timeline = this.dataTimeLine[i];
      if(timeline.day_of_week === this.weekIndex) {
        episodes = timeline.episodes;
        break;
      }
    }

    return episodes;
  },
  handle: function () {
    var self = this;
    this.el.onclick = function (e) {
      var dom = e.target;
      var isTabSwitchItem = dom.classList.contains('tab-switch-item');

      if(isTabSwitchItem) {
        self.handleTabSwitchItem(dom);
      }
    }
  },
  handleTabSwitchItem: function (dom) {
    var weekIndex = dom.dataset.weekIndex;
    this.weekIndex = Number(weekIndex);
    this.render();
  }
}