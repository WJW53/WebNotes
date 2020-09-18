Component.prototype = {
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
};

function Component () {}