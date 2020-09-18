var filterGoods = {
  filterList: {}, // 过滤列表
  /**
   *  初始化函数
   * @param {Object} options - 配置对象
   */
  init: function (options) {
    this.initData(options);
    this.render();
    this.handle();
  },
  /**
   * 初始化数据函数
   * @param {Object} options - 配置对象
   */
  initData: function (options) {
    this.el = options.el;
    this.goodsList = this.changeGoodsList(options.goodsList);
    console.log(this.goodsList);
  },
  /**
   * 更改商品列表
   * @param {Array} goodsList - 商品列表
   */
  changeGoodsList: function (goodsList) {
    for(var i = 0; i < goodsList.length; i ++) {
      var goods = goodsList[i];
      goods.typeList.splice(0, 0, '全部');
      goods.index = 0;
    }
    return goodsList;
  },
  /**
   * 渲染函数
   */
  render: function () {
    var template = this.renderGoods() + this.renderChooseType();
    this.el.innerHTML = template;
  },
  /**
   * 渲染商品列表
   */
  renderGoods: function () {
    var template = '';
    for(var i = 0; i < this.goodsList.length; i ++) {
      var goods = this.goodsList[i];
      template += `
        <div class="goods">
          <div class="goods-title">品类：</div>
          <ul class="type-list">
            ${ this.renderType(goods.typeList, i, goods.index) }
          </ul>
        </div>
      `;
    }
    return template;
  },
  /**
   * 渲染种类列表
   * @param { Array } typeList - 种类列表
   * @param { Number } goodsIndex - 商品品类索引
   * @param { Number } chooseIndex - 选择的商品种类索引
   */
  renderType: function (typeList, goodsIndex, chooseIndex) {
    var template = '';

    for(var i = 0; i < typeList.length; i ++) {
      template += `
        <li 
          class="type ${i === chooseIndex ? 'type--active' : ''}"
          data-goods-index=${goodsIndex}
          data-type-index=${i}
        >${typeList[i]}</li>
      `;
    }

    return template;
  },
  /**
   * 渲染选择种类
   */
  renderChooseType: function () {
    return `
      <div class="choose-type">
        <div class="choose-title">已选条件</div>
        <span class="no-goods ${ this.noFilterType() ? '' : 'no-goods--hide'}">暂时没有选择过滤条件</span>
        <ul class="filter-list">
          ${ this.renderFilterGoods() }
        </ul>
      </div>
    `;
  },
  /**
   * 渲染过滤商品列表
   */
  renderFilterGoods: function () {
    var template = '';

    for(var key in this.filterList) {
      template += `
        <li class="filter-type">
          <span>${this.filterList[key]}</span>
          <span 
            class="delete-type"
            data-goods-index=${key}
          >x</span>
        </li>
      `;
    }

    return template;
  },
  /**
   * 判断filter列表中是否有值
   * 逻辑：
   * 由于filterList为一个对象，所以现将对象转换为字符串，和"{}"进行比较：
   *  如果相等，则没有过滤列表
   *  如果不等，则拥有过滤列表
   * 
   * @returns { Boolean } - 是否拥有过滤列表
   */
  noFilterType: function () {
    var filterStr = JSON.stringify(this.filterList);
    if(filterStr === '{}') {
      return true;
    }
    return false;
  },
  /**
   * 监听事件函数
   */
  handle: function () {
    var self = this;

    this.el.onclick = function (e) {
      // 获取到触发了点击事件的元素
      var dom = e.target;
      // 判断dom是否为type，通过判断该dom的class列表是否包含type
      var isTypeDom = dom.classList.contains('type');
      // 判断dom是否为delete-type，通过判断该dom的class列表是否包含delete-type
      var isDeleteDom = dom.classList.contains('delete-type');

      if(isTypeDom) {
        self.handleType(dom)
      } else if(isDeleteDom) {
        self.handleDelete(dom);
      }

    }
  },
  /**
   * 点击type时，执行的函数
   * 逻辑：
   * 1. 需要知道点击的是哪个品类
   * 2. 需要知道点击的是哪个种类
   * 3. 判断点击的种类是否为"全部"
   *  3-1. 若是，则删除filerList中的该品类的内容
   *  3-2. 若不是，将该种类添加进入filterList
   * @param {Object} dom - 被点击的元素
   */
  handleType: function (dom) {
    // 获取到商品品类索引，类型为Number
    var goodsIndex = +dom.dataset.goodsIndex;
    // 获取到商品种类索引，类型为Number
    var typeIndex = +dom.dataset.typeIndex;
    // 获取到该商品品类的描述对象
    var goods = this.goodsList[goodsIndex];
    // 获取到种类名称
    var type = dom.innerText;

    if(type === '全部') {
      goods.index = 0;
      delete this.filterList[goodsIndex];
    } else {
      goods.index = typeIndex;
      this.filterList[goodsIndex] = type;
    }

    this.render();
  },
  /**
   * 点击删除时，执行的函数
   * 逻辑：
   * 1. 获取到点击的删除元素是哪个品类
   * 2. 删除filterList中的品类
   * 3. 重置该品类的种类索引为0
   * 4. 重新渲染元素
   * @param {Object} dom - 点击的删除元素
   */
  handleDelete: function (dom) {
    var goodsIndex = dom.dataset.goodsIndex;
    delete this.filterList[goodsIndex];
    this.goodsList[goodsIndex].index = 0;
    this.render();
  },
}