
## input的新type

## Calendar类

0. placeholder
1. <input type="date"> 很方便,但是浏览器兼容性不好
2. <input type="number">   <!-- 只能输入数字,兼容性同date -->
3. 具体看html文件

- 总之,很多属性,浏览器不兼容,一般不使用



## contentediable属性

0. 默认值是false
1. 填写true才会体现出效果..可编辑内容
2. **这个属性是没有兼容性问题的,可使用**
3. 一般用于可修改的表格
4. **这个属性可继承的**
5. 内嵌的时候即便子元素有false,还是可以删除的



## draggable(拖拽)属性

1. 只有chrome和Safari下可以正常使用,Firefox
2. a、img标签默认的draggable就是true
3. 拖拽的生命周期: 拖拽开始,拖拽进行中,拖拽结束.
4. 拖拽的组成: 被拖拽的物体(目标元素), 目标区域.

5. 关于目标元素的拖拽事件:
    1). 按下的瞬间不会触发ondragstart事件,必须至少挪动一点点才会触发这个事件
    2). **里面的clientx/y是鼠标点的起始结束位置 -->> 很方便知道移动了多少距离**
    3). ondrag是拖拽移动事件,ondragend是拖拽结束事件
    4). ondragenter事件:不是元素的图形进入就触发的,而是鼠标进入目标区域才算enter

6. 关于目标区域的拖拽事件:
    1). 有四个事件: enter over leave drop(目标区域里放下,在end事件之前)
    2). 必须在dragover事件触发函数里添加e.preventDefault();   
    3). ondragover(结束) -> 然后回到原处(这是默认事件)
                                -> 执行drop事件(所以需要先阻止上面的默认事件,在dragover上做文章) 
            一个行为可以触发多个事件

    4). 责任链模式:  A -> B(阻) -> C(默认事件,若你想阻止C的发生,那么必须在B上做阻止)               

7. HTML里的所有的标签元素,当拖拽周期结束时,默认事件是回到原处,所以此时不会触发drop事件    



## dataTransfer属性补充

- 不是很重要,因为兼容性不好

1. 它在事件对象里, e.dataTransfer
2. **e.dataTransfer.effectAllowed**这个属性必须在dragstart事件里设置,兼容性极差
3. **e.dataTransfer.dropEffect = 'link';**这个属性必须在drop事件里设置,兼容性极差
4. *上述这俩属性是用来控制拖拽之后指针的变化的*

