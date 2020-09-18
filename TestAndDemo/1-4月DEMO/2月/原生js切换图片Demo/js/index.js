/***
 * 思路
 * 1,把图片的地址，放到数组里，取相应的地址。
 * 2，地址放到img ，切换数组的索引
 * var arr  =【one,tow,three,four,five】
 *              0   1   2     3    4
 * 3,上下按钮进行点击，index++ 
 * 4,.....btns
 * 
 */

//  arr[index]

(function () { //代码块 命名空间 

    var imgArr = ['./images/a1.jpg', './images/a2.jpg', './images/a3.jpg', './images/a4.jpg', './images/a5.jpg']


    var imgNode = document.getElementById('imgDate'),
        prevNode = document.getElementsByClassName('prev')[0],
        nextNode = document.getElementsByClassName('next')[0],
        numBtn = document.getElementById('numBtn'),
        cirulateNode = document.getElementsByClassName('cirulate')[0],//循环
        acyclicNode = document.getElementsByClassName('acyclic')[0];//非循环


    // imgNode.src = imgArr[n]
    // var index = 0;
    // var bool = false; //加个锁

    function TunPicture(arr) { //构造函数
        this.index = 0; //索引
        this.len = arr.length - 1; //数组的长度-1 索引的总长度
        this.bool = true; //锁
    }
    TunPicture.prototype = {
        // index:0,
        prev: function () {
            this.index--;
            if (this.bool) { //非循环状态下
                // if (this.index < 0) {
                //     this.index = 0
                // }
                this.index = this.index < 0 ? 0 : this.index;
            } else { //循环
                // if (this.index < 0) {
                //     this.index = this.len;
                // }
                this.index = this.index < 0 ? this.len : this.index;
            }
            return this.index;

        },
        next: function () {
            this.index++;
            if (this.bool) { //非循环
                // if (this.index > this.len) { //非循环状态下
                //     this.index = this.len;
                // }
                this.index = this.index > this.len ? this.len : this.index;
            } else { //循环

                // if (this.index > this.len) { //非循环状态下
                //     this.index = 0
                // }
                this.index = this.index > this.len ? 0 : this.index;
            }
            return this.index
        }


    }
    var turnIndex = new TunPicture(imgArr);
    //面向对象 


    prevNode.onclick = function () { //点击上一个按钮

        var index = turnIndex.prev(); //index;
        imgNode.src = imgArr[index];
        numBtn.innerHTML = (index+1) + '/' + imgArr.length;//切换数字
    }


    nextNode.onclick = function () { //点击下一个按钮
        var index = turnIndex.next(); //index;
        imgNode.src = imgArr[index];
        numBtn.innerHTML = (index+1) + '/' + imgArr.length;//切换数字

    }
    //对循环按钮进行点击 
    cirulateNode.onclick = function(){
        turnIndex.bool = false;//循环
        this.style.backgroundColor = 'yellowgreen';
        acyclicNode.style.backgroundColor = '#2164f3';
    }
    //对非循环按钮点击
    acyclicNode.onclick = function(){
        turnIndex.bool = true;//非循环
        this.style.backgroundColor = 'yellowgreen';
        cirulateNode.style.backgroundColor = '#2164f3';

    }









})()