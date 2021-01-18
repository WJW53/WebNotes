//面向对象的思维方式:

/**
 * 大象
 */
function Elephant() {

}

/**
 * 冰箱
 */
function Frige() {

}

Frige.prototype.openDoor = function () {

}

Frige.prototype.closeDoor = function () {

}

Frige.prototype.join = function(something){
    //把这俩方法都加进join中执行,就会更方便
    this.openDoor();
    //装东西

    this.closeDoor();
}

//1. 冰箱门打开
// var frig = new Frige();
// frig.openDoor();

// //2. 大象装进去
// var ele = new Elephant();
// frig.join(ele);

// //3. 冰箱门关上
// frig.closeDoor();

var frig = new Frige();

frig.join(new Elephant());