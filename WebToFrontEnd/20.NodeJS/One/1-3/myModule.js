console.log("当前模块路径: ", __dirname);
console.log("当前模块文件路径: ", __filename);


exports.c = 3;
module.exports = {
    a:1,
    b:2
}
this.m = 5;
这会导出:
//{ a: 1, b: 2 }



// exports.c = 3;
// module.exports.a = 1;
// module.exports.b = 2;
// this.m = 5;
//而这,会导出:
//{ c: 3, a: 1, b: 2, m: 5 }

console.log(this === exports);//true
console.log(this === module.exports);//false