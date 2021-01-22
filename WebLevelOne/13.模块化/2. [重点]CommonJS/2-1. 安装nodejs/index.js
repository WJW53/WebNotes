console.log("Hello NodeJs");//是不是ES标准
// console.log(document);//会报错,因为nodejs不支持web api

//但是nodejs做了console.log,setTimeout,setInterval等
setInterval(function(){
    console.log("Hello")
}, 1000)