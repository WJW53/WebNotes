// 这个不算

var cmpButton = {
  name: 'cmp-button',
  props: {
    type: {
      type: String,
      validator: function (prop) {
        return ['primary', 'success', 'warning', 'danger', 'info', 'text'].indexOf(prop) !== -1;
      }
    },
    plain: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      validator: function (prop) {
        return ['medium', 'small', 'mini'].indexOf(prop) !== -1;
      },
    },
  },
  init: function (el) {
    this.initData(el);
    this.getAttrVal();
    this.render();
  },
  getAttrVal: function () {
    var props = Object.keys(this.props);
    for(var i = 0; i < props.length; i ++) {
      var attrKey = props[i];
      var attrVal = this.el.getAttribute(attrKey);
      var prop = this.validate(attrKey, attrVal);
      this[attrKey] = prop; // 将属性挂在 this 上
    }
  },
  validate: function (attrKey, attrVal) {
    // 校验属性
    var propRule = this.props[attrKey]; // 获取校验规则
    var prop = ''; // 定义一个 prop 属性 值 

    // 如果传递的属性值为空，并且存在默认值，那么则设置该属性值为默认值
    if(attrVal === null && 'default' in propRule) {
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
      prop = true;
    }

    // 如果校验规则中存在 validator 自定义校验
    // 则执行该函数，判断是否成功
    if(propRule.validator) {
      if(prop === null) { return null};
      var flag = propRule.validator(prop);
      if(!flag) {
        // 若校验未成功，则抛出警告
        console.error(`${this.name}组件的属性${attrKey}未校验成功`);
      }
    }

    return prop;
  },
  initData: function (el) {
    this.el = el;
  },
  render: function () {
    var typeClass = this.type ? `cmp-button--${this.type}` : '';
    var plainClass = this.plain ? `is-plain` : '';
    var roundClass = this.round ? `is-round` : '';
    var circleClass = this.circle ? `is-circle` : '';
    var disabledClass = this.disabled ? 'is-disabled' : '';
    var sizeClass = this.size ? `cmp-button--${this.size}` : ''
    var totalClass = ['cmp-button', typeClass, plainClass, roundClass, circleClass, disabledClass, sizeClass];

    var oButton = document.createElement('button');
    var cmpInnerHTML = this.el.innerHTML;
    oButton.innerHTML = cmpInnerHTML;

    for(var i = 0; i < totalClass.length; i ++) {
      if(totalClass[i] === '') { continue };
      oButton.classList.add(totalClass[i]);
    }



    this.el.outerHTML = oButton.outerHTML;

  },
}

// 这里才是
CmpButton.prototype = new Component();
CmpButton.prototype.name = 'cmp-button';
CmpButton.prototype.props = {
  type: {
    type: String,
    validator: function (prop) {
      return ['primary', 'success', 'warning', 'danger', 'info', 'text'].indexOf(prop) !== -1;
    }
  },
  plain: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    validator: function (prop) {
      return ['medium', 'small', 'mini'].indexOf(prop) !== -1;
    },
  },
};
CmpButton.prototype.render = function () {
  var typeClass = this.type ? `cmp-button--${this.type}` : '';
  var plainClass = this.plain ? `is-plain` : '';
  var roundClass = this.round ? `is-round` : '';
  var circleClass = this.circle ? `is-circle` : '';
  var disabledClass = this.disabled ? 'is-disabled' : '';
  var sizeClass = this.size ? `cmp-button--${this.size}` : ''
  var totalClass = ['cmp-button', typeClass, plainClass, roundClass, circleClass, disabledClass, sizeClass];

  var oButton = document.createElement('button');
  var cmpInnerHTML = this.el.innerHTML;
  oButton.innerHTML = cmpInnerHTML;

  for(var i = 0; i < totalClass.length; i ++) {
    if(totalClass[i] === '') { continue };
    oButton.classList.add(totalClass[i]);
  }
  this.el.outerHTML = oButton.outerHTML;
};

function CmpButton (el) {
  this.init(el);
}

var oCmpButtonMap = document.getElementsByTagName('cmp-button');

for(var i = oCmpButtonMap.length - 1; i >= 0; i --) {
  new CmpButton(oCmpButtonMap[i]);
}