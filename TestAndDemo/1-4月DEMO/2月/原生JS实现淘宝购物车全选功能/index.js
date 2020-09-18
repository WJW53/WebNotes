var data = [
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i1/TB1VtAgdlWD3KVjSZFs3KIqkpXa_040950.jpg_80x80.jpg',
    title: '渡一教育 CSS3 深度剖析',
    price: 1299,
    cart: 1,
    id: 0,
  },
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i7/TB1_VJecBWD3KVjSZKPagip7FXa_045814.jpg_80x80.jpg',
    title: '渡一教育 移动端开发课程',
    price: 1148,
    cart: 1,
    id: 1595402664708
  },
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i2/TB1J.Q4cQxz61VjSZFto7uDSVXa_010347.jpg_80x80.jpg',
    title: '渡一教育 2019年 HTMLCSS零基础入学宝典',
    price: 1,
    cart: 1,
    id: 1596305473062
  },
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i2/TB1bHwlaCWD3KVjSZSgVbgCxVXa_032434.jpg_80x80.jpg',
    title: '渡一教育 Web前端开发JavaScriptJs课',
    price: 1,
    cart: 1,
    id: 1595413512182
  },
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i2/TB1MJd3g4z1gK0jSZSgnHevwpXa_014447.jpg_80x80.jpg',
    title: 'Web前端开发高级工程师全阶班【渡一教育】',
    price: 12798,
    cart: 1,
    id: 1596302161181
  },
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i6/TB1xPeAbwaH3KVjSZFpjaLhKpXa_105848.jpg_80x80.jpg',
    title: '渡一教育 Java零基础入门到精通（集合，泛型等）',
    price: 1,
    cart: 1,
    id: 1596300025301,
  },
];

(function (data) {
  var el = document.getElementsByClassName('cart-box')[0]; 
  var oGoodsList = el.getElementsByClassName('goods-list')[0];
  var oPriceBox = el.getElementsByClassName('price-box')[0]; 
  var oPrice = oPriceBox.getElementsByClassName('price')[0];
  var oCount = oPriceBox.getElementsByClassName('count')[0];
  var oSelectAllList = el.getElementsByClassName('radio--all');

  var selectAllLength = oSelectAllList.length;
  var dataLength = data.length;
  var template = '';
  var totalPrice = 0;
  var totalCount = 0;
  var checkedAll = true;
  
  function init () {
    addDataChecked();
    render();
    handle();
  }
  
  // 向数组中的每一项添加checked属性，值为false，用于标记当前商品被选中的状态
  function addDataChecked () {
    for(var i = 0 ; i < dataLength; i ++) {
      data[i].checked = false;
    }
  }
  
  function render () {
    template = '';
    totalPrice = 0;
    totalCount = 0;
    checkedAll = true;

    for(var i = 0; i < dataLength; i ++) {
      var goods = data[i];
      renderGoods(goods, i);
      if(goods.checked) {
        renderTotalPrice(goods.price);
        renderToTalCount();
      } else {
        checkedAll = false;
      }
    }
    renderGoodsNum ();
    renderSelectAll();
    oGoodsList.innerHTML = template;
    oPrice.innerText = '￥' + totalPrice;
    oCount.innerText = `结算(${totalCount})`; // 设置元素的文本为count
  }
  
  // 渲染购物车内总宝贝数量
  function renderGoodsNum () {
    var oNum = el.getElementsByClassName('num')[0];
    oNum.innerText = dataLength; // 宝贝熟练为数据数组的长度
  }
  
  // 通过数组数据渲染购物车内的商品
  function renderGoods (goods, i) {

    template += `
      <div class="goods">
        <div class="radio ${goods.checked ? 'radio--active' : ''}" data-index="${i}"></div>
        <div class="poster">
          <img src="${goods.poster}" alt="${goods.title}">
        </div>
        <div class="goods-title">
          <div class="title">${goods.title}</div>
          <div class="price">￥${goods.price}</div>
        </div>
      </div>
    `;
  }
  
  // 渲染所有选中商品价格之和
  function renderTotalPrice (price) {
    totalPrice += price;
  }
  
  // 渲染选择商品总数量
  function renderToTalCount () {
    totalCount += 1;
  }
  
  // 渲染全选按钮
  function renderSelectAll () {

    for(var i = 0 ; i < selectAllLength; i ++) {
      var oSelectAll = oSelectAllList[i];
      if(checkedAll) {
        // 如果checked为true，则在全选按钮元素上添加class：radio--active
        oSelectAll.classList.add('radio--active');
      } else {
        // 如果checked为false，则移除缘轩按钮元素的radio--active 类名
        oSelectAll.classList.remove('radio--active');
      }
    }
  }
  
  // 监听父元素的点击事件
  function handle () {
    el.onclick = function (e) {
      var dom = e.target;  // 拿到触发事件的元素
      var isRadio = dom.classList.contains('radio'); // 判断元素是否为radio
      if(!isRadio) { return };  // 如果不是，则什么都不做
      var isSelectAll = dom.classList.contains('radio--all');  // 判断当前元素是否为全选按钮
      var isActive = dom.classList.contains('radio--active'); // 获取当前元素的点击状态
      if(isSelectAll) {
        handleSelectAll(isActive); // 点击全选按钮时执行该函数
      } else {
        handleSingleRadio(dom, isActive) // 点击非全选按钮时执行该函数
      }
      render();  // 渲染元素
    }
  }
  
  function handleSelectAll (isActive) {
    // 点击全选按钮时，将data中每一个对象的checked设置为当前该按钮状态的反值
    for(var i = 0; i < dataLength; i ++) {
      data[i].checked = !isActive;
    }
  }
  
  function handleSingleRadio (dom, isActive) {
    // 获取到当前点击按钮的index，设置data[index]的checked为当前按钮点击状态的反值
    var index = dom.dataset.index;
    data[index].checked = !isActive;
    render(); // 渲染元素
  }
  
  init();
})(data)