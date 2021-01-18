const func = () => {
    console.log(this);
}
func();//window
console.dir(func);//func()
console.log(func,func.prototype);
//() => {
//     console.log(this);
// } undefined