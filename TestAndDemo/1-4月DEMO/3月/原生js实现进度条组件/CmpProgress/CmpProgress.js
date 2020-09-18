window.onload = function () {
  CmpProgress.prototype = {
    name: 'cmp-progress', // 组件的名字
    el: null,
    percentage: null,
    status: null, 
    'stroke-width': null,
    'text-inside': null,
    // 设置要注册的属性值，即为要使用的属性值
    // 可通过该props对属性进行校验，如类型校验、设置默认值、自定义校验
    props: {
      percentage: {
        type: Number,
        default: 0,
        validator (prop) {
          return prop <= 100 && prop >= 0;
        }
      },
      status: {
        type: String,
        default: 'default',
        validator (prop) {
          return ['default', 'success', 'exception', 'warning'].indexOf(prop) !== -1;
        }
      },
      'stroke-width': {
        type: Number,
        default: 6
      },
      'text-inside': {
        type: Boolean,
        default: false
      }
    },
    init: function (el) {
      // 初始化函数，暴露出去的函数
      this.initData(el);
      this.getAttrVal();
      this.render();
    },
    initData: function (el) {
      // 初始化数据
      this.el = el;
    },
    getAttrVal: function () {
      // 获取元素行间特性
      var props = Object.keys(this.props); // Object.keys可以返回一个有对象key值组成的数组
      for(var i = 0; i < props.length; i ++) {
        var attrKey = props[i]; // 特性 key 值
        var attrVal = this.el.getAttribute(attrKey); // 特性 value 值
        var prop = this.validate(attrKey, attrVal); // 经过校验后的属性值
        if(!prop) { return }; // 如果属性未空，则返回
        this[attrKey] = prop; // 将属性挂在 this 上
      }
  
    },
    validate: function (attrKey, attrVal) {
      // 校验属性
      var propRule = this.props[attrKey]; // 获取校验规则
      var prop = ''; // 定义一个 prop 属性 值
  
      // 如果传递的属性值为空，并且存在默认值，那么则设置该属性值为默认值
      if(!attrVal && propRule.default) {
        return propRule.default;
      }
  
      // 根据属性的类型给prop赋值
      if(propRule.type === String) {
        // 若类型为String，则赋值为传递的值本身
        prop = attrVal;
      } else if(propRule.type === Number) {
        // 若类型为Number，则赋值为其数字形式
        prop = Number(attrVal);
      } else if(propRule.type === Boolean) {
        // 若类型为Boolean，则赋值为true
        prop = attrVal ? true : false;
      }
  
      // 如果校验规则中存在 validator 自定义校验
      // 则执行该函数，判断是否成功
      if(propRule.validator) {
        var flag = propRule.validator(prop);
        if(!flag) {
          // 若校验未成功，则抛出警告
          console.warn(`${this.name}组件的属性${attrKey}未校验成功`);
        }
      }
  
      return prop;
    },
    render: function () {
      // 渲染函数
      var template = `
        <div class="cmp-progress">
          <div 
            class="line" 
            style="
              height: ${this['stroke-width']}px;
              width: ${this['text-inside'] ? '100%' : '94%'};
              margin-right: ${this['text-inside'] ? '0' : '1%'}
            "
          >
            <div class="bottom"></div>
            <div 
              class="top ${this.status !== 'default' ? this.status : ''}"
              style="width: ${this.percentage}%"
            >
              ${this['text-inside'] ? `<div class="inside-text" style="line-height: ${this['stroke-width']}px">${this.percentage}%</div>` : ''}
            </div>
          </div>
          ${this['text-inside'] ? '' : `<div class="outer-text">${this.percentage}%</div>`}
        </div>
      `;
      this.el.outerHTML = template;
    },
  }
  
  function CmpProgress (dom) {
    this.init(dom)
  };
  
  // 获取所有 cmp-progress 元素
  var oCmpProgressList = document.getElementsByTagName('cmp-progress');
  // 遍历该元素
  for(var i = oCmpProgressList.length - 1; i >= 0; i --) {
    var oCmpProgress = oCmpProgressList[i];
    // 执行函数，传递dom元素
    new CmpProgress(oCmpProgress);
  }
}