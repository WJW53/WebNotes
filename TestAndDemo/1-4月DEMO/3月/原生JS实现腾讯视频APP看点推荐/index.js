var video = {
  el: null,
  videoList: [],
  title: '',
  isShow: false,
  hasShowElement: false,
  init: function (options) {
    this.initData(options);
    this.render();
    this.handle();
  },
  initData: function (options) {
    this.el = options.el;
    this.videoList = this.changeVideoList(options.videoList);
    this.title = options.title;
  },
  changeVideoList: function (videoList) {
    // 目的是将获取到的分钟数字变成分钟:秒数的形式
    var length = videoList.length;

    for(var i = 0; i < length; i ++) {
      var video = videoList[i];
      var duration = video.duration;
      var second = duration % 60;
      var minute = (duration - second) / 60;
      minute = minute > 10 ? minute : '0' + minute;
      second = second > 10 ? second : '0' + second;
      duration = minute + ':' + second;
      video.duration = duration;
    }
    return videoList;
  },
  render: function () {
    this.el.innerHTML = this.renderTitleBox() + 
                        this.renderVideoList() +
                        this.renderShow();
  },
  renderTitleBox: function () {
    var template = `
      <div class="title-box">
        <div class="title">${this.title}</div>
        <div class="more"></div>
      </div>
    `;
    return template;
  },
  renderVideoList: function () {
    // 创建一个ul元素，class为video-list
    var oUl = document.createElement('ul');

    // 循环创建li元素
    var template = '';
    var length = this.videoList.length;
    for(var i = 0; i < length; i ++) {
      var video = videoList[i];
      template += `
        <li class="video">
          <div class="poster">
            <img src="${video.poster}" alt="">
            <div class="mask"></div>
            <span class="duration">${video.duration}</span>
          </div>
          <div class="video-title">${video.title}</div>
        </li>
      `;
    };

    oUl.innerHTML = template;
    
    oUl.classList.add('video-list');
    return oUl.outerHTML;
  },
  renderShow: function () {
    var template = `
      <div class="show"></div>
    `;
    return template;
  },
  handle: function () {
    var self = this;

    this.el.onclick = function (e) {
      var dom = e.target;
      var isMore = dom.classList.contains('more');

      if(isMore) {
        self.handleMore();
      }
    }
  },
  handleMore: function () {
    var oShow = this.el.getElementsByClassName('show')[0];
    if(!this.hasShowElement) {
      oShow.innerHTML = this.renderTitleBox() + this.renderVideoList();
      this.hasShowElement = true;
    }
    var oTitleBox = oShow.getElementsByClassName('title-box')[0];

    if(this.isShow) {
      oTitleBox.style.position = 'absolute';
      oTitleBox.style.top = 0;
      oShow.style.top = '100%';
    } else {
      oShow.style.top = '216px';
      setTimeout(function () {
        oTitleBox.style.position = 'fixed';
        oTitleBox.style.top = '215px';
      }, 300)
    }

    this.isShow = !this.isShow;
  },
}