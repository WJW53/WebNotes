var recommend = {
  index: 0,
  init: function (options) {
    this.initData(options);
    this.render();
    this.handle();
    this.autoMove(++ this.index);
  },
  initData: function (options) {
    this.el = options.el;
    this.oMain = this.el.getElementsByClassName('main')[0];
    this.oList = this.el.getElementsByClassName('list')[0];
    this.list = options.list;
  },
  render: function () {
    var template = '';

    for(var i = 0; i < this.list.length; i ++) {
      var item = this.list[i];
      template += `
        <li 
          class="item ${i === this.index ? 'active' : ''}" 
          title="${item.title}：${item.desc}"
          data-index=${i}
        >
          <span class="title">${item.title}</span>
          ${item.desc}
        </li>
      `;
    }

    this.oList.innerHTML = template;
  },
  handle: function () {
    this.handleEnter();
    this.handleLeave();
  },
  handleLeave: function () {
    var self = this;
    this.oList.onmouseleave = function () {
      self.autoMove(self.getIndex(++ self.index))
    }
  },
  handleEnter: function () {
    var self = this;
    var oItemMap = this.oList.getElementsByClassName('item');
    for(var i = 0; i < oItemMap.length; i ++) {
      (function(j) {
        oItemMap[i].onmouseenter = function () {
          clearTimeout(self.timer);
          self.changePic(j);
          self.index = j;
        }
      })(i)
    }
  },
  autoMove: function (i) {
    var self = this;

    this.timer = setTimeout(function () {
      self.changePic(i);
      self.autoMove(self.getIndex(++ self.index));
    }, 3000)
  },
  changePic: function (i) {
    var oItem = this.oList.getElementsByClassName('item')[i];
    var oActive = this.oList.getElementsByClassName('active')[0];
    if(oItem === oActive) { return };
    oItem.classList.add('active');
    oActive.classList.remove('active');
    this.oMain.style.backgroundImage = `url(${this.list[i].poster})`;
    this.oMain.style.backgroundColor = this.list[i].color;
  },
  getIndex: function (index) {
    var maxIndex = this.list.length - 1;

    if(index > maxIndex) {
      this.index = 0;
      return 0;
    }

    return index;
  },
};