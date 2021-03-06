# 浮动(盒子)

视觉格式化模型，大体上将页面中盒子的排列分为三种

1. 常规流
2. 浮动
3. 定位

## 应用场景

1. 文字环绕
2. 横向排列

## 浮动的基本特点

> 修改float属性值为：

- left: 左浮动，元素靠上靠左
- right: 右浮动，元素靠上靠右

默认值为none

1. **当一个元素浮动后，元素必定为块盒,display属性值更改为了block**
2. 浮动元素的包含块，和常规流一样，为父元素的内容盒

## 盒子尺寸特点

1. 宽度为auto时，表示适应内容宽度。
2. 高度为auto时，与常规流一致，表示适应内容的高度。
3. margin为auto时，各个方向均为0.
4. 边框、内边距、百分比设置与常规流一致

## 盒子排列特点

1. 左浮动的盒子靠上靠左
2. 右浮动的盒子靠上靠右
3. *浮动盒子在包含块中排列时，会避开常规流盒子*。body部分代码，浮动在后，常规在前
4. ***But常规流块盒在排列时,无视浮动盒子***。body部分代码，浮动在前，常规在后
5. 行盒在排列的时候，会避开浮动盒子
6. ***外边距合并不会发生***

> **如果文字没有在行盒中，浏览器会自动生成一个行盒包裹文字(想象成span)，该行盒叫做匿名行盒,故仍会避开浮动盒子**

## 高度坍塌

用浮动方式给网页布局时，最常出现的问题就是高度坍塌。

*高度坍塌的根源：常规流盒子的自动高度(适应内容)，在计算时，不考虑浮动盒子*

解决方式：

> 清除浮动：涉及CSS属性：clear

- clear默认属性值为none
- 取值left：清除左浮动，该元素必须出现在前面所有左浮动盒子的下方(代码段处于逻辑最后)
- 取值right：清除右浮动，该元素必须出现在前面所有右浮动盒子的下方
- 取值both；清除左右浮动，该元素必须出现在前面所有浮动盒子的下方