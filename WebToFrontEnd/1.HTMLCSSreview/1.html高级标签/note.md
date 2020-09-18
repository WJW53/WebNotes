# html高级标签

复习: div、span很重要,两个容器,绑定化操作,便于操作

## 

1. 空格不代表空格文本,而是代表文本分隔符
2. &nbsp;才代表空格文本,只等于一个空格
3. <br>标签代表回车换行。自己就是一个功能的标签,称为单标签,不需要包裹其他东西就可以完成功能。
- <hr>代表一条水平线

4. ol的type属性有5种不同的值,iI是罗马数字,aA是按英文字母,1是按阿拉伯数字;
- start属性是开始排的序号,3代表第三个,不管前面的type是什么,但就按那个规则的第3个开始排
5. 基督教:天主教、新教、东正教
6. ul,li使用频率很高。type属性的默认值是disc实心圆,其他值square实心方块,circle空心圈.柜子-抽屉
7. li下仍然可以有ul

8. img的src属性:        alt属性,图片占位符:图片无法正常显示时,对图片的描述；title属性图片提示符
- 网上的url
- 本地的绝对/相对路径

9. a标签(anchor:抛锚)的href:HyperText reference,超文本引用(参考)。target属性值:_blank,产生一个新页面
- **1).最原始功能是,记录锚点的使用位置.可在href里写#id属性值,来跳转到相应位置**  
- 2. 超链接
- 3. 打电话/发邮件.都在href中操作:href="tel:17821335342";mailto:
- 4. 协议限定符  href="javascript:" ,只要点击这个a标签,然后就可以运行js代码了

10. **form表单标签:可以把前端的数据发给后端**,method是数据发送的方式,action是数据要发向的地址
- 传送数据必须要有数据名和数据值
```
<form method="get/post" action="">
    <select>
    </select>

    <input>
    </form>
```

11. input,type属性值为radio是单选框,配合name属性(数据名,弄成同一题)使用,value属性就是数据值
- onfocus聚焦时,onblur失去焦点
- type为checkbox时是复选框
- **增加默认选中(加强用户体验性,--> 就是让他们更懒) 利用:checked="checked"属性**

12. select标签,通常里面配合option使用,直接在select里写name,就代表了这里面的option的题目 
- select代表片段,h5用来取代div的,但是目前并没有成功