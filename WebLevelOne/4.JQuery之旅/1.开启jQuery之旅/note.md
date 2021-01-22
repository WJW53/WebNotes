# JQuery

## 基础的一小部分

1. 核心全局函数：
	$ (jQuery)          **$和jQuery都是函数名,并且是绝对相等的**
	一顿操作猛如虎，全从$开始撸


2. 撸代码从选择开始:
	选择元素：
		$(); 此函数可以传递多种参数，返回值是对象（jq对象）
		
	参数规则：
		css selector、 jquery unique selector 
		null、undefined、dom
		$(function(){}) $(document).ready() 

		css selector和context

		http://www.w3school.com.cn/jquery/jquery_ref_selectors.asp


## jQuery使用的精髓

1. 选择元素
2. 循环操作
3. 链式调用(这个是重点！)