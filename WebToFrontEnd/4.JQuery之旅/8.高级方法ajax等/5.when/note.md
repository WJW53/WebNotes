# when

$.when();

参数可以是一个或多个延迟对象,返回值是promise对象

1. 一错全错,全对才对
2. 意思是,全是done才会执行then的第一个函数,但只要有一个fail就会执行then的第二个函数
3. 但要是有done,有progress,  那参数就按undefined算
4. 如果全是执行了progress,也就是notify();那就按notify的参数传