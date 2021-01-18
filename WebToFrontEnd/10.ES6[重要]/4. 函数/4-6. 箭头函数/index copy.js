const obj = {
    count: 0,
    start: function () {
        // console.log(this);
        // var self = this;//以前是这么解决的,把this保存下来

        //现在就可以用箭头函数解决: () => 
        setInterval(() => {
            // console.log(this);//以往这里this指向window,因为定时器是window调用的,会导致问题
            this.count++;
            console.log(this.count);
        }, 1000)
    },
    regEvent: function () {
        window.onclick = () => {
            console.log(this.count);
        }
    },
    // print: () => {
    //     console.log(this);
    //     console.log(this.count);
    // },
    print: function () {
        console.log(this);
        console.log(this.count);
    }
}

// obj.start();
// obj.regEvent();
// obj.print();

const print = obj.print;
print();//以前的话,因为是window.print(),所以this指向window
//把那里的print换成箭头函数后,仍然this指向window
//why? Because: 相当于this在obj这个对象中而不是函数中,故它仍然指向window
//那么如何解决呢?  通常不解决.  因为开发时,基本不会有这种需求,这样编写代码