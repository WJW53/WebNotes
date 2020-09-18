const func = () => {
    console.log(this);
    // console.log(arguments);//会报错 not undefined
}

func();//window

const obj = {
    method: function(){
        const func = () => {
            console.log(this);//
            console.log(arguments);
        };
        func();
    }
}
obj.method(234);//obj也就是{method..},   Arguments[234,...]