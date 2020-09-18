# JS问答十题

1. [] + [] + 'foo'.split(''); ['1'] + 'foo'.split('');
答：'f,o,o', '1f,o,o' split将字符串转化为数组，数组相加，是先将数组转化成字符串，然后进行字符串的连接。
2. new Array(5).toString();
答：",,,,"
3. (true + false ) > 2 + true; true + false > 2 + true;
答： false,false '+'(算术操作符)的优先级优于'>'(关系操作符)
4. function a (x) {
　　return x * 2;
　}
   var a;
   alert(a);
答： function a (x) {
　　     return x * 2;
　　}
在预编译与执行的过程中，相当于先创建了一个存储空间为a(var a;的作用)，之后将这个空间内容设置成了function函数的内容
5. var func = function h5course () {
　　alert(typeof h5course);
　}
　func();
　alert(typeof h5course);
答：function，undefined
函数h5course并非是创建在全局的功能函数，而是以函数字面量的形式，被赋值给了func，因此，在全局作用域的环境中，能够找到func，却不能找到h5course。
 
6. var x = 1;
　if(function f () {}) {
　　　x += typeof f;
　}
　alert(x);
答： 1undefined 当在if语句当中放置一个功能函数的时候，这个if语句是能够成立的，但是，这个函数并不会被定义。
7. 闭包 function fun(n,o) {
　　　　  console.log(o);
　　　　  return {
　　　　　　fun: function (m) {
　　　　　　　　return fun(m,n);
　　　　　　}
　　　　　};
　　　　}
　　　　var a = fun(0); a.fun(1); a.fun(2); a.fun(3);
　　　　var b = fun(0).fun(1).fun(2).fun(3);
　　　　var c = fun(0).fun(1); c.fun(2); c.fun(3);
答：undefined 0 0 0
undefined 0 1 2
undefined 0 1 1
执行fun时会返回一个函数，返回的函数中，使用了n这个变量，而n这个变量恰好是父级函数的形参，此时构成闭包，n这个变量并没有被释放，在第二次调用的时候，n使用的是第一次调用后得到的值，以此类推；
 
8. var x = 1;
　var y = 2;
　function show () {
　　var x = 3;
　　return {
　　　　x: x,
　　　　fun: function (a, b) {
　　　　　　x = a + b;
　　　　}
　　　}
　　}
　　var obj = show();
　　obj.fun(x,y);
　　console.log(obj.x);
　　console.log(x);
答：3 ， 1 obj所得的是show函数的返回值，即return返回的对象，在调用obj的fun后obj这个对象的x被赋值为3，最后一句console输出的x是在全局作用域中的x因此返回的值应该是全局变量x
 
9. 闭包
var a = 0,
　　b = 0;
function A (a) {
　　A = function (b) {
　　　　alert(a + b++);
　　}
　　alert(a++);
}
A(1);
A(2);
答：1，4 第一次调用A函数的时候，A函数被重新赋值为了function(b){alert(a+b++)};alert输出a后a的值加1，在初始化的A中，形参a其实是一个局部变量，当重置A函数的时候，新的A函数调用了原有A函数作用域中的局部变量a，构成了闭包，a这个局部变量被保存。
 
10. var arr = [];
arr[0] = 'a';
arr[1] = 'b';
arr.foo = 'c';
alert(arr.length);
arr.length += arr.foo.length;
alert(arr.length);
答： 2，3 数组与数组属性 arr.foo当中，foo为arr数组的一个属性，就像length一样