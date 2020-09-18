# selector

- 多查查mdn/w3c,看看Note,因为这个是更改了最初定义的知识

Pseudo  --  虚伪的

1. Relationship Selectors: 
    E + F  :  并列结构条件下的,下一个满足条件的兄弟元素节点
    E ~ F  :  并列结构条件下的,下一堆全部的满足条件的兄弟元素节点


2. Atrribute Selectors
    E[attr~="val"]:  属性值(attr可以写class,因为clalss也是属性)里面,存在一个独立的val单词
    E[attr|="val"]:  属性值必须以val开头,且只能有这一个字符串,连空格在首尾都匹配不了
    E[attr^="val"]:  属性值必须val开头(val可以是第一个单词的子串),但必须严格以val开头,空格也可以
    E[attr&="val"]:  属性值必须val结尾(val可以是子串),同上
    E[attr*="val"]:  只要属性值存在val字样即可,val是整个字符串的子串即可,用这个容易出错


3. Pseudo-Element Selectors
    E::placeholder      E::selection
    **必须用两个冒号**
    - placeholder/selection其实都是伪元素

**::selection选择器匹配元素中被用户选中或处于高亮状态的部分。**
::selection只可以应用于少数的CSS属性：color, background, cursor,和outline。


4. Pseudo-Classes Selectors

    **必须用一个冒号**
1. 
    E:not(s)   非...
    E:root(一般前面不写E,可以写html:root 但一般直接写:root)   
    E:target(有用) : location.hash = xxx,之后,操作对应的锚点(某个标签的id的值与a标签相同)
        - 代表一个唯一的页面元素(目标元素),其id 与当前URL片段匹配 .
        - 可以改变结构上不相干元素的状态

- Selector中  :root  ==  html,区别在于：:root 是 **根标签选择器**,即包含html,xml等...

---------------------------------

2.  
    E:first-child   表示在一组兄弟元素中的第一个元素。(parent不再是必须的)
    E:last-child    代表父元素的最后一个子元素(现在的版本body不算父亲)
    E:only-child    匹配没有任何兄弟元素的元素.等效的选择器还可以写成 :first-child:last-child或者:nth-child(1):nth-last-child(1),当然,前者的权重会低一点.

    E:nth-child(n)  :nth-child(an+b) 这个 CSS 伪类首先找到所有当前元素的兄弟元素，然后按照位置先后顺序从1开始排序，选择的结果为CSS伪类:nth-child括号中表达式（an+b）匹配到的元素集合（n=0，1，2，3...）
    E:nth-last-child(n)     同上,但 是从兄弟节点中 从后往前 匹配处于某些位置的元素

**以上5种写法都考虑其他兄弟元素对其本身位置的影响,故不常用**

---------------------------------

3.  
    E:first-of-type         表示一组兄弟元素中其类型的第一个元素。
    E:last-of-type          表示了在（它父元素的）子元素列表中，最后一个给定类型的元素。当代码类似Parent tagName:last-of-type的作用区域包含父元素的所有子元素中的最后一个选定元素，也包括子元素的最后一个子元素并以此类推。

    E:only-of-type          代表了任意一个元素，这个元素没有其他相同类型的兄弟元素。
E:nth-of-type(n)  *最常用,是针对具有一组兄弟节点的标签,用 n 来筛选出在一组兄弟节点的位置*
    E:nth-of-last-type(n)   匹配那些在它之后有 an+b-1 个相同类型兄弟节点的元素，其中 n 为正值或零值。它基本上和 :nth-of-type 一样，只是它从结尾处反序计数，而不是从开头处。

**以上5种都不考虑其他兄弟元素对其本身位置的影响,故常用**

4.  
    E:empty     代表没有子元素的元素。子元素只可以是元素节点或文本（包括空格）。注释或处理指令都不会产生影响。

    E:checked   表示任何处于选中状态的radio(<input type="radio">), checkbox (<input type="checkbox">) 或("select") 元素中的option HTML元素("option")。
            *Note:因为浏览器经常将<option>视为可替换元素,因此不同的浏览器通过:checked伪类渲染出来的效果也不尽相同.*

    E:enabled   表示任何被启用的（enabled）元素。如果一个元素能够被激活（如选择、点击或接受文本输入），或者能够获取焦点，则该元素是启用的。元素也有一个禁用的状态（disabled state），在被禁用时，元素不能被激活或获取焦点。

    E:disabled  表示任何被禁用的元素。如果一个元素不能被激活（如选择、点击或接受文本输入）或获取焦点，则该元素处于被禁用状态。元素还有一个启用状态（enabled state），在启用状态下，元素可以被激活或获取焦点。


5. 
    E:read-only    表示元素不可被用户编辑的状态（如锁定的文本输入框）。 
        - 带readonly属性的标签,默认自带disabled属性

    E:read-write   代表一个元素（例如可输入文本的 input元素）可以被用户编辑。



