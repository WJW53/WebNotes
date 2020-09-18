// 利用对象收编变量
// 好处：在团队开发中，要减少变量相互覆盖的问题，用一个对象收编变量，可以减少变量覆盖的风险，一旦变量被覆盖，所有的功能都会失效，此时，这种现象也是很明显的，错误排查起来会更快速


/**
 * 1. 监听input的事件（输入事件）
 * 2. 触发输入事件时，去查找数据，得到返回的数据,通过返回的数据渲染ul中的li数据
 */

var search = {
  inputDom: null,  // 输入框dom元素
  searchListDom: null,  // 搜索列表 dom 元素
  searchResList: [],  // 搜索结果列表
  inputFocus: false,  // 搜索框的聚焦状态，true为聚焦，false为失焦
  prevInputText: '',  // 上一次的搜索文字
  init: function (options) { // 初始化函数
    this.initData(options.el);  // 执行初始化数据
    this.handle();  // 执行事件监听函数
  },
  initData: function (el) {
    // 获取到输入框dom元素
    this.inputDom = el.getElementsByClassName('search-inp')[0].getElementsByTagName('input')[0];
    // 获取到搜索列表dom元素
    this.searchListDom = el.getElementsByClassName('search-list')[0];
  },
  handle: function () { // 事件监听函数
    this.hanldeInput(); // 执行监听输入框 输入事件 函数
    this.handleInputFocus(); // 执行监听输入框 聚焦事件 函数
    this.handleInputBlur(); // 执行监听输入框 失焦事件 函数
  }, 
  hanldeInput () { // 监听输入框 输入事件 函数
    var self = this;
    this.inputDom.oninput = function (e) {
      var inputText = e.target.value.trim();  // 拿到当前输入框中的文字
      if(inputText === self.prevInputText) { return };  // 如果当前输入框中的文字和上一搜索文字相同，则什么都不做
      getData(inputText, self.getSearchRes.bind(self)); // 执行获取数据函数
      self.prevInputText = inputText; // 将当前搜索文字赋值给prevInputText
    }
  },
  handleInputFocus () { // 监听输入框 聚焦事件 函数
    var self = this;
    this.inputDom.onfocus = function () {
      if(self.searchResList.length) {
        self.searchListDom.style.display = 'block';
        console.log('xxx');
      }
    }
  },
  handleInputBlur () { // 监听输入框 失焦事件 函数
    var self = this;
    this.inputDom.onblur = function () {
      self.searchListDom.style.display = 'none';
    }
  },
  getSearchRes (res) { // 获取搜索结果函数
    this.searchResList = res;
    this.render();
  },
  render () { // 渲染函数
    var searchResList = this.searchResList;
    var length = searchResList.length;
    var template = '';

    for(var i = 0; i < length; i ++) {
      var res = searchResList[i];
      template += `
        <li class="search-info">
          <div class="poster">
            <img 
              src="${res.img}" 
            >
          </div>
          <div class="content">
            <div class="title">
              <span>${res.title}</span>
              ${res.year ? `<span class="year">${res.year}</span>` : ''}
            </div>
            <div class="sub-title">${res.sub_title}</div>
            ${res.episode ? `<div class="episode">共${res.episode}集</div>` : ''}
          </div>
        </li>
      `;
    }
    this.searchListDom.innerHTML = template;
    this.searchListDom.style.display = length === 0 ? 'none' : 'block';
  },
}